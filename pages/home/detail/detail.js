// pages/home/detail/detail.js
const httpWX = require('../../../utils/wx-request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemInfo: '',
    hostId:'',
    title: '',
    content: '',
    files: [],
    location: '',
    loading: true,
    replyUserId:'',
    plaVal:'我也说一句。。。。',
    parentCommentId:'',
    value:'',
    type:0,
    userInfo: {
      name: '访客',
      avatar: 'https://profile.csdnimg.cn/9/2/9/3_xiasohuai'
    },
    comment: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let hostId = options.id
    let type = options.type
    this.setData({
      hostId: hostId,
      type: type
    })
    this.OnAddViews(hostId)
    this.OnGetItemDetail(hostId)
  },

  OnAddViews(id) {
    httpWX.post({
      url: '/article/' + id + '/views',
    }).then(res => {
      // console.log(res, '观看加1')
    })
  },

  OnclickReport() {
    wx.navigateTo({
      url: "/pages/report/index"
    })
  },

  previewImage(e) {
    let item = e.currentTarget.dataset
    //图片预览
    let urls = this.data.files.map(data => {
      return data.url
    })
    wx.previewImage({
      current: item.url, // 当前显示图片的http链接
      urls: urls, // 需要预览的图片http链接列表
      success: function(res) {},
      fail: function(res) {
        console.log(res);
      },
    })
  },

  OnGetItemDetail(id) {
    httpWX.get({
      url: '/article/' + id,
    }).then(res => {
      let {
        title,
        content,
        files,
        locationinfo,
        createAt
      } = res.data
      content = content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ')
        .replace(/<section/g, '<div')
        .replace(/\/section>/g, '\div>');
      this.setData({
          itemInfo: res.data,
          userInfo:res.data.user,
          title: title,
          content: content,
          files: files,
          location: JSON.parse(locationinfo),
          createAt: createAt
        }),
        setTimeout(() => {
          this.setData({
            loading: false
          })
        }, 500)
    })
  },

  replymsg(e){
    console.log(e,'??')
    let id = e.detail.id
    let name = e.detail.name
    let replyUserId = e.detail.replyid
    console.log(replyUserId)
    this.setData({
      focus:true,
      value:'',
      replyUserId: replyUserId,
      plaVal: '@' + name,
      parentCommentId:id
    })
  },

  OnGetCommonList(id) {
    httpWX.get({
      url: '/comment/host/' + id,
    }).then(res => {
      let comment = []
      comment.push(...res.data[0])
      this.setData({
        comment: comment
      })
    })
  },

  sendText(e) {
    console.log(e)
    let hostId = this.data.hostId
    let replyUserId = this.data.replyUserId
    let val = e.detail
    let parentCommentId = this.data.parentCommentId
    httpWX.post({
      url: '/comment',
      data: {
        hostId: hostId, //文章id
        replyUserId: replyUserId,
        openid: app.globalData.openid,
        content: val,
        parentCommentId: parentCommentId,
        createByAdmin: false
      }
    }).then(res => {
      if (res.statusCode == 200) {
        this.setData({
          focus:false,
          value:''
        })
        this.OnGetCommonList(hostId)
      }
    })
  },

  hiddenBar(){
    this.selectComponent('#towerId').hiddenBar()
  },
  
  getItemDetail(e){
    let id = e.detail.id
    wx.navigateTo({
      url: "/pages/home/common_item_detail/index?id=" + id,
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
    this.OnGetCommonList(this.data.hostId)
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