export default function Router() {
    let routes = {};

    this.addRoute = function (path, handler) {
        routes[path] = handler;
    }

    async function router(request) {
        const url = new URL(request.url);
        const handler = routes[url.pathname];
        if (!handler) {
            return new Response("Not Found", { status: 404 });
        }
        let data = null;
        if (request.method === "POST") {
            const formData = await request.formData(); 
            data = Object.fromEntries(formData.entries());
        }
        return handler(request, data);
    }

    this.start = function () {
        Deno.serve(router);
    }
}
