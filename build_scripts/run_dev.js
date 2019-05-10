const child_process = require('child_process');
const fs = require('fs');
const globals = require('./globals')();

let shell = (cmd, callback) => {
  let child = child_process.exec(cmd, callback);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  process.stdin.pipe(child.stdin);
}

shell (`npm run dev`);

if(globals.GLOBALS.client === "desktop") {
  shell (`npm run electron-main-dev`);
}
