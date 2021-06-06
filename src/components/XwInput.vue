<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputFn"
      :class="{ success: status === 'success', error: status === 'error' }"
    />
    <div class="tips" v-show="status === 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入.....'
    },
    rule: RegExp,
    message: String,
    value: String
  },
  data() {
    return {
      // 记录表单校验状态
      status: ''
    }
  },
  methods: {
    // 需要把input框的值传给父组件
    inputFn(e) {
      // e.target能够获取到触发事件的元素
      let value = e.target.value
      this.$emit('input', value)
      this.validate(value)
      // 添加表单校验

      // console.log(this.status)
    },
    validate(value) {
      if (this.rule) {
        // 判断value的值是否符合传入的正则
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  height: 50px;
  margin: 20px;
  input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 15px;
    color: #666;
    outline: none;
    &.success {
      border-color: green;
    }
    &.error {
      border-color: red;
    }
  }

  .tips {
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: red;
  }
}
</style>
