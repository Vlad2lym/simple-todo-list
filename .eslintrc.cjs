module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@feature-sliced/eslint-config/rules/import-order',
    '@feature-sliced/eslint-config/rules/public-api',
    '@feature-sliced/eslint-config/rules/layers-slices',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
    'import/no-internal-modules': [
      'error',
      {
        allow: ['**/*.module.scss', '**/*.css', '**/*.svg'],
      },
    ],
  },
};
