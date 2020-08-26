// pages/mine/communities/index.js
const httpWX = require('../../../utils/wx-request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myreport()
  },
  async myreport() {
    let openid = app.globalData.openid || 'ongb-4yJcjO0dakkME1Q9q8LenZo'
    let results = await httpWX.get({
      url: `/report/${openid}`
    })
    if (results.success) {
      let reportNum = results.data
      this.setData({
        reportNum: reportNum,
      })
    }
  },
  reports(){
    wx.navigateTo({
      url: "/pages/mine/communities/reports/index",
    })
  }
})