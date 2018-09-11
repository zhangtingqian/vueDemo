import axios from 'axios'
import qs from 'qs'

export default function (url, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      // data: qs.stringify({
      //   teacher_id: '2865',
      //   live_id: '102370'
      // })
      data: qs.stringify(data)
    })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res.status)
        }
      })
      .catch((err) => {
        if (err.message) {
          reject(err.message)
        } else {
          reject(err)
        }
      })
  })
}
