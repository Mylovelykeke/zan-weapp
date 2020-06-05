// pages/home/location/index.js
const httpWX = require('../../../utils/wx-request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: "南京",
    locationList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  async confirm(e) {
    let data = {
      'keyword': e.detail.value,
      'region': this.data.region,
      'region_fix': '1',
      'policy': '0',
      'output': 'json',
      'key': 'TBHBZ-T5TH4-HVRUA-XTF2Z-BP2WF-URFHY'
    }
    let results = await httpWX.get({
      url: 'https://apis.map.qq.com/ws/place/v1/suggestion',
      data,
      Domain: false
    })
    if (results.status == 0) {
      this.setData({
        locationList: results.data
      })
    }
  },

  bindAddressItem(e) {
    let locationInfo = e.currentTarget.dataset.val
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      locationinfo: locationInfo
    })
    wx.navigateBack({
      delta: 1
    })
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