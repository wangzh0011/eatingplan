// pages/parameter/parameter.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '',
    age: '',
    height: '',
    weight: '',
    sleep: ''
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
      title_area_left: app.position.title_area_left,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height
    })
    
  },

  /**
   * 获取性别
   */
  chooseSex: function (e) {
    var sex = e.detail.value;
    this.setData({
      sex: sex
    })
    wx.setStorageSync("sex", sex);
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
   * 年龄
   */
  bindDateChange: function (e) {
    var age = e.detail.value;
    var that =this;
    // if(this.validate(age) == false) {
    //   that.setData({
    //     age: ''
    //   })
    //   return;
    // }
    this.setData({
      age: age
    })
    wx.setStorageSync("age", age);
  },

  /**
   * 身高
   */
  heightTap: function (e) {
    var height = e.detail.value;
    var that =this;
    if(this.validate(height) == false) {
      that.setData({
        height: ''
      })
      return;
    }
    this.setData({
      height: height
    })
    wx.setStorageSync("height", height);
  },

  /**
   * 体重
   */
  weightTap: function (e) {
    var weight = e.detail.value;
    var that =this;
    if(this.validate(weight) == false) {
      that.setData({
        weight: ''
      })
      return;
    }
    this.setData({
      weight: weight
    })
    wx.setStorageSync("weight", weight);
  },

  /**
   * 睡眠
   */
  sleepTap: function (e){
    var sleep = e.detail.value;
    var that =this;
    if(this.validate(sleep) == false) {
      that.setData({
        sleep: ''
      })
      return;
    }
    this.setData({
      sleep: sleep
    })
  },

  /**
   * btn按钮
   */
  onTap: function () {
    var sex = this.data.sex;
    var age = this.data.age;
    var height = this.data.height;
    var weight = this.data.weight;
    var sleep = this.data.sleep;

    var isnull = this.paraIsNull(sex,age,height,weight,sleep);
    if (isnull == false) {
      return;
    }

    var BMI = Math.round(weight/((height/100)*(height/100)));
    var sleepStatus = this.calculSleep(age,sleep);
    wx.setStorageSync("BMI",BMI);
    wx.setStorageSync("sleepStatus",sleepStatus);

    wx.navigateTo({
      url: '/pages/calculate/calculate',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 判断参数是否为空
   */
  paraIsNull: function (sex,age,height,weight,sleep) {
    var that = this;
    if(sex.trim() == ''){
      wx.showToast({
        title: '请选择您的性别',
        icon: 'none',
        duration: 1500,
      });
      return false;
    }else if(age.trim() == ''){
      wx.showToast({
        title: '请输入您的年龄',
        icon: 'none',
        duration: 1500,
      });
      that.setData({
        age: ""
      })
      return false;
    }else if(height.trim() == ''){
      wx.showToast({
        title: '请输入您的身高',
        icon: 'none',
        duration: 1500,
      });
      that.setData({
        height: ""
      })
      return false;
    }else if(weight.trim() == ''){
      wx.showToast({
        title: '请输入您的体重',
        icon: 'none',
        duration: 1500,
      });
      that.setData({
        weight: ""
      })
      return false;
    }else if(sleep.trim() == ''){
      wx.showToast({
        title: '请输入您的平均睡眠时长',
        icon: 'none',
        duration: 1500,
      });
      that.setData({
        sleep: ""
      })
      return false;
    }
  },

  /**
   * 计算睡眠情况  0：缺少睡眠  1：睡眠充足  2：睡眠过多
   */
  calculSleep: function (age,sleep) {
    if (age >= 1 && age < 3) {
      if (sleep > 15) {
        return "2"
      } else if (sleep < 15) {
        return "0"
      } else {
        return "1"
      }
    } else if (age >= 3 && age < 12) {
      if (sleep > 10) {
        return "2"
      } else if (sleep < 10) {
        return "0"
      } else {
        return "1"
      }
    } else if (age >= 12 && age < 30) {
      if (sleep > 8) {
        return "2"
      } else if (sleep < 8) {
        return "0"
      } else {
        return "1"
      }
    } else if (age >= 30) {
      if (sleep > 7) {
        return "2"
      } else if (sleep < 7) {
        return "0"
      } else {
        return "1"
      }
    }
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