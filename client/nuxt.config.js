import { defineNuxtConfig } from '@nuxt/bridge'
import merge from 'lodash/merge'
// import viteConfig from './nuxt-vite.config'

import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import viteRequiredContext from '@originjs/vite-plugin-require-context'
import vueJsx from '@vitejs/plugin-vue-jsx'

// eslint-disable-next-line nuxt/no-cjs-in-config
const aliases = require('./aliases.config').webpack

let buildModules = [
  '@nuxtjs/composition-api/module',
  '@nuxtjs/style-resources',
  '@nuxtjs/google-fonts',
  '@nuxtjs/moment',
  '@nuxtjs/pwa',
  '@nuxt/postcss8',
  'nuxt-webpack-optimisations',
  '@aceforth/nuxt-optimized-images'
]

// const prodBuildModules = []
const devBuildModules = [
  '@nuxtjs/eslint-module',
  '@nuxtjs/stylelint-module'
]

buildModules = [...buildModules, ...devBuildModules]

// if (useVite)
const ignoreModules = new Set([
  '@nuxt/postcss8',
  '@nuxtjs/moment',
  'nuxt-webpack-optimisations',
  '@nuxtjs/composition-api/module'
])

// buildModules.push('@modules/moment')
buildModules.push('@modules/vite')
buildModules = buildModules.filter(m => !ignoreModules.has(m))

const baseConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css', '~/assets/styles/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  styleResources: {
    scss: [
      '~assets/styles/_variables.scss',
      '~assets/styles/_mixins.scss'
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  alias: aliases,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // buildDir: '.build',
  build: {
    transpile: [/^element-ui/],

    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[local]--[hash:base64:5]_[hash:base64:8]'
        }
      }
    }
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
          @use "sass:math";
          @import "@assets/styles/_variables.scss";
          @import "@assets/styles/_mixins.scss";
          @import "@assets/styles/_functions.scss";
        `
        }
      }
    }
  }
}

export default defineNuxtConfig(merge(baseConfig, {}))
