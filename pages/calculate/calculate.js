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
    var textDesc2 = this.textDesc2(weight,this.referWeight(height,sex),BMIdesc);

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
      BMI: '健康状态' + '(' + BMIdesc + ')',
      textDesc: textDesc,
      textDesc2: textDesc2
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
   * 文本描述第二段
   */
  textDesc2: function (weight,referWeight,BMIDesc) {
    if (BMIDesc == '偏瘦') {
      return '根据您当前的身高体重计算，体重至少保持在' + referWeight*0.9 + '以上为正常状态，身体状况为偏瘦，当低于标准时，容易对身体带来危害，如脱发、骨质疏松，贫血，记忆衰退、常犯胃病等。造成瘦弱的原因普遍为先天精气不足，脾胃虚弱，脾肾阳虚，肝肾阴虚。建议应前往医院查找具体原因，除此之外，在生活和饮食习惯中应保持良好的心态，乐观积极，多做一些运动缓解压力，在饮食方面尽量多摄入肉类（牛肉，羊肉，狗肉效果尤佳），除此之后多吃韭菜、核桃、肉桂等蔬果类，可有效改善体质。'
    } else if (BMIDesc == '正常') {
      return '根据您当前的身高体重计算，标准体重为' + referWeight +'kg，体重' + weight + 'kg属于正常范围，当前情况下注意保持饮食规律，健康搭配合理即可，在此标准上若想在增重或减重也应保持在' + Math.round(referWeight*0.9) + 'kg~' + Math.round(referWeight*1.1) + 'kg之间，过度的增减都不益于身体健康，在饮食方面建议合理的荤素搭配，以荤素1:4为宜。'
    } else if (BMIDesc == '超重') {
      return '根据您当前的身高体重计算，体重' + referWeight*0.9 + '~' + referWeight*1.1 + 'kg为正常范围，当前体重' + weight + 'kg已超出标准线'+ referWeight +'kg，身体状态为超重。科学研究表明超重的人更容易感觉到疲劳，呼吸不畅，偶发性心悸，剧烈运动后更容易引发皮肤疾病。除此之外，行为学家对100名成年男性和女性聚在一起进行测试，最终报告指出，有67名男性更容易对身材较好的异性产生好感，而女性则有84人。最终结论指出，较好的体型更容易在初次见面中获得异性好感。'
    } else {
      return '根据您当前的身高体重计算，体重' + referWeight*0.9 + '~' + referWeight*1.1 + 'kg为正常范围，当前体重' + weight + 'kg已超出标准线'+ referWeight +'kg，身体状况为肥胖，已超出健康范围。科学研究报告中指出，肥胖者较之常人更容易感到疲劳，体虚气短，呼吸不畅，运动后更容易引发丘疹等皮肤疾病。同时肥胖更是各种疾病的主要诱因，一项科学研究表明，在猝死的人群中，肥胖者高达43%仅此于长期熬夜，猝死主要为突发性心脏疾病，而心脏疾病的高发人群即为肥胖患者，除心脏病外，肥胖同时还容易引发肠胃疾病、皮肤病、宫颈癌症、糖尿病、不孕不育等症状，在此建议肥胖者重视饮食健康，少吃高脂肪食物和油腻食物，科学合理安排饮食，保持乐观积极心态，热爱生活。'
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
  // onShareAppMessage: function () {

  // }
})