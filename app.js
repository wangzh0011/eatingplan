//app.js
App({

  /**请求后台url */
  data: {
    uploadUrl:
      "http://127.0.0.1:8080/upload/",
      // "http://120.24.5.8:8080/upload/",
    server:
      "http://127.0.0.1:8080/eatingplan/"  
      // "http://120.24.5.8:8080/eatingplan/"  
  },

  onLaunch: function () {
    var that = this;

    //获取配置信息
    wx.request({
      url: this.data.server + 'getParameters',
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result.data)
        wx.setStorageSync("systemConf",result.data)
      },
      fail: ()=>{},
      complete: ()=>{}
    });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // if (!wx.getStorageSync("wxData")) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: this.data.server + 'login',
            data: {
              code: res.code
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
              console.log("微信接口返回数据：")
              console.log(result.data)
              this.userInfo.userInfo = result.data//将openId, sessionKey, unionId赋值给userInfo.userInfo
              wx.setStorageSync("wxData",result.data);//已注册用户返回openID和id，未注册用户返回openID
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      })
    // }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //获取设备信息
    wx.getSystemInfo({
      success: (result)=>{
        that.systemInfo.windowWidth = result.windowWidth,
        that.systemInfo.windowHeight = result.windowHeight
        that.position.title_area_width = result.windowWidth/1.7,
        that.position.title_area_top = result.windowHeight/18.6,
        that.position.title_area_left = (result.windowWidth-result.windowWidth/1.7)/2,
        that.btn.btn_width = result.windowWidth/1.6,
        that.btn.btn_height = result.windowHeight/10
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 保存分享信息
   */
  setShareInfo: function (uid,shareuid) {
    var that = this;
    wx.getSystemInfo({
      success: (result)=>{
        wx.request({
          url: that.data.server + 'setShareInfo',
          data: {
            uid: uid,
            shareuid: shareuid,
            brand: result.brand,
            model: result.model,
            system: result.system,
            pixelRatio: result.pixelRatio,
            language: result.language,
            version: result.version
          },
          success: (res)=> {

          }
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },


  globalData: {
    userInfo: null
  },

  systemInfo: {
    windowWidth: null,
    windowHeight: null
  },

  position: {
    title_area_width: null,
    title_area_top: null,
    title_area_left: null,
  },

  btn: {
    btn_width: null,
    btn_height: null
  },

  userInfo: {
    userInfo: null
  },

  fanqieInfo: {
    appid: 'wx18a384bbb3417f19'
  }

})