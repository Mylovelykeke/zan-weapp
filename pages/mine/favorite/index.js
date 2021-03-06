// pages/mine/favorite/index.js
const httpWX = require('../../../utils/wx-request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    loading: {
      show: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  async getList(){
    this.setData({
      loading: {
        show: false
      }
    })
    let results = await httpWX.get({
      url: `/like`,
      data:{
        openid: app.globalData.openid || 'ongb-4yJcjO0dakkME1Q9q8LenZo'
      }
    })
    if (results.success){
      let newList = []
      results.data.forEach(d=>{
        if (d.article){
          newList.push(d.article)
        }
      })
      this.setData({
        newsList:newList,
        loading: {
          show: true
        }
      })
    }
  },

  setAction(e){
    console.log(e)
  },

  ItemDetail(e) {
    console.log(e)
    let id = e.detail.id
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/home/detail/detail?id=${id}&type=${type}`,
    })
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