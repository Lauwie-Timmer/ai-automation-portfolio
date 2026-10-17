## topic: What the terminal is | terminal
The **terminal** is a window where you control your computer by typing commands instead of clicking. **PowerShell** is the terminal program on Windows. Everything you will do with Git, Docker and Python in this roadmap is typed here.

Two ideas matter most:
- There is always a **current folder**. Every command you type runs *in that folder*. The prompt shows it, for example `PS C:\dev\ai-automation-portfolio>`.
- A command is a **name**, then optional **arguments** separated by spaces. `cd C:\dev` is the command `cd` with the argument `C:\dev`. A missing or extra space changes the meaning, so type commands exactly.

> Tip: if you are ever lost, the prompt tells you where you are. It is the text just before the blinking cursor.
know: Explain what the terminal and PowerShell are, in one sentence
know: Say what the "current folder" is and where PowerShell shows it
Q: What is the current folder, and why does it matter for every command you type?
A: It's the folder PowerShell is "standing in", shown in the prompt. Every command runs there, so the same command can do different things from different folders.
Q: In `cd C:\dev`, which part is the command and which is the argument?
A: `cd` is the command; `C:\dev` is the argument (where to go).

## topic: Looking around: pwd, ls, dir | looking-around
Two commands answer two different questions. People mix them up, so learn them as a pair.

| Question | Command |
|---|---|
| **Where am I?** (which folder) | `pwd` |
| **What is here?** (files and folders inside) | `ls` or `dir` |

`pwd` stands for *print working directory*. It prints one line: the full path of your current folder. `ls` and `dir` are two names for the same command. They list the contents of the current folder. They never tell you the folder's own name or path.

```
PS C:\dev> pwd

Path
----
C:\dev

PS C:\dev> ls
```

> Warning: `ls` does not show where you are. If you want to know which folder you're in, use `pwd`.
cmd: `pwd` | shows the full path of the current folder (where am I)
cmd: `ls` | lists the files and folders in the current folder (what is here)
cmd: `dir` | the same as `ls`
know: Tell `pwd` and `ls` apart without looking
Q: You want to know which folder you are in. Which command do you type, and what does `ls` do instead?
A: `pwd`. `ls` (or `dir`) lists what is inside the current folder; it doesn't tell you the folder's path.
Q: What is the difference between `ls` and `dir`?
A: None in PowerShell. They are two names for the same command.

## topic: Moving: cd | moving
`cd` means *change directory*. It moves your current folder.

```
cd C:\dev            go to C:\dev (absolute path)
cd ai-automation-portfolio         go into the folder "ai-automation-portfolio" inside the current folder
cd ..                go up one level (to the parent folder)
cd ..\..             go up two levels
```

Two dots (`..`) always mean **the parent folder**, the folder that contains the current one. From `C:\dev\ai-automation-portfolio`, `cd ..` takes you to `C:\dev`.

If the folder doesn't exist, PowerShell prints a red error ("Cannot find path ...") and you stay where you were. Check with `pwd` if you are unsure.
cmd: `cd C:\dev` | go to a folder using a full path
cmd: `cd folder` | go into a folder inside the current folder
cmd: `cd ..` | go up one level to the parent folder
know: Move down into a folder, up one level, and to a full path
Q: You are in `C:\dev\ai-automation-portfolio`. Which command takes you to `C:\dev`?
A: `cd ..`
Q: You type `cd nothere` and get a red error. Where are you now?
A: Still in the same folder as before. The command failed, so nothing moved.

## topic: Paths: absolute vs relative | paths
A **path** is the address of a file or folder.

- An **absolute path** starts at the drive: `C:\dev\ai-automation-portfolio`. It means the same place no matter where you are when you type it.
- A **relative path** starts from **where you are now**: `ai-automation-portfolio` or `..\other`. It is a list of steps: each `..` is one step up, each name is one step down. The same relative path can end somewhere else, or nowhere, if you type it from a different folder.

Worked examples:

| You are in | You type | You end up in |
|---|---|---|
| `C:\dev\exam\my notes` | `cd ..\..\ai-automation-portfolio` | `C:\dev\ai-automation-portfolio` (up to `exam`, up to `dev`, down into `ai-automation-portfolio`) |
| `C:\dev\ai-automation-portfolio\content` | `cd ..\ai-automation-portfolio` | `C:\dev\ai-automation-portfolio\ai-automation-portfolio`, which doesn't exist, so you get an error |
| anywhere | `cd C:\dev\ai-automation-portfolio` | `C:\dev\ai-automation-portfolio` |

To read a relative path, write down the folder after every step, starting from where you are now.

> Tip: forward slashes (`../ai-automation-portfolio`) work too in PowerShell, but the Windows way is backslashes.

A path with a space in it must be in **quotes**: `cd "C:\My Folder"`. Without the quotes PowerShell thinks the space ends the argument.
know: Explain absolute vs relative paths in your own words
know: Work out where a relative path ends, step by step, from a given folder
know: Put a path with a space in quotes
Q: What is the difference between an absolute and a relative path?
A: An absolute path starts at the drive and means the same place from anywhere. A relative path starts from the current folder, so where it leads depends on where you are.
Q: You are in `C:\dev\exam\my notes`. Write a relative path to `C:\dev\ai-automation-portfolio`.
A: `cd ..\..\ai-automation-portfolio`
Q: Why does `cd C:\My Folder` fail, and how do you fix it?
A: The space splits it into two arguments. Put it in quotes: `cd "C:\My Folder"`.

## topic: Creating folders and files | creating
```
mkdir terminal-practice          make a new folder
New-Item notes.txt               make a new empty file
New-Item notes.txt -ItemType File    the same, with the type spelled out
```

`mkdir` makes **folders**. `New-Item` makes **files** (it can make folders too, but you'll use `mkdir` for that). There is no `mk` or `touch` command in PowerShell.

Both create inside the **current folder** unless you give a path. After creating, run `ls` to see the result. A name with a space needs quotes: `mkdir "my notes"`.

If the file already exists, `New-Item` gives an error instead of overwriting it.
cmd: `mkdir name` | creates a new folder in the current folder
cmd: `New-Item notes.txt` | creates a new empty file in the current folder
know: Create a folder, then a file inside it
Q: Which command makes a folder and which makes a file?
A: `mkdir` makes a folder; `New-Item` makes a file.
Q: You are in `C:\dev`. Write the commands to create a folder `exam`, go into it, create `y.txt` and list it.
A: `mkdir exam`, `cd exam`, `New-Item y.txt`, `ls`

## topic: Deleting safely | deleting
```
Remove-Item terminal-practice -Recurse
```

This deletes the folder **and everything inside it**, with no recycle bin and no undo. Use it only on a folder you made for practice. Run a check first:

1. `pwd`: are you in the folder you think you are?
2. `ls`: is the thing you want to delete listed, and nothing you care about next to it?
3. Only then run the delete, naming the folder exactly.

Without `-Recurse`, PowerShell asks for confirmation when the folder has things inside. `-Recurse` means "and everything inside", and it skips that question, so the check before is your only safety.

> Warning: never run `Remove-Item ... -Recurse` on a folder you care about, and never on a path you haven't checked with `ls`.
cmd: `Remove-Item folder -Recurse` | deletes a folder and everything inside it, permanently
know: Run the safety check (`pwd`, `ls`) before deleting a folder
know: Say what `-Recurse` does and why it is dangerous
Q: What do you do before running `Remove-Item folder -Recurse`, and why?
A: Run `pwd` and `ls` to confirm where I am and what is there, because the delete is permanent and includes everything inside.
Q: What does `-Recurse` add to `Remove-Item`?
A: It deletes the folder and everything inside it without asking for confirmation.

## topic: Shortcuts, errors and VS Code | shortcuts
- **Tab** completes a name. Type `cd ai-a` and press Tab to get `cd ai-automation-portfolio`. It also adds quotes for names with spaces.
- **Up arrow** brings back the previous command. Press it again to go further back.
- **Ctrl+C** stops a program that is running. You will use it to stop n8n in p0-3.
- **Right-click** pastes what you copied. Ctrl+V usually works too in modern windows.
- **Read the error.** A red message nearly always says what is wrong: "not recognised" means a typo or a missing tool, "cannot find path" means a wrong folder or name.

In VS Code, press **Ctrl** and the **backtick key** (left of the 1 on a US keyboard) to open a terminal that starts in your project folder.

```
code .                    open the current folder in VS Code
code C:\dev\ai-automation-portfolio      open that folder in VS Code
```

If `code` is not recognised, use File, then Open Folder in VS Code instead.
cmd: `code .` | opens the current folder in VS Code
cmd: `code C:\dev\ai-automation-portfolio` | opens that folder in VS Code
know: Use Tab to complete a name and Up arrow to repeat a command
know: Stop a running program with Ctrl+C
know: Read a red error message and say what it means
know: Open a terminal inside VS Code and open a folder in VS Code
Q: What do Tab, the Up arrow and Ctrl+C each do?
A: Tab completes a name. Up arrow brings back the previous command. Ctrl+C stops the running program.
Q: PowerShell says a name "is not recognised". What does that usually mean?
A: A typo in the command, or the program isn't installed or not on PATH.
Q: How do you open a terminal in VS Code, and how do you open the current folder in VS Code from the terminal?
A: Press Ctrl and the backtick key in VS Code; from a terminal run `code .`.
