const { handleURL } = require('../utils')
const host = `https://www.zotero.org/${process.env.ZOTERO_USER}/search`

module.exports = {
  command: 'zotero <keyword>',
  builder: {},
  describe: 'Search on Zotero',
  handler: (argv) => {
    const { keyword } = argv
    const url = `${host}/${keyword}/titleCreatorYear`
    handleURL({ url, argv })
  },
}
