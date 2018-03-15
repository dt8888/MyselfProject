
var app = getApp();
var dataArr = [];
var state = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
   dataList:[],
   title:"正在加载...",
   page:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  //清空数据
    dataArr = [];

    state = options.index
    var navTitle;
   var index = parseInt(options.index);
   switch (index) {
        case 0:
         navTitle="待付款";
        break;
        case 1:  
        navTitle = "待使用";
        break;
        case 2:
          navTitle = "待评价";
          break;
        case 3:
          navTitle = "已退款";
          break;
        case 4:
          navTitle = "已使用";
          break;
     }
   console.log("数是多少" + options.index)
   wx.setNavigationBarTitle({ title: navTitle})
   this.loadWebData(options.index,0);
  },
  //调用网络请求
   loadWebData(state,page) {
   var that = this;
   wx.request({
     url: app.globalData.webUrl +"serviceAction/getOrderList.do" ,
     data:{
       userId: wx.getStorageSync('userId'),
       state:state,
       page: page,
       pagesize:10
     },
     method: "POST",
     "Content-Type": "application/x-www-form-urlencoded",
     success: function (res) {
       if (res.data.content.length==0)
       {
         that.setData({
           title: "没有更多数据了！"
         })
       }else{
         for (var i = 0; i < res.data.content.length;i++)
         {
           dataArr.push(res.data.content[i])
        
         }
         that.setData({
           dataList: dataArr
         })
       }
     },
     fail: function (res){  

     }
   })
  },

//上啦
   loadMore: function () {
     var that = this
     var index = that.data.page+1;
     that.setData({
       page:index
     })
     setTimeout(function () {
       that.loadWebData(state, that.data.page);
     }, 1000)
   },

 //跳转页面
  orderDetail(e){
    var model = JSON.stringify(e.currentTarget.dataset.model) ;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?model=' + model,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})