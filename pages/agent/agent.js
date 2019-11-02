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

    this.getAgentData();

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
   * 获取代理数据
   */
  getAgentData: function () {
    wx.request({
      url: app.data.server + 'getAgentData',
      data: {
        uid: wx.getStorageSync("wxData").id
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result.data)
        var agentData = result.data;

        var yesterdayHasPay = agentData.agentData.yesterdayHasPay;
        var yesterdayNotPay = agentData.agentData.yesterdayNotPay;
        var beforeYesterdayHasPay = agentData.agentData.beforeYesterdayHasPay;
        var beforeYesterdayNotPay = agentData.agentData.beforeYesterdayNotPay;
        var todayHasPay = agentData.agentData.todayHasPay;
        var todayNotPay = agentData.agentData.todayNotPay;
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
          yesterdayHasPay: yesterdayHasPay == 0 ? "" : yesterdayHasPay,
          yesterdayNotPay: yesterdayNotPay == 0 ? "" : yesterdayNotPay,
          beforeYesterdayHasPay: beforeYesterdayHasPay == 0 ? "" : beforeYesterdayHasPay,
          beforeYesterdayNotPay: beforeYesterdayNotPay == 0 ? "" : beforeYesterdayNotPay,
          todayHasPay: todayHasPay == 0 ? "" : todayHasPay,
          todayNotPay: todayNotPay == 0 ? "" : todayNotPay,

          sex: wx.getStorageSync("sex"),
          hover_stay_time: 200,
          id: wx.getStorageSync("wxData").id
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 提现
   */
  getmoneyTap: function() {

    var money = this.data.money;
    setTimeout(() => {
      if (money <= 0) {
        wx.showToast({
          title: '还没有可提现现金！',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
        });
      } else {
        this.setData({
          showGetmoney: true,
          getmoneyText: '由于微信资金交易限制 暂时只提供人工结现 请添加人工客服：duang_2c(林雨)备注提现及提供微信账号 我们会在1个工作日内核实并将佣金返现给您。'
        })
      }
    }, 300);

  },

  /**
   * 关闭提现
   */
  closeGetmoney: function () {
    setTimeout(() => {
      this.setData({
        showGetmoney: false,
      })
    }, 300);
  },

  /**
   * 返回计划
   */
  toJKTap: function () {
    var hasPay = wx.getStorageSync("hasPay")

    setTimeout(() => {
      if (hasPay == true) {
        wx.reLaunch({
          url: '/pages/plandetails/plandetails',
        });
      } else {
        wx.reLaunch({
          url: '/pages/planpay/planpay',
        });
      }
    }, 300);
  },

  /**
   * 去推广
   */
  toShare: function () {
    app.getQcCode();
    setTimeout(() => {
      this.setData({
        image: app.data.uploadUrl + wx.getStorageSync("image"),//二维码图片
        showFanqie: true,
      })
    }, 300);
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getAgentData()
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
    
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
      title: "您的好友向您推荐AI减肥计划小程序",
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