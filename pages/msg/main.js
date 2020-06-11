// pages/msg/main.js
const httpWX = require('../../utils/wx-request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    comment: [],
    actions: [
      {
        id: 0,
        name: '删除',
        color: '#fff',
        fontsize: '20',
        width: 100,
        icon: 'trash',
        background: '#ed3f14'
      },
      {
        id: 1,
        name: '收藏',
        color: '#fff',
        fontsize: '20',
        width: 100,
        icon: 'collection',
        background: 'rgb(243, 173, 93)'
      },
      {
        id: 2,
        name: '返回',
        width: 100,
        color: '#80848f',
        fontsize: '20',
        icon: 'undo'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = app.globalData.openid
    if (!userId) {
      app.openIdReadyCallback = res => {
        userId = res.data.openid
        this.setData({
          userId: userId
        })
        this.getMsgList(userId)
      }
    } else {
      this.setData({
        userId: userId
      })
      this.getMsgList(userId)
    }
  },

  async getMsgList(userId){
    let result = await httpWX.get({
      url: `/comment/user/${userId}`,
    })
    if(result.statusCode == 200){
      this.setData({
        comment:result.data
      })
    }
  },
  handleClick(e) {
    let id = e.currentTarget.dataset.val.parentCommentId ? e.currentTarget.dataset.val.parentCommentId : e.currentTarget.dataset.val.id
    wx.navigateTo({
      url: "/pages/home/common_item_detail/index?id=" + id,
    })
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getMsgList(this.data.userId)
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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