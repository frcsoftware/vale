# vale

This package basically downloads the matching version of the [vale](https://github.com/errata-ai/vale) binary for your system (if necessary) and runs it.

## Installation

```bash
npm i -D @vvago/vale
```

## Usage

```bash
npx vale
```

## Why

Because the ones who know, know.

## Advanced

If you need to use a different binary than the pre-installed one (ie: the package doesn't support your system), you can specify a custom one like so:

```bash
VALE_BIN="/path/to/vale" npx vale
```