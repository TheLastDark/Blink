import {config} from '../config.js'
const tips = {
  1: "抱歉，出了一个错误",
  1005: 'appkey无效',
  3000: '期刊不存在'
}
class HTTP {
  request(params) {
    if(!params.method){
      params.method = 'GET'
    }
    wx.request({
      url: config.app_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success:(res) => {
        //只要接受到了响应吗就触发成功回调，即使没有拿到数据，要做个判断
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
         params.success && params.success(res.data)
        }else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err) => {
        this._show_error(1)
        // console.log(123)
      }
    })
  }
  _show_error(error_code) {
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP}