// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      'chosed',
      ''
    ],
    secondIndex: '0',
    selectInfo: {},
    type: 'my',
    noInfo: 'hide',
    uid: '',
    roleId: String(getApp().globalData.roleId),
    orderList: [
      // {
      // pictureUrl: '../../images/product.jpg',
      // productName: '柠檬',
      // content: '只是一个大柠檬',
      // type: '待确认',      
      // }
    ]
  },
  change: function (event) {
    var that = this
    var index = event.currentTarget.dataset.id
    if (this.data.list[index]) {
      return
    } else {
      var list = ['', '']
      list[index] = 'chosed'
      var data = {
        state: Number(index),
        pageSize: 10,
        pageCount: 1
      }
      this.setData({
        list: list,
        selectInfo: data
      })
      this.queryMy(data)

    }
    // if (index) {
    //   // 若为二级类
    //   this.setData({
    //     secondIndex: index
    //   })

    // } else {
    //   // 若为一级类
    //   if (this.data.firstList[index1]) {
    //     return
    //   } else {
    //     var listSecond = ['chosed', '', '', '', '']
    //     var list = ['', '']
    //     list[index1] = 'chosed'
    //     var type = 'my'
    //     var data = {
    //       uid: getApp().globalData.id,
    //       pageSize: 10,
    //       pageCount: 1,
    //       operateId: 1
    //     }
    //     if (index1 === '1') {
    //       type = 'others'
    //       this.queryOthers(data)
    //     } else {
    //       this.queryMy(data)
    //     }
    //     // console.log()
    //     this.setData({
    //       list: listSecond,
    //       firstList: list,
    //       type: type
    //     })
    //   }
    // }
  },
  toDetail: function (e) {
    if (getApp().globalData.roleId === '0') {
      wx.showToast({
        title: '请登录...',
        icon: 'none'
      })
      return
    }
    if (this.data.list[1] === 'chosed') {
      wx.navigateTo({
        url: '../arbitrationDetail/arbitrationDetail?id=' + e.currentTarget.dataset.id + '&state=1'
      })
    } else {
      // 跳转到订单详情
      wx.navigateTo({
        url: '../arbitrationDetail/arbitrationDetail?id=' + e.currentTarget.dataset.id + '&state=0'
      })
    }
    console.log(e)
    
  },
  // 请求我的订单
  queryMy: function (data, callback) {
    var that = this
    wx.showLoading({
      title: '努力加载中...',
    })
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/arb/select',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: data,
      success(res) {
        console.log(res)
        var noInfo = 'hide'
        if (res.data.code === 200) {
          if (res.data.data.PageInfo.length === 0) {
            noInfo = 'noInfo'
          }
          that.setData({
            orderList: res.data.data.PageInfo,
            noInfo: noInfo
          }, function () {
            wx.hideLoading()
          })
        } else if (res.statusCode === 401) {
          // 若token失效，则重新登录
          wx.reLaunch({
            url: '../login/login',
          })
        }
        if (callback) {
          callback()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this)
    var that = this
    console.log(getApp().globalData.roleId)

    // this.queryMy(data)
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
    var data = {
      pageSize: 10,
      pageCount: 1,
      state: this.data.selectInfo.state || 0
    }
    this.setData({
      roleId: String(getApp().globalData.roleId),
      uid: getApp().globalData.id,
      selectInfo: data
    })
    var selectInfo = this.data.selectInfo
    var that = this
    selectInfo.pageCount = 1
    wx.showLoading({
      title: '努力加载中...',
    })
    this.queryMy(selectInfo)
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

    var selectInfo = this.data.selectInfo
    var that = this
    selectInfo.pageCount = 1
    wx.showLoading({
      title: '努力加载中...',
    })
    console.log(this.data.type)
    this.queryMy(selectInfo, function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var selectInfo = this.data.selectInfo
    var that = this
    selectInfo.pageCount += 1
    // 判断是否需要加载
    if (this.data.noInfo === 'noInfo') {
      return
    }
    wx.showLoading({
      title: '努力加载中...',
    })
    console.log(this)
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/orderForm/select',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: selectInfo,
      success(res) {
        // console.log(res)
        if (res.data.code === 200) {
          var noInfo = 'hide'
          var list
          if (res.data.data) {
            if (res.data.data.PageInfo.length < selectInfo.pageSize) {
              selectInfo.pageCount -= 1
              noInfo = 'noInfo'
            }
            list = that.data.orderList.concat(res.data.data.PageInfo)
          } else {
            noInfo = 'noInfo'
            list = that.data.orderList
            selectInfo.pageCount -= 1
          }
          that.setData({
            orderList: list,
            noInfo: noInfo,
            selectInfo: selectInfo
          }, function () {
            wx.hideLoading()
          })
        } else if (res.statusCode === 401) {
          // 若token失效，则重新登录
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          var noInfo = 'noInfo'
          that.setData({
            noInfo: noInfo,
          }, function () {
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