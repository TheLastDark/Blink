import {HTTP} from '../util/http.js'

class LikeModel extends HTTP {
  like(behavior, ArtId, category) {
    let url = behavior==='like'?'like':'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data:{
        art_id: ArtId,
        type: category
      }
    })
  }
}

export {LikeModel}