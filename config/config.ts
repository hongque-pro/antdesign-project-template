import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';
const path = require('path');

console.log('path', path.resolve(__dirname, '..', 'node_modules'));

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  dva: false,
  layout: false,
  initialState: false,

  proxy,
});
