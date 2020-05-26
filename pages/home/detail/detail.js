// pages/home/detail/detail.js
const httpWX = require('../../../utils/wx-request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemInfo:'',
    title:'',
    content:'',
    files:'',
    location:'',
    loading:true,
    userInfo: {
      name: '访客',
      avatar: 'https://profile.csdnimg.cn/9/2/9/3_xiasohuai'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hostId = options.id 
    this.OnAddViews(hostId)
    this.OnGetItemDetail(hostId)
  },

  OnAddViews(id) {
    httpWX.post({
      url: '/article/' + id + '/views',
    }).then(res => {
      console.log(res, '观看加1')
    })
  },

  OnGetItemDetail(id) {
    httpWX.get({
      url: '/article/' + id,
    }).then(res => {
      let { title, content, files, locationinfo, createAt } = res.data
      this.setData({
        itemInfo:res.data,
        title: title,
        content: content,
        files: files,
        locationinfo: JSON.parse(locationinfo),
        createAt: createAt
      }),
      setTimeout(() => {
        this.setData({
          loading:false
        })
      }, 500)
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