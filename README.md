# Command line tools

| cli-tool   | description                          |
| ---------- | ------------------------------------ |
| ekill      | Kill a process as safely as possible |
| ws | Web search
| soffice | Run Open Office
| zt | Create a [Zettel](https://en.wikipedia.org/wiki/Zettelkasten)

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

View ws helps

```sh
ws -h
```

View helps for a command

```sh
ws <command> -h
```

Tips: create aliases for sites

```sh
alias mySite="ws mySite"
```

The config file `.wsrc.js` exports an arbitrary object that you can access from `argv`

