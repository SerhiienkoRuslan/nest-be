module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  importOrder: ['^[./]', '^@mui/(.*)$', '^@server/(.*)$', '^@/(.*)$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
