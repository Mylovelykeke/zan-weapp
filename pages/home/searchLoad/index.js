// pages/home/searchLoad/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync("search")) {
      let str = wx.getStorageSync("search")
      let historyArray = str.split('$,$')
      this.setData({
        historyArray: historyArray
      })
    }
  },

  confirm(e) {
    let val = e.detail.value
    if(!val){
      return
    }
    if (wx.getStorageSync("search")) {
      let arr = wx.getStorageSync("search")
      arr = val + '$,$' + arr
      wx.setStorageSync('search', arr)
    } else {
      let arr = val
      wx.setStorageSync('search', arr)
    }
    wx.redirectTo({
      url: '/pages/home/searchdetail/index?search=' + val,
    })
  },

  SearchhistoryItem(e) {
    let val = e.currentTarget.dataset.val
    wx.redirectTo({
      url: '/pages/home/searchdetail/index?search=' + val,
    })
  },

  clearItem(e){
    let index = e.currentTarget.dataset.index
    let arr = wx.getStorageSync("search").split(',')
    arr.splice(index, 1)
    this.setData({
      historyArray:arr
    })
    let arr1 = arr.join(',')
    wx.setStorageSync('search', arr1)
  },

  clearAll() {
    console.log(1111)
    this.setData({
      historyArray: []
    })
    wx.setStorageSync('search', '')
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