import {config} from '../config.js'
const tips = {
  1: "抱歉，出了一个错误",
  1005: 'appkey无效',
  3000: '期刊不存在'
}
class HTTP {
  request({url,data={},method='GET'}){
    return new Promise((resolve, reject)=> {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url,resolve,reject,data={},method='GET') {
    wx.request({
      url: config.app_base_url + url,
      method: method,
      data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success:(res) => {
        //只要接受到了响应吗就触发成功回调，即使没有拿到数据，要做个判断
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          resolve(res.data)
        }else{
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err) => {
        reject()
        this._show_error(1)
        // console.log(123)
      }
    })
  }
  _show_error(error_code) {
    if(!error_code){
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP}