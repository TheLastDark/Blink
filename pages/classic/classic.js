// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeStatus: false,
    likeCount: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      // console.log(res)
      this.setData({
        classic: res,
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      })
    })
  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  // 切换期刊
  onNext: function (event) {
    this._updateClassic('next')
  },

  onPrevious: function (event) {
    this._updateClassic('previous')
  },
  
  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classic.data.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.data.id,res.data.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.data.index),
        first: classicModel.isFirst(res.data.index)
      })
    })
  },
  _getLikeStatus: function(ArtId, category) {
    likeModel.getClassicLikeStatus(ArtId,category, (res)=> {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
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