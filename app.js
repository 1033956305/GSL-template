//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var data = {
            code: res.code
          }
          var that = this
          wx.showLoading({
            title: '加载中...',
          })
          // return
          wx.request({
            url: 'https://cs.royalsecurity.cn/gongshanglianmodel/wechat/openid',
            data: data,
            method: 'POST',
            success: function (res) {
              console.log(res)
              that.globalData.Authorization = res.header.Authorization
              wx.hideLoading()
              if (res.data.data.user) {
                that.globalData.openid = res.data.data.openid
                that.globalData.id = res.data.data.user.id     // 取得全局变量需要的值
                that.globalData.roleId = res.data.data.user.roleId
                that.globalData.user = res.data.data.user
                wx.switchTab({
                  url: '../main/main',
                })
              } else {
                that.globalData.openid = res.data.data.openid
              }
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
  },
  globalData: {
    userInfo: null,
    // APP_CONSTANT: 'http://192.168.31.38:8080/gongshanglianmodel',
    // BACKEND_CONSTANT: 'http://192.168.31.38:8081/houtaimodel',
    BACKEND_CONSTANT: 'https://cs.royalsecurity.cn/houtaimodel',
    APP_CONSTANT: 'https://cs.royalsecurity.cn/gongshanglianmodel'
    // APP_CONSTANT: 'http://192.168.31.38:8082/gongshanglian'
  }
})