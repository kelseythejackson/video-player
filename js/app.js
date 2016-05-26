var videoPlayer = {
    vid: document.getElementById('video-id'),
    playBtn: document.getElementById('play'),
    soundBtn: document.getElementById('volume'),
    fullScreenBtn: document.getElementById('fullscreen'),
    videoStart: document.getElementById('video-start'),
    videoEnd: document.getElementById('video-end'),
    buffer: document.querySelector('.buffer'),
    time: document.querySelector('.time'),
    timeRail: document.querySelector('.time-rail'),
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

    },
    updateBuffer: function () {
        bufferPercent = (videoPlayer.vid.buffered.end(0) / videoPlayer.vid.duration) * 100;
        videoPlayer.buffer.style.width = bufferPercent + '%';
    },
    updateCurrentTime: function () {
        currentTimePercent = (videoPlayer.vid.currentTime / videoPlayer.vid.duration) * 100;
        videoPlayer.time.style.width = currentTimePercent + '%';
    },
    timeProgress: function () {

        // console.log(Math.floor(videoPlayer.vid.currentTime));
        videoPlayer.videoStart.innerHTML = Math.floor(videoPlayer.vid.seekable.start(0) /  60) + ':' +  Math.floor(videoPlayer.vid.currentTime);
    },
    timeEnd: function () {
        videoPlayer.videoEnd.innerHTML =  '00:' +  Math.floor(videoPlayer.vid.duration);
    },

    timeScrub: function () {
        var timeDrag = false;
        videoPlayer.currentTime.addEventListener('mousedown', function () {
            videoPlayer.playBack();



        }, true);
    },
    updateTime: function (x) {
        var progress = videoPlayer.timeRail,
            maxDuration = videoPlayer.vid.duration,
            position = x - progress.offsetLeft,
            percentage = 100 * position / progress.offsetWidth;

        if (percentage > 100) {

        } else if (percentage < 0) {
            percentage = 0;
        }

        videoPlayer.time.style.width = percentage + '%';
        // videoPlayer.cu
    }

};



videoPlayer.playBtn.addEventListener('click', videoPlayer.playBack);
videoPlayer.soundBtn.addEventListener('click', videoPlayer.sound);
videoPlayer.fullScreenBtn.addEventListener('click', videoPlayer.toggleFullscreen);
// videoPlayer.videoStart.innerHTML = Math.floor(videoPlayer.vid.seekable.start(0) /  60) + ':' +  Math.floor(videoPlayer.vid.seekable.start(0));
// videoPlayer.videoEnd.innerHTML = Math.floor(videoPlayer.vid.seekable.end(0) / 60) + ':' + Math.floor(videoPlayer.vid.seekable.end(0));
videoPlayer.vid.addEventListener('timeupdate', videoPlayer.updateBuffer);
videoPlayer.vid.addEventListener('timeupdate', videoPlayer.updateCurrentTime);

videoPlayer.vid.addEventListener('timeupdate', videoPlayer.timeProgress);

videoPlayer.timeEnd();


/*

 videoPlayer.vid.textTracks[0].mode
 "showing"
 videoPlayer.vid.textTracks[0].mode = 'hidden'
 "hidden"
 */

videoPlayer.vid.removeAttribute('controls');

videoPlayer.timeRail.addEventListener('click', function (e) {
    var progress = videoPlayer.timeRail,
        maxDuration = videoPlayer.vid.duration,
        position = (e.pageX - progress.parentNode.parentNode.offsetLeft) - 24,
        percentage = (position / progress.offsetWidth) * 100;
    videoPlayer.time.style.width = percentage + '%';
    videoPlayer.vid.currentTime = maxDuration * percentage / 100;

    // if(percentage > 100) {
    //     percentage = 100;
    // }
    // if(percentage < 0) {
    //     percentage = 0;
    // }

    console.log(position);



});