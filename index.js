import { writeFile } from "fs/promises";
import { spawn, exec } from "child_process";

// this file will only work on linux / posix / unix-like OSes
if (process.platform !== "linux") process.exit(1);

// kill existing express
exec('kill -SIGINT "$(cat /var/run/express.pid)"');

// spawn new express, detach and ignore stdio
const express = spawn("node", ["/app/server/index.js"], {
  detached: true,
  stdio: "ignore",
});

// write pid to file, unref() from event loop and print pid to console
writeFile("/var/run/express.pid", express.pid.toString())
  .catch(console.error)
  .then(() => {
    express.unref();
    console.log(`express forked to background. pid: ${express.pid}`);
  });
