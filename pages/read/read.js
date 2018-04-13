const app = getApp();
const postsListData = app.globalData.postsListData;

Page({
    data: {
        swiperImgList: [
            '/images/iqiyi.png',
            '/images/vr.png',
            '/images/wx.png'
        ],
        postsListData: []
    },
    tapPostHandle(e) {
        wx.navigateTo({
            url: '/pages/read/read-detail/read-detail?postId=' + e.currentTarget.dataset.postId
        })
    },
    onLoad() {
        this.setData({
            postsListData
        });
    }
})