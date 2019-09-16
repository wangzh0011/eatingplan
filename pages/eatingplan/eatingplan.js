// pages/eatingplan/eatingplan.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetWeight: '',
    targetDay: '',
    weightArray: [],
    dayArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var BMI = wx.getStorageSync("BMI");
    var height = wx.getStorageSync("height");
    var sex = wx.getStorageSync("sex");
    var referWeight = this.referWeight(height,sex);
    var referDay = this.referDay(BMI);
    var weightArray = this.data.weightArray;
    var dayArray = this.data.dayArray;

    /**设置目标体重数组 */
    for (let index = 0,targetWeight = referWeight - 15; targetWeight <= referWeight; index++,targetWeight++) {
      weightArray[index] = targetWeight;
    }
    /**设置计划用时数组 */
    for (let index = 0,targetDay = referDay - 30; targetDay <= (Math.round(referDay) + 30); index++,targetDay++) {
      dayArray[index] = targetDay;
    }

    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      title_area_width: app.position.title_area_width,
      title_area_top: app.position.title_area_top,
      title_area_left: app.position.title_area_left,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      referWeight: referWeight,
      referDay: referDay,
      weightArray: weightArray,
      dayArray: dayArray
    })

    wx.setStorageSync("referDay",referDay);
  },

  /**
   * 验证输入的是否为数字
   * @param {*} para 
   */
  validate: function (para) {
    if(!/^[0-9]{1,}$/.test(para)){
      wx.showToast({
        title: '请输入正确的数值',
        icon: 'none',
        duration: 1500,
      });
      return false;
    }
  },


  /**
   * 目标体重
   */
  targetWeightTap: function (e) {
    var index = e.detail.value;
    var weightArray = this.data.weightArray;
    // if (this.validate(targetWeight) == false) {
    //   this.setData({
    //     targetWeight: ''
    //   })
    //   return;
    // } 
    this.setData({
      targetWeight: weightArray[index],
      index_weight: index
    })
    wx.setStorageSync("targetWeight",weightArray[index]);
  },

  /**
   * 目标天数
   */
  targetDayTap: function (e) {
    var index = e.detail.value;
    var dayArray = this.data.dayArray;
    // if (this.validate(targetDay) == false) {
    //   this.setData({
    //     targetDay: ''
    //   })
    //   return;
    // } 
    this.setData({
      targetDay: dayArray[index],
      index_day: index
    })
    wx.setStorageSync("targetDay",dayArray[index]);
  },

  /**
   * 参考体重
   * @param {身高} height 
   * @param {性别} sex 
   */
  referWeight: function (height,sex) {

    if(height < 80) {
      return wx.getStorageSync("weight")
    }

    if (sex == 'man') {
      return Math.round((height-80)*0.7)
    } else {
      return Math.round((height-70)*0.6)
    }
  },

  /**
   * 建议天数
   * @param {BMI指数} BMI 
   */
  referDay: function (BMI) {
    if (BMI < 18.5) {
      return '60'
    } else if (BMI >= 18.5 && BMI < 24) {
      return '30'
    } else if (BMI >= 24 && BMI < 28) {
      return '45'
    } else if (BMI >= 28 && BMI < 35) {
      return '60'
    } else if (BMI >= 35 && BMI < 40) {
      return '90'
    } else if (BMI >= 40) {
      return '180'
    }
  },

  onTap: function () {

    var targetDay = this.data.targetDay;
    var targetWeight = this.data.targetWeight;

    if (targetWeight == '') {
      wx.showToast({
        title: '请输入目标体重',
        icon: 'none',
        duration: 1500,
      });
      this.setData({
        targetWeight: ''
      })
      return;
    } else if (targetDay == '') {
      wx.showToast({
        title: '请输入计划用时',
        icon: 'none',
        duration: 1500,
      });
      this.setData({
        targetDay: ''
      })
      return;
    }

    wx.navigateTo({
      url: '/pages/planpay/planpay',
      success: (result)=>{
          
      },
      fail: ()=>{},
      complete: ()=>{}
  });
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