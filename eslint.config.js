import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import security from 'eslint-plugin-security';
import prettier from 'eslint-config-prettier';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		plugins: { '@typescript-eslint': ts, security },
		languageOptions: {
			parser: tsParser,
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			...ts.configs.recommended.rules,
			...security.configs.recommended.rules,
			'security/detect-unsafe-regex': 'error',
			'security/detect-eval-with-expression': 'error',
			'security/detect-possible-timing-attacks': 'warn'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: { parser: tsParser }
		}
	},
	{
		ignores: [
			'.svelte-kit/**',
			'.vercel/**',
			'.omc/**',
			'build/**',
			'node_modules/**',
			'coverage/**'
		]
	}
];
