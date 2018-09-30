// pages/watchEvaluate/watchEvaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluate: 'hide',
    oid: '',
    leader: false,
    buyer: {
      detail: ''
    },
    seller: {
      detail: ''
    }
  },
  write: function () {
    if (this.data.type === '卖家' && !this.data.buyer.detail) {
      wx.showToast({
        title: '请等待买家评论',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '../toEvaluate/toEvaluate?type=' + this.data.type + '&oid=' + this.data.oid + '&pid=' + this.data.pid + 
      '&id=' + this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oid: options.oid
    })
    var that = this
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
    wx.showLoading({
      title: '努力加载中...',
      icon: 'none'
    })
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/evaluate/selectOne',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        oid: Number(this.data.oid),
        uid: getApp().globalData.id
      },
      success(res) {
        console.log(res)
        wx.hideLoading()
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          var evaluate = 'hide'
          var type = '卖家',leader = false
          if (res.data.data.explain === '买家') {
            type = '买家'
            if (!res.data.data.evaluateDto.buyContent) {
              evaluate = 'show'
            }
          } else if (res.data.data.explain === '卖家') {
            type = '卖家'
            if (!res.data.data.evaluateDto.sellContent) {
              evaluate = 'show'
            }
          } else {
            type = res.data.data.explain
            if (res.data.data.type === 1) {
              evaluate = 'show'
            } else {
              leader = true
            }
          }
          console.log(!res.data.data.evaluateDto.buyContent)
          console.log(res.data.data.explain)
          console.log(evaluate)
          that.setData({
            evaluation: res.data.data.evaluateDto,
            buyer: {
              detail: res.data.data.evaluateDto.buyContent
            },
            seller: {
              detail: res.data.data.evaluateDto.sellContent
            },
            state: res.data.data.explain,
            type: type,
            leader: leader,
            evaluate: evaluate,
            id: res.data.data.evaluateDto.id,
            oid: res.data.data.evaluateDto.oid,
            pid: res.data.data.evaluateDto.pid
          }, function () {
            wx.hideLoading()
          })
        }
      }
    })
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
    wx.showLoading({
      title: '努力加载中...',
      icon: 'none'
    })
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/evaluate/selectOne',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        oid: Number(this.data.oid),
        uid: getApp().globalData.id
      },
      success(res) {
        console.log(res)
        wx.hideLoading()
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
          var evaluate = 'hide'
          var type = '卖家', leader = false
          if (res.data.data.explain === '买家') {
            type = '买家'
            if (!res.data.data.evaluateDto.buyContent) {
              evaluate = 'show'
            }
          } else if (res.data.data.explain === '卖家') {
            type = '卖家'
            if (!res.data.data.evaluateDto.sellContent) {
              evaluate = 'show'
            }
          } else {
            type = res.data.data.explain
            if (res.data.data.type === 1) {
              evaluate = 'show'
            } else {
              leader = true
            }
          }
          console.log(!res.data.data.evaluateDto.buyContent)
          console.log(res.data.data.explain)
          console.log(evaluate)
          that.setData({
            buyer: {
              detail: res.data.data.evaluateDto.buyContent
            },
            seller: {
              detail: res.data.data.evaluateDto.sellContent
            },
            state: res.data.data.explain,
            type: type,
            leader: leader,
            evaluate: evaluate,
            id: res.data.data.evaluateDto.id,
            oid: res.data.data.evaluateDto.oid,
            pid: res.data.data.evaluateDto.pid
          }, function () {
            wx.hideLoading()
          })
        }
      }
    })
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