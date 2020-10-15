const { execSync } = require('child_process')
const { repos } = require('../../.wsrc')
const { throwError, handleURL, buildURL, match, insertIf } = require('../utils')

const getCurrentBranch = () => {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
}
const actions = [
  'pull',
  'pulls',
  'branch',
  'branches',
  'compare',
  'labels',
  'releases',
  'issues',
  'milestones',
  'contributors',
  'pr',
]
const options = {
  action: {
    description: 'Action name',
    choices: actions,
    alias: 'a',
  },
  user: {
    description: 'Username',
    type: 'string',
    alias: 'u',
  },
  param: {
    description: 'Action parameter',
    type: 'string',
    alias: 'p',
  },
  base: {
    description: 'Base branch',
    type: 'string',
    default: 'develop',
  },
  branch: {
    description: 'Git branch (use for compare)',
    type: 'string',
    alias: 'b',
  },
  server: {
    description: 'Github server',
    type: 'string',
    choices: ['github'],
    demandOption: true,
    default: 'github',
  },
}
const hosts = {
  github: 'https://github.com',
}

module.exports = {
  command: 'gh [repo]',
  builder: (yargs) => {
    return yargs.options(options).completion('completion', (_, argv) => {
      if (argv.action) return actions
      return Object.keys(repos)
    })
  },
  aliases: ['github'],
  describe: 'Open Git repositories in the browser',
  handler: (argv) => {
    const { action, server, param, base, repos } = argv
    const getBranch = () => {
      if (action !== 'compare') return ''
      return argv.branch || getCurrentBranch()
    }
    const actionLink = match(action, {
      pr: 'pull-requests/new',
      contributors: 'graphs/contributors',
      labels: ['labels', ...insertIf(param, param)].join('/'),
      pull: `pull/${param}`,
      branch: `tree/${param}`,
      compare: `compare/${base}...${getBranch()}`,
      _: '',
    })
    const repo = repos[argv.repo]

    if (argv.repo && !repo) {
      throwError(`Repo alias ${argv.repo} is invalid`)
    }

    const url = buildURL([
      hosts[server],
      argv.repo ? repo.user : argv.user,
      ...insertIf(argv.repo, repo.name),
      actionLink,
    ])
    handleURL({ argv, url })
  },
}
