// pages/main/main.js
const httpWX = require('../../utils/wx-request.js')
const app = getApp()
var bus = app.globalData.bus
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    flag: false,
    postCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app)
    if (app.globalData.userInfo) {
      this.myPostList()
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.myPostList()
        this.setData({
          userInfo: res.userInfo
        })
      }
    }
  },
  toPostings() {
    wx.navigateTo({
      url: "/pages/mine/post/index",
    })
  },

  tofavorite() {
    wx.navigateTo({
      url: "/pages/mine/favorite/main",
    })
  },

  building() {
    wx.navigateTo({
      url: "/pages/mine/communities/index",
    })
  },

  onGotUserInfo() {
    this.setData({
      flag: true
    })
  },
  // 获取userinfo
  getUserInfo(e){
    this.setData({
      userInfo: e.detail,
      flag:false
    })
  },

  closeMask() {
    this.setData({
      flag: false
    })
  },

  async myPostList() {
    let openid = app.globalData.openid
    let results = await httpWX.get({
      url: `/article/userid/${openid}`,
    })
    if (results.statusCode == 200) {
      let data1 = results.data.length
      this.setData({
        postCount: data1
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})