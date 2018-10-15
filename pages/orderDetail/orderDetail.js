// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {
      pictureUrl: 'no-picture.png'
    },
    hiddenmodalput: true, // 质疑提示框
    reasonInput: '',
    contact: {},
    btn1: '撤销订单',
    btn2: '确认订单',
    isOpen: false,
    arbitration: false,
    oid: '',
    info: {
      name: '大沙发所付付付付付',
      model: '大沙发所付付付付付',
      purpose: '大沙发所付付付付付',
      volume: '12*12*12',
      producter: '阿凤飞飞',
      mobile: '11111111111',
      phone: '0514-81111111',
      qq: '123123123',
      wechart: '364471124',
      fax: '874966645'
    }
  },
  cancel: function () {
    if (!this.data.oid) {
      return
    }
    if (this.data.btn1 === '返回') {
      wx.switchTab({
        url: '../order/order',
      })
      return
    }
    var that = this
    wx.showLoading({
      title: '努力加载中...',
    })
    // 查询订单信息
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/orderForm/update',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        id: this.data.oid,
        uid: getApp().globalData.id,
        operateId: 0
      },
      success(res) {
        wx.hideLoading()
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          wx.showToast({
            title: '操作成功！',
            icon: 'none'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../order/order',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '订单已撤销！',
            icon: 'none'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../order/order',
            })
          }, 1000)
        }
      },
      fail(res) {
        wx.showToast({
          title: '订单已撤销！',
          icon: 'none'
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../order/order',
          })
        }, 1000)
      }
    })
  },
  openTransaction () {
    if (!this.data.oid) {
      return
    }
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/inv/queryOne',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        id: this.data.oid
      },
      success: res => {
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          console.log(res)
          if (res.data.msg === '成功') {
            wx.showToast({
              title: '此订单交易已公开',
              icon: 'none'
            })
          } else {
            wx.navigateTo({
              url: '../openTransaction/openTransaction?oid=' + this.data.oid,
            })
          }
        } else if (res.data.msg === '交易未公开') {
          wx.navigateTo({
            url: '../openTransaction/openTransaction?oid=' + this.data.oid,
          })
        }
      }
    })
  },
  confirm: function () {
    if (!this.data.oid) {
      return
    }
    if (this.data.btn2 === '确认订单') {
      var that = this
      wx.showLoading({
        title: '努力加载中...',
      })
      // 确认订单
      wx.request({
        url: getApp().globalData.APP_CONSTANT + '/orderForm//update',
        method: 'POST',
        header: {
          'Authorization': getApp().globalData.Authorization
        },
        data: {
          id: this.data.oid,
          uid: getApp().globalData.id,
          operateId: 1
        },
        success(res) {
          wx.hideLoading()
          console.log(res)
          if (res.statusCode === 401) {
            wx.reLaunch({
              url: '../login/login',
            })
          } else if (res.data.code === 200) {
            wx.showToast({
              title: '操作成功！',
              icon: 'none'
            })
            wx.navigateBack(1)
          } else {
            wx.showToast({
              title: '订单已撤销！',
              icon: 'none'
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../order/order',
              })
            }, 1000)
          }
        },
        fail (res) {
          wx.showToast({
            title: '订单已撤销！',
            icon: 'none'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../order/order',
            })
          }, 1000)
        }
      })
    } else if (this.data.btn2 === '您已确认') {
      return
    } else {
      wx.navigateTo({
        url: '../watchEvaluate/watchEvaluate?oid=' + this.data.oid,
      })
    }
  },
  toSeller: function (e) {
    console.log(e.currentTarget.dataset.concat)
    if (e.currentTarget.dataset.concat === '0') {
      wx.navigateTo({
        url: '../user/user?id=' + this.data.contactSell.uid,
      })
    } else {
      wx.navigateTo({
        url: '../user/user?id=' + this.data.contactBuy.uid,
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
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },
  bindinput (e) {
    this.setData({
      reasonInput: e.detail.value
    })
  },
  cancelReason (e) {
    this.setData({
      hiddenmodalput: true
    })
  },
  confirmReason (e) {
    if (this.data.reasonInput) {
      wx.request({
        url: getApp().globalData.APP_CONSTANT + '/arb/add',
        method: 'POST',
        header: {
          'Authorization': getApp().globalData.Authorization
        },
        data: {
          oid: this.data.oid,
          uid: getApp().globalData.id,
          reason: this.data.reasonInput
        },
        success: res => {
          if (res.statusCode === 401) {
            wx.reLaunch({
              url: '../login/login',
            })
          } else if (res.data.msg === '成功') {
            console.log(res)
            this.setData({
              hiddenmodalput: true
            })
            wx.showToast({
              title: '申请成功',
            })
          } else {
            wx.showToast({
              title: '申请失败',
              icon: 'none'
            })
          }
        }
      })
      this.setData({
        hiddenmodalput: true
      })
    } else {
      // this.setData({
      //   hiddenmodalput: true
      // })
      wx.showToast({
        title: '请填写理由',
        icon: 'none'
      })
    }
    console.log(e)
  },
  // 申请仲裁
  arbitrating () {
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/arb/inspect',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        oid: this.data.oid,
        uid: getApp().globalData.id
      },
      success: res => {
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.msg === '成功') {
          console.log(res)
          this.setData({
            hiddenmodalput: false
          })
        } else {
          wx.showToast({
            title: '无法仲裁',
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var btn1,btn2
    if (options.type === '等待双方确认') {
      btn1 = '撤销订单'
      btn2 = '确认订单'
    } else if (options.type === '等待双方评价') {
      btn1 = '返回'
      btn2 = '前往评价'
    } else {
      btn1 = '返回'
      btn2 = '查看评价'
    }
    this.setData({
      oid: options.id,
      type: options.type,
      btn1: btn1,
      btn2: btn2
    })
    var that = this
    wx.showLoading({
      title: '努力加载中...',
    })
    // 查询订单信息
    wx.request({
      url: getApp().globalData.APP_CONSTANT + '/orderFormMore/query',
      method: 'POST',
      header: {
        'Authorization': getApp().globalData.Authorization
      },
      data: {
        id: options.id,
        uid: getApp().globalData.id
      },
      success (res) {
        console.log(res)
        if (res.statusCode === 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        } else if (res.data.code === 200) {
          if (options.type === '等待双方确认') {
            if (res.data.data.info === '卖方' && res.data.data.orderForm.type === 3) {
              btn2 = '您已确认'
            } else if (res.data.data.info === '买方' && res.data.data.orderForm.type === 2){
              btn2 = '您已确认'
            }
          } else {
            if (res.data.data.orderForm.type >= 6 && res.data.data.info === '买方' ) {
              that.data.isOpen = true
            }
            if ((res.data.data.info === '买方' || res.data.data.info === '卖方') && options.type === '已完成') {
              that.data.arbitration = true
            }
          }
          
          that.setData({
            contactSell: res.data.data.contactSell,
            contactBuy: res.data.data.contactBuy,
            product: res.data.data.product,
            btn2: btn2,
            oid: res.data.data.id,
            isOpen: that.data.isOpen,
            arbitration: that.data.arbitration
          }, function () {
            wx.hideLoading()
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
    console.log(this.data.oid)
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