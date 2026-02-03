const fs = require('fs');
const path = require('path');

const SPRINTS_PATH = path.join(__dirname, '../src/data/sprints.json');

const taskId = process.argv[2];
const newStatus = process.argv[3];

if (!taskId || !newStatus) {
    console.error('Usage: node scripts/sprint-move.js <taskId> <newStatus>');
    process.exit(1);
}

function updateSprint() {
    const sprints = JSON.parse(fs.readFileSync(SPRINTS_PATH, 'utf8'));
    const latestSprint = sprints[sprints.length - 1];
    
    let moved = false;
    let fromStatus = '';
    let boardName = '';

    // Find the task in the snapshots
    for (const [board, items] of Object.entries(latestSprint.boardSnapshots)) {
        const item = items.find(i => i.id === taskId);
        if (item) {
            fromStatus = item.status;
            boardName = board;
            item.status = newStatus;
            moved = true;
            break;
        }
    }

    if (!moved) {
        console.error(`Task "${taskId}" not found in current sprint snapshot.`);
        process.exit(1);
    }

    if (fromStatus === newStatus) {
        console.log(`Task "${taskId}" is already in status "${newStatus}". No changes made.`);
        return;
    }

    // Log the change
    latestSprint.changes.push({
        itemId: taskId,
        board: boardName,
        from: fromStatus,
        to: newStatus,
        timestamp: new Date().toISOString()
    });

    fs.writeFileSync(SPRINTS_PATH, JSON.stringify(sprints, null, 2));
    console.log(`✅ Moved "${taskId}" from "${fromStatus}" to "${newStatus}" on ${boardName} board.`);
    console.log(`📝 Logged to Sprint ${latestSprint.id} history.`);
}

updateSprint();
