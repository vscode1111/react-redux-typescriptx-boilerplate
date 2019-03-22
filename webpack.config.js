const webpack = require('webpack');
const path = require('path');

// variables
const srcDir = 'src';
const buildDir = 'build';
// const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, `./${srcDir}`);
const outPath = path.join(__dirname, `./${buildDir}`);

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const configProd = {
   app: './src/index.tsx',
   publicPath: '/',
   css: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
         'css-loader',
         'postcss-loader',
         'sass-loader',
      ]
   })
}

module.exports = (env, argv) => {
   const isProduction = argv.mode === 'production';
   return {
      entry: {
         jsx: `${sourcePath}/index.tsx`,
         // vendor: [
         //    'react',
         //    'react-dom',
         //    'react-redux',
         //    'react-router',
         //    'react-router-redux',
         //    'redux'
         // ]
      },
      output: {
         filename: isProduction ? 'app-[contenthash].js' : 'app-debug.js',
         path: outPath,
      },
      devtool: 'source-map',
      resolve: {
         extensions: ['.js', '.json', '.ts', '.tsx'],
      },
      module: {
         rules: [
            // .ts, .tsx
            {
               test: /\.(ts|tsx)$/,
               loader: 'awesome-typescript-loader',
            },
            // .css
            {
               //test: /\.(sass|scss|css)$/,
               test: /\.css$/,
               exclude: /node_modules/,
               // use: configProd.css

               // loader: 'css-loader',
               // options: {
               //    modules: true,
               //    context: path.resolve(__dirname, 'context'),
               // },

               use: [
                  isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  {
                     loader: 'css-loader',
                     query: {
                        modules: true,
                        sourceMap: !isProduction,
                        importLoaders: 1,
                        localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
                     }
                  },
               ]
            },
         ]
      },
      performance: {
         hints: "warning", // enum
         maxAssetSize: 2 * 1048576, // int (in bytes),
         maxEntrypointSize: 2 * 1048576, // int (in bytes)
         assetFilter: function (assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
         }
      },
      plugins: [
         new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
            template: `./${srcDir}/index.html`,
            filename: 'index.html',
         }),
         new MiniCssExtractPlugin({
            filename: 'bundle.css',
            // disable: !isProduction
         }),
         // new ExtractTextPlugin({
         //    filename: 'bundle.css',
         //    // allChunks: true,
         // })
      ],
   }
};