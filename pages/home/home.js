const httpWX = require('../../utils/wx-request.js')
const app = getApp()
const bus = app.globalData.bus
Page({
  data: {
    flag: false,
    changeFlag:false,
    current: 0,
    style: 7,
    tabValue: 'name2',
    contBarHeight: 0,
    newsList: [],
    FZList:[],
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
    if(!this.data.changeFlag){
      this.OnGetList(1, e.detail.current)
      this.setData({
        current: e.detail.current,
        changeFlag:true
        })
        setTimeout(()=>{
          this.setData({
            changeFlag:false
          })
        },10)
      }
  },

  headLoad(e) {
    this.setData({
      contBarHeight: e.detail.contBarHeight
    })
  },

  onLoad() {
    this.contentHeight()
    this.OnGetList(1,this.data.current)
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

  OnGetList(page, type) {
    httpWX.get({
      url: `/article?page=${page}&type=${type}`,
    }).then(res => {
        let list = res.data[0]
        list.map(data=>{
          data.content = data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ')
            .replace(/<section/g, '<div')
            .replace(/\/section>/g, '\div>');
            return data
        })
       if(this.data.current == 0){
         this.setData({
           newsList: list
         })
       } else if (this.data.current == 1){
         this.setData({
           FZList: list
         })
       }
    })
  },
  ItemDetail(e) {
    let id = e.detail.id
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/home/detail/detail?id=${id}&type=${type}`,
    })
  },

  closeMask() {
    this.setData({
      flag: false
    })
  },

  search(){
    wx.navigateTo({
      url: "/pages/home/searchLoad/index",
    })
  }
});