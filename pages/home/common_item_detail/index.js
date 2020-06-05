// pages/home/common_item_detail/index.js
const httpWX = require('../../../utils/wx-request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    responderItem: [],
    reviewersItem: [],
    showSkeleton: true,
    focus: false,
    plaVal: '我也说一句。。。。',
    replyUserName: '',
    hostId: '',
    parentCommentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let parentCommentId = options.id
    this.OnGetCommonList(parentCommentId)
  },

  async OnGetCommonList(id) {
    let results = await httpWX.get({
      url: '/comment/' + id,
    })
    if (results.statusCode == 200) {
      this.setData({
        hostId: results.data.parent.hostId,
        replyUserName: results.data.parent.name,
        responderItem: [results.data.parent],
        reviewersItem: results.data.children,
        showSkeleton:false
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})