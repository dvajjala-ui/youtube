#!/usr/bin/env node
// Thin shim: the real tool lives in studio/tools. Runs it against this episode folder.
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const EP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (!process.argv.includes("--episode")) process.argv.push("--episode", EP);
await import("../../../studio/tools/placeholder.mjs");
