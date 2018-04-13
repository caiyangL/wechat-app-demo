const postsListData = require('/data/posts-data.js').postList;

App({
    onLaunch() {
        this.getUserInfo(res => {
            this.globalData.userInfo = res.userInfo;
        });
    },
    getUserInfo(callback) {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            callback(res);
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        postsListData: postsListData,
        isPlayingMusic: false,
        playingMusicPostId: undefined
    }
});