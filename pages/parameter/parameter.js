// pages/parameter/parameter.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: '',
    birth: '',
    height: '',
    weight: '',
    sleep: '',
    endDate: '',
    startDate: '',
    heightArray: [145],
    weightArray: [30],
    sleepArray: [1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var date = new Date();
    var heightArray = this.data.heightArray;
    var weightArray = this.data.weightArray;
    var sleepArray = this.data.sleepArray;

    /**设置身高数组 */
    for (let index = 0,height = 145;height <= 210 ; index++,height++) {
      heightArray[index] = height
    }

    /**设置体重数组 */
    for (let index = 0,weight = 30;weight <= 110 ; index++,weight++) {
      weightArray[index] = weight
    }

    /**设置睡眠数组 */
    for (let index = 0,sleep = 1;sleep <= 24 ; index++,sleep++) {
      sleepArray[index] = sleep
    }


    
    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      title_area_width: app.position.title_area_width,
      title_area_top: app.position.title_area_top,
      title_area_left: app.position.title_area_left,
      title_area_left: app.position.title_area_left,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      startDate: "1960-01-01",
      endDate: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDay(),
      heightArray: heightArray,
      weightArray: weightArray,
      sleepArray: sleepArray
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
    var birth = e.detail.value;
    var date = new Date();
    var year = birth.substring(0,4)
    var month = birth.substring(5,7)
    var day = birth.substring(8,10)
    var age = date.getFullYear() - year
    if ((date.getMonth() + 1) < month) {
      age = age - 1;
    } else if ((date.getMonth() + 1) == month && date.getDate() < day) {
      age = age - 1;
    }
    // if(this.validate(age) == false) {
    //   that.setData({
    //     age: ''
    //   })
    //   return;
    // }
    this.setData({
      birth: birth,
      age: age
    })
    wx.setStorageSync("age", age);
  },

  /**
   * 身高
   */
  heightTap: function (e) {
    var index = e.detail.value;
    var height = this.data.heightArray[index];
    this.setData({
      index_height: index,
      height: height
    })
    wx.setStorageSync("height", height);
  },

  /**
   * 体重
   */
  weightTap: function (e) {
    var index = e.detail.value;
    var weight = this.data.weightArray[index];
    this.setData({
      index_weight: index,
      weight: weight
    })
    wx.setStorageSync("weight", weight);
  },

  /**
   * 睡眠
   */
  sleepTap: function (e){
    var index = e.detail.value;
    var sleep = this.data.sleepArray[index];
    this.setData({
      index_sleep: index,
      sleep: sleep
    })
  },

  /**
   * btn按钮
   */
  onTap: function () {

    var sex = this.data.sex;
    var birth = this.data.birth;
    var age = this.data.age;
    var height = this.data.height;
    var weight = this.data.weight;
    var sleep = this.data.sleep;

    var isnull = this.paraIsNull(sex,birth,height,weight,sleep);
    if (isnull == false) {
      return;
    }

    var BMI = Math.round(weight/((height/100)*(height/100)));
    var sleepStatus = this.calculSleep(age,sleep);
    wx.setStorageSync("BMI",BMI);
    wx.setStorageSync("sleepStatus",sleepStatus);

    wx.showLoading({
      title: "云计算中",
      mask: true,
    });

    

    setTimeout(() => {
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/calculate/calculate',
      });
    }, 2000);
    
    
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
        title: '请选择您的出生年月',
        icon: 'none',
        duration: 1500,
      });
      that.setData({
        age: ""
      })
      return false;
    }else if(height == ''){
      wx.showToast({
        title: '请输入您的身高',
        icon: 'none',
        duration: 1500,
      });
      return false;
    }else if(weight == ''){
      wx.showToast({
        title: '请输入您的体重',
        icon: 'none',
        duration: 1500,
      });
      return false;
    }else if(sleep == ''){
      wx.showToast({
        title: '请输入您的平均睡眠时长',
        icon: 'none',
        duration: 1500,
      });
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