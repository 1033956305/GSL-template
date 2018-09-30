// 商品详情
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.APP_CONSTANT,
    info: {
      name: '',
      introduction: '',
      model: '',
      puropose: '',
      volume: '',
      manufacturer: '',
      pictureUrl: ''
    }
  },
  toConnect: function () {
    wx.navigateTo({
      url: '../connect/connect?pid=' + this.data.info.id + '&uid=' + this.data.info.uid,
    })
  },
  toEvaluate: function () {
    wx.navigateTo({
      url: '../evaluate/evaluate?id=' + this.data.info.id
    })
  },
  toSeller: function (e) {
    wx.navigateTo({
      url: '../user/user?id=' + this.data.info.uid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    wx.request({
      url: that.data.url + '/product/queryById',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          that.setData({
            info: res.data.data.product
          })
          console.log(that.data.info)
        } else {
          wx.showToast({
            title: '商品已下架',
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