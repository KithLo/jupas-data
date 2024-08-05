export default {
    testEnvironment: "jest-environment-node",
    transform: {
        "^.+\\.tsx?$": "esbuild-jest",
        "\\.yml$": "jest-transform-yaml",
    },
}
