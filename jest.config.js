module.exports = {
  testMatch: ['**/__tests__/**/*.test.js'],
  projects: [
    {
      displayName: 'renderer',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/renderer/**/*.test.js'],
      moduleNameMapper: {
        electron: '<rootDir>/test/mocks/electron.renderer.js'
      }
    },
    {
      displayName: 'main',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/main/**/*.test.js'],
      moduleNameMapper: {
        electron: '<rootDir>/test/mocks/electron.main.js',
        'Random--generator': '<rootDir>/test/mocks/random-generator.js'
      }
    }
  ]
}