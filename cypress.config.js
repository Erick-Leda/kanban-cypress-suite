// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://kanban-dusky-five.vercel.app/',
    video: false,
    viewportWidth: 1366,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    setupNodeEvents(on, config) {
      // plugins, se necessário
    },
  },
})
