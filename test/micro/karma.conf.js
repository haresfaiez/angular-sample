module.exports = function(config) {

  const appBase  = 'src/';
  const testBase = 'test/micro/src/';
  const builtPaths = [appBase, testBase];

  config.set({
    basePath: '../../',
    port: 9876,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'kjhtml'],

    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter')
    ],

    client: {
      builtPaths: builtPaths,
      clearContext: false
    },

    customLaunchers: { },

    files: [
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/systemjs/dist/system-polyfills.js',

      'node_modules/core-js/client/shim.js',

      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },
      { pattern: 'test/factory/' + '**/*.js', included: false, watched: true },

      'test/micro' + '/karma-test-shim.js',

      { pattern: appBase + '**/*.js', included: false, watched: true },
      { pattern: testBase + '**/*.js', included: false, watched: true }
    ],

    proxies: {
      '/base/src/node_modules/': '/base/node_modules/'
    , '/base/src/factory/'     : '/base/test/factory/'
    },

    exclude: [],
    preprocessors: {},
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  })
}
