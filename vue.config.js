module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/deep-dance-visualizer/'
  : '/',
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/, 
          loader: 'vue-svg-loader', 
        },
      ],
    }      
  }
};
