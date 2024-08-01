// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
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
    jsxA11y.flatConfigs.recommended,
    {
        plugins: {
            "react": reactPlugin,
            "react-hooks": reactHooksPlugin,
            "@stylistic": StylisticPlugin,
        },
        // @ts-expect-error wait for fixes
        rules: {
            ...reactHooksPlugin.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs["jsx-runtime"].rules,
            ...customizedStylistic.rules,
            ...StylisticPlugin.configs["disable-legacy"].rules,
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
