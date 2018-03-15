
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:"http://yijiao.oss-cn-qingdao.aliyuncs.com/",
    listData:[]
  },
  onLoad:function(){
   var that = this;
   that.requestData();
   
  },
  //查看点技师
  requestData(){
   var that = this;
    wx.request({
      url: app.globalData.webUrl + "serviceAction/getStoreHpJsList.do",
      data: {
        longitude: app.globalData.longitude,
        latitude: app.globalData.latitude,
        city: "长沙",
        page: 0,
        pagesize: 5,
      },
      method: "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      success: function (res) {
      that.setData({

        listData: res.data.content

      })
      console.log("输出的数据" + JSON.stringify(res.data.content[0]))
        
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
  bigImag(e){
    
    
    console.log(e)
    var imageUrl = e.currentTarget.dataset.headerurl;
    var jsGh = e.currentTarget.dataset.jsgh;
   wx.navigateTo({
     url: '../bigImage/bigImage?headerUrl=' + imageUrl + "&jsNum=" + jsGh

   })

  }
})