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
    isCanDraw: false,
    img: [],
    username: "我",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    wx.setStorageSync("showIndex","true")

    var that = this;
    var username = options.username;
    

    var weight = wx.getStorageSync("weight");//目前体重
    var targetWeight = wx.getStorageSync("targetWeight");//目标体重
    var targetDay = wx.getStorageSync("targetDay");//目标用时
    var referDay = wx.getStorageSync("referDay");//建议用时
    var sex = wx.getStorageSync("sex");//性别
    var weightLoss = weight - targetWeight;//减重
    var level = wx.getStorageSync("level")//运动量
    if (weightLoss > 20) {
      weightLoss = 20;//封顶20
    }
    if (targetDay > referDay) {
      targetDay = referDay;//封顶建议用时
    }

    //日消
    var dayExp = this.dayExp(weight,sex);
    //体力活动所需热量
    var LevelExp = this.LevelExp(level,weight);
    //标准每日摄入热量
    var totalExp = this.totalExp(dayExp,LevelExp);
    //每日应摄入总量
    var food = this.food(totalExp,weightLoss,targetDay);
    if (isNaN(food)) {
      food = wx.getStorageSync("wxData").food
    }
    //早餐摄入热量
    var breakfast = food*0.3;
    //午餐摄入热量
    var lunch = food*0.4;
    //晚餐摄入热量
    var dinner = food*0.4;

    //早餐数组
    var breakfastArray = wx.getStorageSync("breakfastArray");
    for (const key in breakfastArray) {
      breakfastArray[key][4] = (breakfast/breakfastArray[key][2]).toFixed(1)
    }
    //午餐数组
    var lunchArray = wx.getStorageSync("lunchArray");
    for (const key in lunchArray) {
      lunchArray[key][4] = (lunch/lunchArray[key][2]).toFixed(1)
    }
    //晚餐数组
    var dinnerArray = wx.getStorageSync("dinnerArray");
    for (const key in dinnerArray) {
      dinnerArray[key][4] = (dinner/dinnerArray[key][2]).toFixed(1)
    }

    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      title_area_width: app.position.title_area_width,
      title_area_top: app.position.title_area_top,
      title_area_left: app.position.title_area_left,
      username: username == (undefined || "") ? this.data.username : username,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      atbs_pic_style: app.systemInfo.windowHeight/24,
      breakfastArray: breakfastArray,
      lunchArray: lunchArray,
      dinnerArray: dinnerArray,

      breakfast: Math.round(breakfast),
      lunch: Math.round(lunch),
      dinner: Math.round(dinner),
      sex: sex,
      targetDay: targetDay,
      weightLoss: weightLoss
    })
    console.log("food " + food)
    console.log(isNaN(food))
    //更新用户
    if(!isNaN(food)){
      this.updateUser(wx.getStorageSync("wxData").id,food);
    }

    //没有缓存 读数据库
    if(dinnerArray.length == 0){
      this.getUserFoods(breakfast,lunch,dinner)
    }

  },

  /**
   * 更新用户
   * @param {*} id 
   * @param {*} food 
   */
  updateUser: function (id,food) {
    wx.request({
        url: app.data.server + 'updateUser',
        data: {
            id: id,
            food: food,
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
   * 获取用户食谱
   */
  getUserFoods: function (breakfast,lunch,dinner) {
    wx.request({
      url: app.data.server + 'getUserFoods',
      data: {
        uid: wx.getStorageSync("wxData").id
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result.data.foods)
        var foods = result.data.foods;
        //早餐
        var breakfastArray = foods.breakfastArray;
        for (const key in breakfastArray) {
          breakfastArray[key][4] = (breakfast/breakfastArray[key][2]).toFixed(1)

        }
        //午餐
        var lunchArray = foods.lunchArray;
        for (const key in lunchArray) {
          lunchArray[key][4] = (lunch/lunchArray[key][2]).toFixed(1)
          
        }
        //晚餐
        var dinnerArray = foods.dinnerArray;
        for (const key in dinnerArray) {
          dinnerArray[key][4] = (dinner/dinnerArray[key][2]).toFixed(1)
          
        }

        this.setData({
          breakfastArray: breakfastArray,
          lunchArray: lunchArray,
          dinnerArray: dinnerArray,
        })
        wx.setStorageSync("breakfastArray",breakfastArray)
        wx.setStorageSync("lunchArray",lunchArray)
        wx.setStorageSync("dinnerArray",dinnerArray)
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 计算每日应摄入总量
   * @param {*} dayExp 
   * @param {*} weight 
   * @param {*} targetDay 
   */
  food: function (dayExp,weight,targetDay) {
    return dayExp - (weight/targetDay)*7700;
  },

  /**
   * 计算日消
   * @param {体重} weight 
   * @param {性别} sex 
   */
  dayExp: function (weight,sex) {
    if (sex == 'man') {
      return weight*2*10;
    } else {
      return weight*2*9;
    }
  },

  /**
   * 体力活动所需热量
   * @param {运动量} level 
   * @param {体重} weight 
   */
  LevelExp: function (level,weight) {
    if (level == 'level3') {
      return weight * 20;
    } else if (level == 'level2') {
      return weight * 10;
    } else {
      return weight * 8;
    }
  },

  /**
   * 标准每日摄入热量
   * @param {日消} dayExp 
   */
  totalExp: function (dayExp,LevelExp) {
    return (Math.round(dayExp)+LevelExp)*1.1;
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
    //获取二维码
    app.getQcCode();
    setTimeout(() => {
      this.setData({
        image: app.data.uploadUrl + wx.getStorageSync("image"),//二维码图片
        showFanqie: true
      })
    }, 300);
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
                /**
                 * 获取分享信息
                 */
                  wx.request({
                    url: app.data.server + 'getShareInfo',
                    data: {
                      shareuid: id //自己的id  jkid
                    },
                    header: {'content-type':'application/json'},
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: (result)=>{
                      var isAgent = result.data.shareInfo.isAgent;//是否是代理
                      var money = result.data.shareInfo.money;//佣金
                      wx.setStorageSync("money",money)
                      console.log(isAgent)
                      if (isAgent == 'Y') {
                        wx.navigateTo({
                          url: '/pages/agent/agent',
                          success: (result)=>{
                            
                          },
                          fail: ()=>{},
                          complete: ()=>{}
                        });
                      } else {
                        wx.navigateTo({
                          url: '/pages/lucky/lucky',
                          success: (result)=>{
                            
                          },
                          fail: ()=>{},
                          complete: ()=>{}
                        });
                      }
                      
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
   * 早餐图片预览
   */
  previewBreakfast: function (e) {
    var index = e.currentTarget.dataset.index;
    var img = this.data.img
    img[0] = this.data.breakfastArray[index][0]
    wx.previewImage({
      urls: img,
    })
  },

  /**
   * 午餐图片预览
   */
  previewLunch: function (e) {
    var index = e.currentTarget.dataset.index;
    var img = this.data.img
    img[0] = this.data.lunchArray[index][0]
    wx.previewImage({
      urls: img,
    })
  },

  /**
   * 晚餐图片预览
   */
  previewDinner: function (e) {
    var index = e.currentTarget.dataset.index;
    var img = this.data.img
    img[0] = this.data.dinnerArray[index][0]
    wx.previewImage({
      urls: img,
    })
  },

  /**
   * 合作
   */
  cooperationTap: function () {
    wx.showModal({
      title: '商务合作',
      content: '商务合作请添加商务客服微信帐号：Duang_2c',
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          
        }
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