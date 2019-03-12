const path = require('path');
module.exports = {
   entry: "./src/index.tsx",
   output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, 'dist'),
   },
   devtool: 'sourse-map',
   resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx']
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            // include: path.resolve(__dirname, 'src'),
            loader: "awesome-typescript-loader"
         }
      ]
   },
};