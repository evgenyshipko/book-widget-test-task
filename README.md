
**React/Typescript project boilerplate**

*Webpack configuration:*
1. typescript-loader - for transpile tsx files to ts, ts to js and js code from ES6/7/8 to ES5
2. mini-css-extract-plugin - extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
3. css-loader - interprets @import and url() like import/require() and will resolve them.
4. html-webpack-plugin - generate html using template
5. clean-webpack-plugin - clean dist folder after each build
6. TsconfigPathsPlugin - allows absolute paths in imports, got it from tsconfig.json
7. DefinePlugin - allows use .env files automatically
