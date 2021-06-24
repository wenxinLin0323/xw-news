<template>
  <div class="login">
    <xw-header>注册</xw-header>
    <xw-logo></xw-logo>
    <xw-input
      placeholder="用户名 / 手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名错误"
      ref="username"
    ></xw-input>
    <xw-input
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,6}$/"
      message="昵称错误"
      ref="nickname"
    ></xw-input>
    <xw-input
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码错误"
      ref="password"
    ></xw-input>
    <xw-button @click="register">注册</xw-button>
    <div class="go-login">
      没有账号?去<router-link class="link" to="login"> 登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    register() {
      // 发请求前先进行校验，校验失败就不发请求
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.nickname.validate(this.nickname)
      const result3 = this.$refs.password.validate(this.password)
      // console.log(result1, result2,result3)
      if ((result1, result2, result3 == false)) {
        return
      }
      // if (!result1 || !result2) {
      //   return
      // }
      // console.log('登陆成功')
      this.$axios({
        method: 'POST',
        url: '/register',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then(res => {
        // console.log(res.data)
        if (res.data.statusCode === 200) {
          this.$toast.success('注册成功')
          this.$router.push({
            name: 'login',
            params: { username: this.username, password: this.password }
          })
        }
      })
    }
  },
  data() {
    return {
      username: '',
      nickname: '',
      password: ''
    }
  }
}
</script>

<style lang="less">
.go-login {
  text-align: right;
  font-size: 15px;
}
.link {
  color: #cc3300;
}
</style>
