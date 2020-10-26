const { handleURL, throwError, getConfigs } = require('../utils')

const { bookmarks, bookmarkConfig } = getConfigs('ws')
const getBookmarksFromTag = (tag) => {
  return Object.keys(bookmarkConfig).reduce((acc, k) => {
    const [_name, _url, tags] = bookmarkConfig[k] // eslint-disable-line
    if (tags.includes(`#${tag}`)) return acc.concat(k)
    return acc
  }, [])
}
const getTags = () => {
  return Object.keys(bookmarkConfig).reduce((acc, k) => {
    const [_, __, tags] = bookmarkConfig[k] // eslint-disable-line

    const tagList = tags.replace(/#/g, '').split(',')
    return acc.concat(tagList)
  }, [])
}

module.exports = {
  command: 'bookmark <alias>',
  aliases: ['fav'],
  describe: 'Open web sites in your bookmarks',
  builder: (yargs) => {
    return yargs
      .options({
        tag: {
          description: 'Find a tag',
          alias: 't',
          type: 'string',
        },
        tags: {
          description: 'Find all tags',
          type: 'boolean',
        },
      })
      .completion('completion', (_, argv) => {
        if (argv.tag) return getBookmarksFromTag(argv.tag)
        if (argv.tags) return getTags()
        return Object.keys(bookmarks)
      })
  },
  handler: (argv) => {
    const { alias, bookmarks } = argv
    const url = bookmarks[alias]
    if (!url) {
      throwError(`Invalid alias "${alias}"`, alias, Object.keys(bookmarks))
    }
    handleURL({ argv, url })
  },
}
