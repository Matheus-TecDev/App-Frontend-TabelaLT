const expoConfig = require('eslint-config-expo/flat');
const reactNativePlugin = require('eslint-plugin-react-native');

module.exports = [
  ...expoConfig,

  {
    ignores: ['dist', 'build', 'node_modules', '.expo'],

    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },

    plugins: {
      'react-native': reactNativePlugin,
    },

    rules: {
      'react-native/no-raw-text': [
        'error',
        {
          skip: ['ThemedText'], // 🔥 ESSA LINHA que precisa ser respeitada
        },
      ],
      'react/no-unescaped-entities': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
