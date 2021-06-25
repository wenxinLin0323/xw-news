<template>
  <div class="login">
    <xw-header>登录</xw-header>
    <xw-logo></xw-logo>

    <xw-input
      type="text"
      placeholder="用户名 / 手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名错误"
      ref="username"
    ></xw-input>

    <xw-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码错误"
      ref="password"
    ></xw-input>
    <xw-button @click="login">登录</xw-button>
    <div class="go-register">
      没有账号?去<router-link class="link" to="register"> 注册</router-link>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  methods: {
    async login() {
      // 发请求前先进行校验，校验失败就不发请求
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.password.validate(this.password)
      // console.log(result1, result2)
      if (result1 && result2 == false) {
        return
      }
      // if (!result1 || !result2) {
      //   return
      // }
      // console.log('登陆成功')
      const res = await this.$axios({
        method: 'POST',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
      // console.log(res.data)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user.id)

        // 如果想直接跳转到用户页面，发送请求登录，登陆成功直接跳转到用户中心
        this.$router.push('/user')
      } else {
        this.$toast.fail('用户名或密码错误')
      }
    }
  },

  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    // console.log(this.$route)
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  }
}
</script>

<style lang="less" scoped>
.go-register {
  text-align: right;
  font-size: 15px;
  .link {
    color: #cc3300;
  }
}
</style>
