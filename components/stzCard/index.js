// miniprogram_npm/vtuweapp/template/news/template1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newsList: {
      type: Array,
      value: []
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
    }
  }
})
