# mror

Mirror your repository to an empty repository without history, included with all branches.

## IMPORTANT NOTE

**Use git-mror wisely!** This is not an good practice to handle your repository.

## Table of Content

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
- [Development](#development)
  - [Troubleshooting](./TROUBLESHOOTING.md)
  <!-- tocstop -->

## Usage

<!-- usage -->

```sh-session
$ npm install -g git-mror
$ mror COMMAND
running command...
$ mror (--version)
git-mror/0.0.0 win32-x64 node-v16.13.1
$ mror --help [COMMAND]
USAGE
  $ mror COMMAND
...
```

<!-- usagestop -->

## Commands

<!-- commands -->

### `mror it`

```sh-session
  $ mror it -s <value> -d <value> [-w <value>]
```

#### Flags

| Short | Long               | Required | Description                                            |
| ----- | ------------------ | :------: | ------------------------------------------------------ |
| -d    | --destination      |    ✔️    | Destination repository                                 |
| -s    | --source           |    ✔️    | Source repository                                      |
| -w    | --workingdirectory |    ✖️    | Custom working directory. Default: System temp folder. |

<!-- commandstop -->

## Development

This project is based on [oclif](https://oclif.io/) from [Salesforce](https://developer.salesforce.com/home)

<!-- development -->

1. Checkout Repository
2. Run `npm install`
3. Run `./bin/dev --help`
<!-- developmentstop -->

### [Troubleshooting](./TROUBLESHOOTING.md)
