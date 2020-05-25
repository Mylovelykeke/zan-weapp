const httpWX = require('../../utils/wx-request.js')
Page({
  data: {
    style: 7,
    tabValue: 'name2',
    contBarHeight: 0,
    newsList:[],
  },

  radioChange (e) {
    this.setData({
      style: e.detail.value
    })
  },

  headLoad (e) {
    this.setData({
      contBarHeight: e.detail.contBarHeight
    })
  },
  
  onLoad () {
    this.OnGetList(1)
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
  ItemDetail (e) {
    console.log(e.detail.id)
    wx.navigateTo({
      url: "/pages/home/detail/detail",
    })
  } 
});
