export default {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unsafe-call': 'off', // Disable the rule
    '@typescript-eslint/no-unsafe-member-access': 'off', // Optional: Disable related rule
    '@typescript-eslint/no-explicit-any': 'warn', // Optional: Warn for `any` usage
  },
};
