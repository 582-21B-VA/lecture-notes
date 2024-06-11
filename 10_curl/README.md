# Curl

curl is a command line tool for transferring data from or to a server
using URLs. It works similarly to a browser. Given a URLs, it sends an
HTTP request, and displays the response. Contrary to a browser, curl
does not parse the response's body (e.g., it will not show a webpage,
but its underlying HTML).  

```
$ curl examplecat.com
<!doctype html>
<html>
<head>
    ...    
</head>

<body bgcolor="#f3f3f3">
<div>
    <h1>Example Cat</h1>
    <p>This domain is established to be used as an example of cats on
    the internet. You may use this domain in examples without prior
    coordination or asking for permission.</p>

    <p>The cat is at <a href="/cat.png">/cat.png</a>.

    <a href="/cat.png"><img src="/cat.png"></a>

</div>
</body>
</html>
```

curl is a great tool to learn HTTP as it shows messages between client
and server in plain text format. Furthermore, you can see a message's
status line and headers with the `-v` (verbose) option.

```
$ curl -v examplecat.com/cat.png
*   Trying 208.94.117.43:80...
* Connected to examplecat.com (208.94.117.43) port 80
> GET /cat.png HTTP/1.1
> Host: examplecat.com
> User-Agent: curl/8.4.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Mon, 10 Jun 2024 14:58:11 GMT
< Server: Apache
< Last-Modified: Tue, 05 Apr 2022 23:29:23 GMT
< ETag: "ce56-5dbf09d6b1f25"
< Accept-Ranges: bytes
< Content-Length: 52822
< Content-Type: image/png
< Via: e14
<
...
```
