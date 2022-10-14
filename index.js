import { writeFile } from "fs/promises";
import { spawn, exec } from "child_process";

if (process.platform !== "linux") process.exit(1);

exec("kill -SIGINT $(cat /var/run/express.pid)");
const express = spawn("node", ["/app/server/index.js"], {
  detached: true,
});

writeFile("/var/run/express.pid", express.pid)
  .catch(console.error)
  .then(() => console.log(`express forked to background. pid: ${express.pid}`));
