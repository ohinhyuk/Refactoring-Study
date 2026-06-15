module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js'
  ],
  testMatch: ['**/test/**/*.test.js'],
  verbose: true,
  setupFilesAfterEnv: []
};
