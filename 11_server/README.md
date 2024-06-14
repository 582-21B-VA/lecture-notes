# HTTP server in JavaScript

Most HTTP servers work similarly. They operate not unlike event
listeners in the browser. A server listens at a given address for
incoming requests from clients. Once a request is received, the server
calls a given function, often referred to as a *handler*. As its name
suggests, a handler function handles the request.

## Serve

To start a HTTP server on a given port using Deno, you can use the
`Deno.serve` function. This function takes a handler function that will
be called for each incoming request, and is expected to return a
`Response` object.

```js
function handler(request) {
    return new Response("Hello, World!");
}

Deno.serve(handler);
```

You can launch the server from the command line using `deno run
--allow-net <path-to-file>`. By default, `Deno.serve` listens for
incoming requests at the address "http://localhost:8000/". Once the
server is running, you can open this address in your browser; you should
see "Hello, World!".

## Request

Most servers will not answer with the same response for every request.
Instead they will change their answer depending on various aspects of
the request: the HTTP method, the headers, the path, or the body
contents.

When the handler function is called, a `Request` object is passed as the
first argument. A `Request` object represents a resource request. Here
is an example showing how to extract various parts of the request:

```js
function handler(request) {
    console.log("Method:", request.method);
    console.log("URL:", request.url);
    console.log("Headers:", request.headers);

    return new Response("Hello, World!");
}

Deno.serve(handler);
```

## Response

Most servers also do not respond with "Hello, World!" to every request.
Instead they might respond with different headers, status codes, and
body contents.

Here is an example of returning a response with a 404 status code, a
HTML body, and a custom header:

```js
function handler(request) {
    const options = { 
        status: 404,
        headers: {
            "Content-Type": "text/html"
        }
    }
    return new Response("<h1>Page Not Found</h1>", options);
}

Deno.serve(handler);
```
