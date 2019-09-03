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
        var that = this;
        var num = Math.floor(Math.random()*4500 + 20000);
        var windowWidth = app.systemInfo.windowWidth;
        that.setData({
            title: "大数据科学减肥",
            windowWidth: app.systemInfo.windowWidth,
            windowHeight: app.systemInfo.windowHeight,
            num: num,
            area_pic_width: windowWidth/5,
            area_pic_padding: (windowWidth-50-40-windowWidth*3/5)/6,
            btn_width: app.btn.btn_width,
            btn_height: app.btn.btn_height,
            textDesc: '健康饮食计划基于国内3位从业十余年的资深营养大师整理的营养理论，和13位人工智能工程师设计的智能运算方式，结合当代云技术采集近10万人群数据比对，从而完善的真正科学有效的饮食计划。'
        })
    
    },

    /**
     * 设置检测参数界面
     */
    goParameter: function () {
        wx.navigateTo({
            url: '/pages/parameter/parameter',
            success: (result)=>{
                
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
        var num = this.data.num;
        setInterval(() => {
            num = num + Math.floor(Math.random()*9 + 1);
            this.setData({
                num: num
            })
        }, 1000);
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