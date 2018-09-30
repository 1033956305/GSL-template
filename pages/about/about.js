// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      photo: '../../images/user.jpg',
      nickname: 'JACK',
      roleId: '1',
    },
    url: getApp().globalData.APP_CONSTANT,
    orders: [],
  },
  toUser: function () {
    if (!this.data.info.id) {
      return
    }
    console.log(getApp().globalData.roleId)
    if (String(getApp().globalData.roleId) === '0') {
      return
    }
    wx.navigateTo({
      url: '../user/user?id=' + this.data.info.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = this.data.url
    var that = this
    console.log(getApp().globalData.user)
    console.log(String(getApp().globalData.roleId))
    that.setData({
      roleId: String(getApp().globalData.roleId),
      info: getApp().globalData.user
    })
    // wx.request({
    //   url: url + '/user/selectOne',
    //   method: 'POST',
    //   header: {
    //     'Authorization': getApp().globalData.Authorization
    //   },
    //   data: {
    //     id: getApp().globalData.id
    //   },
    //   success (res) {
    //     console.log(res)
    //     if (res.data.code === 200) {
    //       that.setData({
    //         info: res.data.data.user
    //       })
    //     }
    //   }
    // })
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