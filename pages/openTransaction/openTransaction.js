// pages/openTransaction/openTransaction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    show: true
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  confirmOpen (e) {
    console.log(e)
    if (e.detail.value.invoiceCode && e.detail.value.invoiceNumber && e.detail.value.invoiceSum && this.data.date) {
      var info = {
        invoiceCode: e.detail.value.invoiceCode,
        invoiceNumber: e.detail.value.invoiceNumber,
        invoiceSum: e.detail.value.invoiceSum,
        invoiceDate: this.data.date,
        oid: this.data.oid
      }
      wx.showModal({
        title: '公开交易',
        content: '是否要公开本次交易？',
        showCancel: true,//是否显示取消按钮
        // cancelText: "否",//默认是“取消”
        cancelColor: '#5FABFF',//取消文字的颜色
        // confirmText: "是",//默认是“确定”
        confirmColor: '#5FABFF',//确定文字的颜色
        success: function (res) {
          // console.log(res)
          // return
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else if (res.confirm) {
            //点击确定
            wx.showLoading({
              title: '数据上传中...',
            })
            wx.request({
              url: getApp().globalData.APP_CONSTANT + '/inv/add',
              method: 'POST',
              header: {
                'Authorization': getApp().globalData.Authorization
              },
              data: info,
              success: res => {
                if (res.statusCode === 401) {
                  wx.reLaunch({
                    url: '../login/login',
                  })
                } else if (res.data.code === 200) {
                  wx.hideLoading()
                  wx.navigateBack(1)
                }
              }
            })
            console.log(res)
          }
        },
        fail: res => { },//接口调用失败的回调函数
        complete: res => { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
    } else {
      wx.showToast({
        title: '请填写完整',
        icon: 'none'
      })
    }
    
    // wx.navigateBack(1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.oid) {
      this.setData({
        oid: options.oid
      })
    }
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