import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to project root
const ROOT = path.join(__dirname, '..');
const SPRINTS_PATH = path.join(ROOT, 'backend/Balenthiran.WebApi/Data/sprints.json');

function validate() {
    console.log('🚀 Starting Deep Sprint Data Validation (Object-Based)...\n');
    
    let sprints;
    try {
        sprints = JSON.parse(fs.readFileSync(SPRINTS_PATH, 'utf8'));
    } catch (e) {
        console.error('❌ Error: Could not read or parse sprints.json at ' + SPRINTS_PATH);
        process.exit(1);
    }

    // currentState[board][itemId] = { status, title, description }
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
            const { itemId, board, from, to, field = 'status' } = change;
            
            if (!currentState[board]) {
                console.error(`  [Change ${changeIdx}] ❌ Illegal board type: "${board}"`);
                errors++;
                return;
            }

            if (!currentState[board][itemId]) {
                currentState[board][itemId] = { status: null, title: null, description: null };
            }

            const currentItem = currentState[board][itemId];
            
            // Handle both primitive and object updates
            if (typeof to === 'object' && to !== null) {
                // Bulk property update (usually initialization)
                Object.keys(to).forEach(f => {
                    const expectedFrom = (from && typeof from === 'object') ? from[f] : (f === 'status' ? from : currentItem[f]);
                    if (currentItem[f] !== expectedFrom) {
                        console.error(`  [Change ${changeIdx}] ❌ Item "${itemId}" ${f} mismatch: Log says from "${expectedFrom}", but current state was "${currentItem[f]}"`);
                        errors++;
                    }
                    currentItem[f] = to[f];
                });
            } else {
                // Targeted property update (using 'field', defaults to 'status')
                if (currentItem[field] !== from) {
                    console.error(`  [Change ${changeIdx}] ❌ Item "${itemId}" ${field} mismatch: Log says from "${from}", but current state was "${currentItem[field]}"`);
                    errors++;
                }
                currentItem[field] = to;
            }
        });

        // 2. Validate Snapshots
        Object.keys(sprint.boardSnapshots || {}).forEach(board => {
            const snapshot = sprint.boardSnapshots[board];
            const snapshotIds = new Set();

            snapshot.forEach(item => {
                snapshotIds.add(item.id);
                const derived = currentState[board][item.id];
                
                if (!derived) {
                    console.error(`  [Snapshot ${board}] ❌ Item "${item.id}" is in snapshot but never appeared in a change log.`);
                    errors++;
                } else {
                    ['status', 'title', 'description'].forEach(f => {
                        if (derived[f] !== item[f]) {
                            console.error(`  [Snapshot ${board}] ❌ Item "${item.id}" ${f} mismatch: Snapshot says "${item[f]}", but derived state is "${derived[f]}"`);
                            errors++;
                        }
                    });
                }
            });

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
        console.log('✨ All snapshots are perfectly in sync with evolutionary logs!');
    }
}

validate();
