//app.js\
const httpWX = require('/utils/wx-request.js')
var eventBus = require('utils/eventbus.js')

App({
  globalData:{
    openid:null,
    userInfo: null,
    bus: eventBus.eventBus,
    biaoqingList: [
      { id: 1, name: '微笑', symbol: '🙂' },
      { id: 2, name: '伤心', symbol: '☹️' },
      { id: 3, name: '美女', symbol: '😍' },
      { id: 4, name: '发呆', symbol: '😳' },
      { id: 5, name: '墨镜', symbol: '😎' },
      { id: 6, name: '哭', symbol: '😭' },
      { id: 7, name: '羞', symbol: '😊' },
      { id: 8, name: '哑', symbol: '/::X' },
      { id: 9, name: '睡', symbol: '/::Z' },
      { id: 10, name: '哭', symbol: '/::\'(' },
      { id: 11, name: '囧', symbol: '/::-|' },
      { id: 12, name: '怒', symbol: '/::@' },
      { id: 13, name: '调皮', symbol: '/::P' },
      { id: 14, name: '笑', symbol: '/::D' },
      { id: 15, name: '惊讶', symbol: '/::O' },
      { id: 16, name: '难过', symbol: '/::(' },
      { id: 17, name: '酷', symbol: '/::+' },
      { id: 18, name: '汗', symbol: '/:–b' },
      { id: 19, name: '抓狂', symbol: '/::Q' },
      { id: 20, name: '吐', symbol: '/::T' },
      { id: 21, name: '笑', symbol: '/:,@P' },
      { id: 22, name: '快乐', symbol: '/:,@-D' },
      { id: 23, name: '奇', symbol: '/::d' },
      { id: 24, name: '傲', symbol: '/:,@o' },
      { id: 25, name: '饿', symbol: '/::g' },
      { id: 26, name: '累', symbol: '/:|-)' },
      { id: 27, name: '吓', symbol: '/::!' },
      { id: 28, name: '汗', symbol: '/::L' },
      { id: 29, name: '高兴', symbol: '/::>' },
      { id: 30, name: '闲', symbol: '/::,@' },
      { id: 31, name: '努力', symbol: '/:,@f' },
      { id: 32, name: '骂', symbol: '/::-S' },
      { id: 33, name: '疑问', symbol: '/:?' },
      { id: 34, name: '秘密', symbol: '/:,@x' },
      { id: 35, name: '乱', symbol: '/:,@@' },
      { id: 36, name: '疯', symbol: '/::8' },
      { id: 37, name: '哀', symbol: '/:,@!' },
      { id: 38, name: '鬼', symbol: '/:!!!' },
      { id: 39, name: '打击', symbol: '/:xx' },
      { id: 40, name: 'bye', symbol: '/:bye' },
      { id: 41, name: '汗', symbol: '/:wipe' },
      { id: 42, name: '抠', symbol: '/:dig' },
      { id: 43, name: '鼓掌', symbol: '/:handclap' },
      { id: 44, name: '糟糕', symbol: '/:&-(' },
      { id: 45, name: '恶搞', symbol: '/:B-)' },
      { id: 46, name: '什么', symbol: '/:<@' },
      { id: 47, name: '什么', symbol: '/:@>' },
      { id: 48, name: '累', symbol: '/::-O' },
      { id: 49, name: '看', symbol: '/:>-|' },
      { id: 50, name: '难过', symbol: '/:P-(' },
      { id: 51, name: '难过', symbol: '/::\'|' },
      { id: 52, name: '坏', symbol: '/:X-)' },
      { id: 53, name: '亲', symbol: '/::*' },
      { id: 54, name: '吓', symbol: '/:@x' },
      { id: 55, name: '可怜', symbol: '/:8*' },
      { id: 56, name: '刀', symbol: '/:pd' },
      { id: 57, name: '水果', symbol: '/:<W>' },
      { id: 58, name: '酒', symbol: '/:beer' },
      { id: 59, name: '篮球', symbol: '/:basketb' },
      { id: 60, name: '乒乓', symbol: '/:oo' },
      { id: 61, name: '咖啡', symbol: '/:coffee' },
      { id: 62, name: '美食', symbol: '/:eat' },
      { id: 63, name: '动物', symbol: '/:pig' },
      { id: 64, name: '鲜花', symbol: '/:rose' },
      { id: 65, name: '枯', symbol: '/:fade' },
      { id: 66, name: '唇', symbol: '/:showlove' },
      { id: 67, name: '爱', symbol: '/:heart' },
      { id: 68, name: '分手', symbol: '/:break' },
      { id: 69, name: '生日', symbol: '/:cake' },
      { id: 70, name: '电', symbol: '/:li' },
      { id: 71, name: '炸弹', symbol: '/:bome' },
      { id: 72, name: '刀', symbol: '/:kn' },
      { id: 73, name: '足球', symbol: '/:footb' },
      { id: 74, name: '瓢虫', symbol: '/:ladybug' },
      { id: 75, name: '便便', symbol: '/:shit' },
      { id: 76, name: '月亮', symbol: '/:moon' },
      { id: 77, name: '太阳', symbol: '/:sun' },
      { id: 78, name: '礼物', symbol: '/:gift' },
      { id: 79, name: '拥抱', symbol: '/:hug' },
      { id: 80, name: '强', symbol: '/:strong' },
      { id: 81, name: '弱', symbol: '/:weak' },
      { id: 82, name: '握手', symbol: '/:share' },
      { id: 83, name: '胜利', symbol: '/:v' },
      { id: 84, name: '抱拳', symbol: '/:@)' },
      { id: 85, name: '勾引', symbol: '/:jj' },
      { id: 86, name: '拳头', symbol: '/:@@' },
      { id: 87, name: '差劲', symbol: '/:bad' },
      { id: 88, name: '爱你', symbol: '/:lvu' },
      { id: 89, name: 'NO', symbol: '/:no' },
      { id: 90, name: 'OK', symbol: '/:ok' },
      { id: 91, name: '爱情', symbol: '/:love' },
      { id: 92, name: '飞吻', symbol: '/:<L>' },
      { id: 93, name: '跳跳', symbol: '/:jump' },
      { id: 94, name: '发抖', symbol: '/:shake' },
      { id: 95, name: '怄火', symbol: '/:<O>' },
      { id: 96, name: '转圈', symbol: '/:circle' },
      { id: 97, name: '磕头', symbol: '/:kotow' },
      { id: 98, name: '回头', symbol: '/:turn' },
      { id: 99, name: '跳绳', symbol: '/:skip' },
      { id: 100, name: '投降', symbol: '/:oY' },
      { id: 101, name: '激动', symbol: '/:#-0' },
      { id: 102, name: '乱舞', symbol: '/:hiphot' },
      { id: 103, name: '献吻', symbol: '/:kiss' },
      { id: 104, name: '左太极', symbol: '/:<&' },
      { id: 105, name: '右太极', symbol: '/:&>' }
    ],
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录

    wx.login({
      success:(res)=> {
        if (res.code) {
          // 这里可以把code传给后台，后台用此获取openid及session_key
          httpWX.get({
            url: '/user/logintoken?code=' + res.code
          }).then(res => {
              this.globalData.openid = res.data.openid
              if(this.openIdReadyCallback){
                this.openIdReadyCallback(res)
              }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})