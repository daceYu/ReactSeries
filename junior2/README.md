[#](#)

### 运行

- git clone
- npm install 
- npm run start



### 目录说明

```js
.
|_src
| |_index.js   // 入口
| |_resources  // 静态资源
| |_common     // 共用文件
| | |_js	       // js
| | | |_function       // 常用js方法
| | | |_lib            // 第三方依赖
| | |_styles 	   // css
| | | |_lib            // 依赖css库
| |_todoHeader // header组件
| |_todoList   // 列表组件
| |_todoWrap   // todo模块
| |_todoFooter // 底部组件

```



### 安装配置less

- 执行`npm run eject` 暴露配置文件

- 然后执行 `npm install less-loader less --save -dev`, 安装 `less-loader` 和 `less`.

- 修改 `webpack.config.dev.js` 和 `webpack.config-prod.js` 配置文件

  - `/\.css$/` 改为 `/\. (css|less) $/`, 修改后如下

    ```js
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.(css|less)$/,
      /\.json$/,
      /\.bmp$/,
      /\.gif$/,
      /\.jpe?g$/,
      /\.png$/,
    ],
    ```

  - `test: /\.css$/` 改为 `/\.(css|less)$/`

  - `test: /\.css$/` 的 `use` 数组配置增加 `less-loader`，修改后如下

    ```
    test: /\.(css|less)$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
        {
          loader: require.resolve('less-loader') // compiles Less to CSS
        }
      ],
    },
    ```


