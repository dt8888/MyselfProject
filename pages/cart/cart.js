const app = getApp()
var url = "http://yijiao.oss-cn-qingdao.aliyuncs.com/";
Page({
  data: {
    imgUrl: url,
    list:[],
    imgList:[],
    pageNum:1,
    storeId:0,
    address:"",
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    price:0.0,
    itemName:"",
    dataArray:[],
    itemId:0
  },
  onLoad: function (option) {
    var sflist = JSON.parse(option.sflist);
    this.setData({
      storeId: option.storeId,
      address: option.address,
      imgUrls: sflist
    });
    console.log("店的iid"+option.storeId)
    this.requestData();
  },
  //网络数据
  requestData(){
    var that = this;
    wx.request({
      url: app.globalData.webUrl +"serviceAction/getItemsByStoreId.do",
      data: {
        storeId: that.data.storeId,
        page: 0,
        pagesize: 10,
        userId: wx.getStorageSync('userId'),
      },
      method: "POST",
      "Content-Type": "application/x-www-form-urlencoded",
      success: function (res) {
        var list = [];
        var listUrl = [];
        console.log(res.data.content.length)
        for (var i = 0; i < res.data.content.length; i++) {
          list.push(res.data.content[i]);
          listUrl.push(url +res.data.content[i].mainImgUrl);
        }
       
        that.setData({
          imgList: listUrl,
          list: list,//更新数据
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
  addcart:function(e){
    var that = this
    var dataDict = {};
    var index = 1;
    var price = e.currentTarget.dataset.price
    var name = e.currentTarget.dataset.name
    var itemId = e.currentTarget.dataset.id
    dataDict["count"] = index;
    that.data.dataArray.push(dataDict)
    
    //相等的项目只更新数量
    for (var i = 0; i < that.data.dataArray.length; i++)
    {
      if (that.data.dataArray[i]["name"] == name){
        that.data.dataArray[i]["count"] = that.data.dataArray[i]["count"] + 1
        that.data.dataArray.pop(dataDict)
      }
    } 
    dataDict["name"] = name;
    dataDict["price"] = price;

    var price = e.currentTarget.dataset.price + that.data.price;
    that.setData({
      price: price,
      itemName:name,
      itemId: itemId

    })
  },
  gotoOrder:function(e){
    var that = this
    var price = e.currentTarget.dataset.price
    for (var i = 0; i < that.data.dataArray.length; i++)
    {
      console.log(that.data.dataArray[i].name);
    }
    if(price>0)
    {
     //传替字典，数组等json对象时，需要转换为字符串传递
      var dataArray = JSON.stringify(that.data.dataArray);
      wx.navigateTo({
        url: '../gotoOrder/gotoOrder?dataArr=' + dataArray + "&sumPrice=" + that.data.price + "&storeId=" + that.data.storeId + "&itemId=" + that.data.itemId
      })
    }else
    {
      wx.showModal({
        title: '提示',
        content: '请先选择项目！ ',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
  }
//   //改变选框状态
//   change:function(e){
//     var that=this
//     //得到下标
//     var index = e.currentTarget.dataset.index
//     //得到选中状态
//     var select = e.currentTarget.dataset.select
    
//     if(select == "circle"){
//        var stype="success"
//     }else{
//        var stype="circle"
//     }
    
//     //把新的值给新的数组
//    var newList= that.data.list
//    newList[index].select=stype
//     //把新的数组传给前台
//     that.setData({
//       list:newList
//     })
//     //调用计算数目方法
//     that.countNum()
//     //计算金额
//     that.count()
//   },
//   //加法
//   addtion:function(e){
//     var that=this
//     //得到下标
//     var index = e.currentTarget.dataset.index
//     //得到点击的值
//     var num = e.currentTarget.dataset.num
//     //默认99件最多
//     if(num<100){
//       num++
//     }
//     //把新的值给新的数组
//     var newList = that.data.list
//     newList[index].num =num
   
//     //把新的数组传给前台
//     that.setData({
//       list: newList
//     })
//     //调用计算数目方法
//     that.countNum()
//     //计算金额
//     that.count()
//   },
//   //减法
// subtraction:function(e){
//   var that = this
//   //得到下标
//   var index = e.currentTarget.dataset.index
//   //得到点击的值
//   var num = e.currentTarget.dataset.num
//   //把新的值给新的数组
//   var newList = that.data.list
//   //当1件时，点击移除
//   if (num == 1) {
//       newList.splice(index,1)
//   }else{
//     num--
//     newList[index].num = num
//   }
  
//   //把新的数组传给前台
//   that.setData({
//     list: newList
//   })
//   //调用计算数目方法
//   that.countNum()
//   //计算金额
//   that.count()
// },
// //全选
// allSelect:function(e){
//   var that=this
//   //先判断现在选中没
//   var allSelect = e.currentTarget.dataset.select
//   var newList = that.data.list
//   if(allSelect == "circle"){
//     //先把数组遍历一遍，然后改掉select值
//     for (var i = 0; i < newList.length; i++) {
//       newList[i].select = "success"
//     }
//     var select="success"
//   }else{
//     for (var i = 0; i < newList.length; i++) {
//       newList[i].select = "circle"
//     }
//     var select = "circle"
//   }
//   that.setData({
//     list:newList,
//     allSelect:select
//   })
//   //调用计算数目方法
//   that.countNum()
//   //计算金额
//   that.count()
// },
// //计算数量
// countNum:function(){
//   var that=this
//   //遍历数组，把既选中的num加起来
//   var newList = that.data.list
//   var allNum=0
//   for (var i = 0; i < newList.length; i++) {
//         if(newList[i].select=="success"){
//           allNum += parseInt(newList[i].num) 
//         }
//   }
//   parseInt
//   console.log(allNum)
//   that.setData({
//     num:allNum
//   })
// },
// //计算金额方法
// count:function(){
//   var that=this 
//   //思路和上面一致
//   //选中的订单，数量*价格加起来
//   var newList = that.data.list
//   var newCount=0
//   for(var i=0;i<newList.length;i++){
//     if(newList[i].select == "success"){
//       newCount += newList[i].num * newList[i].price
//     }
//   }
//   that.setData({
//     count:newCount
//   })
// }
})