#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "fs-extra";
import { outputBin } from "./shared";

function resolveBin(): string {
  const { VALE_BIN } = process.env;

  if (VALE_BIN) {
    if (existsSync(VALE_BIN)) {
      return VALE_BIN;
    }
    console.error(
      `VALE_BIN variable was specified but the path could not be found. Tried binary: ${VALE_BIN}`,
    );
    process.exit(1)
  }

  if (!existsSync(outputBin)) {
    console.error("Missing Vale binary. Did you run the postinstall?");
    process.exit(1);
  }

  return outputBin;
}

const bin = resolveBin();

const result = spawnSync(bin, process.argv.slice(2), {
  stdio: "inherit",
});

if (result.signal) {
  console.error(`Process failed with signal: ${result.signal}`);
}
if (result.error) {
  console.error(
    `Failed to run Vale, process exited with error: ${result.error.message}`,
  );
}

process.exit(result.status ?? 1);