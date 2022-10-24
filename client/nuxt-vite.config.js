import { config as dotEnvConfig } from 'dotenv'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import viteRequiredContext from '@originjs/vite-plugin-require-context'
import vueJsx from '@vitejs/plugin-vue-jsx'

dotEnvConfig({
  path: require('find-config')('config.env')
})

// const appConfig = require('./app.config')

export default {
  bridge: {
    vite: true,
    // app: false,
    capi: false,
    import: false
  },
  alias: {
    https: 'node:https',
    dotprop: 'lodash/get',
    'lodash.mergewith': 'lodash/mergeWith'
  },
  vite: {
    define: {
      // 'process.env.GOOGLE_MAP_API_KEY': `'${process.env.GOOGLE_MAP_API_KEY || ''}'`,
      // 'process.env.SENTRY_JS_DNS': `'${process.env.SENTRY_JS_DNS || ''}'`,
      // 'process.env.PT_LICENSE_KEY': `'${process.env.PT_LICENSE_KEY_2023 || ''}'`
      // 'process.env.availableLanguages': appConfig.availableLanguages
      /* widget env */
      // 'process.env.publicPath': `'${appConfig.publicBase}'`,
      // 'process.env.apiURL': `'${appConfig.apiURL}/api'`,
      // 'process.env.defaultLanguage': `'${appConfig.defaultLanguage}'`,
      // 'process.env.dev': appConfig.isDev
    },
    plugins: [
      viteCommonjs({
        skipPreBuild: true,
        exclude: []
      }),
      viteRequiredContext(),
      vueJsx()
    ],
    ssr: {
      noExternal: ['moment']
    },
    server: process.env.FORCE_SSL
      ? {
          https: true,
          hmr: {
            protocol: 'wss',
            host: 'localhost'
          }
        }
      : {},
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "sass:math;
          @import "@assets/styles/_variables.scss;
          @import "@assets/styles/_mixins.scss;
          @import "@assets/styles/_functions.scss;
        `
        }
      }
    }
  },
  fetch: {
    server: false,
    client: false
  },
  buildDir: '.nuxt',
  globalName: 'nuxt',
  globals: {
    id: () => '__nuxt',
    context: () => '__NUXT__',
    nuxt: () => '$olivia',
    readyCallback: () => 'onOliviaReady'
  },
  render: {
    bundleRenderer: {
      runInNewContext: null
    }
  }
}
