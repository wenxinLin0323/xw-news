<template>
  <div class="navbar" @click="clickFn">
    <div class="left">{{ title }}</div>
    <div class="center">{{ content }}</div>
    <div class="iconfont iconjiantou1"></div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      this.$emit('click')
      // console.log('123')
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
  }
}
</script>

<style lang="less">
.navbar {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  margin-left: 20px;

  .left {
    font-size: 15px;
    color: black;
  }

  .center {
    flex: 1;
    text-align: right;
    font-size: 15px;
    color: #ccc;
    padding: 10px;
  }

  .iconjiantou1 {
    color: #ccc;
    padding-right: 10px;
  }
}
</style>
