# Command line tools

| cli-tool   | description                          |
| ---------- | ------------------------------------ |
| ekill      | Kill a process as safely as possible |
| ws | Web search

## Setup

Add this directory to \$PATH so you can run these tools from everywhere

```sh
echo 'export PATH="/path/to/cli-tools/bin:$PATH"' >> ~/.bashrc
```

## Usage
### ekill

```sh
ekill <pid>
```

### ws

View command helps

```sh
ws -h
```

View command helps for a site

```sh
ws -s <site> -h
```

Tips: create [aliases](./alias.sh) for sites

## Config file

Ref [.wsrc.js](./.wsrc.js)
