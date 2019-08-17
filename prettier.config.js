module.exports = {
  $schema: "http://json.schemastore.org/prettierrc",
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  printWidth: 80,
  proseWrap: "never",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  jsxBracketSameLine: true,
  overrides: [{ files: ["*.json"], options: { printWidth: 80 } }]
};
