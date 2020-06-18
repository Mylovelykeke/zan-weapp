// pages/mine/post/index.js
const httpWX = require('../../../utils/wx-request.js')
const app = getApp()
import Dialog from "../../../miniprogram_npm/vtuweapp/dialog/vtu-index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    show: false,
    flag: null,
    targetid:null,
    edit:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.myPostList()
  },

  async myPostList() {
    let openid = app.globalData.openid || 'ongb-4yJcjO0dakkME1Q9q8LenZo'
    let results = await httpWX.get({
      url: `/article?openid=${openid}`,
    })
    if (results.statusCode == 200) {
      let data1 = results.data[0]
      this.setData({
        content: data1
      })
    }
  },

  getDetail(e) {
    this.setData({
      flag: true
    })
    let val = e.currentTarget.dataset.val
    let {
      id,
      type
    } = val
    wx.navigateTo({
      url: `/pages/home/detail/detail?id=${id}&type=${type}`,
    })
  },

  confirm(e) {
    this.setData({
      flag: true
    })
  },
  setting(e) {
    let targetid = e.currentTarget.dataset.id
    this.setData({
      flag: false,
      show: true,
      targetid: targetid
    })
  },

  edit(){
    wx.navigateTo({
      url: `/pages/home/write/index?edit=true&articleid=${this.data.targetid}`,
    })
  },

  deleteArticle(){
    this.setData({
      show:false
    })
    Dialog().open({
      content: '确定删除文章吗？',
      verticalButtons: false,
      buttons: [
        {
          type: 'primary',
          label: '取消',
          click: function (e) {
            Dialog().close()
          }
        },
        {
          type: 'primary',
          label: '确认',
          click:  (e) => {
            this.target(this.data.targetid)
            setTimeout(function () {
              Dialog().close()
            }, 500)
          }
        }
      ]
    })
  },

  async target(id){
    let result = await httpWX.post({
      url: `/article/delete/${id}`,
    })
    if (result.success){
      this.myPostList()
    }
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
    return {
      　　　　title: "转发的标题",        // 默认是小程序的名称(可以写slogan等)
      　　　　path: '',        // 默认是当前页面，必须是以‘/’开头的完整路径
      　　　　imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      　　　　success: function (res) {
        　　　　　　// 转发成功之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
        　　　　　　}
      　　　　},
      　　　　fail: function () {
        　　　　　　// 转发失败之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
          　　　　　　　　// 用户取消转发
        　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
          　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
        　　　　　　}
      　　　　},
      　　　　complete: function(){
    　　　　}
  　　}
  }
})