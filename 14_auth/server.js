import Router from "./router.js";

const router = new Router();
router.addRoute("/secret", secretHandler);
router.start();

// Request -> Response
// Handle requests to /secret route.
function secretHandler(request) {
    const credentials = parseCredentials(request);
    const user = credentials && authenticate(credentials);
    if (!user) {
        return new Response ("Please log in", {
            status: 401,
            headers: {
                "WWW-Authenticate": "Basic"
            }
        });
    }
    return new Response("You can know the secret");
}

// String -> Object | Null
// Return the user matching the credentials if there is one.
function authenticate(credentials) {
    const users = [
        { username: "john", password: "secret123" },
    ];
    for (const user of users) {
        const isUser = credentials.username === user.username;
        const hasCorrectPassword = credentials.password === user.password;
        if (isUser && hasCorrectPassword) return user;
    }
}

// Request -> Object | Null
// Return the username and password from the authorization header 
// if there is one.
function parseCredentials(request) {
    const auth = request.headers.get("authorization");
    if (!auth) return;

    const encodedCreds = auth.split(" ")[1];
    const decodedCreds = atob(encodedCreds);
    const [username, password] = decodedCreds.split(":");

    return { username, password };
}
