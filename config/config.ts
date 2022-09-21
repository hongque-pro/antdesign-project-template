import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';
const path = require('path');

const { UMI_ENV } = process.env;
console.log('path', path.resolve(__dirname, '..', 'node_modules'));


export default defineConfig({
  hash: true,
  request:{},
  history:{type:"browser" },
  ignoreMomentLocale: true,
  sassLoader:{},
  routes,
  model:false,
  fastRefresh: true,
  dva: false,
  layout: false,
  initialState: false,
  legacy:{buildOnly: true, nodeModulesTransform: false },
  theme:{
    'primary-color': '#00b2a5',
    'link-color': '#00b2a5',
  },
  proxy: proxy[UMI_ENV || 'dev'],
  define: {
    
  }
});
