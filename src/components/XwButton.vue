<template>
  <div class="xw-button" @click="clickFn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      this.$emit('click')
    },
  },
}
</script>

<style class="lang" scoped>
.xw-button {
  margin: 20px;
  height: 50px;
  line-height: 50px;
  background-color: #cc3300;
  border-radius: 25px;
  color: white;
  text-align: center;
  font-size: 18px;
}
</style>
