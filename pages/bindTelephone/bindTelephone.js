
var pages = getCurrentPages();
var currPage = pages[pages.length - 1];   //当前页面
var prevPage = pages[pages.length - 2];  //上一个页面
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telePhone:"",
    access_token:''
  },
 //绑定手机号码
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    this.setData({
      telePhone: "1521****014"
    })
  }, 
  //退出登录（清除缓存）
  signOut(){
    wx.removeStorageSync('userInfo')
    // 返回上一页
    wx.navigateBack({
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAccess_token()
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
    
  },
  //获取access_token
  getAccess_token(){
    var that = this;
    var appId = '';
    var secret = '';
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + secret,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log("access_token"+res)
        that.setData({
          access_token: res.data.access_token
        })
      },
      fail:function(res){
        console.log("失败"+res)
      }
    })
  },
  //提交
  formSubmit(e){
   var that = this;
   var fId = e.detail.formId;
   var fObj = e.detail.value;
   var data = {
     touser: app.globalData.openid,
     template_id: 'byI2sqW3yCCf6xskhAqFzmxiPcILBY4R-2_rkSHq-xo',//这个是1、申请的模板消息id，  
     page: '/pages/index/index',
     form_id: fId,
     data: {
       "keyword1": {
         "value": fObj,
         "color": "#9b9b9b"
       },
       "keyword2": {
         "value": "90分钟足浴",
         "color": "#9b9b9b"
       },
       "keyword3": {
         "value": "天之道全国总店",
         "color": "#9b9b9b"
       },
       "keyword4": {
         "value": "1",
         "color": "#9b9b9b"
       },
       "keyword4": {
         "value": "15210****52",
         "color": "#9b9b9b"
       },
       "keyword4": {
         "value": new Date().getDate(),
         "color": "#9b9b9b"
       }
     },
     color: '#ccc',
     emphasis_keyword: 'keyword1.DATA'
   } 
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + that.data.access_token,
      data: data,
      method: 'POST', 
      success: function (res) {
        console.log(res);
      }
    })
  }
})