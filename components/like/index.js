Component({
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },
  data: {
    yesSrc: '../images/like.png',
    noSrc: '../images/like@dis.png'
  },

  methods: {
    onLike(event) {
     let like = this.properties.like
     let count = this.properties.count
     count = like?count-1:count+1
     this.setData({
       count: count,
       like: !like
     })
    //  自定义事件
     let behavior = this.properties.like?'like':'cancel'
     this.triggerEvent('like',{
      behavior: behavior
     },{})
    }
  }
})