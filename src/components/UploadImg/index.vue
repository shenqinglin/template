<template>
  <div class="upload-wrap">
    <van-uploader
      class="upload-btn upload-comp"
      :after-read="afterRead"
      upload-text="上传证件合照"
    >
      <div
        v-if="currentImg"
        class="uploaded-img upload-comp"
      >
        <img :src="currentImg">
        <div class="up-again">
          <div class="again-text">
            重新上传
          </div>
          <div class="again-masker" />
        </div>
      </div>
    </van-uploader>
    <div class="example-wrap upload-comp">
      <img :src="exampleSrc">
      <span class="example-text">示例：</span>
    </div>
  </div>
</template>

<script>
import { STATIC_URL } from '@/config'
import { uploadFile } from '@/api/common'
import { decrypt } from '@/utils'
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentImg: '' // 当前上传的图片,
    }
  },
  computed: {
    exampleSrc () {
      return `${STATIC_URL}/img/card-example.png`
    }
  },
  methods: {
    afterRead (loadFile) {
      const file = loadFile.file
      const type = this.type
      uploadFile(file, type).then(data => {
        data = decrypt(data)
        this.$emit('input', data)
        this.$emit('onUpload', data)
        this.currentImg = data
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .upload-wrap {
    display: flex;
    // margin-top: 30px;
    .upload-comp {
      width: 320px;
      height: 250px;

      box-sizing:border-box;
      padding: 1px;
    }
    /deep/.van-uploader__wrapper {
      border: 1PX solid #5386FF;
      width: 100%;
      height: 100%;
      .van-uploader__upload {
        width: 100%;
        height: 100%;
        margin: 0;
        border:none;
      }
      .van-uploader__upload-icon {
        font-size: 60px;
        color: #5386FF;
      }
    }
    /deep/ .van-uploader__upload-text{
      color: #5386FF;
      font-size: 28px;
      margin-top: 50px;
    }
    .example-wrap {
      position: relative;
      margin-left: 30px;
      font-size: 0;
      border: 1PX dashed #e5e5e5;
      box-sizing: border-box;
      padding: 1px;
      img {
        width: 100%;
        height: 100%;
        line-height: 0;
        border:none;
      }
      .example-text {
        position: absolute;
        top: 14px;
        left: 14px;
        font-size: 22px;
        color:#999;
        margin:14px 0 0 14px;
        z-index: 10;
      }
    }
    .uploaded-img {
      font-size: 0;
      padding: 1px;
      box-sizing: border-box;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        line-height: 0;
      }
      .up-again {
        width: 100%;
        height: 70px;
        line-height: 70px;
        border: none;

        position: absolute;
        z-index: 2;
        width: 100%;
        bottom: 0;
        .again-masker {
          background-color: #000;
          opacity: 0.4;
          height: 100%;
        }
        .again-text {
          color: #ffffff;
          font-size: 28px;
          position: absolute;
          z-index: 6;
          width: 100%;
          text-align: center;
          /deep/.van-uploader {
            width: 100%;
            height: 100%;
            .van-uploader__input-wrapper {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
