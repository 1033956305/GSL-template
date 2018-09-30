// pages/infos/infos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInfo: {
      uid: getApp().globalData.id,
      name: '',
      pageSize: 10,
      pageCount: 1
    },
    startX: 0, //开始坐标
    startY: 0,
    noInfo: 'hide',
    infoList: []
  },
  toDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../infoDetail/infoDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  search: function (e, fn) {
    console.log(e)
    var that = this
    wx.showLoading({
      title: '努力加载中...',
    })
    var data = this.data.searchInfo
    data.pageCount = 1
    if (e.detail) {
      data.name = e.detail.value
    } else {
      data.name = ''
    }
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/message/query',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: data,
      success(res) {
        console.log(res)
        var noInfo = 'noInfo'
        wx.hideLoading()
        if (fn) {
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
        if (res.data.code === 200) {
          if (res.data.data.PageInfo.length < that.data.searchInfo.pageSize) {
            noInfo = 'noInfo'
          } else {
            noInfo = 'hide'
          }
          for (var i = 0, j = res.data.data.PageInfo.length; i < j; i++) {
            res.data.data.PageInfo[i].isTouchMove = false
          }
          that.setData({
            infoList: res.data.data.PageInfo,
            noInfo: noInfo,
            searchInfo: data
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
  touchstart (e) {
    this.data.infoList.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      infoList: this.data.infoList
    })
  },
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        });
    that.data.infoList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      infoList: that.data.infoList
    })
  },
  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  del (e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/message/delete',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: { id: e.currentTarget.dataset.id},
      success(res) {
        console.log(res)
        var noInfo = 'noInfo'
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.infoList.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            infoList: that.data.infoList
          }, function callback(){
            wx.showToast({
              title: '成功删除',
              icon: 'none'
            })
          })
        } else if (res.statusCode === 401) {
          // 若token失效，则重新登录
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    console.log(getApp().globalData.id)
    var data = that.data.searchInfo
    data.pageCount = 1
    data.uid = getApp().globalData.id
    wx.showLoading({
      title: '努力加载中...',
    })
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/message/query',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: data,
      success(res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.code === 200) {
          for (var i = 0, j = res.data.data.PageInfo.length; i < j; i++) {
            res.data.data.PageInfo[i].isTouchMove = false
          }
          that.setData({
            infoList: res.data.data.PageInfo,
            searchInfo: data
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
    this.search(function () {
      
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var url = this.data.url
    var that = this
    var data = this.data.searchInfo
    data.pageCount += 1
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
      url: getApp().globalData.APP_CONSTANT + '/message/query',
      method: 'POST',
      data: data,
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
          var orderList = that.data.infoList
          if (res.data.data) {
            // 有数据时添加
            orderList = orderList.concat(res.data.data.PageInfo)
            if (res.data.data.PageInfo.length < that.data.searchInfo.pageSize) {
              noInfo = 'noInfo'
              data.pageCount -= 1
            }
          } else {
            //若没有数据了
            info.pageCount -= 1
            noInfo = 'noInfo'
          }
          that.setData({
            searchInfo: data,
            noInfo: noInfo,
            infoList: orderList
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