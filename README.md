# One Line, One Laugh

This program writes a single original joke line to `$MAKEFUN_OUTPUT_DIR/entry.txt`
(default `/output`), creating the output directory if needed. It validates the line
before writing — it must be non-blank, 1–140 characters, and no more than 140 UTF-8
bytes — then writes it with exactly one trailing newline and reads the file back to
confirm what landed on disk is byte-for-byte the validated line.
