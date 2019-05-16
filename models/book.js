import {
  HTTP
} from '../util/http-p.js'

class BookModel extends HTTP {
  getHostList() {
    return this.request({
      url: 'book/hot_list.json'
    })
  }

  getMyBookCount() {
    return this.request({
      url: '/book/favor/count.json'
    })
  }

  getBookDetail(bid) {
    return this.request({
      url: `/book/${bid}/detail.json`
    })
  }

  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor.json`
    })
  }

  getComments(bid) {
    return this.request({
      url: `book/${bid}/shot_comment.json`
    })
  }
}

export {BookModel}