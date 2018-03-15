//logs.js
const util = require('../../utils/util.js')
//全局变量
var app = getApp()
Page({
  data: {
    hidden: false,
    newslist:[],
    imageList:[],
    page: 0,   // 默认是第一次  
    pagesize: 10,      //返回数据的个数  
    hasMore: true,
    hasRefesh: false  //“没有数据”的变量，默认false，隐藏 
  },
  //加载数据
  requestData() {
    var that = this
    wx.request({
      url: "https://www.yijiao2016.com/serviceAction/getAdviceList.do",
      data: {
        "page":that.page,
        "pagesize":that.pagesize,
        "subType":1
      },
      method: "POST",
      success: function (res) {
        var pictureList = [];
        var url = "http://yijiao.oss-cn-qingdao.aliyuncs.com/";
        for (var i = 0; i < res.data.content.length; i++){
          pictureList.push(url+res.data.content[i].mainImgUrl)
        }
        that.setData({
          newslist: res.data.content,//更新数据
          imageList: pictureList,
          hidden:true,
        })

        console.log(that.data.newslist);
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
  //点击进入详情
  // showDetail:function(){
  //   wx.navigateTo({
  //     url: '../detail/detail',
  //   })
  // },
   gotoDetail: function (event){
     var detail = event.currentTarget.dataset.detail;
    wx.navigateTo({
      url: '../infoDetail/infoDetail?detail='+detail,
    })
  },
  onLoad: function () {
    var that = this;
    this.requestData();
  },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }

})
