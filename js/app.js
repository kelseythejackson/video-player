var videoPlayer = {
    vid: document.getElementById('video-id'),
    playBtn: document.getElementById('play'),
    soundBtn: document.getElementById('volume'),
    fullScreenBtn: document.getElementById('fullscreen'),
    playBack: function () {
        if(videoPlayer.vid.paused) {
            videoPlayer.vid.play();
            videoPlayer.playBtn.src = 'icons/pause.svg';
            console.log('playing');
        } else {
            videoPlayer.vid.pause();
            videoPlayer.playBtn.src = 'icons/play_arrow.svg';
            console.log('paused');
        }

    },
    sound: function () {
        if(videoPlayer.vid.muted) {
            videoPlayer.vid.muted = false;
            videoPlayer.soundBtn.src = 'icons/volume_up.svg';
            console.log('sound on');
        } else {
            videoPlayer.vid.muted = true;
            videoPlayer.soundBtn.src = 'icons/volume_off.svg';
            console.log('sound off');
        }
    },
    toggleFullscreen: function () {
        if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if(videoPlayer.vid.requestFullscreen) {
                videoPlayer.vid.requestFullscreen();
            } else if(videoPlayer.vid.mozrequestFullscreen) {
                videoPlayer.vid.mozrequestFullscreen();
            } else if(videoPlayer.vid.webkitRequestFullscreen) {
                videoPlayer.vid.webkitRequestFullscreen();
            } else if(videoPlayer.vid.msRequestFullscreen) {
                videoPlayer.vid.msRequestFullscreen();
            }
            videoPlayer.fullScreenBtn.src = 'icons/fullscreen_exit.svg';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            videoPlayer.fullScreenBtn.src = 'icons/fullscreen.svg';
        }

    }
};



videoPlayer.playBtn.addEventListener('click', videoPlayer.playBack);
videoPlayer.soundBtn.addEventListener('click', videoPlayer.sound);
videoPlayer.fullScreenBtn.addEventListener('click', videoPlayer.toggleFullscreen);

/*

 videoPlayer.vid.textTracks[0].mode
 "showing"
 videoPlayer.vid.textTracks[0].mode = 'hidden'
 "hidden"
 */