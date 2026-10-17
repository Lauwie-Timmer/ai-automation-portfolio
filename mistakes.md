# Mistakes log

Claude adds what you got wrong here during checks and exams. The diagnostician reads this file to find the root cause behind repeated mistakes.

## Known gaps from the interview (2026-10-04)
- GET vs POST: thought POST 'hides' parameters. Reality: HTTPS encrypts both; POST puts data in the body, GET in the URL; meaning differs (read vs change).
- Workflow vs agent: no answer yet.
- Git commands: forgotten.
- Typo: wrote ["orers"] instead of ["orders"] in a JSON path (print the JSON first and copy key names from it).

## p0-t terminal basics (2026-10-05)
- Task 1: for "which folder am I in" typed `path` (not a command), then `ls` (lists files, not the current folder). Correct: `pwd`. Mixed up "where am I" (`pwd`) with "what is here" (`ls`/`dir`). Needed two hints.
