var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showIndex: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
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
            area_pic_width: windowWidth/6,
            area_pic_padding: (windowWidth-50-40-windowWidth*3/5)/6,
            btn_width: app.btn.btn_width,
            btn_height: app.btn.btn_height,
            textDesc: '随着当代物质条件的提高，肥胖成为一个困扰着众多年轻人的问题，据最新的人体重调查报告指出，成年人超重率在2019年达到占总人口比12%，男性占5.28%，女性占6.72%。为解决肥胖的难题，我们特别设计出结合科学的《AI减肥计划》，为保证该计划的有效性，特邀国内三位副教授级别的营养、健康学家参与设计过程，最终经我司AI工程团队历经半年调试完成，至此终于可以提交一份真正科学有效的答卷。',
        })

        //按钮抖动
        var flag = true;
        setInterval(() => {
            this.setData({
                btn_height: flag ? app.btn.btn_height : app.btn.btn_height*1.07,
                btn_width: flag ? app.btn.btn_width : app.btn.btn_width*1.07
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

        // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: app.data.server + 'login',
            data: {
              code: res.code,
              type: 'JK',
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
              console.log("微信接口返回数据：")
              console.log(result.data)
              app.userInfo.userInfo = result.data//将openId, sessionKey, unionId赋值给userInfo.userInfo
              wx.setStorageSync("wxData",result.data);//已注册用户返回openID和id，未注册用户返回openID
                
                //分享者的id
                var shareuid = options.shareuid;
                if (shareuid != undefined && shareuid != '' && result.data.id != shareuid) {
                    console.log("设置分享信息")
                    app.setShareInfo(result.data.id,shareuid)
                }

                //查询用户是否支付
                if(wx.getStorageSync("hasPay") != true && result.data.id != undefined) {
                    console.log("判断用户是否支付 uid: " + result.data.id + " 支付 " + wx.getStorageSync("hasPay"))
                    wx.request({
                        url: app.data.server + 'getPayOrder',
                        data: {
                            uid: wx.getStorageSync("wxData").id
                        },
                        header: {'content-type':'application/json'},
                        method: 'GET',
                        dataType: 'json',
                        responseType: 'text',
                        success: (result)=>{
                            if(result.data == true) {
                                console.log("app,js 已支付")
                                wx.setStorageSync("hasPay", result.data);
                            }
                        },
                        fail: ()=>{},
                        complete: ()=>{}
                    });
                }

                //二维码
                if(result.data.id != undefined){
                  app.getQcCode()
                }

              //由于 login 是网络请求，可能会在 Page.onLoad 之后才返回
              // 此处加入 callback 以防止这种情况
            //   if (this.loginCallback) {
            //     this.loginCallback(res)
            //   }
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      })
        
        // //回调函数
        // app.loginCallback = res =>  {

        //     var userInfo = wx.getStorageSync("wxData");
        //     var uid = userInfo.id;
        //     console.log("缓存uid:" + uid)
        //     //注册用户
        //     // if(uid == null || uid == undefined){
        //     //     console.log("开始注册用户信息")
        //     //     userInfo = this.registerUser(options.shareuid)
        //     // }
        //     console.log(options)
        //     //更新用户
        //     // if (uid != null && uid != undefined) {
        //     //     var fqId = options.fqId;
        //     //     if (fqId == undefined || fqId == '' || fqId == 'null') {
        //     //         fqId = 0;
        //     //     }
        //     //     this.updateUser(userInfo.id,fqId,userInfo.id)
        //     // }
        // }    
        setTimeout(() => {
            this.setData({
                showIndex: true
            })
            wx.hideLoading();
        }, 1000);



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
                wx.setStorageSync("wxData",result.data)
                console.log("完成注册,注册信息如下 ==> ")
                console.log(result.data)
                //未注册用户通过分享链接进入 
                if (shareuid != undefined && shareuid != '' && result.data.id != shareuid) {
                    console.log("设置分享信息")
                    app.setShareInfo(result.data.id,shareuid)
                }
                return result.data
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    /**
     * 设置检测参数界面
     */
    onTap: function () {

        if (wx.getStorageSync("hasPay") != true) {
            wx.navigateTo({
                url: '/pages/parameter/parameter',
            });
        } else {
            wx.reLaunch({
                url: '/pages/plandetails/plandetails?username=' + wx.getStorageSync("username"),
                
            });
        }
        
        
    },

    isPay: function () {
        var that = this;
        //查询用户是否支付
        if(wx.getStorageSync("hasPay") != true) {
            console.log("判断用户是否支付")
            if (wx.getStorageSync("wxData").id != undefined) {
                wx.request({
                    url: app.data.server + 'getPayOrder',
                    data: {
                        uid: wx.getStorageSync("wxData").id
                    },
                    header: {'content-type':'application/json'},
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: (result)=>{
                        console.log(result.data)
                        //已支付跳转到饮食计划页面
                        if(result.data == true) {
                            console.log("已支付")
                            wx.setStorageSync("hasPay", result.data);
                            wx.reLaunch({
                                url: '/pages/plandetails/plandetails?username=' + wx.getStorageSync("username"),
                                success: (result)=>{
                                    
                                }
                            });
                            // that.setData({
                            //     showIndex: true
                            // })
                        }else{
                            //未支付进入首页
                            that.setData({
                                showIndex: true
                            })
                            wx.hideLoading();
                        }
                    },
                    fail: ()=>{},
                    complete: ()=>{}
                });
            }
        } else {

            //已支付
            wx.reLaunch({
                url: '/pages/plandetails/plandetails?username=' + wx.getStorageSync("username"),
                
            });

            setTimeout(() => {
                success: (result)=>{
                    that.setData({
                        showIndex: true
                    })
                }
            }, 3000);
        }
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.showLoading({
            title: "初始化中...",
            mask: true,
            success: (result)=>{
                
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
         //回调函数
        //  app.loginCallback = res =>  {

            console.log("onShow()  hasPay ==> ")
            console.log("onShow(1)" + wx.getStorageSync("hasPay"))
            //查询用户是否支付
            this.isPay();
            console.log("onShow(2)" + wx.getStorageSync("hasPay"))

        //  }    
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
        this.isPay()
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