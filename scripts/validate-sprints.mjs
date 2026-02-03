import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPRINTS_PATH = path.join(__dirname, '../src/data/sprints.json');

function validate() {
    console.log('🚀 Starting Sprint Data Validation...\n');
    
    let sprints;
    try {
        sprints = JSON.parse(fs.readFileSync(SPRINTS_PATH, 'utf8'));
    } catch (e) {
        console.error('❌ Error: Could not read or parse sprints.json');
        process.exit(1);
    }

    // currentState[board][itemId] = status
    const currentState = {
        project: {},
        devops: {},
        youtube: {},
        admin: {}
    };

    let errors = 0;

    sprints.forEach((sprint) => {
        const sprintId = sprint.id;
        console.log(`Checking Sprint ${sprintId}...`);

        // 1. Apply changes
        (sprint.changes || []).forEach((change, changeIdx) => {
            const { itemId, board, from, to } = change;
            
            if (!currentState[board]) {
                console.error(`  [Change ${changeIdx}] ❌ Illegal board type: "${board}"`);
                errors++;
                return;
            }

            const actualFrom = currentState[board][itemId] || null;
            if (actualFrom !== from) {
                console.error(`  [Change ${changeIdx}] ❌ Item "${itemId}" mismatch: Log says from "${from}", but current state was "${actualFrom}"`);
                errors++;
            }

            // Update state
            currentState[board][itemId] = to;
        });

        // 2. Validate Snapshots
        Object.keys(sprint.boardSnapshots || {}).forEach(board => {
            const snapshot = sprint.boardSnapshots[board];
            const snapshotIds = new Set();

            // Check if every item in snapshot matches our derived state
            snapshot.forEach(item => {
                snapshotIds.add(item.id);
                const derivedStatus = currentState[board][item.id];
                
                if (derivedStatus === undefined) {
                    console.error(`  [Snapshot ${board}] ❌ Item "${item.id}" is in snapshot but never appeared in a change log (or was missed).`);
                    errors++;
                } else if (derivedStatus !== item.status) {
                    console.error(`  [Snapshot ${board}] ❌ Item "${item.id}" status mismatch: Snapshot says "${item.status}", but derived state is "${derivedStatus}"`);
                    errors++;
                }
            });

            // Check if every item in our derived state is in the snapshot
            Object.keys(currentState[board]).forEach(itemId => {
                if (!snapshotIds.has(itemId)) {
                    console.error(`  [Snapshot ${board}] ❌ Item "${itemId}" is in our derived state but missing from this snapshot.`);
                    errors++;
                }
            });
        });
        
        console.log(`  ✅ Done.\n`);
    });

    if (errors > 0) {
        console.log(`\n❌ Validation failed with ${errors} error(s).`);
        process.exit(1);
    } else {
        console.log('✨ All snapshots are perfectly in sync with change logs!');
    }
}

validate();
