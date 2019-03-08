import {
  HTTP
} from '../util/http.js'
// 继承HTTP
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest.json',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.data.index)
        let key = this._getKey(res.data.index)
        wx.setStorageSync(key,res) 
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    // 增加缓存机制
    let indexNum = parseInt(index)
    let key = nextOrPrevious == 'next'? this._getKey(indexNum+1):this._getKey(indexNum-1) 
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url: `classic/${index}/${nextOrPrevious}.json`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.data.index), res)
          sCallback(res)
        }
      })
    }
    else {
      sCallback(classic)
    }
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index?true:false 
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index= wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-'+ index
    return key
  }
}
export {
  ClassicModel
}