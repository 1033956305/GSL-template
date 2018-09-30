// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.APP_CONSTANT,
  },
  toMain: function () {
    var data = {
      username: 'admin',
      userpwd: '123456'
    }
    var url = this.data.url
    wx.request({
      url: url + '/tokens/login',
      method: 'POST',
      data: JSON.stringify(data),
      success: function (res) {
        getApp().globalData.Authorization = res.header.Authorization
        console.log(res)
        if (res.data.msg === '账号不存在') {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        } else if (res.data.code === 200) {
          var app = getApp();     // 取得全局App
          app.globalData.id = res.data.data.resUser.id     // 取得全局变量需要的值
          app.globalData.user = res.data.data.resUser
          app.globalData.roleId = '0'
          wx.switchTab({
            url: '../main/main',
          })
        } else {
          wx.showToast({
            title: '服务器繁忙',
            icon: 'none'
          })
        }
      }
    })
  },
  memberLogin: function (e) {
    console.log(this)
    var data = {
      username: e.detail.value.userName,
      userpwd: e.detail.value.pwd,
      openid: getApp().globalData.openid
    }
    console.log(data)
    var url = this.data.url
    wx.request({
      url: url + '/tokens/login',
      method: 'POST',
      data: JSON.stringify(data),
      success: function (res) {
        getApp().globalData.Authorization = res.header.Authorization
        console.log(res)
        if (res.data.msg === '账号不存在') {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        } else if (res.data.code === 200) {
          var app = getApp();     // 取得全局App
          app.globalData.id = res.data.data.resUser.id     // 取得全局变量需要的值
          app.globalData.roleId = res.data.data.resUser.roleId
          app.globalData.user = res.data.data.resUser
          if (res.data.data.resUser.roleId === 3) {
            wx.showToast({
              title: '管理员账号无法登陆',
              icon: 'none'
            })
          } else {
            wx.switchTab({
              url: '../main/main',
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
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