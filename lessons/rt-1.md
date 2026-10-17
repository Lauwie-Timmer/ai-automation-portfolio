## topic: GET versus POST and what HTTPS protects | get-post
Where the parameters go and what the method means:

| | GET | POST |
|---|---|---|
| Meaning | read data, change nothing | send data to create or change something |
| Where parameters go | in the **URL** (`?city=Amsterdam`) | in the **body** |
| Seen in browser history and server logs | yes, the whole URL | the URL only, not the body |

**HTTPS** (the `s`) **encrypts the whole request in transit**, for both methods. So POST does **not** "hide" data by itself. A POST body is not hidden from the sender or from the server; it is only kept out of the URL (and so out of history and logs), and **HTTPS** hides it from people on the network.

> Warning: never put an API key or password in a URL query string. Use a header.
know: Say where GET and POST put their parameters and what each means
know: Say what HTTPS encrypts and what a POST body is not hidden from
Q: Where do GET and POST put their parameters, and which one should only read?
A: GET puts them in the URL and should only read; POST puts them in the body and changes something.
Q: Does POST hide the data? What protects it?
A: Not by itself. It isn't hidden from the sender or the server. HTTPS encrypts the whole request for both methods and hides it from people on the network.
Q: Why is a secret in a URL a bad idea?
A: The URL is saved in history and logs. Put secrets in a header.
