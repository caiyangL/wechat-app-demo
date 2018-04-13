// pages/movie-detail/movie-detail.js
let { xfetch, starsToArray } = require('../../common/util.js');
let request_url = require('../../common/variable.js').request_url;

function formatCountriesAndYear(countries, year) {
  let str = '';
  if (Array.isArray(countries)) {
    countries.push(year);
    str = countries.join(' · ');
  }
  return str;
}

function formatCasts(casts) {
  if (!Array.isArray(casts)) {
    return [];
  }
  return casts.map(item => ({
    name: item.name,
    avatar: item.avatars ? item.avatars.large : ''
  }));
}

Page({
  data: {
    movieDetail: {}
  },
  getMovieDetail(id) {
    wx.showNavigationBarLoading();
    return xfetch({
      url: request_url.MOVIE_DETAIL + '/' + id
    }).then(res => {
      wx.hideNavigationBarLoading();
      let {
        title,
        countries,
        year,
        ratings_count,
        comments_count,
        images,
        aka,
        rating,
        directors,
        casts,
        summary,
        genres
      } = res.data;
      casts = formatCasts(casts);
      let movieDetail = {
        title,
        areaAndDate: formatCountriesAndYear(countries, year),
        ratings_count,
        comments_count,
        image: images.large,
        aka: aka ? aka.join(' / ') : '-',
        stars: starsToArray(rating.stars),
        average: rating.average,
        directors: directors ? directors.map(item => item.name).join(' / ') : '-',
        casts,
        castsStr: casts.map(item => item.name).join(' / '),
        genres: genres ? genres.join(' / ') : '-',
        summary
      };
    
      this.setData({
        movieDetail
      });
    })
  },
  onPreview(e) {
    let src = e.target.dataset.src;
    wx.previewImage({
      urls: [ src ]
    })
  },
  onLoad(opts) {
    this.getMovieDetail(opts.id);
  }
})