// pages/dinner/dinner.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodsList: [
                
              ],
    dinner: '',
    img: []          
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: "数据加载中",
      mask: true,
    });

    var that = this;
    wx.request({
      url: app.data.server + '/foods',
      data: {
        type: "dinner"
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        that.setData({
          foodsList: result.data
        })
        wx.hideLoading();
      },
      fail: ()=>{},
      complete: ()=>{}
    });

    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      title_area_width: app.position.title_area_width,
      title_area_top: app.position.title_area_top,
      title_area_left: app.position.title_area_left,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      serverUrl: app.data.uploadUrl,
      imgWidth: app.systemInfo.windowWidth/8,
    })
  },

  onTap: function () {

    var dinner = this.data.dinner;
    if (dinner == '') {
      wx.showToast({
        title: '请至少选择一种食物作为晚餐',
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

    // //早餐数组
    // var breakfastArray = wx.getStorageSync("breakfastArray");
            
    // //午餐数组
    // var lunchArray = wx.getStorageSync("lunchArray");
    
    // //晚餐数组
    // var dinnerArray = wx.getStorageSync("dinnerArray");
  
    // console.log(breakfastArray)
    // //用户食谱
    // wx.request({
    //   url: app.data.server + 'saveUserFoods',
    //   data: {
    //     breakfastArray: breakfastArray,
    //     lunchArray: lunchArray,
    //     dinnerArray: dinnerArray,
    //     uid: wx.getStorageSync("wxData").id
    //   },
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result)=>{
        
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });

    if (wx.getStorageSync("hasPay") != true) {
      wx.navigateTo({
        url: '/pages/planpay/planpay',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    } else {
      wx.navigateTo({
        url: '/pages/plandetails/plandetails?username=' + wx.getStorageSync("username"),
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  },

  /**
   * 触发CheckBox
   */
  checkboxChange: function (e) {

    //后续使用请求后台的方式获取对象

    var dinner = e.detail.value;
    for (const key in dinner) {
      dinner[key] = dinner[key].split(",")
    }

    this.setData({
      dinner: dinner
    })

    wx.setStorageSync("dinnerArray",dinner);
  },

  /**
   * 预览图片
   */
  previewImageTap: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var img = this.data.img;
    img[0] = this.data.foodsList[index].imgUrl;
    wx.previewImage({
      urls: img,
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
  // onShareAppMessage: function () {

  // }
})