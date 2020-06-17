// pages/mine/post/index.js
const httpWX = require('../../../utils/wx-request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.myPostList()
  },

  async myPostList() {
    let openid = app.globalData.openid
    let results = await httpWX.get({
      url: `/article/userid/${openid}`,
    })
    if(results.statusCode == 200){
      let data1 = results.data
      this.setData({
        content: data1
      })
    }
  },

  getDetail(e){
    let val = e.currentTarget.dataset.val
    let {id, type} = val
    wx.navigateTo({
      url: `/pages/home/detail/detail?id=${id}&type=${type}`,
    })
  },

  setting(){
    this.setData({
      show:true
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