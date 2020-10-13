const { execSync } = require('child_process')
const { handleURL, buildURL, match, insertIf } = require('../utils')

const getCurrentBranch = () => {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
}
const builder = {
  action: {
    description: 'Action name',
    choices: [
      'pull',
      'pulls',
      'branch',
      'branches',
      'compare',
      'free',
      'filepath',
      'labels',
      'releases',
      'issues',
      'milestones',
      'contributors',
      'new-pr',
      'open',
    ],
    demandOption: true,
    alias: 'a',
    default: 'open',
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
  path: {
    description: 'File path',
    type: 'string',
    default: 'README.md',
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
  command: 'gt <repo>',
  builder,
  aliases: ['gh', 'github', 'git'],
  describe: 'Open Git repositories in the browser',
  handler: (argv) => {
    const { action, server, param, base, filepath, repos } = argv
    const getBranch = () => {
      if (action !== 'compare') return ''
      return argv.branch || getCurrentBranch()
    }
    const actionLink = match(action, {
      'new-pr': 'pull-requests/new',
      contributors: 'graphs/contributors',
      filepath: `blob/${base}/${filepath}`,
      labels: ['labels', ...insertIf(param, param)].join('/'),
      open: '',
      pull: `pull/${param}`,
      branch: `tree/${param}`,
      compare: `compare/${base}...${getBranch()}`,
      free: param,
      _: action,
    })
    const repo = repos[argv.repo]
    const url = buildURL([
      hosts[server],
      ...insertIf(action !== 'free', repo.user, repo.name),
      actionLink,
    ])
    handleURL({ argv, url })
  },
}
