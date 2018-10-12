// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.APP_CONSTANT,
    state: ['差评', '中评', '好评'],
    isClose: '0',
    isEvaluate: false,
    isSignUp: false
  },
  evaluate () {
    var that = this
    wx.showActionSheet({
      itemList: ['好评', '中评', '差评'],
      success: function (res) {
        var activityId = that.data.info.id
        console.log(that.data.info)
        wx.request({
          url: that.data.url + '/activity/addevaluate',
          method: 'POST',
          data: {
            activityId: activityId,
            evaluateId: getApp().globalData.id,
            evaluateType: res.tapIndex + 1
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
            } else if (res.data.response === 'success') {
              wx.hideLoading()
              wx.showToast({
                title: '评价成功'
              })
              setTimeout(function () {
                wx.navigateBack(1)
              }, 1500)
            } else {
              wx.showToast({
                title: res.data.data.msg,
                icon: 'none'
              })
              setTimeout(function () {
                wx.navigateBack(1)
              }, 1500)
            }
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  signUp () {
    var that = this
    wx.request({
      url: that.data.url + '/acpt/add',
      method: 'POST',
      data: {
        activityId: that.data.info.id,
        evaluateId: getApp().globalData.id
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
        } else if (res.data.response === 'success') {
          wx.hideLoading()
          wx.showToast({
            title: '报名成功'
          })
          setTimeout(function () {
            wx.navigateBack(1)
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.data.msg,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    wx.showLoading({
      title: '加载中...',
    })
    if (options.type === '3') {
      this.setData({
        isEvaluate: true
      })
    } else if (options.type === '1') {
      
      this.setData({
        isSignUp: true
      })
    }
    wx.request({
      url: getApp().globalData.BACKEND_CONSTANT + '/activity/detail',
      method: 'POST',
      data: { id: Number(options.id) },
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.response === 'success') {
          wx.hideLoading()
          that.setData({
            info: res.data.data,
            // isClose: options.state
          })
        } else {
          wx.showToast({
            title: '活动信息不存在',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack(1)
          }, 1500)
        }
      }
    })
  },
  confirm(type) {
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