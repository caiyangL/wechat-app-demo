let util = require('../../common/util.js');
let xfetch = util.xfetch;
let starsToArray = util.starsToArray;
let formatMovie = util.formatMovie;
let request_url = require('../../common/variable.js').request_url;
let showNone = util.showNone;

Page({
    data: {
        inTheatersData: {},
        comingSoonData: {},
        top250Data: {},
        hideSearch: true,
        searchMovieList: [],
        searchFlag: true,
        searchTotal: 0,
        searchMovieName: ''
    },
    getData(url) {
        return xfetch({
            url: url,
            data: {
                start: 0,
                count: 8
            }
        }).then(res => {
            let data = formatMovie(res);
            return data;
        });
    },
    saveData(data, title, key) {
        this.setData({
            [key]: {
                movieList: data,
                title: title
            }
        });
    },
    onMoreHandle(e) {
      let listType = e.target.dataset.listType;
      wx.navigateTo({
        url: `/pages/movie-more/movie-more?listType=${listType}`
      });
    },
    openSearch() {
      this.setData({
        hideSearch: false
      });
      wx.setNavigationBarTitle({
        title: '搜索电影'
      })
    },
    closeSearch() {
      this.setData({
        hideSearch: true,
        searchMovieList: [],
        searchMovieName: ''
      });
      wx.setNavigationBarTitle({
        title: '豆瓣电影'
      })
    },
    getSearch() {
      if (!this.data.searchFlag) {
        showNone();
        return;
      }
      wx.showNavigationBarLoading();
      return xfetch({
        url: request_url.MOVIE_SEARCH,
        data: {
          start: this.data.searchTotal,
          count: 20,
          q: this.data.searchMovieName
        }
      }).then(res => {
        wx.hideNavigationBarLoading();
        if (res.data.subjects.length === 0) {
          this.data.searchFlag = false;
          showNone();
          return;
        }
        let data = formatMovie(res);
        let { searchMovieList, searchTotal } = this.data;
        this.setData({
          searchMovieList: [...searchMovieList, ...data],
          searchTotal: (searchTotal + res.data.subjects.length)
        });
      });
    },
    searchHandle(e) {
      this.data.searchMovieName = e.detail.value;
      this.getSearch();
    },
    onScrollToLower() {
      this.getSearch();
    },
    onMovieTap(e) {
      let id = e.currentTarget.dataset.movieId;
      wx.navigateTo({
        url: `/pages/movie-detail/movie-detail?id=${id}`,
      });
    },
    onLoad() {
         this.getData(request_url.MOVIE_IN_THEATERS).then(data => {
            this.saveData(data, '正在上映', 'inTheatersData')
        }); 
        this.getData(request_url.MOVIE_COMING_SOON).then(data => {
            this.saveData(data, '即将上映', 'comingSoonData')
        });
        this.getData(request_url.MOVIE_TOP250).then(data => {
            this.saveData(data, 'Top250', 'top250Data')
        });
    }
});