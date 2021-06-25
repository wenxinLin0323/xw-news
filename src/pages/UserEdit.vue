<template>
  <div>
    <xw-header>编辑资料</xw-header>
    <div class="headPortrait">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <van-uploader class="headPosition" :after-read="afterRead" />
    </div>
    <xw-navbar
      title="昵称"
      :content="info.nickname"
      @click="nicknameFrame"
    ></xw-navbar>
    <xw-navbar
      title="密码"
      :content="info.password.replace(/./g, '*')"
      @click="passwordFrame"
    ></xw-navbar>
    <xw-navbar
      title="性别"
      :content="info.gender === 1 ? '男' : '女'"
      @click="genderFrame"
    ></xw-navbar>

    <van-dialog
      v-model="showNickname"
      title="修改昵称"
      show-cancel-button
      confirmButtonColor="#1989FA"
      @confirm="editNickname"
    >
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="nickname"
        name="validator"
        placeholder="请输入新昵称"
      />
    </van-dialog>

    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
      confirmButtonColor="#1989FA"
    >
      <van-field v-model="password" placeholder="请输入新密码" name="pattern" />
    </van-dialog>

    <van-dialog
      v-model="showGender"
      title="修改性别"
      show-cancel-button
      @confirm="editGender"
      confirmButtonColor="#1989FA"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <!-- 图片裁剪 -->
    <div class="cropper" v-show="showCropper">
      <vueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="200"
        :autoCropHeight="200"
        :centerBox="true"
        :maxImgSize="500"
      ></vueCropper>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
      <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  data() {
    return {
      info: {
        password: ''
      },
      showNickname: false,
      showPassword: false,
      showGender: false,
      nickname: '',
      password: '',
      gender: 1,
      showCropper: false,
      img: ''
    }
  },

  created() {
    this.getInfo()
  },

  methods: {
    // 发送请求获取用户信息
    async getInfo() {
      const user_id = localStorage.getItem('user_id')
      // const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`
        // headers: {
        //   Authorization: token
        // }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        // console.log(this.info)
      }
    },

    // 封装修改用户信息请求
    async editUser(data) {
      const user_id = localStorage.getItem('user_id')
      // const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        // headers: {
        //   Authorization: token
        // },
        data
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 重新渲染
        this.getInfo()
        this.$toast.success(message)
      }
    },

    // 显示昵称修改框
    nicknameFrame() {
      this.showNickname = true
      this.nickname = this.info.nickname
    },

    // 显示密码修改框
    passwordFrame() {
      this.showPassword = true
      this.password = this.info.password
    },

    // 显示性别修改框
    genderFrame() {
      this.showGender = true
      this.gender = this.info.gender
    },

    // 发送请求修改昵称
    editNickname() {
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,6}$/.test(this.nickname)) {
        this.$toast.fail('昵称长度为2-6位的中英文汉字和数字')
        return
      }
      this.editUser({
        nickname: this.nickname
      })
    },

    // 发送请求修改密码
    editPassword() {
      if (!/^\d{3,12}$/.test(this.password)) {
        this.$toast.fail('密码长度为3-12位')
        return
      }
      this.editUser({
        password: this.password
      })
    },

    // 发送请求修改性别
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },

    // 上传图片后
    afterRead(file) {
      this.showCropper = true
      // 获取截图的base数据
      this.img = file.content
      // console.log(file)
      // 此时可以自行将文件上传至服务器
      // 通过formdata异步上传文件
      // const fd = new FormData()
      // fd.append('file', file.file)
      // // console.log(file)
      // this.$axios({
      //   method: 'post',
      //   url: '/upload',
      //   data: fd
      //   // headers: {
      //   //   Authorization: localStorage.getItem('token')
      //   // }
      // }).then(res => {
      //   // console.log(res)
      //   const { statusCode, data } = res.data
      //   if (statusCode === 200) {
      //     this.editUser({
      //       head_img: data.url
      //     })
      //   }
      // })
    },
    // 点击取消取消修改头像
    cancel() {
      this.showCropper = false
    },
    // 点击裁剪发送请求修改头像
    crop() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async data => {
        // do something
        // console.log(data)
        // 此时可以自行将文件上传至服务器
        // 通过formdata异步上传文件
        const fd = new FormData()
        fd.append('file', data)
        // console.log(file)
        const res = await this.$axios({
          method: 'post',
          url: '/upload',
          data: fd
          // headers: {
          //   Authorization: localStorage.getItem('token')
          // }
        })
        // console.log(res)
        const { statusCode, data: data1 } = res.data
        if (statusCode === 200) {
          // 隐藏裁剪框
          this.showCropper = false
          // console.log(data)
          // this.img = ''
          this.editUser({
            head_img: data1.url
          })
        }
      })
    }
    // 上传图片前可以校验图片大小和格式
    // beforeRead(file) {
    //   // console.log(file)
    //   if (file.size / 1024 >= 200) {
    //     this.$toast('请上传 200kb以内图片')
    //     return false
    //   }
    //   if (file.type !== 'image/jpeg') {
    //     this.$toast('请上传 jpg 格式图片')
    //     return false
    //   }
    //   return true
    // }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.headPortrait {
  position: relative;
  img {
    width: 70px;
    height: 70px;
    display: block;
    border-radius: 50%;
    margin: 30px auto;
  }

  .headPosition {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}

.gender {
  text-align: center;
  display: block;
}

.cropper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  .crop {
    position: absolute;
    top: 0;
    right: 0;
  }

  .cancel {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
