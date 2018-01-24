module.exports = {
  preset: "react-native",
  testEnvironment: "jsdom",
  setupTestFrameworkScriptFile: "<rootDir>test/enzyme.config.js",
  snapshotSerializers: [
    "react-native-web/jest/serializer"
  ],
  rootDir: '..'
}
