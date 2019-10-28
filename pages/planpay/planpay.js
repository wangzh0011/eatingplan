// pages/plandetails/plandetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    showFanqie: false,
    showTabs: false,
    isCanDraw: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
      textDesc: '如今，成年人的现状，每10个人中就有1个胖子，这1个人会受到社会的区别对待，同事的眼光，异性的审视，心里的健康，和身体的负担。在一场面试中也许你自诩认真热情，但少不了别人一个自制力差的疑问，在异性眼中也许你觉得自身活泼可爱，但其实你自己也明白，如果可以，你更希望惊艳到别人，而不是只能对别人说自己可爱，过去减肥是一个难以逾越的坎，但现在我希望你相信《AI减肥计划》能帮到你。',
      rmb: wx.getStorageSync("systemConf").rmb,
      sex: wx.getStorageSync("sex")
    })

    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享'+res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })

  },

  onTap: function () {
    var username = this.data.username;
    wx.setStorageSync("username",username)
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

    //支付请求
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
        console.log(result.data)
        //小程序发起支付
        wx.requestPayment({
          timeStamp: result.data.pay.timeStamp,
          nonceStr: result.data.pay.nonceStr,
          package: result.data.pay.package_pay,
          signType: 'MD5',
          paySign: result.data.pay.paySign,
          success (res) {
            console.log("支付成功")
            console.log(res)


            //早餐数组
            var breakfastArray = wx.getStorageSync("breakfastArray");
            
            //午餐数组
            var lunchArray = wx.getStorageSync("lunchArray");
            
            //晚餐数组
            var dinnerArray = wx.getStorageSync("dinnerArray");
          
            //用户食谱
            wx.request({
              url: app.data.server + 'saveUserFoods',
              data: {
                breakfastArray: breakfastArray,
                lunchArray: lunchArray,
                dinnerArray: dinnerArray,
                uid: wx.getStorageSync("wxData").id
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



            //保存支付记录
            wx.request({
              url: app.data.server + 'savePayOrder',
              data: {
                uid: wx.getStorageSync("wxData").id,
                openid: wx.getStorageSync("wxData").openid,
                tradeNo: result.data.orderParameter.trade_no,
                totalFee: result.data.orderParameter.total_fee
              },
              header: {'content-type':'application/json'},
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: (result)=>{
                //跳转到支付之后的页面
                wx.reLaunch({
                  url: '/pages/plandetails/plandetails?username=' + username,
                  success: (result)=>{
                      // wx.setStorageSync("payFlag","Y")//已支付标识
                      
                  }
                });
                
              },
              fail: ()=>{},
              complete: ()=>{}
            });
          },
          fail (res) { }
        })
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
    //获取二维码
    app.getQcCode();
    setTimeout(() => {
      this.setData({
        image: app.data.uploadUrl + wx.getStorageSync("image"),//二维码图片
        showFanqie: true,
        showTabs: true
      })
    }, 300);
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
    
    var id = wx.getStorageSync("wxData").id
    var that = this
    // 查看是否授权
    wx.getSetting({
        success (res){
            if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                    success: function(res) {
                        console.log(res.userInfo)
                        app.updateUser(id,res.userInfo)
                    }
                })
                wx.navigateTo({
                  url: '/pages/lucky/lucky',
                  success: (result)=>{
                    
                  },
                  fail: ()=>{},
                  complete: ()=>{}
                });
            }
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