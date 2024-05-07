# SQLite

The SGBD used for this course is [SQLite]. Unlike most other SQL
databases, SQLite does not have a separate server process. It reads
and writes directly to ordinary disk files.

[SQLite]: https://sqlite.org/index.html

## Installation

To install SQLite, it is recommended you use your package manager
(i.e., Homebrew on Mac, or Scoop on Windows):

```sh
[brew|scoop] install sqlite
```

## Usage

Once installed, SQLite's command line interface can be invoked using the
command `sqlite3`. You will find its documentation [here][sqlite3 doc].

[sqlite3 doc]: https://sqlite.org/cli.html
