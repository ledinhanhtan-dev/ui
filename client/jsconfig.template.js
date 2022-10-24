// This is a template for a jsconfig.json file which will be
// generated when starting the dev server or a build.

module.exports = {
  exclude: [
    '**/node_modules/**/*',
    '**/.nuxt/**/*',
    '**/.build/**/*',
    '**/dist/**/*',
    '**/.widget/**/*',
    '**/.eslint-loader-cache/**/*',
    '**/.element-theme/**/*',
    '**/.static/**/*'
  ],
  include: ['./client/**/*'],
  compilerOptions: {
    baseUrl: './client',
    jsx: 'preserve'
  },
  vueCompilerOptions: {
    target: 2.7
  }
}
