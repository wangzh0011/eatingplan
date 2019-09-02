// pages/plandetails/plandetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowWidth: wx.getStorageSync("windowWidth"),
      windowHeight: wx.getStorageSync("windowHeight"),
    })
  },

  onTap: function () {
    var username = this.data.username;
    if(username != undefined && parseInt(username.length) > 0) {
      username = username.trim();
    }
    if(username == undefined || username == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      this.setData({
        value: ""
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/plandetails/plandetails?username=' + username,
      success: (result)=>{
          
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  inputTap: function (e) {
    var username = e.detail.value;
    this.setData({
      username: username,
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