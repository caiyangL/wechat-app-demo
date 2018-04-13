let Promise = require('../lib/promise.js').Promise;

// 封装promise请求
function xfetch(opts) {
    let options = {
        method: 'GET',
        header: {
            'content-type': 'json' // 默认值
        },
    };
    options = {
        ...options,
        ...opts
    };
    return new Promise((resolve, reject) => {
        options.success = function(res) {
            resolve(res);
        };
        options.fail = function (err) {
            reject(err);
        };
        wx.request(options);
    })
}

// 封装api为promise
function promiseWxApi() {

}

// 星星分数转换为结构
function starsToArray(stars) {
    stars = Math.floor(parseInt(stars) / 10);
    let arr = [];
    for (let i = 0, len = 5; i < len; i ++) {
        i < stars ? arr.push(1) : arr.push(0);
    }
    return arr;
}

function formatMovie(res) {
  let data = res.data.subjects.map(movie => {
    return {
      title: movie.title,
      banner: movie.images.medium,
      average: movie.rating.average,
      stars: starsToArray(movie.rating.stars),
      id: movie.id
    }
  });
  return data;
}

function showNone() {
  wx.showToast({
    title: '没有数据了哦~',
    duration: 1500,
    mask: true,
    icon: 'none'
  })
}

module.exports = {
    xfetch,
    starsToArray,
    formatMovie,
    showNone
}
