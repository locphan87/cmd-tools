const yargs = require('yargs')

const config = require('../.wsrc')

const run = () => {
  yargs
    .usage(`Web search \n\nUsage: $0 [options]`)
    .config(config)
    .commandDir('cmds')
    .demandCommand()
    .options({
      verbose: {
        description: 'verbose mode',
        type: 'boolean',
        default: false,
        alias: 'v',
      },
      copy: {
        description: 'Copy the URL to the clipboard',
        type: 'boolean',
        default: false,
        alias: 'c',
      },
      browser: {
        description: 'Browser',
        choices: ['chrome', 'safari', 'brave', 'firefox'],
        default: 'chrome',
        alias: 'x',
      },
    })
    .help('help')
    .alias('help', 'h')
    .version(false).argv
}

module.exports = run
