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
    postCount: 0,
    likeCount: 0,
    historyCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toPostings() {
    wx.navigateTo({
      url: "/pages/mine/post/index",
    })
  },

  tofavorite() {
    wx.navigateTo({
      url: "/pages/mine/favorite/index",
    })
  },

  toHistory(){
    wx.navigateTo({
      url: "/pages/mine/history/index",
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
  getUserInfo(e) {
    this.setData({
      userInfo: e.detail,
      flag: false
    })
    this.step()
  },

  closeMask() {
    this.setData({
      flag: false
    })
  },

  step() {
    if (!app.globalData.openid) {
      app.openIdReadyCallback = res => {
        this.myPostList()
        this.getLike()
        this.getHistory()
      }
    } else {
      this.myPostList()
      this.getLike()
      this.getHistory()
    }
  },

  async getHistory(){
    let results = await httpWX.get({
      url: `/history/count`,
      data: {
        openid: app.globalData.openid
      }
    })
    if (results.success) {
      this.setData({
        historyCount: results.data
      })
    }
  },

  async getLike() {
    let results = await httpWX.get({
      url: `/like/count`,
      data: {
        openid: app.globalData.openid
      }
    })
    if (results.success) {
      this.setData({
        likeCount: results.data
      })
    }
  },

  async myPostList() {
    let openid = app.globalData.openid
    let results = await httpWX.get({
      url: `/article/userid/${openid}`,
    })
    if (results.success) {
      let data1 = results.data
      this.setData({
        postCount: data1
      })
    }
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      this.step()
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
        if (res.userInfo) {
          this.step()
        }
      }
    }

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