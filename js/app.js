var videoPlayer = {
    vid: document.getElementById('video-id'),
    playBtn: document.querySelector('.inner-controls-1').children[0],
    soundBtn: document.querySelector('.inner-controls-2').children[0],
    fullScreen: document.querySelector('.inner-controls-2').children[1],
    playBack: function () {
        if(videoPlayer.vid.paused) {
            videoPlayer.vid.play();
            videoPlayer.playBtn.src = 'icons/pause-icon.png';
            console.log('playing');
        } else {
            videoPlayer.vid.pause();
            videoPlayer.playBtn.src = 'icons/play-icon.png';
            console.log('paused');
        }

    },
    sound: function () {
        if(videoPlayer.vid.muted) {
            videoPlayer.vid.muted = false;
            console.log('sound on');
        } else {
            videoPlayer.vid.muted = true;
            console.log('sound off');
        }
    },
    goFullscreen: function () {
        if(videoPlayer.vid.requestFullscreen) {
            videoPlayer.vid.requestFullscreen();
        } else if(videoPlayer.vid.mozrequestFullscreen) {
            videoPlayer.vid.mozrequestFullscreen();
        } else if(videoPlayer.vid.webkitRequestFullscreen) {
            videoPlayer.vid.webkitRequestFullscreen();
        } else if(videoPlayer.vid.msRequestFullscreen) {
            videoPlayer.vid.msRequestFullscreen();
        }
    }
};



videoPlayer.playBtn.addEventListener('click', videoPlayer.playBack);
videoPlayer.soundBtn.addEventListener('click', videoPlayer.sound);
videoPlayer.fullScreen.addEventListener('click', videoPlayer.goFullscreen);