<template>
  <div class="my-comment">
    <xw-header>我的跟帖</xw-header>
    <div class="list">
      <van-list
        @load="onLoad"
        :immediate-check="false"
        :offset="50"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <div class="item" v-for="item in list" :key="item.id">
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
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取跟帖列表
    async getList() {
      const res = await this.$axios({
        method: 'get',
        url: '/user_comments',
        // 注意：在使用axios发送ajax请求的时候，如果post请求有数据，需要放到data参数中。如果是get请求有数据，需要放到params中。
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 因为涉及到分页，不能简单的把响应的data把list数据给覆盖了，而应该是追加
        // this.list = data
        this.list = [...this.list, ...data]
        // 合并数组
        // this.list = this.list.concat(data)
        console.log(this.list)

        // 额外处理
        // 数据加载完成了，记得让loading改成false,不然无法触发下一次的加载。
        this.loading = false
        // 判断是否还有更多数据？ 如果返回的数据的条数比 每页的条数少，说明没有更多数据。

        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },

    // 上拉触底加载更多数据
    onLoad() {
      console.log('我触底了，我要加载更多数据了')
      setTimeout(() => {
        // 发送ajax请求，加载更多数据即可
        // 加载更多数据，让页码值+1
        this.pageIndex++
        // 重新发送ajax请求即可
        this.getList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .item {
    border-bottom: 1px solid #ccc;
    padding: 15px;

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
