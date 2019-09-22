// pages/plandetails/plandetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    showFanqie: false,
    showTabs: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      atbs_pic_style: app.systemInfo.windowHeight/24,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      textDesc: '中国人现状每100人中就有10个不同程度的肥胖症，而肥胖是各种慢性疾病的主要高危元素国际和国家专家报告，为预防慢性病呼吁群众采取健康饮食计划。'
    })
  },

  onTap: function () {
    var username = this.data.username;
    
    if(username.trim() == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1500,
      });
      this.setData({
        value: ""
      })
      return;
    }

      wx.request({
      url: app.data.server + 'pay',
      data: {
        openId: wx.getStorageSync("wxData").openid
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        wx.requestPayment({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
          success (res) { },
          fail (res) { }
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });


    wx.navigateTo({
      url: '/pages/plandetails/plandetails?username=' + username,
      success: (result)=>{
          
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 获取用户名
   * @param {*} e 
   */
  inputTap: function (e) {
    var username = e.detail.value;
    this.setData({
      username: username,
    })
  },

  /**
   * 弹出健康番茄页面
   */
  fanqieTap: function () {
    this.setData({
      showFanqie: true,
      showTabs: true
    })
  },

  /**
   * 关闭健康番茄页面
   */
  closeTap: function () {
    this.setData({
      showFanqie: false
    })
  },

  /**
   * 跳转到赚番茄小程序
   */
  navigateToFanqieTap: function () {
    wx.navigateToMiniProgram({
      appId: 'wxc93c5a0a640a29bb',
      path: 'pages/index/index',
      extraData: {
      },
      envVersion: 'trial',/*develop	开发版	trial	体验版	release 正式版*/
      success(res) {
        // 打开成功
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})