import eslint from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
      plugins: {
        '@typescript-eslint': tseslint.plugin,

      },
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          project: true,
        },
      },
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
      },
    },
    {
      // disable type-aware linting on JS files
      files: ['**/*.js'],
      ...tseslint.configs.disableTypeChecked,
    },
    {
        ...playwright.configs['flat/recommended'],
        files: ['src/tests/**/*.ts'],
      },
      {
        files: ['src/tests/**/*.ts'],
        "rules": {
            "playwright/no-commented-out-tests": "error",
            "playwright/no-duplicate-hooks": "error",
            "playwright/no-get-by-title": "error",
            "playwright/no-nth-methods": "error",
            "playwright/no-raw-locators": "error",
            "playwright/no-restricted-matchers": "error",
            "playwright/prefer-comparison-matcher": "error",
            "playwright/prefer-equality-matcher": "error",
            "playwright/prefer-hooks-in-order": "error",
            "playwright/prefer-hooks-on-top": "error",
            "playwright/prefer-lowercase-title": "error",
            "playwright/prefer-strict-equal": "error",
            "playwright/prefer-to-be": "error",
            "playwright/prefer-to-contain": "error",
            "playwright/prefer-to-have-count": "error",
            "playwright/prefer-to-have-length": "error",
            "playwright/require-to-throw-message": "error",
            "playwright/require-top-level-describe": "error"
          },
      },  
  );