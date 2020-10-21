const open = require('open')
const { execSync } = require('child_process')
const match = require('match-values').default
const insertIf = require('insert-if').default

const throwError = (message, value, suggestionList) => {
  console.error(
    `${colors.FgRed}%s${colors.FgBlue}%s${colors.Reset}`,
    'Error: ',
    message
  )
  if (value && suggestionList) {
    const list = suggestionList.reduce((acc, v) => {
      if (v.includes(value)) return acc.concat(v)
      return acc
    }, [])
    if (list.lenngth) {
      console.info(
        `${colors.FgYellow}%s${colors.Reset}`,
        'Suggestions:',
        list.join(', ')
      )
    }
  }
  process.exit(-1)
}
const checkRequired = (argv, options) => {
  Object.keys(options).forEach((k) => {
    const v = argv[k]
    const { requiredFor } = options[k]
    if (!requiredFor) return
    const { name, values } = requiredFor
    if (!values.includes(argv[name])) return
    if (v) return
    throwError(`${k} is missing`)
  })
}
const colors = {
  Reset: '\x1b[0m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
}
const getBrowserApp = (browser) =>
  match(browser, {
    chrome: 'google chrome',
    brave: '/Users/P794744/bin/Brave Browser.app',
    _: browser,
  })
const openInBrowser = (link, browser = 'chrome') => {
  open(link, { app: getBrowserApp(browser) })
  process.exit(0)
}
const buildURL = (items) => {
  return items.join('/')
}
const handleURL = (options) => {
  const { url, argv } = options

  if (argv.verbose) {
    console.info({ argv, url })
  }

  if (argv.copy) {
    execSync(`echo ${url} | pbcopy`)
    console.info('Copied the URL to the clipboard')
  }

  if (argv.browser) {
    openInBrowser(url, argv.browser)
  } else {
    openInBrowser(url)
  }
}

module.exports = {
  match,
  insertIf,
  openInBrowser,
  buildURL,
  checkRequired,
  colors,
  throwError,
  handleURL,
}
