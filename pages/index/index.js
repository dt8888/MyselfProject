//index.js
//获取应用实例
const app = getApp()
const currentPage = getCurrentPages
Page({
  onReachBottom: function () {
    this.data.pageNum++;
    this.requestData();
    console.log("刷新")
  },
  onPullDownRefresh: function () {
    this.data.pageNum = 1;
    this.requestData();

    console.log("上啦")
  },
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    color: "#D0021B",
    imgUrls: ['http://7xi8d6.com1.z0.glb.clouddn.com/2017-10-31-nozomisasaki_official_31_10_2017_10_49_17_24.jpg', 'http://7xi8d6.com1.z0.glb.clouddn.com/20171101141835_yQYTXc_enakorin_1_11_2017_14_16_45_351.jpeg', 'http://7xi8d6.com1.z0.glb.clouddn.com/20171027114026_v8VFwP_joanne_722_27_10_2017_11_40_17_370.jpeg'],
    link:'/pages/detail/detail',
    pageNum: 0,
    listData: [],
    imageUrl: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       
     var that = this;
     that.requestData();

  },
  //点击轮播图
  swiperTap: function (even) {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  
  // 查看详情
  showDetail(event) {
    var storeId = event.currentTarget.dataset.storeid;
    var address = event.currentTarget.dataset.adress;
    var sflist = JSON.stringify(event.currentTarget.dataset.sflist);
    wx.navigateTo({
      url: '../cart/cart?storeId=' + storeId + "&address=" + address + "&sflist=" + sflist
    })
  },
  //加载数据
  requestData() {
    var that = this
    if (that.data.listData.length < 1) {
      wx.showToast({
        title: '加载中',
        duration: 500
      })
    } else {
      wx.showNavigationBarLoading()
    }
    wx.request({
      url: app.globalData.webUrl+"serviceAction/getStoreList.do",
      data: {
        longitude: app.globalData.longitude,
        latitude: app.globalData.latitude,
        city: "长沙",
        page: this.data.pageNum,
        pagesize: 10,
        userId: 38971,
      },
      method: "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      success: function (res) {
        wx.stopPullDownRefresh()
        if (that.data.pageNum == 1) {
          that.data.listData = []//清空数组
        }
        var list = [];
        var imgUrl = [];
        var url = "http://yijiao.oss-cn-qingdao.aliyuncs.com/";
        for (var i = 0; i < res.data.content.length; i++) {
          list.push(res.data.content[i]);
          imgUrl.push(url + res.data.content[i].mainImgUrl)
          console.log("请求成功" + res.data.content[i])
        }
        that.setData({

          listData: list,//更新数据
          imageUrl: imgUrl
        })
      },
      fail: function () {
        wx.showModal({
          title: '加载出错',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast()
        wx.hideNavigationBarLoading()
      }
    })
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

})
