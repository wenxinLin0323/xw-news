<template>
  <div class="login">
    <xw-header>登录</xw-header>
    <xw-logo></xw-logo>
    <xw-button @click="register">注册</xw-button>
  </div>
</template>

<script>
export default {
  methods: {
    register() {
      console.log('注册成功')
    }
  }
}
</script>

<style></style>
