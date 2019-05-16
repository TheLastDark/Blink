// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auhorized: false,
    userInfo: null
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        auhorized: true
      })
    }
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                auhorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
  },


})