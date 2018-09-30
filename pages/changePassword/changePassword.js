// pages/changePassword/changePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.APP_CONSTANT,
    userId: getApp().globalData.id,
    info: {}
  },
  confirm: function (e) {
    var that = this
    var data = {
      id: getApp().globalData.id,
      oldPwd: e.detail.value.oldPWD,
      newPwd: e.detail.value.newPWD
    }
    this.setData({
      info: data
    })
    wx.showModal({
      title: '确认',
      content: '确定修改密码？',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.url + '/user/update',
            data: data,
            header: {
              'Authorization': getApp().globalData.Authorization
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.code === 200) {
                wx.showToast({
                  title: '修改成功',
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                })
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
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