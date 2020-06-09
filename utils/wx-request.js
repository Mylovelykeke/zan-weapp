const host = 'http://localhost:4000/api'
// const host = 'http://superstarprogram.xyz:8081/api'

function request(res) {
  let { url, method, data, header = {}, Domain = true} = res
  let ROOT = Domain ? (host + url):url
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: ROOT, // 仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'authorization': wx.getStorageSync('token')
      },
      success: function(res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function(res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  })
}

function get(obj) {
  obj.method = 'GET'
  return request(obj)
}

function post(obj) {
  obj.method = 'POST'
  return request(obj)
}

module.exports = {
  request,
  get,
  post,
  host
}