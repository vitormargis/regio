module.exports = {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "env": {
      "browser": true,
      "es6": true,
      "node": true,
    },
    "parserOptions": {
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true,
          "modules": true
      }
    },
    "rules": {
        "no-console":0,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
};
