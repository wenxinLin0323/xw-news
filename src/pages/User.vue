<template>
  <div>
    <xw-header>个人中心</xw-header>
    <div class="info" @click="$router.push('/useredit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="center">
        <div class="name">
          <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | date('YYYY-MM-DD') }}</div>
      </div>
      <div class="iconfont iconjiantou1"></div>
    </div>
    <xw-navbar
      title="我的关注"
      @click="$router.push('/myfollow')"
      content="关注的用户"
    ></xw-navbar>
    <xw-navbar
      title="我的跟帖"
      @click="$router.push('/mycomment')"
      content="跟帖/回复"
    ></xw-navbar>
    <xw-navbar title="我的收藏" content="文章视频"></xw-navbar>
    <xw-navbar
      title="设置"
      content
      @click="$router.push('/useredit')"
    ></xw-navbar>
    <xw-navbar title="退出" content @click="logout"></xw-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '你确定要退出吗'
        })
        .then(() => {
          // on confirm
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          this.$router.push('/login')
          this.$toast('退出成功')
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  data() {
    return {
      // 用于存放个人信息
      info: {},
      current: ''
    }
  },
  created() {
    // 需要在发送请求的时候携带token
    // token需要通过一个请求头Authorization
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    // console.log(user_id)
    this.$axios({
      method: 'get',
      url: `/user/${user_id}`,
      headers: {
        Authorization: token
      }
    }).then(res => {
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
      // console.log(this.info)
    })
  }
}
</script>

<style lang="less">
.info {
  height: 100px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  border-bottom: 4px solid #ccc;

  .left {
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }

  .center {
    flex: 1;
    padding: 10px;

    .name {
      padding: 5px;
      font-size: 20px;
    }

    .iconfont {
      font-size: 20px;
    }

    .time {
      color: #ccc;
      font-size: 15px;
      padding-left: 5px;
    }

    .iconxingbienan {
      color: blue;
    }

    .iconxingbienv {
      color: pink;
    }
  }
}
</style>
