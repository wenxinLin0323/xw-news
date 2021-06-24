// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import UserEdit from '../pages/UserEdit.vue'

Vue.use(VueRouter)

// 解决vue 中导航重复点击报错冗余导航
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// 所有的路由跳转都要经过导航守卫
// 判断是否有token,如果有token说明是登陆过的,反之没有登录

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/register',
      component: Register,
      name: 'register'
    },
    {
      path: '/user',
      component: User,
      name: 'user'
    },
    {
      path: '/useredit',
      component: UserEdit,
      name: 'useredit'
    }
  ]
})

const authUrl = ['/user', '/useredit']
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')

  if (authUrl.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
