module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },

  // node_modules 경로 하위에 있는 모든 테스트 파일을 대상에서 제외합니다
  testPathIgnorePatterns: ["/node_modules/"],

  // 커버리지
  collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"],
  collectCoverageFrom: ["src/components/**/*.{js,vue}", "!**/node_modules/**"],

  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    // tell Jest to handle `*.vue` files
    "vue",
  ],
};
