import {HTTP} from '../util/http.js'
// 继承HTTP
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url : 'classic/latest.json',
      success:(res) => {
        sCallback(res)
      }
    })
  }
}
export {ClassicModel}