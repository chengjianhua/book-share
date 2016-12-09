var path = require('path');

module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        // "config": path.join(__dirname, "tools/webpack.alias.config.js")
        "config": {
          "resolve": {
            "alias": {
              "actions": path.resolve(__dirname, './src/actions'),
              "models": path.resolve(__dirname, './src/model'),
              "ActionTypes": path.resolve(__dirname, './src/constants/ActionTypes.js'),
              "components": path.resolve(__dirname, './src/components'),
              "common": path.resolve(__dirname, './src/components/common'),
            }
          }
        }
      }
    }
  },
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "globals": {
    "__DEV__": true,
    "Globals": true
  },
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true
  },
  "rules": {
    "no-confusing-arrow": "off",
    "object-curly-spacing": ["error", "always"],
    "func-names": ["error", "never"],
    "no-fallthrough": ["error", {
      "commentPattern": "/falls?\\s?through/i"
    }],
    "max-len": ["error", {
        "ignoreTrailingComments": true,
        "ignoreComments": true,
        "code": 150
      }
    ],
    "import/extensions": "off",
    "jsx-quotes": ["error", "prefer-double"],
    "react/prop-types": ["off"],
    "react/no-direct-mutation-state": "error",
    "react/require-default-props": "off",
    "react/no-string-refs": "error",
    "react/self-closing-comp": ["error"],
    "react/no-array-index-key": "error",
    "react/prefer-stateless-function": ["error", {
      "ignorePureComponents": true
    }],
    "react/jsx-indent": ["error", 2],
    "react/jsx-filename-extension": ["warn", {
      "extensions": [".js", ".jsx"]
    }]
  }
};
