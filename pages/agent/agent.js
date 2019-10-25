// pages/agent/agent.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFanqie: false,
    isCanDraw: false,
    showGetmoney: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: app.data.server + 'getAgentData',
      data: {
        uid: wx.getStorageSync("wxData").jkId
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result.data)
        var agentData = result.data;

        var yesterdayHasPay = agentData.yesterdayHasPay;
        var yesterdayNotPay = agentData.yesterdayNotPay;
        var beforeYesterdayHasPay = agentData.beforeYesterdayHasPay;
        var beforeYesterdayNotPay = agentData.beforeYesterdayNotPay;
        var todayHasPay = agentData.todayHasPay;
        var todayNotPay = agentData.todayNotPay;
        //找出最大值
        var max = Math.max(yesterdayHasPay,yesterdayNotPay,beforeYesterdayHasPay,beforeYesterdayNotPay,todayHasPay,todayNotPay)
        
        this.setData({
          money: wx.getStorageSync("money"),
          //计算统计表中各个数据的高度
          yesterdayHasPayPercentage: Math.round(yesterdayHasPay/max*100) + "%",
          yesterdayNotPayPercentage: Math.round(yesterdayNotPay/max*100) + "%",
          beforeYesterdayHasPayPercentage: Math.round(beforeYesterdayHasPay/max*100) + "%",
          beforeYesterdayNotPayPercentage: Math.round(beforeYesterdayNotPay/max*100) + "%",
          todayHasPayPercentage: Math.round(todayHasPay/max*100) + "%",
          todayNotPayPercentage: Math.round(todayNotPay/max*100) + "%",
          //各个数据
          yesterdayHasPay: yesterdayHasPay,
          yesterdayNotPay: yesterdayNotPay,
          beforeYesterdayHasPay: beforeYesterdayHasPay,
          beforeYesterdayNotPay: beforeYesterdayNotPay,
          todayHasPay: todayHasPay,
          todayNotPay: todayNotPay,
        })
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
   * 提现
   */
  getmoneyTap: function() {
    this.setData({
      showGetmoney: true,
      getmoneyText: '由于微信资金交易限制 暂时只提供人工结现 请添加人工客服：duang_2c(林雨)备注提现及提供微信账号 我们会在1个工作日内核实并将佣金返现给您。'
    })
  },

  /**
   * 关闭提现
   */
  closeGetmoney: function () {
    this.setData({
      showGetmoney: false,
    })
  },

  /**
   * 返回计划
   */
  toJKTap: function () {
    
  },

  /**
   * 去推广
   */
  toShare: function () {
    this.setData({
      showFanqie: true,
    })
  },

  /**
   * 关闭 去推广
   */
  closeTap: function () {
    this.setData({
      showFanqie: false
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
    return {
      title: "您的好友向您推荐健康番茄瘦小程序",
      path: '/pages/index/index?shareuid=' + wx.getStorageSync("wxData").id,
      success: function (res) {
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log("分享成功") },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})