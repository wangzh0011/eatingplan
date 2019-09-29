// pages/plandetails/plandetails.js

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["早餐", "午餐","晚餐"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    weightLoss: '',
    showFanqie: false,
    isCanDraw: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var username = options.username;
    //早餐数组
    var breakfastArray = wx.getStorageSync("breakfastArray");
    console.log(breakfastArray)
    //午餐数组
    var lunchArray = wx.getStorageSync("lunchArray");
    console.log(lunchArray)
    //晚餐数组
    var dinnerArray = wx.getStorageSync("dinnerArray");
    console.log(dinnerArray)

    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      title_area_width: app.position.title_area_width,
      title_area_top: app.position.title_area_top,
      title_area_left: app.position.title_area_left,
      username: username,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      atbs_pic_style: app.systemInfo.windowHeight/24,
      breakfastArray: breakfastArray,
      lunchArray: lunchArray,
      dinnerArray: dinnerArray
    })

    var weight = wx.getStorageSync("weight");//目前体重
    var targetWeight = wx.getStorageSync("targetWeight");//目标体重
    var targetDay = wx.getStorageSync("targetDay");//目标用时
    var referDay = wx.getStorageSync("referDay");//建议用时
    var sex = wx.getStorageSync("sex");//性别
    var weightLoss = weight - targetWeight;//减重
    if (weightLoss > 20) {
      weightLoss = 20;//封顶20
    }
    if (targetDay > referDay) {
      targetDay = referDay;//封顶建议用时
    }

    //日消
    var dayExp = this.dayExp(weight,sex);
    //基耗
    var totalExp = this.totalExp(dayExp);
    //每日应摄入总量
    var food = this.food(dayExp,weightLoss,targetDay);
    //早餐摄入热量
    var breakfast = food*0.3;
    //午餐摄入热量
    var lunch = food*0.4;
    //晚餐摄入热量
    var dinner = food*0.4;

    this.setData({
      breakfast: Math.round(breakfast),
      lunch: Math.round(lunch),
      dinner: Math.round(dinner),
      sex: sex,
      targetDay: targetDay,
      weightLoss: weightLoss
    })

    wx.setStorageSync("weightLoss", weightLoss);
    wx.setStorageSync("targetDay", targetDay);
    wx.setStorageSync("totalExp", totalExp);
    wx.setStorageSync("dayExp", dayExp);
  },

  /**
   * 计算每日应摄入总量
   * @param {*} dayExp 
   * @param {*} weight 
   * @param {*} targetDay 
   */
  food: function (dayExp,weight,targetDay) {
    return dayExp - (weight*2/targetDay)*32216.8;
  },

  /**
   * 计算日消
   * @param {体重} weight 
   * @param {性别} sex 
   */
  dayExp: function (weight,sex) {
    if (sex == 'man') {
      return weight*2*10*4.184;
    } else {
      return weight*2*9*4.184;
    }
  },

  /**
   * 基耗
   * @param {日消} dayExp 
   */
  totalExp: function (dayExp) {
    return (Math.round(dayExp)+476.976)*1.1;
  },

  /**
   * tab点击事件
   */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**分享按钮 */
  onShare: function () {
    this.setData({
      showFanqie: true
    })
  },

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
      appId: app.fanqieInfo.appid,
      path: 'pages/index/index?shareid=' + wx.getStorageSync("wxData").id,
      extraData: {
      },
      envVersion: 'trial',   /*develop	开发版	trial	体验版	release 正式版*/
      success(res) {
        // 打开成功
      }
    })
  },

  /**
   * 朋友圈分享
   */
  createShareImage() {
    this.setData({
      isCanDraw: !this.data.isCanDraw,
      showFanqie: false
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
    // wx.request({
    //   url: app.data.server + 'getFoods',
    //   data: {
        
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