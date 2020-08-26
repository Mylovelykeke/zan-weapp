const httpWX = require('../../utils/wx-request.js')
const app = getApp()
const bus = app.globalData.bus
Page({
  data: {
    flag: false,
    changeFlag: false,
    current: 0,
    style: 7,
    contBarHeight: 0,
    newsNum: 1,
    fzNum: 1,
    newsList: [],
    FZList: [],
    windowHeight: 0,
    scrollViewHeight: 0,
    loading: {
      show: true
    },
    cur:0,
    imageList: [
      {
        url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/1.png',
        mode: "widthFix"
      },
      {
        url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/2.png',
        mode: "widthFix"
      },
      {
        url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/3.png',
        mode: "widthFix"
      },
      {
        url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/4.png',
        mode: "widthFix"
      },
      {
        url: 'https://activity.vtuzx.com/doc/vtuUI/weapp/swiper/5.png',
        mode: "widthFix"
      }
    ],
    windowWidth: wx.getSystemInfoSync().windowWidth
  },
  bindChange: function (e) {
    this.setData({
      cur: e.detail.current
    })
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
    if (!this.data.changeFlag) {
      this.setData({
        current: e.detail.current,
        changeFlag: true
      })
      this.OnGetList()
      setTimeout(() => {
        this.setData({
          changeFlag: false
        })
      }, 10)
    }
  },

  headLoad(e) {
    this.setData({
      contBarHeight: e.detail.contBarHeight
    })
  },

  onLoad() {
    this.contentHeight()
    this.OnGetList()
  },

  onShow() {
    if (app.globalData.userInfo) {
      this.setData({
        flag: false
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          flag: false
        })
      }
    }
    this.OnGetList(false,true)
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
    // query.select('#header').boundingClientRect();
    let query = wx.createSelectorQuery().in(this);
    query.select('#navbar').boundingClientRect();
    query.select('#noticeBar').boundingClientRect();
    query.exec((res) => {
      // 分别取出navbar和header的高度
      let [navbarHeight, noticeHeight] = res
      // 然后就是做个减法
      let scrollViewHeight = this.data.windowHeight - navbarHeight.height - noticeHeight.height;
      // 算出来之后存到data对象里面
      this.setData({
        scrollViewHeight: scrollViewHeight
      });
    });
  },
  async onGetCount(hostId) {
    let result = await httpWX.get({
      url: `/comment/count/${hostId}`,
    })
    if (result.statusCode == 200) {
      return result.data
    }
  },

  async OnGetList(action = true, up = false) {
    let type = this.data.current
    let page = 1
    let oldList = []
    if (!up) {
      if (type == 0) {
        page = this.data.newsNum
        oldList = this.data.newsList
      } else if (type == 1) {
        page = this.data.fzNum
        oldList = this.data.FZList
      }
    }
    //切换不触发请求，下拉刷新
    if ((this.data.current == 0 && this.data.newsList.length > 0 && action) || (this.data.current == 1 && this.data.FZList.length > 0 && action)) {
      return
    }
    this.setData({
      loading: {
        show: false
      }
    })
    let res = await httpWX.get({
      url: '/article',
      data: {
        page: page,
        type: type
      }
    })
  console.log(res,'??')
    let list = res.data[0]
    for (let data of list) {
      data.content = data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ')
        .replace(/<section/g, '<div')
        .replace(/\/section>/g, '\div>');
    }
    if (page == 1) {
      oldList = []
    }
    if (list.length > 0) {
      page += 1
    }
    if (this.data.current == 0) {
      this.setData({
        newsList: oldList.concat(list),
        newsNum: page,
        loading: {
          show: true
        }
      })
    } else if (this.data.current == 1) {
      this.setData({
        FZList: oldList.concat(list),
        fzNum: page,
        loading: {
          show: true
        }
      })
    }else{
      this.setData({
        loading: {
          show: true
        }
      })
    }
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

  search() {
    wx.navigateTo({
      url: "/pages/home/searchLoad/index",
    })
  },

  getInfo() {
    wx.switchTab({
      url: "/pages/msg/main",
    })
  },

  bindscrolltoupper() {

  },

  bindscrolltolower(e) {
    this.OnGetList(false)
  }
});