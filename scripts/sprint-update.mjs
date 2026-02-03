import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPRINTS_PATH = path.join(__dirname, '../src/data/sprints.json');
const DATA_DIR = path.join(__dirname, '../src/data');
const VALIDATE_PATH = path.join(__dirname, 'validate-sprints.mjs');

const taskId = process.argv[2];
const field = process.argv[3]; // 'title' or 'description'
const newValue = process.argv[4];

if (!taskId || !field || !newValue) {
    console.error('Usage: node scripts/sprint-update.mjs <taskId> <field> "<newValue>"');
    console.error('  field: title | description');
    console.error('  Example: node scripts/sprint-update.mjs cd-pipeline title "Local Continuous Deployment"');
    process.exit(1);
}

if (!['title', 'description'].includes(field)) {
    console.error(`❌ Invalid field "${field}". Must be "title" or "description".`);
    process.exit(1);
}

function updateTask() {
    // 1. Load sprints.json
    let sprints;
    try {
        sprints = JSON.parse(fs.readFileSync(SPRINTS_PATH, 'utf8'));
    } catch (e) {
        console.error('❌ Error: Could not read or parse sprints.json');
        process.exit(1);
    }

    const latestSprint = sprints[sprints.length - 1];
    
    let found = false;
    let oldValue = '';
    let boardName = '';

    // 2. Update the snapshot in the latest sprint
    for (const [board, items] of Object.entries(latestSprint.boardSnapshots)) {
        const item = items.find(i => i.id === taskId);
        if (item) {
            oldValue = item[field];
            boardName = board;
            item[field] = newValue;
            found = true;
            break;
        }
    }

    if (!found) {
        console.error(`❌ Task "${taskId}" not found in current sprint snapshot.`);
        process.exit(1);
    }

    if (oldValue === newValue) {
        console.log(`Task "${taskId}" ${field} is already "${newValue}". No changes made.`);
        return;
    }

    // 3. Log the change
    latestSprint.changes.push({
        itemId: taskId,
        board: boardName,
        field: field,
        from: oldValue,
        to: newValue
    });

    // 4. Update the master data file (projects.json, devops.json, etc.)
    const masterFiles = {
        project: 'projects.json',
        devops: 'devops.json',
        youtube: 'youtube.json',
        admin: 'admin.json'
    };

    const masterFile = path.join(DATA_DIR, masterFiles[boardName]);
    try {
        const masterData = JSON.parse(fs.readFileSync(masterFile, 'utf8'));
        const masterItem = masterData.find(i => i.id === taskId);
        if (masterItem) {
            masterItem[field] = newValue;
            fs.writeFileSync(masterFile, JSON.stringify(masterData, null, 4));
            console.log(`📝 Updated master data in ${masterFiles[boardName]}`);
        }
    } catch (e) {
        console.warn(`⚠️  Could not update master file ${masterFiles[boardName]}: ${e.message}`);
    }

    // 5. Save sprints.json
    fs.writeFileSync(SPRINTS_PATH, JSON.stringify(sprints, null, 2));
    console.log(`✅ Updated "${taskId}" ${field}: "${oldValue}" → "${newValue}"`);
    console.log(`📝 Logged to Sprint ${latestSprint.id} history.`);

    // 6. Auto-validate
    console.log('\n🔍 Running auto-validation...');
    try {
        execSync(`node ${VALIDATE_PATH}`, { stdio: 'inherit' });
    } catch (e) {
        console.error('❌ Validation failed after update! Please check sprints.json.');
        process.exit(1);
    }
}

updateTask();
