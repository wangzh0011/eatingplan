// pages/lunch/lunch.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodsList: [
                {imgUrl: "../images/6-5.png", name: "豆浆"},
                {imgUrl: "../images/6-6.png", name: "油条"},
                {imgUrl: "../images/6-5.png", name: "豆浆"},
                {imgUrl: "../images/6-6.png", name: "油条"},
                {imgUrl: "../images/6-5.png", name: "豆浆"},
                {imgUrl: "../images/6-6.png", name: "油条"},
                {imgUrl: "../images/6-5.png", name: "豆浆"},
                {imgUrl: "../images/6-6.png", name: "油条"},
                {imgUrl: "../images/6-5.png", name: "豆浆"},
                {imgUrl: "../images/6-6.png", name: "油条"},
                {imgUrl: "../images/6-5.png", name: "豆浆"},
                {imgUrl: "../images/6-6.png", name: "油条"},
              ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      title_area_width: app.position.title_area_width,
      title_area_top: app.position.title_area_top,
      title_area_left: app.position.title_area_left,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
    })
  },

  onTap: function () {
    wx.navigateTo({
      url: '/pages/dinner/dinner',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 触发CheckBox
   */
  checkboxChange: function (e) {

    //后续使用请求后台的方式获取对象

    var lunch = e.detail.value;
    for (const key in lunch) {
      lunch[key] = lunch[key].split(",")
    }
    wx.setStorageSync("lunchArray",lunch);
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