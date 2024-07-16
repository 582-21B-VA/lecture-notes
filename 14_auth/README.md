# HTTP authentication

[RFC 7235][] defines the HTTP authentication framework, which can be
used by a server to challenge a client request, and by a client to
provide authentication information.

[RFC 7235]: https://datatracker.ietf.org/doc/html/rfc7235

The challenge and response flow works like this:

1.  The server responds to a client with a 401 (Unauthorized) response
    status and provides information on how to authorize with a
    `WWW-Authenticate` response header containing at least one
    challenge.
2.  A client that wants to authenticate itself with the server can then
    do so by including an `Authorization` request header with the
    credentials.
3.  Usually a client will present a password prompt to the user and will
    then issue the request including the correct `Authorization` header.

![Basic authentication diagram](basic-auth.svg)

The general message flow is the same for most (if not all)
authentication schemes. What does change is the information in the
headers and the way it is encoded.

## Sending credentials using curl

When using curl, the `u` option allows us to include an `Authorization`
header in the resquest. The following command, for instance, tells the
server that our username is `john`, and our password is `secret123`.

```sh
curl localhost:8000 -u "john:secret123"
```
