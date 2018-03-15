
var app = getApp();
var base64 = require("../../utils/util")
var inputCode;

Page({
  data: {
    storeName:"",

  },
  onLoad:function(){
    var info = wx.getStorageSync('userInfo').smu.storeName;
    this.setData({
      storeName: info
    })
  },

//扫描核销
  scandCode(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  inputCode(e){
    inputCode =  e.detail.value;
  },
  //输入核销码确定
  buttonOk(){
    var userId = wx.getStorageSync('userInfo').smu.userId;
    var storeId = wx.getStorageSync('userInfo').smu.storeId;
    var payCode = inputCode;
    var encryptCode = this.encryptCode(userId, storeId, payCode);
    var base64Code = base64.baseCode(encryptCode);

   //核销
    // wx.request({
    //   url: app.globalData.webUrl + "serviceAction/verification.do",
    //   data: {
    //     "pc": base64Code
    //   },
    //   method: "POST",
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   success: function (res) {
    //     console.log(res.data.content +res.data.msg)
    //   },
    // })
  },
  //加密方法
  encryptCode(userId, storeId, payCode) {
    var randStr = (Math.floor(Math.random() * (89999 + 1)) + 10000).toString();  
                                 //生成0-89999随机数+10000 randStr
    var randStrLen = randStr.length;                                                                            //randStr 获取的长度
    var randIndex1 = Math.floor(Math.random() * (randStrLen + 1));                                           //randIndex1 随机获取randStrLen中的位置
    randStr = randStr.substring(0, randIndex1) + userId + randStr.substring(randIndex1, randStrLen);            //把userID（用户ID）插入这个位置后面
    randStrLen = randStr.length;                                                                                //获取新str的长度(插入了userID（用户ID）后的长度)
    var randIndex2 = Math.floor(Math.random() * (randStrLen + 1));                                               //随机获取newStrLen的某个位置
    randStr = randStr.substring(0, randIndex2) + storeId + randStr.substring(randIndex2, randStrLen);           //把storeId（用户ID）插入这个位置后面
    randStrLen = randStr.length;                                                                                //获取新str（插入userID、storeId后）的长度
    var randIndex3 = Math.floor(Math.random() * (randStrLen + 1));                                               //randIndex3 随机获取newStrLen2中的位置
    var newStr = randStr.substring(0, randIndex3) + payCode + randStr.substring(randIndex3, randStrLen);        //把payCode（核销码）插入新str位置后面

    var str1 = randIndex1 > 9 ? randIndex1 : '0' + randIndex1;                                                  //插入userID的位置1
    var str2 = randIndex2 > 9 ? randIndex2 : '0' + randIndex2;                                                  //插入storeId的位置1
    var str3 = randIndex3 > 9 ? randIndex3 : '0' + randIndex3;                                                  //插入payCode的位置1

    var lastStr = newStr + str1 + str2 + str3;
    lastStr += userId.toString().length;
    lastStr += storeId.toString().length;
    lastStr += payCode.toString().length;                                                                    //最后得到的字符串
    lastStr += lastStr.substring(7, 8);
    console.log('我是最后加密码' + lastStr)
    return lastStr
  }

})