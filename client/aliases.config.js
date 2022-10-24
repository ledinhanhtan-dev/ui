const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

const aliases = {
  '@pages': './pages',
  '@layouts': './layouts',
  '@components': './components',
  '@directives': './directives',
  '@styles': './styles',
  '@assets': './assets',
  '@utils': './utils',
  '@store': './store',
  '@plugins': './plugins',
  '@modules': './modules',
  '@api': './api',
  '@const': './constant',
  '@composables': './composables',
  '@mixins': './mixins',
  '@services': './services',
  '@': '.'
  // override element ui
  // 'element-ui/lib/utils/clickoutside': './directives/clickoutside.js',
  // 'element-ui/lib/utils/vue-popper': './services/vue-popper.js',
}

module.exports = {
  webpack: {},
  jsconfig: {}
}

function resolveSrc (_path) {
  return path.resolve(__dirname, _path)
}

for (const alias in aliases) {
  const aliasTo = aliases[alias]
  if (alias !== '@') {
    module.exports.webpack[alias] = resolveSrc(aliasTo)
  }

  if (/\.js$/.test(aliasTo)) {
    module.exports.jsconfig[alias] = [aliasTo]
  }

  module.exports.jsconfig[alias] = aliasTo.includes('/index.')
    ? [aliasTo]
    : [
        aliasTo + '/index.js',
        aliasTo + '/index.json',
        aliasTo + '/index.vue',
        aliasTo + '/index.scss',
        aliasTo + '/index.css'
      ]
  module.exports.jsconfig[alias + '/*'] = [aliasTo + '/*']
}

const jsconfigTemplate = require('./jsconfig.template.js') || {}
const dirs = ['../', './']

for (const dir in dirs) {
  const baseUrl = dir === '../' ? './client' : '.'
  fs.writeFileSync(
    path.resolve(__dirname, `${dir}jsconfig.json`),
    prettier.format(
      JSON.stringify({
        ...jsconfigTemplate,
        include: [`${baseUrl}/**/*`],
        compilerOptions: {
          ...jsconfigTemplate.compilerOptions,
          baseUrl,
          paths: module.exports.jsconfig
        }
      }),
      {
        ...require('./.prettierrc'),
        parser: 'json'
      }
    ),
    (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('Error while creating jsconfig.json from aliases.config.js')
        throw error
      }
    }
  )
}
