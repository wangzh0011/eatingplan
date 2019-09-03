// pages/calculate/calculate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /**获取缓存信息 */
    var sex = wx.getStorageSync("sex");
    var age = wx.getStorageSync("age");
    var weight = wx.getStorageSync("weight");
    var height = wx.getStorageSync("height");
    var sleepStatus = wx.getStorageSync("sleepStatus");
    var BMI = wx.getStorageSync("BMI");

    var sleepDesc = '';
    if (sleepStatus == '0') {
      sleepDesc = '睡眠不足'
    } else if (sleepStatus == '1') {
      sleepDesc = '睡眠充足'
    } else {
      sleepDesc = '睡眠过多'
    }

    var textDesc = this.textDesc(sleepStatus,age);
    var BMIdesc = this.BMIdesc(BMI);

    this.setData({
      windowWidth: app.systemInfo.windowWidth,
      windowHeight: app.systemInfo.windowHeight,
      btn_width: app.btn.btn_width,
      btn_height: app.btn.btn_height,
      sex: sex == 'man' ? '男性' : '女性',
      age: age + '岁',
      weight: weight + 'kg',
      height: height + 'cm',
      sleepDesc: sleepDesc,
      BMI: 'BMI' + BMI + '(' + BMIdesc + ')',
      textDesc: textDesc
    })
    
  },

  /**
   * btn按钮
   */
  onTap: function () {
    var BMI = this.data.BMI;
    var height = this.data.height;
    wx.navigateTo({
      url: '/pages/eatingplan/eatingplan',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 体态描述
   * @param {BMI指数} BMI 
   */
  BMIdesc: function (BMI) {
    if (BMI < 18.5) {
      return '偏瘦'
    } else if (BMI >= 18.5 && BMI < 24) {
      return '正常'
    } else if (BMI >= 24 && BMI < 28) {
      return '超重'
    } else if (BMI >= 28 && BMI < 35) {
      return '轻度肥胖'
    } else if (BMI >= 35 && BMI < 40) {
      return '中度肥胖'
    } else if (BMI >= 40) {
      return '重度肥胖'
    }
  },

  /**
   * 文本描述
   * @param {睡眠情况} sleepStaus 
   * @param {年龄} age 
   */
  textDesc: function (sleepStaus,age) {
    if (sleepStaus == '0') {
      if (age < 12) {
        return age + '岁的您还属于儿童期，1~12岁的儿童每天睡12小时是必须的，如果睡眠不足不仅会精神不振、免疫力低下，还会影响生长发育，如若无法保证晚上睡眠时长，可选择中午午休进行补觉。'
      } else if (age >= 12 && age < 30) {
        return age + '岁的您已经不再需要大量的睡眠，但至少也应保持每天8小时左右，长期缺乏睡眠不仅影响精神状态，且易使皮肤受损，出现暗疮、粉刺、黄褐斑等问题，长期熬夜还会影响内分泌，免疫力下降，感冒、肠胃疾病、过敏、健忘、易怒、焦虑等，因此年轻人最好规范自身生活，保持充足睡眠。'
      } else {
        return age + '岁的您已经属于中年期，30~60岁的成年男子需要6.49小时，妇女需要7.5小时的睡眠时间，根据10万名成年人的22年跟踪发现，睡眠不足的人比睡眠时间充足的的人死亡率高出26%。'
      }
    } else if (sleepStaus == '1') {
      if (age < 12) {
        return age + '岁的您还属于儿童期，1~12岁的儿童每天睡12小时是必须的，年龄再大一些的儿童可逐渐减至10小时，当前您的睡眠时长充足，有益提高抵抗力和身体成长，继续保持。'
      } else if (age >= 12 && age < 30) {
        return age + '岁的您已经不再需要大量的睡眠，但至少也应保持每天8小时左右，长期缺乏睡眠不仅影响精神状态，且易使皮肤受损，出现暗疮、粉刺、黄褐斑等问题，长期熬夜还会影响内分泌，免疫力下降，感冒、肠胃疾病、过敏、健忘、易怒、焦虑等，因此年轻人最好规范自身生活，保持充足睡眠。'
      } else {
        return age + '岁的您已经属于中年期，30~60岁的成年男子需要6.49小时，妇女需要7.5小时的睡眠时间，充足的睡眠有助于缓解疲劳，保持精力充沛，增强抵抗力，适量的运动更可保持较好的心情，建议继续保持。'
      }
    } else {
      if (age < 12) {
        return age + '岁的您还属于儿童期，1~12岁的儿童每天睡12小时是必须的，但也不宜过多睡眠，过多睡眠亦会导致精神不振，夜晚精力过度充沛形成恶性循环。'
      } else if (age >= 12 && age < 30) {
        return age + '岁的您已经不再需要大量的睡眠，但至少也应保持每天8小时左右，但也不宜睡觉时间过长，过长的睡眠会打乱人体生物钟，导致精神不振，影响记忆力，并且会错过早餐，造成饮食絮乱等，过多的睡眠也是导致肥胖症的诱因之一。'
      } else {
        return age + '岁的您已经属于中年期，30~60岁的成年男子需要6.49小时，妇女需要7.5小时的睡眠时间，但也不宜睡眠过多，根据10万名成年人的22年跟踪发现，睡眠过多的人比睡7~8小时的人死亡率高出24%，过多的睡眠也会致使精神不振，影响记忆力，并且会错过早餐，造成饮食絮乱等，过多的睡眠也是导致肥胖症的诱因之一。'
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