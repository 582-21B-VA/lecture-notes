# Database interface

Most programming languages include an interface for connecting to
databases as part of their standard library. Unfortunately, it is not
the case with JavaScript. We must use a third-party library.
Fortunately, doing so with Deno is fairly straightforward.

## Importing the SQLite module

JavaScript allows you to import identifiers from other source files (called
modules) using the *import* declaration. For instance, the code below
inserts `DB` into the current scope.

```js
import { DB } from "https://deno.land/x/sqlite/mod.ts";
```

The string after the `from` keyword is a local path or a URL to a
JavaScript module where `DB` is defined.

Once an identifier has been successfully imported, you can use it in
your program like any other identifier.

## Creating a database handle

To run queries using JavaScript, you first need to create a *handle*
using the `DB` constructor. `DB` works similarly to the built-in `Date`
and `Response` constructors; you call it with arguments and it returns
an object that represents the database.

```js
const db = new DB("path/to/database.sqlite");
```

If an SQLite database is not found at the given path, a new one is
created for you.

## Making queries

All the methods available on objects of type `DB` are documented
[here][DB doc]. In this course, we will only use two of them.

[DB doc]: https://deno.land/x/sqlite@v3.8/mod.ts?s=DB

### Execute

The `execute` method runs multiple semicolon-separated statements from a
single string. This method cannot bind any query parameters (more on
those below), and any result rows are discarded. It should only be used
for initializing a database.

```js
const db = new DB("db.sqlite");
db.execute(`
  CREATE TABLE People (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age REAL,
    city TEXT
  );
  INSERT INTO People (name, age, city) VALUES ('Peter Parker', 21, 'NYC');
  INSERT INTO People (name, age, city) VALUES ('Midoriya Izuku', 16, 'Tokyo');
`);
```

### queryEntries

The `queryEntries` method queries the database and returns all matching
rows. Each row is returned as an object containing key-value pairs.

```js
const rows = db.queryEntries("SELECT * FROM People");
// [
//     { id: 1, name: "Peter Parker", age: 21, city: "NYC" },
//     { id: 2, name: "Midoriya Izuku", age: 16, city: "Tokyo" }
// ]
```

User-provided values should always be passed to the database through
*query parameters* (`?`), and not using string concatenation or template
literals.

```js
db.queryEntries(
    "INSERT INTO People (name, age, city) VALUES (?, ?, ?)",
    ["Wonder Woman", 90, "Amazonia"]
)
```
