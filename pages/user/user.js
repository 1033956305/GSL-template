// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '努力加载中...',
    })
    // 查询用户信息
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/user/selectOne',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        id: options.id
      },
      success(res) {
        wx.hideLoading()
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {

          that.setData({
            info: res.data.data.userDto
          })
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