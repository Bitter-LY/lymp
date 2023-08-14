module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-debugger': 'error',
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ],

    'no-restricted-syntax': [
      'error',
      // since we target ES2015 for baseline support, we need to forbid object
      // rest spread usage in destructure as it compiles into a verbose helper.
      'ObjectPattern > RestElement',
      // tsc compiles assignment spread into Object.assign() calls, but esbuild
      // still generates verbose helpers, so spread assignment is also prohiboted
      'ObjectExpression > SpreadElement',
      'AwaitExpression'
    ]
  },
  overrides: [
    // Node scripts
    {
      files: [
        'scripts/**',
        '*.{js,ts}',
        'packages/**/index.js',
      ],
      rules: {
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off'
      }
    }
  ]
}
