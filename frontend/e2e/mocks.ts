import type { Page } from '@playwright/test';

/**
 * Deterministic API mocks for the e2e suite.
 *
 * Every backend call the frontend makes is fulfilled here with a fixed fixture,
 * so the tests never touch a real server and render identically every run.
 * Add a new route here whenever the frontend starts calling a new endpoint.
 */

const projects = [
  {
    id: 'germy',
    guid: '00000000-0000-0000-0000-000000000001',
    title: 'Germy',
    category: 'Mobile app',
    path: '/projects/germy',
    description: 'A hygiene-tracking companion app.',
    longDescription: 'Germy helps you build better hygiene habits with gentle nudges.',
    links: { appStore: 'https://example.com', playStore: null, github: null },
    media: { icon: '🦠', youtube: null },
    features: ['Reminders', 'Streaks'],
  },
  {
    id: 'apeify',
    guid: '00000000-0000-0000-0000-000000000002',
    title: 'APEify',
    category: 'Web app',
    path: '/projects/apeify',
    description: 'Turn any workflow into a repeatable playbook.',
    longDescription: 'APEify captures the steps you take and replays them on demand.',
    links: { appStore: null, playStore: null, github: 'https://example.com' },
    media: { icon: '🦍', youtube: null },
    features: ['Playbooks', 'Sharing'],
  },
  {
    id: 'transcription-video-editor',
    guid: '00000000-0000-0000-0000-000000000003',
    title: 'Transcription Video Editor',
    category: 'Creator tool',
    path: '/projects/transcription-video-editor',
    description: 'Edit video by editing the transcript.',
    longDescription: 'Cut filler words and tighten pacing by editing text, not timelines.',
    links: { appStore: null, playStore: null, github: null },
    media: { icon: '🎬', youtube: null },
    features: ['Word-level cuts', 'Filler removal'],
  },
];

export async function mockApi(page: Page): Promise<void> {
  await page.route('**/api/projects', (route) =>
    route.fulfill({ json: projects }),
  );
  await page.route('**/api/sprints', (route) => route.fulfill({ json: [] }));
  await page.route('**/api/status', (route) =>
    route.fulfill({ json: { status: 'ok' } }),
  );
  // Newsletter / interest forms — accept any submission so the UI shows success.
  await page.route('**/api/interest/**', (route) =>
    route.fulfill({ status: 200, json: { ok: true } }),
  );
}
