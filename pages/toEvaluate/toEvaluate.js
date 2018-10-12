// pages/toEvaluate/toEvaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalEvaluate: '好评', // 会员评价
    totalType: 3, // 会员评价类型
    totalEvaluate1: '好评', // 买方领导评价
    totalType1: 3, // 买方领导评价类型
    totalEvaluate2: '好评', // 卖方领导评价
    totalType2: 3, // 卖方领导评价类型
    state: 1, // 展示方式 1 买方 2 卖方 3 全部
    evaluate: '',
    leader: false,
    items: {
      id: '',
      oid: '',
      uid: '',
      sellType: '',
      sellContent: '',
      buyType: '',
      buyContent: ''
    }
  },
  confirm: function (e) {
    console.log(e.detail)
    this.setData({
      evaluate: e.detail.value
    })
  },
  totalConfirm: function () {
    var data, type
    if (this.data.type === '买家') {
      if (this.data.evaluate.length < 15) {
        wx.showToast({
          title: '评论不得少于15字',
          icon: 'none'
        })
        return
      }
      data = {
        pid: this.data.pid,
        oid: this.data.oid,
        id: this.data.id,
        buyType: this.data.totalType,
        buyContent: this.data.evaluate,
      }
    } else if (this.data.type === '卖家') {
      if (this.data.evaluate.length < 15) {
        wx.showToast({
          title: '评论不得少于15字',
          icon: 'none'
        })
        return
      }
      data = {
        pid: this.data.pid,
        oid: this.data.oid,
        id: this.data.id,
        sellType: this.data.totalType,
        sellContent: this.data.evaluate,
      }
    } else {
      type = 'leader'
      //判断领导类型
      var uid, totalType
      if (this.data.type === '卖家领导') {
        uid = 2
        totalType = this.data.totalType2
      } else if (this.data.type === '买家领导') {
        uid = 1
        totalType = this.data.totalType1
      } else if (this.data.type === '双方领导') {
        uid = 3
      }
      data = {
        oid: this.data.oid,
        userOptId: uid,
        typeId: totalType
      }
    }
    if (type === 'leader') {
      if (uid === 3) {
        data = {
          oid: this.data.oid,
          buyTypeId: this.data.totalType1,
          sellTypeId: this.data.totalType2
        }
        this.both(data)
      } else {
        this.leader(data)
      }
      
    } else {
      this.member(data)
    }
  },
  member: function (data) {
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/evaluate/insert',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: data,
      success(res) {
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          wx.showToast({
            title: '评论成功！',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack(1)
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          wx.navigateBack(1)
        }
      }
    })
  },
  leader: function (data) {
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/user/updateIntegral',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: data,
      success(res) {
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          wx.showToast({
            title: '评论成功！',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack(1)
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          // wx.navigateBack(1)
        }
      }
    })
  },
  both: function (data) {
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/user/updateAll',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: data,
      success(res) {
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          wx.showToast({
            title: '评论成功！',
            icon: 'none'
          })
          wx.navigateBack(1)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          // wx.navigateBack(1)
        }
      }
    })
  },
  chose: function (e) {
    console.log(e)
    var that = this
    wx.showActionSheet({
      itemList: ['差评', '中评', '好评'], // 1 2 3
      success: function (res) {
        var list = ['差评', '中评', '好评']
        console.log(res.tapIndex)
        if (e.target.dataset.type === 'buyer') {
          that.setData({
            totalType1: Number(res.tapIndex) + 1,
            totalEvaluate1: list[res.tapIndex]
          })
        } else if (e.target.dataset.type === 'seller') {
          that.setData({
            totalType2: Number(res.tapIndex) + 1,
            totalEvaluate2: list[res.tapIndex]
          })
        } else {
          that.setData({
            totalType: Number(res.tapIndex) + 1,
            totalEvaluate: list[res.tapIndex]
          })
        }
        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var leader = false
    var state = 1
    if (options.type !== '卖家' && options.type !== '买家') {
      leader = true
      if (options.type === '买家领导') {
        state = 1
      } else if (options.type === '卖家领导') {
        state = 2
      } else if (options.type === '双方领导') {
        state = 3
      }
    }
    var id = null
    if (options.id !== 'null') {
      id = options.id
    }
    this.setData({
      state: state,
      type: options.type,
      oid: options.oid,
      leader: leader,
      id: id,
      pid: options.pid
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