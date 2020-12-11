//index.js
//获取应用实例
import API from '../../utils/API';
const app = getApp()
Page({
  data: {
    motto: '西科树屋',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../annualRing/annualRing'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      API.post('/user/saveuser',app.globalData.userInfo).then(res=>{
        console.log(res);
      })
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        API.post('/user/saveuser',res.userInfo).then(res=>{
          console.log(res.data);
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          API.post('/user/saveuser',res.userInfo).then(res=>{
            console.log(res);
          })
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    const token=wx.getStorageSync('token');
    wx.request({
      // url: 'http://192.168.199.168:3000/user/saveuser',
      // url:'http://123.207.254.114:4000/user/saveuser',
      url: 'https://cherry-oamre6q2.pai.tcloudbase.com/user/saveuser',
      method: "POST",
      header:{'token': token},
      data: {
        ...app.globalData.userInfo
      },
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})