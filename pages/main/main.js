// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      // { pictureUrl: '../../images/b1.jpg'},
      // { pictureUrl: '../../images/b2.jpg' },
      // { pictureUrl: '../../images/b3.jpg' },
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    classify: [
      {
        src: '../../images/1.png',
        content: '活动'
      },
      {
        src: '../../images/2.png',
        content: '扫描'
      },
      {
        src: '../../images/3.png',
        content: '仲裁申请'
      },
      {
        src: '../../images/1.png',
        content: '交易公开'
      },
      {
        src: '../../images/4.png',
        content: '全部'
      }
    ],
    hot: {
      pictureUrl: 'no-picture.png',
      content: '',
    },
    recommends: [
      // {
      //   minipicUrl: '../../images/1.png',
      //   name: 'zzz'
      // },
      // {
      //   minipicUrl: '../../images/1.png',
      //   name: 'zzz'
      // },
      // {
      //   minipicUrl: '../../images/1.png',
      //   name: 'zzz'
      // },
      // {
      //   minipicUrl: '../../images/1.png',
      //   name: 'zzz'
      // }
    ],
    url: getApp().globalData.APP_CONSTANT,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  toClassify: function (event) {
    console.log(event)
    if (event.currentTarget.dataset.type === '全部') {
      wx.switchTab({
        url: '../classify/classify',
      })
    } else{
      wx.navigateTo({
        url: '../list/list?value=' + event.currentTarget.dataset.type,
      })
    }
  },
  toProduct: function (e) {
    if (getApp().globalData.roleId === '0') {
      wx.showToast({
        title: '请登录...',
        icon: 'none'
      })
      return
    }
    var that = this
    wx.navigateTo({
      url: '../product/product?id=' + e.currentTarget.dataset.id,
    })
  },
  toSearch: function (e) {
    var that = this
    var url = this.data.url
    var data = {
      name: 'e.detail.value'
    }
    wx.navigateTo({
      url: '../list/list?value=' + e.detail.value,
    })
    console.log(e.detail.value)
  },
  toMsg: function (e) {
    wx.navigateTo({
      url: '../infoDetail/infoDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  toProductList: function (e) {
    wx.navigateTo({
      url: '../list/list?value=' + e.currentTarget.dataset.content,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/show/select',
      method: 'GET',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      success(res) {
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.statusCode === 200) {
          that.setData({
            imgUrls: res.data.data.messages,
            hot: res.data.data.advertising,
            recommends: res.data.data.products,
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
    var that = this
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/show/select',
      method: 'GET',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      success(res) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.statusCode === 200) {
          that.setData({
            imgUrls: res.data.data.messages,
            hot: res.data.data.advertising,
            recommends: res.data.data.products,
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