// components/logincomponent/index.js
const app = getApp();
var bus = app.globalData.bus
const httpWX = require('../../utils/wx-request.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag:{
      type:Boolean,
      value:true
    }
  },
  created(){
  },

  /**
   * 组件的初始数据
   */
  data: {
    openid:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGotUserInfo(e) {
      try{
        if (e) {
          let userInfo = e.detail.userInfo
          userInfo.openid = app.globalData.openid
          userInfo.password = '123456'
          httpWX.post({
            url: '/user/register',
            data: {
              userInfo
            }
          }).then(res => {
            app.globalData.userInfo = res.data
            wx.setStorageSync('token', res.data.token)
            this.triggerEvent("getUserInfo", res.data)
            this.setData({
              flag:false
            })
          })
        }
      }catch(e){
        console.log(e)
      }
    },
    cancel(){
      this.triggerEvent("closeMask")
    }
  }
})
