module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    root: true,

    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },

    ignorePatterns: ["dist"],

    rules: {
        "import/first": ["error"],
        "import/no-default-export": ["error"],
        "import/consistent-type-specifier-style": ["error", "prefer-inline"],
        "import/order": [
            "error",
            {
                "newlines-between": "never",
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object",
                    "type",
                ],
                alphabetize: {
                    order: "asc",
                    orderImportKind: "asc",
                    caseInsensitive: true,
                },
            },
        ],
        "prettier/prettier": ["error"],
        eqeqeq: ["error", "smart"],
        "no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            },
        ],
    },

    overrides: [
        {
            files: ["tests/**/*"],
            env: {
                node: true,
                jest: true,
            },
        },
        {
            files: [
                ".eslintrc.{js,cjs}",
                ".prettierrc.{js,cjs}",
                "build.mjs",
                "jest.config.js",
            ],
            env: {
                node: true,
            },
            parserOptions: {
                sourceType: "script",
            },
        },
        {
            files: ["src/**"],
            env: {
                browser: true,
            },
        },
        {
            files: ["**/*.{ts,tsx}"],
            rules: {
                "@typescript-eslint/no-explicit-any": "off",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": [
                    "warn",
                    {
                        argsIgnorePattern: "^_",
                        varsIgnorePattern: "^_",
                        caughtErrorsIgnorePattern: "^_",
                    },
                ],
            },
        },
    ],
}
