// pages/home/searchdetail/index.js
const httpWX = require('../../../utils/wx-request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: '',
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let val = options.search
    this.OnGetSearch(val)
  },

  async OnGetSearch(val) {
    let results = await httpWX.get({
      url: '/article/search',
      data: {
        keyword: val
      }
    })
    if (results.statusCode == 200) {
      this.setData({
        content: results.data,
        val: val
      })
    }
  },

  backSearch() {
    wx.navigateTo({
      url: "/pages/home/searchLoad/index",
    })
  },

  ItemDetail(e) {
    let id = e.detail.id
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/home/detail/detail?id=${id}&type=${type}`,
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