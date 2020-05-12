import { get, post } from 'api/http.js'
import qs from 'qs'
const server = {
  get(url) {
    return get({
      url: url,
      method: 'get',
    })
  },
  post(url, param) {
    return post({
      url: url,
      method: 'post',
      data: qs.stringify(param)
    })
  }
}
export default server