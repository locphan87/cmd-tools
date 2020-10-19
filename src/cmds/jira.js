const { handleURL } = require('../utils')
const host = process.env.JIRA_HOST

module.exports = {
  command: 'jira <ticket> [project]',
  builder: {},
  describe: 'Open JIRA tickets',
  handler: (argv) => {
    const { project, ticket } = argv
    const url = `${host}/${project}-${ticket}`
    handleURL({ url, argv })
  },
}
