const httpWX = require('../../utils/wx-request.js')
const app = getApp()
const bus = app.globalData.bus
Page({
  data: {
    flag: false,
    current: 0,
    style: 7,
    tabValue: 'name2',
    contBarHeight: 0,
    newsList: [],
    windowHeight: 0,
    scrollViewHeight: 0
  },

  radioChange(e) {
    this.setData({
      style: e.detail.value
    })
  },

  OnReleaseArticle() {
    if (!app.globalData.userInfo) {
      this.setData({
        flag: true
      })
      return
    }
    wx.navigateTo({
      url: "/pages/home/write/index",
    })
  },

  change: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  headLoad(e) {
    this.setData({
      contBarHeight: e.detail.contBarHeight
    })
  },

  onLoad() {
    this.contentHeight()
    this.OnGetList(1)
  },

  onShow() {

  },
  getUserInfo() {
    this.setData({
      flag: false
    })
    wx.navigateTo({
      url: "/pages/home/write/index",
    })
  },
  contentHeight() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
    let query = wx.createSelectorQuery().in(this);
    query.select('#navbar').boundingClientRect();
    query.select('#header').boundingClientRect();
    query.select('#noticeBar').boundingClientRect();
    query.exec((res) => {
      // 分别取出navbar和header的高度
      let [navbarHeight, headerHeight, noticeHeight] = res
      // 然后就是做个减法
      let scrollViewHeight = this.data.windowHeight - navbarHeight.height - headerHeight.height - noticeHeight.height;
      // 算出来之后存到data对象里面
      this.setData({
        scrollViewHeight: scrollViewHeight
      });
    });
  },

  OnGetList(page) {
    httpWX.get({
      url: '/article?page=' + page,
    }).then(res => {
      if (res.data[0] && res.data[0].length > 0) {
        let list = res.data[0]
        console.log(this.list)
        this.setData({
          newsList: list
        })
      }
    })
  },
  ItemDetail(e) {
    let id = e.detail.id
    wx.navigateTo({
      url: "/pages/home/detail/detail?id=" + id,
    })
  },

  closeMask() {
    this.setData({
      flag: false
    })
  }
});