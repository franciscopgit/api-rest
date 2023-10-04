module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "class-methods-use-this": "off",
    "spaced-comment": "off",
    "import/no-extraneous-dependencies": "off",
    "import/first": "off",
    "max-len": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    quotes: "off",
    "comma-dangle": 0,
    "consistent-return": 0,
  },
};
