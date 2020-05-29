// pages/msg/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: [
      {
        responder: "有毒的黄同学",
        headeImg: 'https://profile.csdnimg.cn/9/2/9/3_xiasohuai',
        reviewers: "傲娇的",
        time: "2016-09-05",
        content: "你说得对"
      },
      {
        responder: "傲娇的",
        reviewers: "有毒的黄同学",
        headeImg: 'https://profile.csdnimg.cn/9/2/9/3_xiasohuai',
        time: "2016-09-05",
        content: "很强"
      }
    ],
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

  },

  handleClick() {
    wx.navigateTo({
      url: "/pages/msg/chat/index"
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