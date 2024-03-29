//app.js
App({

  /**请求后台url */
  data: {
    uploadUrl:
      // "http://127.0.0.1:8080/upload/",
      "https://fangqie.top/upload/",
    server:
      // "http://127.0.0.1:8080/eatingplan/"  
      "https://fangqie.top/eatingplan/"  
  },

  onLaunch: function (e) {
    var that = this;

    // console.log(e.referrerInfo.extraData)

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
      // // 登录
      // wx.login({
      //   success: res => {
      //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //     wx.request({
      //       url: this.data.server + 'login',
      //       data: {
      //         code: res.code,
      //         type: 'JK'
      //       },
      //       header: {'content-type':'application/json'},
      //       method: 'GET',
      //       dataType: 'json',
      //       responseType: 'text',
      //       success: (result)=>{
      //         console.log("微信接口返回数据：")
      //         console.log(result.data)
      //         this.userInfo.userInfo = result.data//将openId, sessionKey, unionId赋值给userInfo.userInfo
      //         wx.setStorageSync("wxData",result.data);//已注册用户返回openID和id，未注册用户返回openID
                
      //           //查询用户是否支付
      //           if(wx.getStorageSync("hasPay") != true && result.data.id != undefined) {
      //               console.log("判断用户是否支付 uid: " + result.data.id)
      //               wx.request({
      //                   url: that.data.server + 'getPayOrder',
      //                   data: {
      //                       uid: wx.getStorageSync("wxData").id
      //                   },
      //                   header: {'content-type':'application/json'},
      //                   method: 'GET',
      //                   dataType: 'json',
      //                   responseType: 'text',
      //                   success: (result)=>{
      //                       if(result.data == true) {
      //                           console.log("app,js 已支付")
      //                           wx.setStorageSync("hasPay", result.data);
      //                       }
      //                   },
      //                   fail: ()=>{},
      //                   complete: ()=>{}
      //               });
      //           }

      //           if(result.data.id != undefined){
      //             this.getQcCode()
      //           }

      //         //由于 login 是网络请求，可能会在 Page.onLoad 之后才返回
      //         // 此处加入 callback 以防止这种情况
      //         if (this.loginCallback) {
      //           this.loginCallback(res)
      //         }
      //       },
      //       fail: ()=>{},
      //       complete: ()=>{}
      //     });
      //   }
      // })
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
            version: result.version,
            isPay: 'N'
          },
          success: (res)=> {

          }
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
     * 更新用户
     * @param {*} id 
     * @param {*} userInfo 
     */
    updateUser: function (id,userInfo) {
      wx.request({
          url: this.data.server + 'updateUser',
          data: {
              id: id,
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
              gender: userInfo.gender,
              province: userInfo.province,
              city: userInfo.city,
              country: userInfo.country
          },
          header: {'content-type':'application/json'},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result)=>{
              
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
  },

  getQcCode: function () {
    if(!wx.getStorageSync("image")){
      /**获取小程序码 begin */
      var qcCode = {
        "path": 'pages/index/index?shareuid=' + wx.getStorageSync("wxData").id
      }
  
      wx.request({
        url: this.data.server + 'getWxacode',
        data: {
          path: JSON.stringify(qcCode)
        },
        header: {'content-type':'application/x-www-form-urlencoded'},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
          console.log(result.data)
          wx.setStorageSync("image",result.data.imageName)
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      /**end */
    }
  }

})