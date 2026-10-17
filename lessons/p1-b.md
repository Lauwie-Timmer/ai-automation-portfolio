## topic: Pagination | pagination
Many APIs don't return everything at once. They return a **page** (say 10 or 100 items) and let you ask for the next one. You loop until a page comes back empty (or there is no "next" pointer).

```python
import requests

page, all_posts = 1, []
while True:
    r = requests.get(
        "https://jsonplaceholder.typicode.com/posts",
        params={"_page": page, "_limit": 10},
        timeout=10,
    )
    r.raise_for_status()
    items = r.json()
    if not items:          # an empty page means we're done
        break
    all_posts.extend(items)
    page += 1
```

The danger is an **infinite loop**: if the stop condition is never met, the script runs forever. Always make sure something changes each round (`page += 1`) and that there is a stop (`break`).
know: Loop through pages until an empty page
Q: What stops a pagination loop, and what danger does it avoid?
A: An empty page (or no next pointer) ends it with `break`. Without a stop the loop runs forever.

## topic: Rate limits and retries | retries
A **429** means *rate limit*: you called too often. Wait and try again, waiting longer each time (**back off**): 1, 2, then 4 seconds.

```python
import time, requests

def get_with_retry(url, tries=3):
    wait = 1
    for attempt in range(tries):
        try:
            r = requests.get(url, timeout=10)
            if r.status_code == 429 or r.status_code >= 500:   # worth retrying
                raise requests.RequestException(f"status {r.status_code}")
            r.raise_for_status()                                # 404 etc.: don't retry
            return r
        except requests.RequestException:
            if attempt == tries - 1:
                raise                                           # out of tries
            time.sleep(wait)
            wait *= 2
```

Retry only what can succeed later: 429 and 5xx, network errors. **Do not retry a 404 or 401**: the request itself is wrong and will fail every time. Wrapping calls in `try/except requests.RequestException` stops one failure from crashing the script.
know: Retry with a growing wait and only for errors that can recover
Q: Which failures are worth retrying and which are not?
A: Worth retrying: 429, 5xx and network errors. Not worth it: 404 or 401, which fail every time.
Q: What does "back off" mean?
A: Waiting longer after each failed attempt (1, 2, 4 seconds).

## topic: Doing it | doing-it
Use the free JSONPlaceholder API: `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10`.

1. Loop through the pages until one is empty and count the posts.
2. Add a retry helper that tries 3 times with a 1, 2, then 4 second wait.
3. Prove it survives a forced failure: run it once with a wrong URL and watch it retry, then raise.

Done when your script gets all pages and survives one forced failure.
know: Write the pagination loop and the retry helper
Q: How do you prove the retry helper works?
A: Force a failure with a wrong URL and watch it retry three times and then raise.
