import {KeywordModel} from '../../models/keyword.js'
const keywordModel = new KeywordModel()
Component({ 
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: []
  },
  /**
   * 组件的方法列表
   */
  attached() {
    const historyWords = keywordModel.getHistory()
    this.setData({
      historyWords
    })
  },
  methods: {
    cancel() {
      this.triggerEvent('onCancel')
    },
    onConfirm(event) {
      const word = event.detail.value
      console.log(word)
      keywordModel.addHistory(word)
    },
    onDelete() {
      
    }
  }
})
