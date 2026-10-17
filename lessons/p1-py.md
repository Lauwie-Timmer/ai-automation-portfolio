## topic: How this step works | how-it-works
You have used Python before, so we don't start from zero. First you find what is rusty, then you practise only that. This is not a course: it is the **eight skills** the rest of this roadmap leans on.

1. Variables and types
2. Functions
3. Loops, conditions and list comprehensions
4. f-strings
5. Reading and writing files
6. The `json` module
7. Exceptions (`try/except`)
8. Imports, pip and modules

Start by running the "Find my level" prompt on the dashboard. Claude asks diagnostic questions and tells you which skills need work. Then write the six exercises yourself, **without AI-written code**, and struggle for 15 minutes on each before asking for help.

Run a script from the repo folder with your venv active: `python name.py`.
know: Name the eight skills
Q: Name the eight Python skills this roadmap relies on.
A: Variables and types, functions, loops/conditions/comprehensions, f-strings, files, the json module, try/except, imports and pip.

## topic: Variables and types | types
A **variable** is a name for a value. Python figures out the type itself.

```python
name = "Anna"            # str    text
age = 31                 # int    whole number
height = 1.72            # float  decimal number
paid = True              # bool   True or False
tags = ["a", "b"]        # list   ordered, can change
person = {"name": "Anna", "age": 31}   # dict   key -> value
point = (52.37, 4.89)    # tuple  ordered, cannot change
```

Useful: `type(x)` tells you what something is; `len(x)` its length. Get a dict value with `person["name"]` (error if missing) or `person.get("name")` (gives `None` if missing). List positions start at **0**: `tags[0]` is `"a"`.

A common mistake: `"5" + 3` fails because `"5"` is text. Convert with `int("5")` or `str(3)`.
know: Use str, int, float, bool, list, dict and tuple
know: Index lists from 0 and read dict values safely
Q: What is the difference between `person["x"]` and `person.get("x")` when `x` is missing?
A: `person["x"]` raises a KeyError; `person.get("x")` returns None.
Q: What is `tags[0]` and what does `type(age)` print?
A: The first item, `"a"`; and `<class 'int'>`.

## topic: Functions | functions
A **function** is a reusable block with a name. It takes **parameters** and gives back a value with `return`.

```python
def average(numbers):
    return sum(numbers) / len(numbers)

print(average([2, 4, 6]))    # 4.0
```

Without `return` a function gives back `None`. `print` shows something on screen; `return` hands a value back to the caller. They are different.

A parameter can have a **default**: `def greet(name, greeting="Hello"):`.
know: Write a function with parameters and a return value
know: Say the difference between print and return
Q: What is the difference between `print` and `return`?
A: `print` shows text on screen. `return` gives a value back to the code that called the function.
Q: What does a function return if it has no `return`?
A: `None`.

## topic: Loops, conditions and comprehensions | loops
```python
for person in people:           # repeat for each item
    print(person["name"])

if age >= 18:
    print("adult")
elif age >= 13:
    print("teen")
else:
    print("child")

while count < 3:                # repeat while true
    count += 1
```

A **list comprehension** builds a list in one line:

```python
squares = [n * n for n in range(1, 21) if n % 2 == 0]   # squares of even numbers 1..20
```

Read it as: "n times n, for each n in 1..20, if n is even". `range(1, 21)` gives 1 to 20 (the end is excluded). `%` is the remainder: `n % 2 == 0` means even. Indentation (4 spaces) decides what belongs inside the loop or the `if`.
know: Write for and while loops and if/elif/else
know: Write a list comprehension with a condition
Q: What does `range(1, 21)` produce?
A: The numbers 1 to 20 (the end, 21, is excluded).
Q: Write a comprehension for the squares of the even numbers from 1 to 20.
A: `[n * n for n in range(1, 21) if n % 2 == 0]`

## topic: f-strings | f-strings
An **f-string** puts values inside text. Put `f` before the quote and use `{}`:

```python
name, age = "Anna", 31
print(f"{name} is {age} years old")        # Anna is 31 years old
print(f"{3.14159:.2f}")                    # 3.14  (2 decimals)
print(f"{name:<10}|{age:>5}")              # left-align in 10, right-align in 5
```

`<` left-aligns, `>` right-aligns, a number is the width. This is how you print a neat table with aligned columns.
know: Use f-strings with decimals and aligned columns
Q: How do you print `3.14159` with two decimals in an f-string?
A: `f"{3.14159:.2f}"` gives `3.14`.
Q: How do you left-align a name in 10 characters?
A: `f"{name:<10}"`

## topic: Files and the json module | files-json
Always open files with `with`, which closes the file for you:

```python
with open("people.json", "r", encoding="utf-8") as f:
    people = json.load(f)              # file -> Python list/dict

with open("sorted.json", "w", encoding="utf-8") as f:
    json.dump(sorted_people, f, indent=2)    # Python -> file
```

`"r"` reads, `"w"` writes (and **overwrites**). The `json` module (`import json`) has four functions: `json.load(file)` and `json.dump(data, file)` work with files; `json.loads(text)` and `json.dumps(data)` work with text strings (the `s` is for string).

To sort a list of dicts by a key: `sorted(people, key=lambda p: p["age"])`.

Debug habit: `print(json.dumps(data, indent=2))` shows the shape of nested data neatly.
know: Read and write a JSON file with with open
know: Tell json.load from json.loads
Q: What is the difference between `json.load` and `json.loads`?
A: `load` reads from a file; `loads` reads from a string (the `s` is for string).
Q: Why use `with open(...)`?
A: It closes the file automatically, even if an error happens.
Q: What does opening a file with "w" do to an existing file?
A: It overwrites it.

## topic: Exceptions and reading errors | exceptions
An **exception** is Python's way of saying something went wrong. Catch it with `try/except` so the script doesn't crash:

```python
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "cannot divide by zero"
    except TypeError:
        return "numbers only"
```

Catch **specific** exceptions, not everything. A bare `except:` hides real bugs.

**Reading an error:** Python prints the path the program took (the traceback). The **last line** says what went wrong; the line above it says where. Read from the bottom up.

```
Traceback (most recent call last):
  File "a.py", line 3, in <module>
    print(5 / 0)
ZeroDivisionError: division by zero
```
know: Handle errors with try/except for specific exceptions
know: Read a traceback from the bottom
Q: Which part of a Python traceback do you read first?
A: The last line: it names the error and the line above says where.
Q: Why catch a specific exception instead of a bare `except:`?
A: A bare except hides real bugs. Specific ones only handle the problem I expect.

## topic: Imports, pip and modules | imports
A **module** is a Python file or package you can reuse. `import json` loads one. `from dotenv import load_dotenv` loads one name from a module.

Packages from the internet come from **pip** (inside your venv): `python -m pip install requests`. Your own file `helpers.py` can be imported as `import helpers` if it sits in the same folder. Don't name your file the same as a module you import (a file called `json.py` or `requests.py` breaks `import json`).
know: Import a standard module and an installed package
Q: Why must you not name your own script `requests.py`?
A: `import requests` would load my file instead of the package, and break.

## topic: The six exercises | exercises
Write each in `C:\dev\automation-portfolio\00-python`, one file each, no AI-written code:

1. `word_count(text)` returns a dict of word to count.
2. A JSON file with a list of 5 people (name, age); read it and print the average age.
3. Write that list to a new file, sorted by age.
4. A function that divides two numbers and handles division by zero and non-numeric input with try/except.
5. A list comprehension for the squares of the even numbers from 1 to 20.
6. An f-string table of names and ages with aligned columns.

Then run the "Check my exercises" prompt. You are done when all six work and you can explain every line.
know: Write all six exercises and explain every line
Q: Which exercise uses `json.load`, and which uses `json.dump`?
A: Exercise 2 reads with `json.load`; exercise 3 writes with `json.dump`.
Q: What would `word_count("a b a")` return?
A: `{"a": 2, "b": 1}`
