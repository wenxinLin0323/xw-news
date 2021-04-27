import Vue from 'vue'
import App from './App.vue'
// 导入通用的样式
import './styles/common.less'
// 导入字体图标库
import './styles/iconfont.less'
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
