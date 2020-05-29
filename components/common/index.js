// components/commonentItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    authorname: {
      type: String,
      value: '001'
    },
    othername: {
      type: String,
      value: '002'
    },
    publictime: {
      type: String,
      value: '2020.01.01'
    },
    headeImg: {
      type: String,
      value: 'https://profile.csdnimg.cn/9/2/9/3_xiasohuai'
    },
    content: {
      type: String,
      value: '1111111111111111111sssssssd2是顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶11'
    },
    likenum: {
      type: String,
      value: '123'
    },
    comment: {
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
    OnClickReplyName(e){
      console.log(e)
      let name = e.currentTarget.dataset.name
      let id = e.currentTarget.dataset.id
      this.triggerEvent("replymsg",{
        name:name,
        id:id
      })
    }
  }
})
