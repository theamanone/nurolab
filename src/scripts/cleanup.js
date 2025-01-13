const fs = require('fs');
const path = require('path');

const cookiesPath = path.join(__dirname, '..', 'app', 'cookies');

if (fs.existsSync(cookiesPath)) {
    fs.rmSync(cookiesPath, { recursive: true, force: true });
    console.log('Removed duplicate cookies directory');
}
