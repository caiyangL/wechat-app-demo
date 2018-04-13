const app = getApp();
const postsListData = app.globalData.postsListData;

Page({
    data: {
        postId: undefined,
        postData: null,
        iscollected: false,
        isPlayingMusic: false
    },
    initCollect() {
        let collectedList = wx.getStorageSync('collectedList');
        if (collectedList === '') {
            wx.setStorageSync('collectedList', JSON.stringify([]));
        } else {
            let postId = this.data.postId;
            collectedList = JSON.parse(collectedList);
            let index = collectedList.indexOf(postId);
            if (index > -1) {
                this.setData({
                    iscollected: true
                });
            }
        }
    },
    initPlayingMusic(postId) {
        let isPlayingMusic = app.globalData.isPlayingMusic;
        let playingMusicPostId = app.globalData.playingMusicPostId;
        if (isPlayingMusic && playingMusicPostId === postId) {
            this.setData({
                isPlayingMusic: true
            });
        }
    },
    shareHandle() {
        wx.showActionSheet({
            itemList: [
                '分享到QQ',
                '分享到wechat',
                '分享到朋友圈'
            ]
        })
    },
    collectHandle() {
        let { postId, iscollected } = this.data;
        let collectedList = this.getStorageToCollected();
        let flag;
        if (iscollected) {
            collectedList = collectedList.filter(item => item !== postId);
            flag = false;
        } else {
            collectedList.push(postId);
            flag = true;
        }
        this.setData({
            iscollected: flag
        });
        this.setStorageToCollected(collectedList);
    },
    toggleMusicHandle() {
        let isPlaying = this.data.isPlayingMusic;
        if (!isPlaying) {
            this.playMusic();
        } else {
            this.stopMusic();
        }
    },
    playMusic() {
        let { url, title, coverImg } = this.data.postData.music;
        wx.playBackgroundAudio({
            dataUrl: url,
            title,
            coverImgUrl: coverImg,
            success: () => {
                this.setData({
                    isPlayingMusic: true
                });
                app.globalData.isPlayingMusic = true;
                app.globalData.playingMusicPostId = this.data.postId;
            }
        });
    },
    stopMusic() {
        wx.pauseBackgroundAudio();
        this.setData({
            isPlayingMusic: false
        });
        app.globalData.isPlayingMusic = false;
        app.globalData.playingMusicPostId = undefined;
    },
    getStorageToCollected() {
        return JSON.parse(wx.getStorageSync('collectedList'));
    },
    setStorageToCollected(collectedList) {
        wx.setStorageSync('collectedList', JSON.stringify(collectedList));
    },
    onLoad: function(option) {
        let postData = null;
        let postId = parseInt(option.postId);
        this.setData({
            postId: postId,
            postData: postsListData[postId]
        });
        this.initCollect();
        this.initPlayingMusic(postId);
        wx.onBackgroundAudioPlay(() => {
            this.setData({
                isPlayingMusic: true
            });
            app.globalData.isPlayingMusic = true;
            app.globalData.playingMusicPostId = this.data.postId;
        });
        wx.onBackgroundAudioPause(() => {
          this.setData({
            isPlayingMusic: false
          });
          app.globalData.isPlayingMusic = false;
          app.globalData.playingMusicPostId = undefined;
        });
        wx.onBackgroundAudioStop(() => {
          this.setData({
            isPlayingMusic: false
          });
          app.globalData.isPlayingMusic = false;
          app.globalData.playingMusicPostId = undefined;
        });
    }
})