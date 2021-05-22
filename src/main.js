import Vue from 'vue'
import App from './App.vue'
// 导入通用的样式
import './styles/common.less'
// 导入字体图标库
import './styles/iconfont.less'
// 导入lib-flexible模块,会自动适配所有的屏幕
import 'lib-flexible'
// 导入路由对象
import router from './router'

// 全局注册组件
import XwHeader from './components/XwHeader.vue'
import XwLogo from './components/XwLogo.vue'
import XwButton from './components/XwButton.vue'

Vue.component('xw-header', XwHeader)
Vue.component('xw-logo', XwLogo)
Vue.component('xw-button', XwButton)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
