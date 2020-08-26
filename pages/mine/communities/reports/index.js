// pages/mine/communities/reports/index.js
const httpWX = require('../../../../utils/wx-request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
      url: `/report/user/${openid}`
    })
    if (results.success) {
      let list = results.data
      this.setData({
        list: list,
      })
    }
  },
  getDetail(e){
    console.log(e,'??')
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/home/detail/detail?id=${id}&type=${type}`,
    })
  },
  onClick(event) {
    let title = event.detail.name===1?'违规记录':'我的举报'
    wx.setNavigationBarTitle({
      title: title
    })
  },
})