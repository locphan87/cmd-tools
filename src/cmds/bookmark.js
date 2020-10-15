const { handleURL, throwError } = require('../utils')
const { bookmarks } = require('../../.wsrc')

module.exports = {
  command: 'bookmark <alias>',
  aliases: ['fav'],
  describe: 'Open web sites in your bookmarks',
  builder: (yargs) => {
    return yargs.completion('completion', () => {
      return Object.keys(bookmarks)
    })
  },
  handler: (argv) => {
    const { alias, bookmarks } = argv
    const url = bookmarks[alias]
    if (!url) {
      throwError(`Invalid alias ${alias}`)
    }
    handleURL({ argv, url })
  },
}
