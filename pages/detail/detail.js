var url = "https://www.yijiao2016.com/serviceAction/getItemsByStoreId.do";
var page = 0;

var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      storeId:44,
      userId: wx.getStorageSync('userId'),
      pagesize: 10,
      page: page
    },
    method: "POST",
    "Content-Type": "application/x-www-form-urlencoded",
    success: function (res) {
      var l = that.data.list;
      console.log(l)
      for (var i = 0; i < res.data.content.length; i++) {
        l.push(res.data.content[i])
       
      }
      that.setData({
        list: l
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    GetList(that);
  },
  bindDownLoad: function () {
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  onPullDownRefresh: function () {
    console.log("下拉")
    p = 0;
    this.setData({
      list: [],
    });
    var that = this
    GetList(that)
  },
  onReachBottom: function () {
    console.log("没有更对数据了");
    var that = this
    GetList(that)
  }
})  