const webpack = require('webpack');
const path = require('path');

// variables
const srcDir = 'src';
const buildDir = 'build';
// const isProduction = process.argv.mode === 'production' || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, `./${srcDir}`);
const outPath = path.join(__dirname, `./${buildDir}`);

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {
   const isProduction = argv.mode === 'production';
   console.log(`isProduction = ${isProduction}`);

   return {
      // context: sourcePath,
      entry: {
         jsx: `${sourcePath}/app/index.tsx`
      },
      output: {
         filename: isProduction ? 'app-[contenthash].js' : 'app-debug.js',
         path: outPath,
      },
      devtool: isProduction ? '' : 'source-map',
      resolve: {
         extensions: ['.js', '.ts', '.tsx'],
         // Fix webpack's default behavior to not load packages with jsnext:main module
         // (jsnext:main directs not usually distributable es6 format, but es6 sources)
         mainFields: ['module', 'browser', 'main'],
         alias: {
            app: `${sourcePath}/app/`
         }
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
               //test: /\.css$/,
               test: /\.(css|less)$/,
               exclude: /node_modules/,
               // use: config.css
               use: [
                  isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  {
                     loader: 'css-loader',
                     options: {
                        modules: true,
                        sourceMap: !isProduction,
                     }
                  },
                  {
                     loader: 'less-loader',
                     options: { sourceMap: !isProduction }
                  },
               ]
            },
         ]
      },
      optimization: {
         minimizer: [
            new OptimizeCSSAssetsPlugin({})
         ],
         splitChunks: {
            cacheGroups: {
               vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  chunks: 'all',
                  filename: isProduction ? 'vendor-[contenthash].js' : 'vendor-debug.js',
                  priority: -10
               }
            }
         },
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
      plugins: (function () {
         const plugins = [];
         plugins.push(
            new HtmlWebpackPlugin({
               template: `./${srcDir}/index.html`,
               filename: 'index.html',
            })
         );
         if (isProduction) {
            //add some plugins that are only for production here
            plugins.push(
               new CleanWebpackPlugin(),
               new MiniCssExtractPlugin({
                  filename: 'app-[contenthash].css',
               })
            )
         }
         return plugins;
      }()),
   }
};