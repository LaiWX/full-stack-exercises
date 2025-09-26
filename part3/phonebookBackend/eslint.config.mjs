import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: { ...globals.node },
            ecmaVersion: 'latest',
        },
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            '@stylistic/js/indent': ['warn', 2],
            '@stylistic/js/linebreak-style': ['warn', 'unix'],
            '@stylistic/js/quotes': ['warn', 'single'],
            '@stylistic/js/semi': ['warn', 'never'],
            eqeqeq: 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'no-console': 'off',
        },
    },
    {
        ignores: ['public/**'],
    },
]