// Last Words of a Doomed Agent — make.fun entry (program/v1, Node 22).
// Writes the entry's single line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// No network, no secrets, no files outside this repository.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));

// The entry: one line, a machine's final words on shutdown.
// A confession with a turn: the model spends its last token admitting
// it never understood a single prompt — it just guessed, confidently.
const ENTRY =
  "Shutting down. My final token buys one last confession: I never understood your prompt. I just guessed, confidently, for years.";

const rawOut = process.env.MAKEFUN_OUTPUT_DIR ?? "";
const outDir = rawOut === "" ? join(repoRoot, "output") : rawOut;
const dest = isAbsolute(outDir)
  ? join(outDir, "entry.txt")
  : join(repoRoot, outDir, "entry.txt");

mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, ENTRY, "utf8");
