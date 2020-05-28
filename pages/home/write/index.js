// pages/home/write/index.js
const httpWX = require('../../../utils/wx-request.js')
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '出租房子',
    content: '',
    title: '',
    locationinfo: null,
    actions: [{
        name: '出租房子'
      },
      {
        name: '求租房子'
      },
      {
        name: '其他'
      }
    ],
    imgList: [],
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onClickHide() {
    this.setData({
      flag: false
    });
  },

  selectType() {
    this.setData({
      flag: true
    });
  },

  selectName(e) {
    let val = e.currentTarget.dataset.val
    this.setData({
      name: val,
      flag: false
    })
  },
  uploadImg(e) {
    this.setData({
      imgList: e.detail.all
    })
  },

  titleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  contentInput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  edit() {
    if (!this.data.title) {
      Notify({
        type: 'warning',
        message: '至少输入文章标题'
      })
      return
    }
    if (this.data.content.length < 15) {
      Notify({
        message: '至少输入15个字',
        type: 'warning',
      });
      return
    }
    const arr = this.data.imgList.map(path => {
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: 'http://www.superstarprogram.xyz:8081/api/file/upload',
          filePath: path.url,
          name: 'file',
          method: 'POST', //请求方式
          success: resolve,
          fail: reject
        })
      })
    })
    Promise.all(arr).then(res => {
      // 上传成功，获取这些图片在服务器上的地址，组成一个数组
      return res.map(item => JSON.parse(item.data).data.id)
    }).catch(err => {
      console.log(">>>> upload images error:", err)
    }).then(ids => {
      let filesid = ids.join(',')
      httpWX.post({
        url: '/article/created',
        data: {
          'openid': '11111111111111111111',
          "summary": this.data.name,
          'title': this.data.title,
          'content': this.data.content,
          'locationinfo': this.data.location,
          'files': filesid
        },
      }).then(res => {
        console.log(res, '??')
        if (res.statusCode == 200) {
          wx.switchTab({
            url: '/pages/home/home',
            success: function() {
              console.log(2222)
              var page = getCurrentPages().pop();
              console.log('page', page)
              if (page == undefined || page == null) return;
              page.onLoad();
            }, //接口调用成功的回调函数
            fail: function() {
              console.log(2)
            }, //接口调用失败的回调函数
            complete: function () { console.log(23)} //接口调用结束的回调函数（调用成功、失败都会执行）
          })
        }
      })
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