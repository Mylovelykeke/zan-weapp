// pages/report/index.js
const httpWX = require('../../utils/wx-request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,
    value: "",
    postId:'',
    ITEM: null,
    content: [{
      time: '2012-12-08 02.14',
      userInfo: {
        name: '',
        avatar:''
      },
      ImgArray: [],
      title: '',
      brief: ''
    }],
    list: ['低俗色情', '垃圾广告', '内容低俗无意义', '辱骂攻击', '其他违法信息', '抄袭我的内容', '暴露我的隐私', '内容里有关于我的不实描述']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let postId = options.postId
    this.OnGetItemDetail(postId)
    this.setData({
      postId: postId
    })
  },
  OnGetItemDetail(id) {
    httpWX.get({
      url: '/article/' + id,
    }).then(res => {
      this.setData({
        content: new Array(res.data)
      })
    })
  },

  watchVal(e){
    let value = e.detail.value;
    let sum = e.detail.cursor
    this.setData({
      sum: sum,
      value: value
    })
  },

  handleItem(e) {
    let ITEM = e.currentTarget.dataset.item
    this.setData({
      ITEM: ITEM
    })
  },

  async edit(){
    let reportedId = this.data.postId;
    let reasonType = this.data.ITEM;
    let author = app.globalData.openid
    let value = this.data.value
    if (reasonType===null || !reportedId || !author){
      return
    }
    let results = httpWX.post({
      url:'/report',
      data:{
        author: author ,
        reasonType: reasonType,
        reason: value,
        reportedType:'0',
        reportedId: reportedId
      }
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
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