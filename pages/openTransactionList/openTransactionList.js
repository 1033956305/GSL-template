// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.APP_CONSTANT,
    pageData: {
      type: '',
      pageSize: 10,
      pageCount: 1
    },
    noInfo: 'hide',
    nomore: 'hide',
    type: 'type',
    orderList: [
    ]
  },
  toProduct: function (event) {
    if (getApp().globalData.roleId === '0') {
      wx.showToast({
        title: '请登录...',
        icon: 'none'
      })
      return
    }
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '正在加载中...',
    })
    var url = this.data.url
    var that = this
    var noInfo = 'noInfo'
    // 关键字查询
    var data = {
      name: '',
      pageSize: 10,
      pageCount: 1
    }
    this.setData({
      pageData: data,
      type: 'value',
    })
    wx.request({
      url: url + '/product/queryname',
      method: 'POST',
      data: data,
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          if (res.data.data) {
            if (res.data.data.PageInfo.length >= data.pageSize) {
              noInfo = 'hide'
            }
            that.setData({
              orderList: res.data.data.PageInfo,
              noInfo: noInfo
            })
          } else {
            that.setData({
              orderList: [],
              // nomore: 'show',
              noInfo: noInfo
            })
          }
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
    console.log('下拉')
    wx.showLoading({
      title: '正在加载中...',
    })
    var url = this.data.url
    var that = this
    var data = this.data.pageData
    data.pageCount = 1
    this.setData({
      pageData: data
    })
    wx.showNavigationBarLoading();
    if (this.data.type === 'value') {
      wx.request({
        url: url + '/product/queryname',
        method: 'POST',
        data: data,
        header: {
          'Authorization': getApp().globalData.Authorization
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          if (res.statusCode === 401) {
            wx.reLaunch({
              url: '../login/login',
            })
          } else {
            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
            if (res.data.data) {
              that.setData({
                orderList: res.data.data.PageInfo
              })
            } else {
              that.setData({
                orderList: [],
                nomore: 'show'
              })
            }
          }

        }
      })
    } else if (this.data.type === 'type') {
      wx.request({
        url: url + '/product/select',
        method: 'POST',
        data: data,
        header: {
          'Authorization': getApp().globalData.Authorization
        },
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          if (res.statusCode === 401) {
            wx.reLaunch({
              url: '../login/login',
            })
          } else {
            // 隐藏导航栏加载框
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
            if (res.data.data) {
              that.setData({
                orderList: res.data.data.PageInfo,
                noInfo: 'hide'
              })
            } else {
              that.setData({
                orderList: [],
                nomore: 'show'
              })
            }
          }
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底')
    var url = this.data.url
    var that = this
    var data1 = this.data.pageData
    data1.pageCount += 1
    this.setData({
      pageData: data1
    })

    var more = ''
    if (this.data.type === 'type') {
      more = '/product/select'
    } else {
      more = '/product/queryname'
    }
    // 判断是否需要加载
    if (this.data.noInfo === 'noInfo') {
      return
    }
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 请求数据
    wx.request({
      url: url + more,
      method: 'POST',
      data: data1,
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      success: function (res) {
        console.log(res)

        if (res.statusCode === 401) {
          wx.hideLoading()
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          var noInfo = 'hide'
          var info = res.data.data.PageInfo
          var orderList = that.data.orderList
          if (res.data.data) {
            // 有数据时添加
            orderList = orderList.concat(info)
            if (res.data.data.PageInfo.length < that.data.pageData.pageSize) {
              noInfo = 'noInfo'
            }
          } else {
            //若没有数据了
            data1.pageCount -= 1
            noInfo = 'noInfo'
          }
          that.setData({
            pageData: data1,
            noInfo: noInfo,
            orderList: orderList
          }, function callback(res) {
            wx.hideLoading()
          })
        }

      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})