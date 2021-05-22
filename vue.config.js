module.exports = {
  devServer: {
    // 自动打开浏览器
    open: true,
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 36,
          }),
        ],
      },
    },
  },
}
