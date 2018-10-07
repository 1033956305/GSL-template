// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.APP_CONSTANT,
    category: [
      { type: '制造业', id: 'zhizao' },
      { type: '建筑', id: 'jianzhu' },
      { type: '交通运输', id: 'jiaotong' },
      { type: '住宿', id: 'zhusu' },
      { type: '餐饮', id: 'canyin' },
      { type: '信息传输', id: 'xinxichuanshu' },
      { type: '软件', id: 'ruanjian' },
      { type: '金融', id: 'jinrong' },
      { type: '房地产', id: 'fangdichan' },
      { type: '教育', id: 'jiaoyu' },
    ],
    detail: [
      // {
      // id: 'zhizao',
      // type: '制造业',
      // pictureUrl: '/images/c1.png',
      // sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'jianzhu',
      //   type: '建筑',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //       pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'jiaotong',
      //   type: '交通运输',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //       pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'zhusu',
      //   type: '住宿',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //       pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'canyin',
      //   type: '餐饮',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //       pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'xinxichuanshu',
      //   type: '信息传输',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //       pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'ruanjian',
      //   type: '软件',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //       pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'jinrong',
      //   type: '金融',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //       pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'fangdichan',
      //   cate: '房地产',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }, {
      //       pictureUrl: '/images/c2.png',
      //     type: '女装'
      //   }]
      // },
      // {
      //   id: 'jiaoyu',
      //   type: '教育',
      //   pictureUrl: '/images/c1.png',
      //   sonTypes: [{
      //     pictureUrl: '/images/c2.png',
      //     type: '网课'
      //   }
      //   ],
      // }
    ],
    curIndex: 0,
    isScroll: false,
    toView: 'guowei'
  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.currentTarget.dataset.id,
        curIndex: e.currentTarget.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  },
  toSearch: function (e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = this.data.url
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: url + '/type/select',
      method: 'GET',
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
          that.setData({
            category: res.data.data.productTypeLevs,
            detail: res.data.data.productTypeLevs
          })
        }
        
      }
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