const { handleURL } = require('../utils')

const options = {
  name: {
    description: 'Page name',
    type: 'string',
    alias: 'n',
  },
  keyword: {
    description: 'Keyword',
    type: 'string',
    alias: 'k',
  },
  id: {
    description: 'Page ID',
    type: 'string',
    alias: 'i',
  },
}
const host = process.env.CFE_HOST

module.exports = {
  command: 'confluence [name] [id] [keyword]',
  aliases: ['cfe'],
  builder: options,
  describe: 'Open Confluence pages',
  handler: (argv) => {
    const { name, keyword, page } = argv
    const getURL = () => {
      if (page) {
        return `${host}/pages/viewpage.action?pageId=${page}`
      }

      if (keyword) {
        return `${host}/dosearchsite.action?cql=siteSearch+~+"${keyword}"&queryString=${keyword}`
      }

      return `${host}/display/GETEM/${name}`
    }
    handleURL({ url: getURL(), argv })
  },
}
