const { execSync } = require('child_process')
const {
  throwError,
  handleURL,
  buildURL,
  match,
  insertIf,
  getConfigs,
} = require('../utils')

const { repos } = getConfigs('ws')
const getCurrentBranch = () => {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
}
const actions = [
  'pull',
  'search',
  'branch',
  'releases',
  'contributors',
  'pr',
  'compare',
  'label',
  'commit',
  'open',
  // default actions as github
  'settings',
  'milestones',
  'pulls',
  'labels',
  'tags',
  'issues',
  'wiki',
  'actions',
  'branches',
]
const options = {
  action: {
    description: 'Action name',
    choices: actions,
    alias: 'a',
    default: 'open',
  },
  user: {
    description: 'Username',
    type: 'string',
    alias: 'u',
  },
  name: {
    description: 'Repo name',
    type: 'string',
    alias: 'n',
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
    choices: ['github', 'n'],
    demandOption: true,
    default: 'github',
  },
}
const hosts = {
  github: 'https://github.com',
  n: process.env.GIT_N_HOST,
}

module.exports = {
  command: 'gh [repo]',
  builder: (yargs) => {
    return yargs.options(options).completion('completion', (_, argv) => {
      if (argv.action !== 'open') return actions
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
      search: `search?q=${param}`,
      commit: `commit/${param}`,
      contributors: 'graphs/contributors',
      label: ['labels', ...insertIf(param, param)].join('/'),
      pull: `pull/${param}`,
      open: '',
      branch: `tree/${param}`,
      compare: `compare/${base}...${getBranch()}`,
      _: action,
    })
    const { user = argv.user, name = argv.name } = repos[argv.repo] || {}

    if (argv.repo && !user) {
      throwError(
        `Repo alias "${argv.repo}" is invalid`,
        argv.repo,
        Object.keys(repos)
      )
    }

    const url = buildURL([
      hosts[server],
      user,
      ...insertIf(name, name),
      actionLink,
    ])
    handleURL({ argv, url })
  },
}
