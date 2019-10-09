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
            textDesc: '健康饮食计划基于国内3位从业十余年的资深营养大师整理的营养理论，和13位人工智能工程师设计的智能运算方式，结合当代云技术采集近10万人群数据比对，从而完善的真正科学有效的饮食计划。',
            image: app.data.uploadUrl + wx.getStorageSync("image")
        })
        console.log(app.data.uploadUrl  + wx.getStorageSync("image"))

        //按钮抖动
        var flag = true;
        setInterval(() => {
            this.setData({
                btn_height: flag ? app.btn.btn_height : app.btn.btn_height*1.1,
                btn_width: flag ? app.btn.btn_width : app.btn.btn_width*1.1
            })
            flag = !flag
        }, 300);

        //显示参加人数
        setInterval(() => {
            num = num + Math.floor(Math.random()*9 + 1);
            this.setData({
                num: num
            })
        }, 1000);

        var userInfo = wx.getStorageSync("wxData");
        var uid = userInfo.id;
        console.log("缓存uid:" + uid)
        //注册用户
        if(uid == null || uid == undefined){
            console.log("开始注册用户信息")
            this.registerUser(options.shareuid)
        }
        console.log(options)
        //更新用户
        if (uid != null && uid != undefined) {
            if (options.fqId != undefined && options.fqId != '') {
                this.updateUser(userInfo.id,options.fqId,userInfo.id)
            }
            if (userInfo.jkId == null || userInfo.jkId == undefined) {
                this.updateUser(userInfo.id,userInfo.fqId == null ? 0 : userInfo.fqId,userInfo.id)
            }
        }





    },
    
    /**
     * 更新用户
     * @param {*} id 
     * @param {*} fqId 
     */
    updateUser: function (id,fqId,jkId) {
        wx.request({
            url: app.data.server + 'updateUser',
            data: {
                id: id,
                fqId: fqId,
                jkId: jkId
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
     * 注册用户
     */
    registerUser: function (id) {
        wx.request({
            url: app.data.server + 'register',
            data: {
                openid: wx.getStorageSync("wxData").openid,
                type: 'JK'
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                //判断是否带有分享信息
                var shareuid = id; //别人的id
                console.log("shareuid:" + shareuid)
                //未注册用户通过分享链接进入 
                if (shareuid != undefined && shareuid != '' && result.data.id != shareuid) {
                    console.log("设置分享信息")
                    app.setShareInfo(result.data.id,shareuid)
                }
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    /**
     * 设置检测参数界面
     */
    onTap: function () {
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