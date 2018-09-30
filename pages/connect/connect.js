// 商品联系方式
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      phone: '',
      tel: '',
      qq: '',
      wechat: '',
      fax: '',
      pictureUrl: ''
    }
  },
  cancel: function () {
    wx.switchTab({
      url: '../main/main',
    })
  },
  confirm: function () {
    if (String(getApp().globalData.id) === String(this.data.uid)) {
      wx.showToast({
        title: '无法购买自己的商品',
        icon: 'none'
      })
      return
    }
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/orderForm/insert',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        pid: that.data.pid,
        buyUid: getApp().globalData.id + ''
      },
      success (res) {
        console.log(res)
        if (res.data.code === 200) {
          wx.switchTab({
            url: '../order/order',
          })
        } else if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          wx.showToast({
            title: '商品已下架',
            icon: 'none'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../main/main',
            })
          },1500)
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pid: options.pid,
      uid: options.uid
    })
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/contact/query',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        pid: options.pid,
        uid: options.uid,
      },
      success (res) {
        console.log(res)
        if (res.data.code === 200) {
          that.setData({
            info: res.data.data.contactDto
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