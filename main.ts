// One Line, One Laugh — entry program.
// Writes a single original joke line to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I bought a standing desk to sit less; now I stand all day snacking at eye level with the fridge.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const text = LINE.trim();
if (text.length < 1 || text.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${text.length}`);
}
// The gate counts characters, but the file is stored as UTF-8 bytes, so
// keep the byte length inside the same cap for non-ASCII safety.
if (Buffer.byteLength(text, "utf8") > 140) {
  throw new Error(`entry is ${Buffer.byteLength(text, "utf8")} UTF-8 bytes, over 140`);
}
if (text !== LINE) {
  throw new Error("entry has unexpected leading or trailing whitespace");
}

const target = join(outDir, "entry.txt");
writeFileSync(target, text + "\n", "utf8");

// Read it back: the file must be exactly the line plus one trailing
// newline, with no trailing spaces or extra blank lines.
const onDisk = readFileSync(target, "utf8");
if (onDisk !== text + "\n") {
  throw new Error("entry.txt on disk does not match the validated line");
}
console.log(`wrote ${text.length} characters to ${target}`);
