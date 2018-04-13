const app = getApp();

Page({
    data: {
        userInfo: null
    },
    onLoad() {
        this._checkHasUserInfo();
    },
    _checkHasUserInfo() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo
            });
            console.log(app.globalData.userInfo);
        } else {
            app.getUserInfo((res) => {
                this.setData({
                    userInfo: res.userInfo
                });
                console.log(res.userInfo)
            });
        }
    },
    _enterPage() {
        wx.switchTab({
            url: '/pages/read/read'
        });
    }
});