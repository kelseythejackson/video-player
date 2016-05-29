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
    innerControls: document.querySelector('.inner-controls'),
    videoControls: document.querySelector('.vid-controls'),
    closeCaption: document.querySelector('.close-caption'),
    transcripts: document.querySelectorAll('.transcript span'),
    captionHolder: document.querySelector('.captioning p'),
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
        var time = videoPlayer.vid.currentTime,
            minutes = '0' + Math.floor(time / 60),
            seconds = Math.floor(time),
            addZero = function () {
                if (seconds < 10) {
                    seconds = '0' + Math.floor(time);
                }
            };
        addZero();
        videoPlayer.videoStart.innerHTML = minutes + ':' +  seconds;
    },
    timeEnd: function () {
        if(videoPlayer.vid.buffered.length > 0) {
            var videoDuration = videoPlayer.vid.duration,
                minutes = Math.floor(videoDuration / 60),
                seconds = Math.floor(videoDuration);
            videoPlayer.videoEnd.innerHTML = '0' + minutes + ':' + seconds;
        }
    },
    updateTime: function() {
        var timeDrag = false,
            updatebar = function (x) {
                var progress = videoPlayer.timeRail,
                    maxDuration = videoPlayer.vid.duration,
                    position = (x - progress.parentNode.parentNode.offsetLeft) - 24,
                    percentage = (position / progress.offsetWidth) * 100;

                videoPlayer.time.style.width = percentage + '%';
                videoPlayer.vid.currentTime = maxDuration * percentage / 100;
            };
        videoPlayer.timeRail.addEventListener('mousedown', function (e) {
         timeDrag = true;
            updatebar(e.pageX);
            videoPlayer.playBack();
        });
        document.addEventListener('mouseup', function (e) {
            if (timeDrag) {
                timeDrag = false;
                updatebar(e.pageX);
                videoPlayer.playBack();
            }
        });
        document.addEventListener('mousemove', function (e) {
            if (timeDrag) {
                updatebar(e.pageX);
            }
        });
    },
    showHideControls: function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.videoControls.classList.add('toggle-height');
                videoPlayer.innerControls.classList.add('show-hide');
            } else {
                videoPlayer.videoControls.classList.remove('toggle-height');
                videoPlayer.innerControls.classList.remove('show-hide');
            }
    },
    showControlsAtEnd: function () {
        if(videoPlayer.vid.ended) {
            videoPlayer.videoControls.classList.remove('toggle-height');
            videoPlayer.innerControls.classList.remove('show-hide');
        }
    },
    toggleCaption: function () {
      if (videoPlayer.captionHolder.innerText !== "") {
        if (videoPlayer.captionHolder.classList.contains('hidden')) {
          videoPlayer.captionHolder.classList.remove('hidden');
          videoPlayer.closeCaption.classList.add('full-opacity');
        } else {
          videoPlayer.captionHolder.classList.add('hidden');
          videoPlayer.closeCaption.classList.remove('full-opacity');
        }
      }


    },
    captions: function () {
        var ct = videoPlayer.vid.currentTime,
            count = 0;
        console.log(videoPlayer.transcripts[0]);
        if(ct > 0/24 && ct < 4.130 ) {
            videoPlayer.transcripts[0].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[0].innerText;
        } else {

            videoPlayer.transcripts[0].classList.remove('highlight');
        }
        if(ct > 4.130 && ct < 7.535 ) {
            videoPlayer.transcripts[1].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[1].innerText

        } else {

            videoPlayer.transcripts[1].classList.remove('highlight');
        }
        if(ct > 7.535 && ct < 11.270 ) {
            videoPlayer.transcripts[2].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[2].innerText

        } else {

            videoPlayer.transcripts[2].classList.remove('highlight');
        }
        if(ct > 11.270 && ct < 13.960 ) {
            videoPlayer.transcripts[3].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[3].innerText

        } else {

            videoPlayer.transcripts[3].classList.remove('highlight');
        }
        if(ct > 13.960 && ct < 17.940 ) {
            videoPlayer.transcripts[4].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[4].innerText

        } else {

            videoPlayer.transcripts[4].classList.remove('highlight');
        }
        if(ct > 17.940 && ct < 22.370 ) {
            videoPlayer.transcripts[5].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[5].innerText

        } else {

            videoPlayer.transcripts[5].classList.remove('highlight');
        }
        if(ct > 22.370 && ct < 26.880 ) {
            videoPlayer.transcripts[6].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[6].innerText

        } else {

            videoPlayer.transcripts[6].classList.remove('highlight');
        }
        if(ct > 26.880 && ct < 30.920 ) {
            videoPlayer.transcripts[7].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[7].innerText

        } else {

            videoPlayer.transcripts[7].classList.remove('highlight');
        }
        if(ct > 32.100 && ct < 34.730 ) {
            videoPlayer.transcripts[8].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[8].innerText

        } else {

            videoPlayer.transcripts[8].classList.remove('highlight');
        }
        if(ct > 34.730 && ct < 39.430 ) {
            videoPlayer.transcripts[9].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[9].innerText

        } else {

            videoPlayer.transcripts[9].classList.remove('highlight');
        }
        if(ct > 39.430 && ct < 41.190 ) {
            videoPlayer.transcripts[10].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[10].innerText

        } else {

            videoPlayer.transcripts[10].classList.remove('highlight');
        }
        if(ct > 42.350 && ct < 46.300 ) {
            videoPlayer.transcripts[11].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[11].innerText

        } else {

            videoPlayer.transcripts[11].classList.remove('highlight');
        }
        if(ct > 46.300 && ct < 49.270 ) {
            videoPlayer.transcripts[12].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[12].innerText

        } else {

            videoPlayer.transcripts[12].classList.remove('highlight');
        }
        if(ct > 49.270 && ct < 53.760 ) {
            videoPlayer.transcripts[13].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[13].innerText

        } else {

            videoPlayer.transcripts[13].classList.remove('highlight');
        }
        if(ct > 53.760&& ct < 57.780 ) {
            videoPlayer.transcripts[14].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[14].innerText

        } else {

            videoPlayer.transcripts[14].classList.remove('highlight');
        }
        if(ct > 57.780) {
            videoPlayer.transcripts[15].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[15].innerText

        } else {

            videoPlayer.transcripts[15].classList.remove('highlight');
        }
    }

};

videoPlayer.playBtn.addEventListener('click', videoPlayer.playBack);
videoPlayer.soundBtn.addEventListener('click', videoPlayer.sound);
videoPlayer.fullScreenBtn.addEventListener('click', videoPlayer.toggleFullscreen);
videoPlayer.vid.addEventListener('timeupdate', videoPlayer.updateBuffer);
videoPlayer.vid.addEventListener('timeupdate', videoPlayer.updateCurrentTime);
videoPlayer.vid.addEventListener('timeupdate', videoPlayer.timeProgress);
videoPlayer.vid.removeAttribute('controls');
videoPlayer.updateTime();
videoPlayer.playBtn.addEventListener('click', videoPlayer.timeEnd);
videoPlayer.playBtn.addEventListener('click', videoPlayer.showHideControls);
videoPlayer.vid.addEventListener('timeupdate', videoPlayer.showControlsAtEnd);
videoPlayer.closeCaption.addEventListener('click', videoPlayer.toggleCaption);
videoPlayer.vid.addEventListener('timeupdate', videoPlayer.captions);
videoPlayer.vid.textTracks[0].mode = 'hidden';
