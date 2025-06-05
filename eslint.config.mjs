import stylistic from "@stylistic/eslint-plugin";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsparser,
            sourceType: "module",
        },
        plugins: {
            "@typescript-eslint": tseslint,
            prettier: prettierPlugin,
            "@stylistic": stylistic,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...prettierConfig.rules,
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/explicit-function-return-type": "error",
            "no-console": "warn",
            "@stylistic/semi": ["error", "always"],
            "prettier/prettier": "error",
            "@stylistic/quotes": ["error", "double", { allowTemplateLiterals: "always" }],
            "@stylistic/max-len": [
                "error",
                {
                    code: 140,
                    ignoreUrls: true,
                    ignoreComments: true,
                    ignoreStrings: true,
                },
            ],
        },
    },
];
