/** @type {import("eslint").Linter.Config} */
const config = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'plugin:security/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'security'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		// Security rules
		'security/detect-object-injection': 'warn',
		'security/detect-non-literal-regexp': 'warn',
		'security/detect-unsafe-regex': 'error',
		'security/detect-buffer-noassert': 'error',
		'security/detect-eval-with-expression': 'error',
		'security/detect-no-csrf-before-method-override': 'error',
		'security/detect-possible-timing-attacks': 'warn'
	}
};

module.exports = config;
