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
    ></xw-input>

    <xw-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码错误"
    ></xw-input>

    <xw-button @click="login">登录</xw-button>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  methods: {
    login() {
      console.log('登陆成功')
      this.$axios({
        method: 'POST',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.statusCode === 200) {
          alert('登录成功')
          this.$router.push('/user')
        } else {
          alert('账号名或密码错误')
        }
      })
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style></style>
