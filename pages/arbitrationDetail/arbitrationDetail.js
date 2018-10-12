// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.APP_CONSTANT,
    state: ['差评', '中评', '好评'],
    isClose: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: this.data.url + '/arb/queryOne',
      method: 'POST',
      data: { id: options.id },
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          wx.hideLoading()
          that.setData({
            info: res.data.data.arbitrationDto,
            isClose: options.state
          })
        } else {
          wx.showToast({
            title: '仲裁信息不存在',
            icon: 'none'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../main/main',
            })
          }, 1500)
        }
      }
    })
  },
  confirm (type) {
    console.log(type.currentTarget.dataset.type)
    wx.request({
      url: this.data.url + '/arb/update',
      method: 'POST',
      data: { 
        id: this.data.info.id,
        uid: getApp().globalData.id,
        operateId: type.currentTarget.dataset.type
      },
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          wx.hideLoading()
          wx.showToast({
            title: '投票成功'
          })
          setTimeout(function () {
            wx.navigateBack(1)
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack(1)
          }, 1500)
        }
      }
    })
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