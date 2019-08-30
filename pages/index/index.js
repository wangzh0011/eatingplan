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
        wx.getSystemInfo({
            success: (result)=>{
                that.setData({
                    title: "大数据科学减肥",
                    windowWidth: result.windowWidth,
                    windowHeight: result.windowHeight,
                })
            },
            fail: ()=>{},
            complete: ()=>{}
        });

        var num = 1000000000;

        var windowWidth = that.data.windowWidth;
        that.setData({
            num: num,
            area_pic_width: windowWidth/5,
            area_pic_padding: (windowWidth-50-40-windowWidth*3/5)/6
        })

        var area_pic_padding = that.data.area_pic_padding;
        var windowHeight = that.data.windowHeight;
        var area_pic_width = that.data.area_pic_width;//图片的宽高

        wx.setStorageSync("windowWidth", windowWidth);
        wx.setStorageSync("windowHeight", windowHeight);
        wx.setStorageSync("area_pic_width", area_pic_width);
        wx.setStorageSync("area_pic_padding", area_pic_padding);
    
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