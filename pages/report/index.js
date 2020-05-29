// pages/report/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,
    value: "",
    ITEM: null,
    content: [{
      time: '2012-12-08 02.14',
      userInfo: {
        name: '丁香医生',
        avatar: 'https://profile.csdnimg.cn/9/2/9/3_xiasohuai'
      },
      ImgArray: [],
      title: '安静速度快快的经开是哪个出售！！！！！',
      brief: 'tip: 如果在 bindchange 的事件回调函数中使用 setData 改变 current 值，则有可能导致 setData 被不停地调用，因而通常情况下请在改变 current 值前检测 source 字段来判断是否是由于用户触摸引起。'
    }],
    list: ['低俗色情', '垃圾广告', '内容低俗无意义', '辱骂攻击', '其他违法信息', '抄袭我的内容', '暴露我的隐私', '内容里有关无我的不实描述']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  handleItem(e) {
    console.log(e)
    let ITEM = e.currentTarget.dataset.item
    this.setData({
      ITEM: ITEM
    })
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