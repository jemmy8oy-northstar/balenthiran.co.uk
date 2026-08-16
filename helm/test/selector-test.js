#!/usr/bin/env node
/**
 * Reproduces, and then proves fixed, the cross-app Service selector bug.
 *
 * balenthiran.co.uk, macro-metrics and holiday-planning are all deployed by oke-fleet
 * into the SAME namespace ("balenthiran"), and all three charts are generated from
 * web-template. If a Service's selector is only `app: <name>`, it matches the *other*
 * apps' pods too, because they are all labelled `app: backend` / `app: frontend`.
 * Live measurement on 2026-08-14: GET /api/projects returned 200 on 10/30 requests
 * and 404 on 20/30 — exactly 1-in-3, one hit per backend pod in the namespace.
 *
 * This test renders the label/selector maps straight out of the REAL template files
 * (it does not restate them, so it cannot drift from what it tests), models the shared
 * namespace, and asserts each Service resolves to its own pods and nobody else's.
 *
 * Run: node helm/test/selector-test.js
 */
const fs = require('fs');
const path = require('path');
const yaml = require(path.join(__dirname, '../../frontend/node_modules/js-yaml'));

const ROOT = path.join(__dirname, '../..');
const REPOS = path.join(ROOT, '..'); // /data/repos, when the sibling clones are present

let pass = 0;
const failures = [];
function check(name, actual, expected) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { pass++; console.log(`  ✓ ${name}`); }
  else { failures.push(name); console.log(`  ✗ ${name}\n      expected ${e}\n      actual   ${a}`); }
}

/**
 * Extract a `key:` block's simple `k: v` pairs from a Helm template, then substitute
 * the two expressions these charts actually use. Deliberately tiny: it understands the
 * template as written rather than pretending to be Helm.
 */
function renderBlock(tpl, blockRe, ctx) {
  const lines = tpl.split('\n');
  const start = lines.findIndex(l => blockRe.test(l));
  if (start < 0) return null;
  const indent = lines[start].match(/^\s*/)[0].length;
  const out = {};
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === '' || /^\s*#/.test(l)) continue;
    const ind = l.match(/^\s*/)[0].length;
    if (ind <= indent) break;
    const m = l.match(/^\s*([A-Za-z0-9_.\-\/]+):\s*(.+?)\s*$/);
    if (!m) continue;
    let v = m[2];
    v = v.replace(/\{\{\s*include\s+"[^"]*\.fullname"\s+\$?\s*\}\}/g, ctx.fullname);
    v = v.replace(/\{\{\s*\.name\s*\}\}/g, ctx.name);
    v = v.replace(/\{\{[^}]*\}\}/g, '<unresolved>');
    out[m[1]] = v;
  }
  return out;
}

function loadChart(repoDir, label) {
  const helm = path.join(repoDir, 'helm');
  const values = yaml.load(fs.readFileSync(path.join(helm, 'values.yaml'), 'utf8'));
  const svcTpl = fs.readFileSync(path.join(helm, 'templates/service.yaml'), 'utf8');
  const depTpl = fs.readFileSync(path.join(helm, 'templates/deployment.yaml'), 'utf8');
  // fullname: these charts all set fullnameOverride, which wins in the helper.
  const fullname = values.fullnameOverride;
  if (!fullname) throw new Error(`${label}: no fullnameOverride — this test assumes one`);
  const pods = [], services = [];
  for (const app of values.apps || []) {
    const ctx = { name: app.name, fullname };
    const podLabels = renderBlock(depTpl, /^\s*template:\s*$/.test('') ? /$^/ : /^\s{4}template:\s*$/, ctx);
    // pod labels live under template.metadata.labels
    const labels = renderBlock(depTpl, /^\s{6}labels:\s*$/, ctx);
    pods.push({ owner: label, app: app.name, labels: labels || {} });
    if (app.service) {
      const sel = renderBlock(svcTpl, /^\s{2}selector:\s*$/, ctx);
      services.push({ owner: label, app: app.name, selector: sel || {} });
    }
    void podLabels;
  }
  return { fullname, pods, services };
}

/** kube semantics: a Service selects a pod when every selector k=v is present on the pod. */
function endpointsOf(service, pods) {
  return pods
    .filter(p => Object.entries(service.selector).every(([k, v]) => p.labels[k] === v))
    .map(p => `${p.owner}/${p.app}`)
    .sort();
}

console.log('Cross-app Service selector (namespace "balenthiran")\n');

const here = loadChart(ROOT, 'balenthiran');

// The neighbours are only present when the sibling clones are; the test still proves the
// property without them by SYNTHESISING the pods they are known to create, so it is
// runnable in CI where only this repo is checked out.
const neighbours = [
  { owner: 'macro-metrics', apps: ['backend', 'frontend', 'yfinance-sidecar'] },
  { owner: 'holiday-planning', apps: ['backend', 'frontend'] },
];
const neighbourPods = [];
for (const n of neighbours) {
  const dir = path.join(REPOS, n.owner);
  if (fs.existsSync(path.join(dir, 'helm/values.yaml'))) {
    neighbourPods.push(...loadChart(dir, n.owner).pods);
  } else {
    // Same shape, from the pre-fix web-template: `app: <name>` and nothing else.
    for (const a of n.apps) neighbourPods.push({ owner: n.owner, app: a, labels: { app: a } });
  }
}
console.log(`  (neighbour pods modelled: ${neighbourPods.map(p => `${p.owner}/${p.app}`).join(', ')})\n`);

const namespace = [...here.pods, ...neighbourPods];

console.log('This chart:');
for (const svc of here.services) {
  check(`Service ${svc.app} selects only its own pod`, endpointsOf(svc, namespace), [`balenthiran/${svc.app}`]);
}

console.log('\nThe selector must be release-scoped, not just `app`:');
for (const svc of here.services) {
  check(`Service ${svc.app} selector carries release=${here.fullname}`, svc.selector.release, here.fullname);
}
for (const pod of here.pods) {
  check(`pod ${pod.app} is labelled release=${here.fullname}`, pod.labels.release, here.fullname);
}

console.log('\nFAILS-ON (the known-bad implementation this exists to catch):');
{
  // Known bad = the selector this repo shipped until 2026-08-14: `app: <name>` alone.
  const bad = here.services.map(s => ({ ...s, selector: { app: s.selector.app } }));
  const backend = bad.find(s => s.app === 'backend');
  const eps = endpointsOf(backend, namespace);
  check('`app:` alone would select 3 backends across 3 apps (the live bug)', eps,
    ['balenthiran/backend', 'holiday-planning/backend', 'macro-metrics/backend']);
  const ratio = 1 / eps.length;
  check('...i.e. /api/projects would answer ~33% of the time', Math.round(ratio * 100), 33);
}

console.log('\nspec.selector.matchLabels must stay `app` alone (it is immutable in kube):');
{
  const depTpl = fs.readFileSync(path.join(ROOT, 'helm/templates/deployment.yaml'), 'utf8');
  const match = renderBlock(depTpl, /^\s*matchLabels:\s*$/, { name: 'backend', fullname: here.fullname });
  check('Deployment matchLabels has no release key (would break ArgoCD sync)', match.release, undefined);
  check('Deployment matchLabels still matches on app', match.app, 'backend');
}

console.log(`\n${pass} passed, ${failures.length} failed`);
if (failures.length) { failures.forEach(f => console.log(`  FAILED: ${f}`)); process.exit(1); }
