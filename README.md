video-rippers
=============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/video-rippers.svg)](https://npmjs.org/package/video-rippers)
[![Downloads/week](https://img.shields.io/npm/dw/video-rippers.svg)](https://npmjs.org/package/video-rippers)
[![License](https://img.shields.io/npm/l/video-rippers.svg)](https://github.com/mjohnsey/video-rippers/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @mjohnsey/video-rippers
$ video-rippers COMMAND
running command...
$ video-rippers (-v|--version|version)
@mjohnsey/video-rippers/0.0.1 darwin-x64 node-v14.13.1
$ video-rippers --help [COMMAND]
USAGE
  $ video-rippers COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`video-rippers handbrake INPUT OUTPUT [PRESET]`](#video-rippers-handbrake-input-output-preset)
* [`video-rippers help [COMMAND]`](#video-rippers-help-command)
* [`video-rippers makemkv`](#video-rippers-makemkv)
* [`video-rippers server`](#video-rippers-server)

## `video-rippers handbrake INPUT OUTPUT [PRESET]`

describe the command here

```
USAGE
  $ video-rippers handbrake INPUT OUTPUT [PRESET]

ARGUMENTS
  INPUT   input file
  OUTPUT  output file
  PRESET  [default: Fast 1080p30] HandbrakeCLI preset to use

EXAMPLE
  $ video-rippers server
```

_See code: [src/commands/handbrake.ts](https://github.com/mjohnsey/video-rippers/blob/v0.0.1/src/commands/handbrake.ts)_

## `video-rippers help [COMMAND]`

display help for video-rippers

```
USAGE
  $ video-rippers help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `video-rippers makemkv`

describe the command here

```
USAGE
  $ video-rippers makemkv

EXAMPLE
  $ video-rippers server
```

_See code: [src/commands/makemkv.ts](https://github.com/mjohnsey/video-rippers/blob/v0.0.1/src/commands/makemkv.ts)_

## `video-rippers server`

describe the command here

```
USAGE
  $ video-rippers server

EXAMPLE
  $ video-rippers server
```

_See code: [src/commands/server.ts](https://github.com/mjohnsey/video-rippers/blob/v0.0.1/src/commands/server.ts)_
<!-- commandsstop -->
