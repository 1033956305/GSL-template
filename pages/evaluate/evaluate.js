// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.APP_CONSTANT,
    searchInfo: {
      id: '',
      pageSize: 10,
      pageNum: 1
    },
    noInfo: 'hide',
    evaluate: '好评如潮',
    infos: [
      // {
    //   buyContent: '　　很好！发货很快！态度也很好！作为一个老猎人！这次还是十分期待PC版本的上市的！怪物猎人真的不是一款会让人失望的系列！怪物猎人，口袋妖怪，塞尔达传说是我最喜欢的三个系列了。尤其是怪物猎人！画面感很强！玩的过程中也有很强烈的代入感！火还是有必然的原因的！从细节到大格局！每个版本都在进步！从2一路玩过来的，三百块又算什么。很多人说是小众游戏！我个人觉得一点都不小众！！！很赞的一款大作！支持！！！',
    //   buyName: '匿名用户',
    //   createtime: '2018-1-1',
    //   sellContent: '很多人说是小众游戏！我个人觉得一点都不小众！！！很赞的一款大作！支持！！！'
    // }, {
    //     buyContent: '　　很好！发货很快！态度也很好！作为一个老猎人！这次还是十分期待PC版本的上市的！怪物猎人真的不是一款会让人失望的系列！怪物猎人，口袋妖怪，塞尔达传说是我最喜欢的三个系列了。尤其是怪物猎人！画面感很强！玩的过程中也有很强烈的代入感！火还是有必然的原因的！从细节到大格局！每个版本都在进步！从2一路玩过来的，三百块又算什么。很多人说是小众游戏！我个人觉得一点都不小众！！！很赞的一款大作！支持！！！',
    //     buyName: '匿名用户',
    //     createtime: '2018-1-1',
    //   sellContent: '很多人说是小众游戏！我个人觉得一点都不小众！！！很赞的一款大作！支持！！！'
    // }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var url = this.data.url
    var that = this
    this.setData({
      searchInfo: {
        pid: options.id,
        pageSize: 10,
        pageCount: 1
      }
    })
    wx.request({
      url: url + '/evaluate/select',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        pid: options.id,
        pageSize: 10,
        pageCount: 1
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          that.setData({
            infos: res.data.data.PageInfo,
            evaluate: res.data.data.aboutEva
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
    console.log('触底1')
    var url = this.data.url
    var that = this
    var data = this.data.searchInfo
    data.pageCount += 1
    this.setData({
      searchInfo: data
    })
    if (this.data.noInfo === 'noInfo') {
      return
    }
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: url + '/evaluate/select',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: that.data.searchInfo,
      success: function (res) {
        console.log(res)
        // if (res.data.code === 200) {
        //   var info = that.data.infos
        //   info = info.contact(res.data.data.PageInfo)
        // }
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else {
          if (res.data.data) {
            // 有数据时添加
            var info = that.data.infos
            var noInfo = 'noInfo'
            info = info.concat(res.data.data.PageInfo)
            if (res.data.data.PageInfo.length < that.data.searchInfo.pageSize) {
              noInfo = 'noInfo'
            }
            that.setData({
              infos: info,
              searchInfo: data,
              noInfo: noInfo
            }, function callback(res) {
              wx.hideLoading()
            })
          } else {
            //若没有数据了
            data.pageCount -= 1
            that.setData({
              searchInfo: data,
              noInfo: 'noInfo'
            }, function callback(res) {
              wx.hideLoading()
            })
          }
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