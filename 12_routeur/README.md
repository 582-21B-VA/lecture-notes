# Router

![Operator](https://www.northcountrypublicradio.org/news/images/20170531-OldForge-28edited.jpg)

The mechanism by which different HTTP requests are mapped to specific
responses is called *routing*. According to this terminology, each
*route* corresponds to a different endpoint clients can interact with. A
route specifies the criteria for a request to be routed to a handler
function: the request's path, its method, its headers, etc. The function
responsible for the routing is called a *router*.

At its most basic, a router should be able to register new routes, and
match incoming requests to specific routes.

## Creating the server

First, let's create the function that will contain the server's
logic.

```js
function newServer() {
    function start() {
        Deno.serve(router)
    }

    return { start };
}
```

For now, `newServer` returns an object with a single method: `start`. To
create a new server object, we call `newServer` and assign its return
value to a variable.

```js
const server = newServer();
server.start();
```

As you might guess, the `start` method starts the server. Deno's builtin
`serve` method is used to listen to incoming requests. When a request is
received, the `router` function is called. The `router` function is
currently undefined, so executing the program in its current state will
result in an error. Do not worry, we will define it below.

## Adding routes

We will assume our server only responds to GET requests, and route
requests only according to their path. Thus, to add new routes will
require two things: the route's path, and the handler function to call
when a request matches that path. Having a different handler for each
path will make the source code better organized. To make it easy to
retrieve handler functions, routes will be stored as key-value pairs in
an object. Each key will be a path; each value its corresponding handler
function.

```
{
    "/": homeHandler,
    "/about": aboutHandler,
    "/books": booksHandler,
    ...
}
```

Inside the `newServer` function we defined previously, let's create the
`routes` object as well as the `addRoute` function that will allow us to
add routes. In order to be able to call `addRoute` from outside
`newServer`, we also need to add it as a method of the server object
returned by `newServer`.

```js
function newServer() {
    const routes = {};                  // +

    function start() {
        Deno.serve(router);
    }

    function addRoute(path, handler) {  // +
        routes[path] = handler;         // +
    }                                   // +

    return { start, addRoute };         // +
}
```

We can now call `addRoute` to add new routes to the server.

```js
const server = newServer();

function homeHandler(request) {           // +
    return new Response("Homepage");      // +
}                                         // +
                                          // +
function aboutHandler(request) {          // +
    return new Response("About");         // +
}                                         // +
                                          // +
server.addRoute("/", homeHandler);        // +
server.addRoute("/about", aboutHandler);  // +

server.start();
```

You will notice that routes are always added *before* starting the
server.

## Matching routes

Now that we have a list of routes, what is left is to match incoming
requests to the correct route, and call the handler fonction specified
by that route. Remember that routes are key-value pairs, the key being
the route's path, and the value being the handler function responsible
for responding to the request. Thus, to match a request to a specific 
route, we only need to find the request's path. Once we have the
request's path, we can use it to retrieve the appropriate handler
function from the `routes` object.

```js
function newServer() {
    const routes = {};

    function addRoute(method, path, handler) {
        routes[path] = handler;
    }

    function router(request) {                // +
        const url = new URL(request.url);     // +
        const handler = routes[url.pathnme];  // +
        return handler(request);              // +
    }                                         // +

    function start() {
        Deno.serve(router);
    }

    return { addRoute, start };
}
```

Deno's `serve` method expects at least one argument: the name of the
function to be called when a request is received. [Previously][], a
single handler function was responsible for responding to all requests.
Technically, it is still the case. However, that fonction is now a
router, whose sole purpose is to match the request to the appropriate
handler.

[Previously]:
https://github.com/582-21B-VA/lecture-notes/tree/main/11_server#serve
