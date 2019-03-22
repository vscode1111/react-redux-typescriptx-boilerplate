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

   console.log(`isProduction = ${isProduction}`);

   return {
      // context: sourcePath,
      entry: {
         jsx: `${sourcePath}/app/index.tsx`,
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
         extensions: ['.js', '.ts', '.tsx'],
         // Fix webpack's default behavior to not load packages with jsnext:main module
         // (jsnext:main directs not usually distributable es6 format, but es6 sources)
         mainFields: ['module', 'browser', 'main'],
         alias: {
            app: path.resolve(__dirname, 'src/app/')
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
               test: /\.css$/,
               exclude: /node_modules/,
               // use: configProd.css
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
                  {
                     loader: 'postcss-loader',
                     options: {
                        ident: 'postcss',
                        plugins: [
                           require('postcss-import')({ addDependencyTo: webpack }),
                           require('postcss-url')(),
                           require('postcss-preset-env')({
                              /* use stage 2 features (defaults) */
                              stage: 2
                           }),
                           require('postcss-reporter')(),
                           require('postcss-browser-reporter')({
                              disabled: isProduction
                           })
                        ]
                     }
                  }
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
            filename: 'app-[contenthash].css',
            // disable: !isProduction
         }),
         // new ExtractTextPlugin({
         //    filename: 'bundle.css',
         //    // allChunks: true,
         // })
      ],
   }
};