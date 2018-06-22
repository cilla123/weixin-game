function getToken() {
  return wx.getStorageSync('token')
}
let jieliu = false
export default {
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      if (jieliu) return false
      jieliu = true
      wx.request({
        url: `http://123.207.248.168:8081${url}`,
        method: 'POST',
        data: data || {},
        header: {
          'sessionId': getToken(),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success(response) {
          jieliu = false
          response = response.data
          if (response.status == "2000000") {
            resolve(response)
          } else if (response.status == "5000101") {
            wx.showToast({
              title: '正在重新登录',
              icon: 'none'
            })
            wx.removeStorageSync('token')
          } else if (response.status == "50001032") {
            resolve(response)
          } else {
            reject(response)
            wx.showToast({
              title: response.message,
              icon: 'none'
            })
          }
        }
      });
    })
  }
}