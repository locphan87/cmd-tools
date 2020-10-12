const { handleURL } = require('../utils')
const { bookmarks } = require('../../.wsrc')

module.exports = {
  command: 'bookmark <alias>',
  builder: (yargs) => {
    return yargs.positional('alias', {
      choices: Object.keys(bookmarks),
    })
  },
  aliases: ['fav'],
  describe: 'Open web sites in your bookmarks',
  handler: (argv) => {
    const { alias } = argv
    const url = bookmarks[alias]
    handleURL({ argv, url })
  },
}
