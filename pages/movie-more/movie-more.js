let util = require('../../common/util.js');
let formatMovie = util.formatMovie;
let xfetch = util.xfetch;
let request_url = require('../../common/variable.js').request_url;

Page({
  data: {
    moreMovieList: [],
    total: 0,
    listType: '',
    url: '',
    requestFlag: true
  },
  showNone() {
    wx.showToast({
      title: '没有数据了哦~',
      mask: true,
      duration: 1500,
      icon: 'none'
    })
  },
  getData(url) {
    if (!this.data.requestFlag) {
      this.showNone();
      return;
    }
    wx.showNavigationBarLoading();
    return xfetch({
      url: url,
      data: {
        start: this.data.total,
        count: 20
      }
    }).then(res => {
      if (res.data.subjects.length === 0) {
        this.data.requestFlag = false;
        this.showNone();
        wx.hideNavigationBarLoading();
        return;
      }
      let data = formatMovie(res);
      let moreMovieList = this.data.moreMovieList;
      let total = this.data.total;
      this.setData({
        moreMovieList: [...moreMovieList, ...data],
        total: (total + 20)
      });
      wx.hideNavigationBarLoading();
    })
  },
  onScrollToLower(e) {
    this.getData(this.data.url);
  },
  onMovieTap(e) {
    let id = e.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: `/pages/movie-detail/movie-detail?id=${id}`,
    });
  },
  onLoad: function(options) {
    let listType = options.listType;
    let url;
    switch(listType) {
      case '正在上映':
        this.getData(request_url.MOVIE_IN_THEATERS);
        url = request_url.MOVIE_IN_THEATERS;
        break;
      case '即将上映':
        this.getData(request_url.MOVIE_COMING_SOON);
        url = request_url.MOVIE_COMING_SOON;
        break;
      case 'Top250':
        this.getData(request_url.MOVIE_TOP250);
        url = request_url.MOVIE_TOP250;
        break;
    }
    this.setData({
      listType,
      url
    })
  },
  onReady: function(){
    wx.setNavigationBarTitle({
      title: this.data.listType
    });
  }
})