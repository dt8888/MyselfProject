
const app = getApp()
var utils = require('../../utils/md5.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    price:0.0,
    itemName:"",
    dataArray:[],
    itemId:0,
    storeId:0,
    orderId: "",
    wxPayString:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     //解析出对象
     var array = JSON.parse(options.dataArr);
     that.setData({
       dataArray: array,
       price: options.sumPrice,
       storeId: options.storeId,
       itemId: options.itemId
     })
  },

  //提交订单
  paySubmitOrder() {
    var that = this;
    console.log( wx.getStorageSync('userId'));
    wx.request({
      url: app.globalData.webUrl +"serviceAction/submitOrder.do",
      data: {
        storeId: that.data.storeId,
        totalPrice: that.data.price,
        source: 0,
        somlist: [{ activityId: 0, isPartner: "N", isTg: 0, itemId: that.data.itemId, jsId: 0, num: 1, price: that.data.price, reserveMoney: 0, userCouponIdList: [] }],
        userId: wx.getStorageSync('userId')
      },
      method: "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      success: function (res) {
        that.setData({
          orderId: res.data.content.orderId
        })
        that.getWXOfString()
      },
      fail: function () {
        wx.showModal({
          title: '加载出错',
          showCancel: false
        })
      },
      complete: function () {
      }
    })

  },

  //获得微信支付的串
  getWXOfString() {
    var that = this;
    wx.request({
      url: app.globalData.webUrl+"order/generate_order_string.do",
      data: {
        openId: app.globalData.openid,
        orderId: that.data.orderId,
        subPayment: "WX_JSAPI",
      },
      method: "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      success: function (res) {
        //var str = util.decrypt(res.data.content);
        that.setData({
          wxPayString: res.data.content
        })
      that.gotoWxPay();

      },
      fail: function () {
        wx.showModal({
          title: '加载出错',
          showCancel: false
        })
      },
      complete: function () {
      }
    })
  },
  // //调起微信支付
  gotoWxPay() {
    var that = this;
    var payStrArr = that.data.wxPayString.split("&");
    var payStrDict = {};
    if (payStrArr.length>0)
    {
      var j;
      for (var i = 0;  j = payStrArr[i]; i++){
        payStrDict[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1,    j.length);
      }
       
    }
     wx.requestPayment({
       "appId": payStrDict["appId"],
       "timeStamp": payStrDict["timeStamp"],
       "nonceStr": payStrDict["nonceStr"],
       "package": "prepay_id=" + payStrDict["pg"],
       "signType": 'MD5',
       "paySign": payStrDict["paySign"],
      success: function(res) {
       console.log("支付成功");
      },  
      fail: function () {
      },
      complete: function () {
       }  
      })
  },

//确定下单
  gotoPay(){
    var that = this;
    //that.gotoWxPay();
    that.paySubmitOrder();
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
    
  }
})