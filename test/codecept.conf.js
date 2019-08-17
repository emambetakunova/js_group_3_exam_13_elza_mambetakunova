exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3000/',
      show: true
    },
    LoginHelper: {
      require: './helpers/login.js',
    },
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: [
      './step_definitions/register.js',
      './step_definitions/login.js',
      './step_definitions/logout.js',
    ]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: './*_test.js',
  name: 'tests'
};
