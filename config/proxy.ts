export default {
    dev: {
      // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
      '/api/': {
        // 要代理的地址
        target: 'https://preview.pro.ant.design',
        // 配置了这个可以从 http 代理到 https
        // 依赖 origin 的功能可能需要这个，比如 cookie
        changeOrigin: true,
      },
    },
    test: {
      '/api/': {
        target: 'https://proapi.azurewebsites.net',
        changeOrigin: true,
        pathRewrite: { '^': '' },
      },
    },
    pre: {
      '/api/': {
        target: 'your pre url',
        changeOrigin: true,
        pathRewrite: { '^': '' },
      },
    },
  };