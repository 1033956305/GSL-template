// pages/infoDetail/infoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: {

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    wx.showLoading({
      title: '努力加载中...',
    })
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/message/selectOne',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        id: options.id
      },
      success(res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            message: res.data.data.message
          })
        } else if (res.statusCode === 401) {
          // 若token失效，则重新登录
          wx.reLaunch({
            url: '../login/login',
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