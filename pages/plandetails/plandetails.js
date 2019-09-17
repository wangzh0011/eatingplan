// pages/plandetails/plandetails.js
import * as echarts from '../../ec-canvas/echarts';

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();

function getBarOption(weightLoss,targetDay,totalExp,dayExp) {
  var weightLoss = wx.getStorageSync("weightLoss")
  var targetDay = wx.getStorageSync("targetDay")
  var totalExp = wx.getStorageSync("totalExp")
  totalExp = Math.round(totalExp)
  var dayExp = wx.getStorageSync("dayExp")
  dayExp = Math.round(dayExp)
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 10,
      containLabel: true,
      height: 100,
      width: app.systemInfo.windowWidth-50
    },
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["减重","天数","基耗","日消"]
    },
    yAxis: {},
    series: [{
        type: 'bar',
        data: [weightLoss, targetDay, totalExp, dayExp],
        itemStyle : { normal: {label : {show: true}}},
        // color: ['#2f4554', '#61a0a8', ]
        color: function(params) { 
          var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
          return colorList[params.dataIndex] 
      }
    }]
  };
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["早餐", "午餐","晚餐"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    itemslist: ["","","","","",],
    weightLoss: '',
    showFanqie: false,

    ecBar: {
      // 如果想要禁止触屏事件，以保证在图表区域内触摸移动仍能滚动页面，
      // 就将 disableTouch 设为 true
      disableTouch: true,
      onInit: function (canvas, width, height) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());

        return barChart;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var username = options.username;
    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      title_area_width: app.position.title_area_width,
      title_area_top: app.position.title_area_top,
      title_area_left: app.position.title_area_left,
      username: username,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      atbs_pic_style: app.systemInfo.windowHeight/24
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: app.data.server + 'getFoods',
      data: {
        
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