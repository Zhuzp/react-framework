const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    //配置extension来告诉webpack在没有书写后缀时，以什么样的顺序去寻找文件
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', // 根据项目去配置
                  useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                  corejs: 3, // 使用 core-js@3 版本
                },
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000,
              // //限制打包图片的大小：
              // //如果大于或等于2000Byte，则按照相应的文件名和路径打包图片；如果小于2000Byte，则将图片转成base64格式的字符串。
              // name: 'img/[name].[hash:8].[ext]',
              // //img:图片打包的文件夹；
              // //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
              // //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    //可以在项目启动或打包时自动生成 html 文件，如果没有，在npm run build时需要手动在dist文件里添加index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'), // 使用自定义模板
    }),
    new CleanWebpackPlugin(),
  ],
}
