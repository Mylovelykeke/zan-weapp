// miniprogram_npm/vtuweapp/template/news/template1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newsList: {
      type: Array,
      value: []
    },
    cardFlag:{
      type: Boolean,
      value:true
    },
    footer:{
      type: Boolean,
      value: true
    },
    format:{
      type: String,
      value: 'middle'
    },
    setting:{
      type: Boolean,
      value: false
    },
    titleStyle: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    viewdetail(e) {
      this.triggerEvent('detail', { id: e.currentTarget.dataset['id'] });
    },
    handleMsg(val){
      console.log(val,'?????')
    },
    onImageError(e){
      console.log(e)
    },
    showImage(e) {
      let item = e.currentTarget.dataset.item
      let currenturl = e.currentTarget.dataset.currenturl
      //图片预览
      let urls = item.map(data => {
        return data.url
      })
      wx.previewImage({
        current: currenturl, // 当前显示图片的http链接
        urls: urls, // 需要预览的图片http链接列表
        success: function (res) { },
        fail: function (res) {
          console.log(res);
        },
      })
    },
    setAction(e){
      this.triggerEvent('detail', { id: e.currentTarget.dataset['id'] });
    }
  }
})
