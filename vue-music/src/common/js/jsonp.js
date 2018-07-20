import originJSONP from 'jsonp';

// url 的拼接
function param(data) {
  let url = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  // 如果 url 有data，去掉第一个 &
  return url ? url.substring(1) : '';
}

export default function jsonp(url, data, option) {
  // url 如果有 ?, 加个 &，否则加 ?
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    // 回调有两个参数，err 和 data, err 为空，表示成功
    originJSONP(url, option, (err, data) => {
      if(!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  })
}
