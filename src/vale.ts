#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { outputBin } from "./shared";
import { existsSync } from "fs-extra";

if (process.versions.webcontainer) {
  console.error("Vale does not support WebContainers. This is not a bug.")
  process.exit(1)
}

if (existsSync(outputBin)) {
  const result = spawnSync(outputBin, process.argv.slice(2), {
    stdio: "inherit",
  });
  if (result.signal) {
    console.error(`Process failed with signal: ${result.signal}`);
  }
  if (result.error) {
    console.error(`Failed to run Vale, process exited with error: ${result.error.message}`)
  }
  process.exit(result.status ?? 1);
}
console.error("Missing Vale binary. Did you run the postinstall?");
process.exit(1);
