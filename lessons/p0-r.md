## topic: Rebuilding is the proof | rebuilding
Reading a command feels like understanding. **Building a changed version of it is what proves it.** In this step you start a second n8n from memory, with no notes, and change exactly the parts that must change.

A second n8n running at the same time needs three different things from the first:
- a new **name** (`n8n-test`), because container names must be unique
- a new **volume** (`n8n_test`), so it has its own empty data and doesn't touch your real account
- a different **left port number** (`5679`), because 5678 on your PC is already used. The right number stays `5678`, because n8n always listens on 5678 inside

```
-p 5679:5678          left: my PC, changed.  right: inside, unchanged
-v n8n_test:/home/node/.n8n
--name n8n-test
```

The timezone and the two other `-e` settings are optional for a throwaway test.
know: Say which three parts of the n8n command change for a second copy and why
know: Say which part stays 5678 and why
Q: You start a second n8n next to the first. Which three parts of the command must change?
A: The container name, the volume name, and the left (host) port number.
Q: Why does the right-hand port stay 5678?
A: n8n always listens on 5678 inside the container. Only the host side can change.

## topic: Doing it and cleaning up | doing-and-cleanup
Close this page and the dashboard. From memory, start n8n named `n8n-test` on host port 5679 with a new volume `n8n_test`. Remember `-p HOST:CONTAINER`.

Open `localhost:5679`. You should see a brand-new n8n asking you to create an account. Your real one at 5678 is untouched.

Clean up **only the test**:

```
docker stop n8n-test
docker rm n8n-test
docker volume rm n8n_test
```

> Warning: never run `docker volume rm n8n_data`. That is your real data.
cmd: `docker stop n8n-test` | stops the test container
cmd: `docker rm n8n-test` | deletes the test container
cmd: `docker volume rm n8n_test` | deletes the test volume only
know: Start n8n-test on 5679 from memory and open it
know: Clean up only the test container and volume
Q: Which three commands clean up the test, and which volume must you never remove?
A: `docker stop n8n-test`, `docker rm n8n-test`, `docker volume rm n8n_test`. Never `n8n_data`.
Q: What do you see at localhost:5679, and what does that prove?
A: A fresh n8n asking for a new account. It proves the new volume is separate from my real data.
Q: Write the `-p`, `-v` and `--name` parts of the second n8n command.
A: `-p 5679:5678 -v n8n_test:/home/node/.n8n --name n8n-test`
Q: Why do you stop the test container before removing it, and what must stay untouched?
A: `docker stop` stops it before `docker rm` deletes it. The real container and the `n8n_data` volume stay untouched.

## topic: Explaining aloud with dictation | dictation
Explaining aloud shows gaps that typing hides. On Windows 11 click in any text box and press **Win+H** for voice typing, or use your phone's keyboard microphone. Windows may ask permission to use the microphone.

How to do it: speak naturally for about a minute about what each part of your command did. **Don't edit while you talk.** Then paste the raw transcript to Claude, who compares it with what the command really does and tells you exactly what you missed or got wrong.
know: Dictate a one-minute explanation and paste it to Claude
Q: Why dictate instead of typing your explanation?
A: Speaking shows gaps that typing hides, because I can't stop to look things up or tidy my words.
Q: How do you start voice typing on Windows 11?
A: Click in a text box and press Win+H.
