// Null -> Object
// Create a new server object with the addRoute and start methods.
function newServer() {
    let routes = {};

    // String, Function -> Null
    // Add a route with the given path and handler function 
    // to the server.
    function addRoute(path, handler) {
        routes[path] = handler;
    }

    // Request -> Response
    // Route the given request to the appropriate handler function.
    function router(request) {
        const url = new URL(request.url);
        const handler = routes[url.pathname];
        return handler(request);
    }
    
    // Null -> Null
    // Start the server using Deno's serve interface.
    function start() {
        Deno.serve(router);
    }

    return { addRoute, start };
}
