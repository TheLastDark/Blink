class KeywordModel {
  maxLength = 10
  getHistory() {
   const words = wx.getStorageSync('q')
   if (!words) {
     return []
   }
   return words
  }
  getHot() {

  }
  addHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      const length = words.length
      if(length>=this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync('q', words)
    }

  }
}
export {KeywordModel}