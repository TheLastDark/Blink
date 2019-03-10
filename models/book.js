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
}

export {BookModel}