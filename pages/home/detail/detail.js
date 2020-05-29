// pages/home/detail/detail.js
const httpWX = require('../../../utils/wx-request.js')
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
    loading: false,
    replyUserName:'',
    plaVal:'我也说一句。。。。',
    parentCommentId:'',
    value:'',
    userInfo: {
      name: '访客',
      avatar: 'https://profile.csdnimg.cn/9/2/9/3_xiasohuai'
    },
    comment: [{ "id": "6a7b8ff6-09f5-4b9e-8043-291afbdec1cd", "name": "垃圾人呀", "email": "1115796788", "content": "2", "pass": false, "userAgent": "WeChat 7.0.14.1660  Android  10 Xiaomi MI 9 mobile", "hostId": "c57b17a9-78f6-42cb-9ecf-f921f68f1d22", "isHostInPage": false, "parentCommentId": null, "replyUserName": null, "replyUserEmail": null, "createAt": "2020-05-19 09:22:40", "updateAt": "2020-05-19T01:22:40.243Z", "children": [[{ "id": "40d84459-637e-41c9-a38a-f0e91a1b4f02", "name": "垃圾人呀", "email": "1115796788", "content": "坎坎坷坷", "pass": false, "userAgent": "WeChat 7.0.14.1660  Android  10 Xiaomi MI 9 mobile", "hostId": "c57b17a9-78f6-42cb-9ecf-f921f68f1d22", "isHostInPage": false, "parentCommentId": "6a7b8ff6-09f5-4b9e-8043-291afbdec1cd", "replyUserName": "垃圾人呀", "replyUserEmail": null, "createAt": "2020-05-19 09:25:57", "updateAt": "2020-05-19T01:25:57.910Z" }, { "id": "ae5a0939-fb32-4b0b-91f0-9e6f3e47cd3b", "name": "垃圾人呀", "email": "1115796788", "content": "44", "pass": false, "userAgent": "WeChat 7.0.14.1660  Android  10 Xiaomi MI 9 mobile", "hostId": "c57b17a9-78f6-42cb-9ecf-f921f68f1d22", "isHostInPage": false, "parentCommentId": "6a7b8ff6-09f5-4b9e-8043-291afbdec1cd", "replyUserName": "垃圾人呀", "replyUserEmail": null, "createAt": "2020-05-19 09:26:03", "updateAt": "2020-05-19T01:26:03.051Z" }, { "id": "d91b26ad-ab31-4c0e-85af-8ea627c94c02", "name": "垃圾人呀", "email": "1115796788", "content": "55", "pass": false, "userAgent": "WeChat 7.0.14.1660  Android  10 Xiaomi MI 9 mobile", "hostId": "c57b17a9-78f6-42cb-9ecf-f921f68f1d22", "isHostInPage": false, "parentCommentId": "6a7b8ff6-09f5-4b9e-8043-291afbdec1cd", "replyUserName": "垃圾人呀", "replyUserEmail": null, "createAt": "2020-05-19 09:26:11", "updateAt": "2020-05-19T01:26:11.620Z" }], 5] }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let hostId = options.id
    this.setData({
      hostId: hostId
    })
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
      this.setData({
          itemInfo: res.data,
          title: title,
          content: content,
          files: files,
          locationinfo: JSON.parse(locationinfo),
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
    let id = e.detail.id
    let name = e.detail.name
    this.setData({
      focus:true,
      value:'',
      replyUserName:name,
      plaVal:'@'+name,
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
    let replyUserName = this.data.replyUserName
    let val = e.detail
    let parentCommentId = this.data.parentCommentId
    httpWX.post({
      url: '/comment',
      data: {
        hostId: hostId,
        name: '垃圾人呀',
        replyUserName: replyUserName,
        email: '1115796788',
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