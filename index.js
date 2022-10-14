import { spawn } from "child_process";

spawn("npm", ["start", "--prefix", "server"], {
  detached: true,
});
