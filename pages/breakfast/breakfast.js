// pages/breakfast/breakfast.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodsList: [
                
              ],
    breakfast: ''          
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.data.server + '/foods',
      data: {
        type: "breakfast"
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        that.setData({
          foodsList: result.data
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });


    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      imgWidth: app.systemInfo.windowWidth/8,
      windowHeight: app.systemInfo.windowHeight,
      title_area_width: app.position.title_area_width,
      title_area_top: app.position.title_area_top,
      title_area_left: app.position.title_area_left,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      serverUrl: app.data.uploadUrl
    })
  },

  /**下一页 */
  onTap: function () {
    var breakfast = this.data.breakfast;
    if (breakfast == '') {
      wx.showToast({
        title: '至少选择一种食物作为早餐',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/lunch/lunch',
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

    var breakfast = e.detail.value;
    for (const key in breakfast) {
      breakfast[key] = breakfast[key].split(",")
    }
    //控制页面跳转
    this.setData({
      breakfast: breakfast
    })
    //在计划详情里显示
    wx.setStorageSync("breakfastArray",breakfast);
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