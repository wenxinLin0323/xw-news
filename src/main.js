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
import XwInput from './components/XwInput.vue'
import XwNavbar from './components/XwNavbar.vue'

// 定义时间过滤器
import moment from 'moment'
Vue.filter('date', function(input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

// ----------------------导入vant-ui----------------
import {
  Button,
  Toast,
  Field,
  Dialog,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Uploader,
  Form
} from 'vant'

Vue.use(Toast)
Vue.use(Button)
Vue.use(Field)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Form)

// ----------------------导入axios------------------
import axios from 'axios'

// 给vue原型对象上添加axios
Vue.prototype.$axios = axios

// 给axios添加默认地址
axios.defaults.baseURL = 'http://localhost:3000'

// 配置axios响应拦截器
axios.interceptors.response.use(function(res) {
  // console.log(res)
  const { statusCode, message } = res.data
  if (statusCode === 401) {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
  }
  return res
})

// 配置axios请求拦截器
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})

Vue.component('xw-header', XwHeader)
Vue.component('xw-logo', XwLogo)
Vue.component('xw-button', XwButton)
Vue.component('xw-input', XwInput)
Vue.component('xw-navbar', XwNavbar)

// 关闭控制台vue提示消息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
