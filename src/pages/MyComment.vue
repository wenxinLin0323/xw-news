<template>
  <div class="my-comment">
    <xw-header>我的跟帖</xw-header>
    <div class="list" v-for="item in list" :key="item.id">
      <div class="item">
        <div class="time">
          {{ item.create_date | date('YYYY-MM-DD HH:mm') }}
        </div>

        <div class="parentComment" v-if="item.parent">
          <div class="parentName">回复：{{ item.parent.user.nickname }}</div>
          <div class="parentContent">{{ item.parent.content }}</div>
          <div class="parentTime">
            {{ item.parent.create_date | date('YYYY-MM-DD HH:mm') }}
          </div>
        </div>

        <div class="content one-txt-cut">
          {{ item.content }}
        </div>

        <div class="link">
          <div class="original one-txt-cut">原文：{{ item.post.title }}</div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios({
        method: 'get',
        url: '/user_comments'
      }).then(res => {
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.list = data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  border-bottom: 1px solid #ccc;
  padding: 15px;
  .item {
    .time {
      height: 30px;
      line-height: 30px;
      color: #999;
      font-size: 12px;
    }

    .content {
      font-size: 15px;
      padding: 10px 0;
    }

    .link {
      display: flex;
      justify-content: space-between;

      .original {
        color: #999;
        font-size: 13px;
        flex: 1;
      }

      span {
        width: 40px;
        text-align: right;
      }
    }

    .parentComment {
      background-color: #ccc;
      padding: 10px;
      line-height: 30px;
      font-size: 10px;
      color: #999;
    }

    .parentContent {
      padding-left: 10px;
    }

    .parentTime {
      text-align: right;
    }
  }
}
</style>
