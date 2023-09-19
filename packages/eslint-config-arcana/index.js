module.exports = {
  ignorePatterns: ['dist', 'node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/ignore': ['node_modules/react-native/index\\.js$'],
    'import/internal-regex': '^@arcana/',
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.svg'],
    'import/external-module-folders': ['node_modules', '.yarn'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.css', '.scss', '.svg'],
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react**/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: 'next**/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@react**/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@arcana/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@**/**',
            group: 'external',
            position: 'after',
          },

          {
            pattern: 'app**/**',
            group: 'index',
            position: 'after',
          },
          // Use this pattern to get things like @types/...
          { pattern: '@!(/)**', group: 'external' },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'object'],
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['parent', 'sibling'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown', // <- unknown
        ],
        'newlines-between': 'always',
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
          /* ignore case. Options: [true, false] */
          caseInsensitive: true,
        },
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
  },
};
