const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    main: './src/index.js'
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    hot: true,
    open: true,
    overlay: true
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      //加载所有的js
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          }
        ],
        exclude: /node_modules/
      },
      //将less编译成css
      {
        test: /\.(css|less)$/,
        use: [

          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',// compiles Less to CSS
          }

        ]
      },
      //加载所有的css
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      //加载html和image
      // {
      //     test: /\.html$/,
      //     use: [
      //     {
      //     loader: "html-loader",   
      //     options: {
      //     attrs: ["img:src"]   
      //     }
      //     }
      //     ]
      //     },
      //加载所有的图片
      {
        test: /\.(jpg|git|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    new miniCssExtractPlugin({
      filename: '[name].css'   //输出的css文件名，放置在dist目录下
    })
  ],
}