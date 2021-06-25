<template>
  <div class="my-follow">
    <xw-header>我的关注</xw-header>

    <div class="list" v-for="item in list" :key="item.id">
      <!-- 关注 -->
      <div class="item">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="name">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | date }}</div>
        </div>
        <div class="right" @click="unFollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getFollowlist()
  },

  data() {
    return {
      list: ''
    }
  },
  methods: {
    // 获取关注列表
    getFollowlist() {
      const user_id = localStorage.getItem('user_id')
      this.$axios({
        method: 'get',
        url: '/user_follows/'
      }).then(res => {
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.list = data
        }
      })
    },
    // 取消关注
    unFollow(id) {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '确定取消关注吗'
        })
        .then(() => {
          this.$axios({
            method: 'get',
            url: `/user_unfollow/${id}`
          }).then(res => {
            // console.log(res)
            const { statusCode, message } = res.data
            if (statusCode === 200) {
              this.$toast.success(message)
              this.getFollowlist()
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .left {
    img {
      width: 40px;
      height: 40px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 10px;
    .name {
      font-size: 14px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    background-color: #ddd;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    padding: 0 15px;
    color: #000;
  }
}
</style>
