// components/imgPicker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    preview: {
      type: Boolean,
      default: true
    },
    imgList: {
      type: Array,
      default: []
    },
    count: {
      type: Number,
      default: 9
    },
    sourceType: {
      type: Array,
      default: ['album', 'camera']
    },
    sizeType: {
      type: Array,
      default: ['original', 'compressed']
    },
    maxSize: {
      type: Number,
      default: 0
    },
    maxWidth: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 0
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
    deleteItem(){
      this.triggerEvent('deleteItem',{})
    }
  }
})
