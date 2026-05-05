// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import StylisticPlugin from "@stylistic/eslint-plugin";

const customizedStylistic = StylisticPlugin.configs.customize({
    indent: 4,
    semi: true,
    jsx: true,
    braceStyle: "1tbs",
    quoteProps: "consistent",
    quotes: "double",
});

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    StylisticPlugin.configs["disable-legacy"],
    fixupConfigRules(reactPlugin.configs.flat.recommended),
    fixupConfigRules(reactPlugin.configs.flat["jsx-runtime"]),
    fixupConfigRules(jsxA11y.flatConfigs.recommended),
    {
        plugins: {
            "react": fixupPluginRules(reactPlugin),
            "react-hooks": reactHooksPlugin,
            "react-refresh": reactRefreshPlugin,
            "@stylistic": StylisticPlugin,
        },
        rules: {
            ...customizedStylistic.rules,
            "react/prop-types": 0,
            "react-hooks/rules-of-hooks": "warn",
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": "warn",
            "@stylistic/jsx-one-expression-per-line": 0,
            "@typescript-eslint/restrict-template-expressions": ["error", {
                allowNumber: true,
            }],
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        languageOptions: {
            parserOptions: {
                project: true,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },

    {
        files: ["**/*.js"],
        ...tseslint.configs.disableTypeChecked,
    },
);
