const { defineConfig } = require("cypress");

module.exports = defineConfig({
    video: false,
    screenshotOnRunFailure: false,
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    component: {
        setupNodeEvents() { },
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
    },
});