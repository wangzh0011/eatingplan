Component({
  properties: {
    //属性值可以在组件使用时指定
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        newVal && this.drawPic()
      }
    }
  },
  data: {
    isModal: false, //是否显示拒绝保存图片后的弹窗
    imgDraw: {}, //绘制图片的大对象
    sharePath: '', //生成的分享图
    visible: false
  },
  methods: {
    handlePhotoSaved() {
      this.savePhoto(this.data.sharePath)
    },
    handleClose() {
      this.setData({
        visible: false
      })
    },
    drawPic() {
      if (this.data.sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
        this.setData({
          visible: true
        })
        this.triggerEvent('initData') 
        return
      }
      wx.showLoading({
        title: '生成中'
      })
      this.setData({
        imgDraw: {
          width: '730rpx',
          height: '850rpx',
          borderRadius: '16rpx',
          // background: '/pages/images/1-1.png',
          views: [
            {
              type: 'image',
              url: '/pages/images/xty14.png',
              css: {
                top: '50rpx',
                left: '100rpx',
                // right: '32rpx',
                width: '270rpx',
                height: '270rpx',
                // borderRadius: '16rpx'
              },
            },
            {
              type: 'image',
              url: '/pages/images/xty9.png',
              css: {
                top: '70rpx',
                left: '370rpx',
                width: '280rpx',
                height: '180rpx',
              }
            },
            {
              type: 'image',
              url: '/pages/images/xty15.png',
              css: {
                top: '100rpx',
                left: '460rpx',
                width: '150rpx',
                height: '100rpx',
              }
            },
            {
              type: 'text',
              text: '我以兄弟单身一辈子发誓',
              css: {
                top: '380rpx',
                fontSize: '30rpx',
                fontWeight: 'bold',
                left: '365rpx',
                align: 'center',
              }
            },
            {
              type: 'text',
              text: '从今天起',
              css: {
                top: '430rpx',
                fontSize: '36rpx',
                fontWeight: 'bold',
                left: '365rpx',
                align: 'center',
              }
            },
            {
              type: 'text',
              text: '我要用' + wx.getStorageSync("targetDay") + '天',
              css: {
                top: '480rpx',
                fontSize: '36rpx',
                fontWeight: 'bold',
                left: '365rpx',
                align: 'center',
              }
            },
            {
              type: 'text',
              text: '减掉' + wx.getStorageSync("weightLoss")*2 + '斤',
              css: {
                top: '530rpx',
                fontSize: '36rpx',
                fontWeight: 'bold',
                left: '365rpx',
                align: 'center',
              }
            },
            {
              type: 'text',
              text: '请兄弟们监督',
              css: {
                top: '580rpx',
                fontSize: '36rpx',
                fontWeight: 'bold',
                left: '365rpx',
                align: 'center',
              }
            },
            {
              type: 'text',
              text: '健康番茄',
              css: {
                top: '750rpx',
                fontSize: '30rpx',
                fontWeight: 'bold',
                left: '365rpx',
                align: 'center',
                color: '#26da40'
              }
            },
            {
              type: 'image',
              url: 'https://qiniu-image.qtshe.com/20190605index.jpg',
              css: {
                top: '640rpx',
                left: '470rpx',
                width: '150rpx',
                height: '150rpx'
              }
            }
          ]
        }
      })
    },
    onImgErr(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
    },
    onImgOK(e) {
      wx.hideLoading()
      this.setData({
        sharePath: e.detail.path,
        visible: true,
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData') 
    },
    preventDefault() { },
    // 保存图片
    savePhoto(path) {
      wx.showLoading({
        title: '正在保存...',
        mask: true
      })
      this.setData({
        isDrawImage: false
      })
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
          setTimeout(() => {
            this.setData({
              visible: false
            })
          }, 300)
        },
        fail: (res) => {
          wx.getSetting({
            success: res => {
              let authSetting = res.authSetting
              if (!authSetting['scope.writePhotosAlbum']) {
                this.setData({
                  isModal: true
                })
              }
            }
          })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({
              visible: false
            })
          }, 300)
        }
      })
    }
  }
})
