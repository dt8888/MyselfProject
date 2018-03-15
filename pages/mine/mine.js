var app = getApp()
var nickName;
Page({
  data: {
    userInfo: {},
    textArr:["待付款","待使用","待评价","退款"],
    imageArr: ["/image/mine-Pending.png", "/image/mine-refund.png", '/image/mine-evaluate.png','/image/mine-refund.png'],
    showModalStatus: false,
    telephone: "",
    code: "",
    buttonDisable: false,
    verifyCodeTime: '获取验证码'
  },
  onShareAppMessage: function () {
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/pages/index?id=123'
    }
  },
  onShow:function(){
    var that = this
    var userId = wx.getStorageSync('userInfo').userId;
    //判断是否登录
    if (typeof userId == undefined || userId == "" || userId == null) {
      that.setData({
        userInfo: {
          nickName: "登录或注册"
        }
      })
    } else {
      //刷新用户信息
      that.isHaveNickName(wx.getStorageSync('userInfo').name)
    }
  },
  onLoad: function () {

  },
  //去登录
  gotoLogin(){
    this.setData({
      showModalStatus: true
    })
  },
  myOrderList(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../myOrderList/myOrderList?index=' + index
    })
  },
  //商户核销
  toVerification(){
   wx.navigateTo({
     url: '../verification/verification'
   })
  },
  toSeting: function () {
    wx.navigateTo({
      url: '../bindTelephone/bindTelephone'
    })
  },



//弹出框 去登录
  mobileInputEvent: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  //获取验证码
  getCode: function () {

    if (this.data.buttonDisable) return false;
    var that = this;
    var c = 60;
    var intervalId = setInterval(function () {
      c = c - 1;
      that.setData({
        verifyCodeTime: c + 's后重发',
        buttonDisable: true
      })
      if (c == 0) {
        clearInterval(intervalId);
        that.setData({
          verifyCodeTime: '获取验证码',
          buttonDisable: false
        })
      }
    }, 1000)
    var mobile = this.data.telephone;
    var regMobile = /^1\d{10}$/;
    if (!regMobile.test(mobile)) {
      wx.showToast({
        title: '手机号有误！'
      })
      return false;
    }
  //调用接口
    wx.request({
      url: app.globalData.webUrl + "phoneAction/sendLoginVC.do",
      data: {
        "code": that.data.telephone
      },
      method: "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      success: function (res) {
        console.log("获取的验证码为多少" + JSON.stringify(res.data))
      },
    })
  },
  codeInputEvent: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //登录
  gotoOK() {
    var that = this;
    console.log("用户的userId" + that.data.telephone + that.data.code)
    wx.request({
      url: app.globalData.webUrl + "phoneAction/quickLogin.do",
      data: {
        "code": that.data.telephone,
        "vc": that.data.code
      },
      method: "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      success: function (res) {
        console.log("用户的userId" + JSON.stringify(res.data.content))
        //保存整个对象
        wx.setStorageSync('userInfo', res.data.content)

       //刷新用户信息
        that.isHaveNickName(wx.getStorageSync('userInfo').name)
      },
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.gotoOK()
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  //判断昵称是否存在
  isHaveNickName:function(name){

    if (typeof name == undefined || name == "" || name == null) {
      var name = wx.getStorageSync('userInfo').code;
      nickName = name.substr(0, 3) + "*****" + name.substr(6)
    } else {
      nickName = wx.getStorageSync('userInfo').name;
    }
    this.setData({
      userInfo: {
        nickName: nickName,
        avatarUrl: wx.getStorageSync('userInfo').headImg
      }
    })
  }
})
