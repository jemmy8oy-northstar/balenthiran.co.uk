const fs = require('fs');
const path = require('path');

const filePath = 'frontend/src/data/sprints.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Sprint 3: 26Q1W5/6 (Feb 2 - Feb 15)
// Sprint 4: 26Q1W7/8 (Feb 16 - Mar 1)

const sprint3 = data.find(s => s.id === '26Q1W5/6');
const sprint4 = data.find(s => s.id === '26Q1W7/8');

if (sprint3 && sprint4) {
    // 1. Move changes from Sprint 4 to Sprint 3
    sprint3.changes = [...(sprint3.changes || []), ...sprint4.changes];
    sprint4.changes = [];

    // 2. Update Sprint 3 devops snapshot to match Sprint 4's (which was updated by mistake earlier)
    sprint3.boardSnapshots.devops = JSON.parse(JSON.stringify(sprint4.boardSnapshots.devops));
    
    // 3. Ensure Sprint 3 project snapshot is also up to date (though it already was mostly)
    sprint3.boardSnapshots.project = JSON.parse(JSON.stringify(sprint4.boardSnapshots.project));
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('Successfully migrated changes and snapshots from Sprint
const fileP 3.');
