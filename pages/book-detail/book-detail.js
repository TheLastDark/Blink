import {
  BookModel
} from '../../models/book.js'

import {
  LikeModel
} from '../../models/like.js'

let bookModel = new BookModel();
let likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeStatus: false,
    comments: [],
    book: null,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    const bid = options.bid
    const detail = bookModel.getBookDetail(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    const comments = bookModel.getComments(bid)

    Promise.all([detail,likeStatus,comments]).then(res=> {
     
      this.setData({
        book:res[0],
        likeStatus:res[1].like_status,
        likeCount:res[1].favor_nums,
        comments:res[2].comments
      })
      wx.hideLoading()
    })
    // detail.then((res) => {
    //   this.setData({
    //     book: res
    //   })
    // })

    // comments.then((res) => {
    //   this.setData({
    //     comments: res
    //   })
    // })
    // likeStatus.then((res) => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.favor_nums
    //   })
    // })
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost() {
    this.setData({
      posting: true
    })
  },
  onCancel() {
    this.setData({
      posting: false
    })
  },
  onPost(event) {
    // const coment = event.detail.text
    // const commentInput = event.detail.value
    const coment = event.detail.text || event.detail.value
    if(coment.length>10) {
      wx.showToast({
       title:'短评最多02个字'
      })
      return
    }
    wx.showToast({
      title: '+1'
    })
    this.setData({
      posting: false
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