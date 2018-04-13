// const MOVIE_BASE_URL = 'http://api.douban.com';
const MOVIE_BASE_URL = 'https://douban.uieee.com';

const request_url = {
    // 正在热映
    MOVIE_IN_THEATERS: MOVIE_BASE_URL + '/v2/movie/in_theaters',
    // 即将上映
    MOVIE_COMING_SOON: MOVIE_BASE_URL + '/v2/movie/coming_soon',
    // 豆瓣TOP250
    MOVIE_TOP250: MOVIE_BASE_URL + '/v2/movie/top250',
    // 搜索电影
    MOVIE_SEARCH: MOVIE_BASE_URL + '/v2/movie/search',
    // 电影详情
    MOVIE_DETAIL: MOVIE_BASE_URL + '/v2/movie/subject',
}

module.exports = {
    request_url
}