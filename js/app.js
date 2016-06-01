var videoPlayer = {
    vid: document.getElementById('video-id'),
    vidContainer: document.querySelector('.vid-container'),
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
    mobileSettings: document.querySelector('.mobile-settings'),
    mobileControls: document.querySelector('.mobile-controls'),
    normalSpeed: document.querySelector('.normal'),
    fastSpeed: document.querySelector('.fast'),
    fasterSpeed: document.querySelector('.faster'),
    mobileOn: document.querySelector('.mobile-on'),
    mobileOff: document.querySelector('.mobile-off'),
    jumpBack: document.querySelector('.jump-back'),
    jumpForward: document.querySelector('.jump-forward'),
    playbackSpeed: document.querySelector('.playback-speed'),
    plabackCallout: document.querySelector('.playback-callout'),
    volumeCallout: document.querySelector('.volume-callout'),
    desktopFastest: document.querySelector('.desktop-fastest'),
    desktopFast: document.querySelector('.desktop-fast'),
    desktopNormal: document.querySelector('.desktop-normal'),
    desktopSlow: document.querySelector('.desktop-slow'),
    fullVol: document.querySelector('.full-volume'),
    fiftyPercentVol: document.querySelector('.fifty-percent-vol'),
    twentyfivePercentVol: document.querySelector('.twentyfive-percent-vol'),
    noVol: document.querySelector('.no-volume'),
    imageHolder: document.querySelectorAll('.image-holder'),
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
    toggleSoundDiv: function () {

        if (videoPlayer.volumeCallout.classList.contains('hidden')) {
            videoPlayer.volumeCallout.classList.remove('hidden');
        } else {
            videoPlayer.volumeCallout.classList.add('hidden');
        }
    },
    toggleFullscreen: function () {
        if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if(videoPlayer.vidContainer.requestFullscreen) {
                videoPlayer.vidContainer.requestFullscreen();
            } else if(videoPlayer.vidContainer.mozRequestFullScreen) {
                videoPlayer.vidContainer.mozRequestFullScreen();
            } else if(videoPlayer.vidContainer.webkitRequestFullscreen) {
                videoPlayer.vidContainer.webkitRequestFullscreen();
            } else if(videoPlayer.vidContainer.msRequestFullscreen) {
                videoPlayer.vidContainer.msRequestFullscreen();
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
                    position = (x - progress.parentNode.parentNode.parentNode.offsetLeft) - 12,
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
          videoPlayer.closeCaption.src = 'icons/closed_caption_orange.svg';
        } else {
          videoPlayer.captionHolder.classList.add('hidden');
          videoPlayer.closeCaption.classList.remove('full-opacity');
            videoPlayer.closeCaption.src = 'icons/closed_caption.svg';
        }
      }
    },
    captions: function () {
        var ct = videoPlayer.vid.currentTime;
        if(ct > 0 && ct < 4.130 ) {
            videoPlayer.transcripts[0].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[0].innerText;
        } else {
            videoPlayer.transcripts[0].classList.remove('highlight');
        }
        if(ct > 4.130 && ct < 7.535 ) {
            videoPlayer.transcripts[1].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[1].innerText;

        } else {
            videoPlayer.transcripts[1].classList.remove('highlight');
        }
        if(ct > 7.535 && ct < 11.270 ) {
            videoPlayer.transcripts[2].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[2].innerText;

        } else {
            videoPlayer.transcripts[2].classList.remove('highlight');
        }
        if(ct > 11.270 && ct < 13.960 ) {
            videoPlayer.transcripts[3].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[3].innerText;
        } else {
            videoPlayer.transcripts[3].classList.remove('highlight');
        }
        if(ct > 13.960 && ct < 17.940 ) {
            videoPlayer.transcripts[4].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[4].innerText;

        } else {
            videoPlayer.transcripts[4].classList.remove('highlight');
        }
        if(ct > 17.940 && ct < 22.370 ) {
            videoPlayer.transcripts[5].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[5].innerText;

        } else {
            videoPlayer.transcripts[5].classList.remove('highlight');
        }
        if(ct > 22.370 && ct < 26.880 ) {
            videoPlayer.transcripts[6].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[6].innerText;

        } else {
            videoPlayer.transcripts[6].classList.remove('highlight');
        }
        if(ct > 26.880 && ct < 30.920 ) {
            videoPlayer.transcripts[7].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[7].innerText;

        } else {
            videoPlayer.transcripts[7].classList.remove('highlight');
        }
        if(ct > 32.100 && ct < 34.730 ) {
            videoPlayer.transcripts[8].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[8].innerText;

        } else {
            videoPlayer.transcripts[8].classList.remove('highlight');
        }
        if(ct > 34.730 && ct < 39.430 ) {
            videoPlayer.transcripts[9].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[9].innerText;

        } else {
            videoPlayer.transcripts[9].classList.remove('highlight');
        }
        if(ct > 39.430 && ct < 41.190 ) {
            videoPlayer.transcripts[10].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[10].innerText;
        } else {
            videoPlayer.transcripts[10].classList.remove('highlight');
        }
        if(ct > 42.350 && ct < 46.300 ) {
            videoPlayer.transcripts[11].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[11].innerText;
        } else {
            videoPlayer.transcripts[11].classList.remove('highlight');
        }
        if(ct > 46.300 && ct < 49.270 ) {
            videoPlayer.transcripts[12].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[12].innerText;
        } else {
            videoPlayer.transcripts[12].classList.remove('highlight');
        }
        if(ct > 49.270 && ct < 53.760 ) {
            videoPlayer.transcripts[13].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[13].innerText;
        } else {
            videoPlayer.transcripts[13].classList.remove('highlight');
        }
        if(ct > 53.760 && ct < 57.780 ) {
            videoPlayer.transcripts[14].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[14].innerText;
        } else {
            videoPlayer.transcripts[14].classList.remove('highlight');
        }
        if(ct > 57.780) {
            videoPlayer.transcripts[15].classList.add('highlight');
            videoPlayer.captionHolder.innerText = videoPlayer.transcripts[15].innerText;
        } else {
            videoPlayer.transcripts[15].classList.remove('highlight');
        }
    },
    toggleMobileControls: function () {
      if (videoPlayer.mobileControls.classList.contains('hidden')) {
        videoPlayer.mobileControls.classList.remove('hidden');
      } else {
        videoPlayer.mobileControls.classList.add('hidden');
      }
    },
    mobilePlayback: function () {
      videoPlayer.normalSpeed.addEventListener('click', function () {
        videoPlayer.vid.playbackRate = 1;
        videoPlayer.normalSpeed.classList.add('add-color');
        videoPlayer.fastSpeed.classList.remove('add-color');
        videoPlayer.fasterSpeed.classList.remove('add-color');
        console.log(videoPlayer.vid.playbackRate);
      });
      videoPlayer.fastSpeed.addEventListener('click', function () {
        videoPlayer.vid.playbackRate = 1;
        videoPlayer.vid.playbackRate += 0.5;
        videoPlayer.fastSpeed.classList.add('add-color');
        videoPlayer.normalSpeed.classList.remove('add-color');
        videoPlayer.fasterSpeed.classList.remove('add-color');
        console.log(videoPlayer.vid.playbackRate);
      });
      videoPlayer.fasterSpeed.addEventListener('click', function () {
        videoPlayer.vid.playbackRate = 1;
        videoPlayer.vid.playbackRate += 1;
        videoPlayer.normalSpeed.classList.remove('add-color');
        videoPlayer.fastSpeed.classList.remove('add-color');
        videoPlayer.fasterSpeed.classList.add('add-color');
        console.log(videoPlayer.vid.playbackRate);
      });

    },
    mobileCaptions: function () {
      videoPlayer.mobileOn.addEventListener('click', function () {
        videoPlayer.captionHolder.classList.remove('hidden');
        videoPlayer.mobileOn.classList.add('add-color');
        videoPlayer.mobileOff.classList.remove('add-color');
      });

      videoPlayer.mobileOff.addEventListener('click', function () {
        videoPlayer.captionHolder.classList.add('hidden');
        videoPlayer.mobileOff.classList.add('add-color');
        videoPlayer.mobileOn.classList.remove('add-color');
      });
    },
    setTime: function (tValue) {
        try {
            if (tValue === 0) {
                videoPlayer.vid.currentTime = tValue;
            } else {
                videoPlayer.vid.currentTime += tValue;
            }
        } catch (err) {

            console.log('Video content might not be loaded');
        }
    },
    changeSound: function () {
        videoPlayer.fullVol.addEventListener('click', function () {
            videoPlayer.vid.volume = 1;
            videoPlayer.fullVol.classList.add('add-color');
            videoPlayer.fiftyPercentVol.classList.remove('add-color');
            videoPlayer.twentyfivePercentVol.classList.remove('add-color');
            videoPlayer.noVol.classList.remove('add-color');
            console.log(videoPlayer.vid.volume);
            videoPlayer.soundBtn.src = 'icons/volume_up.svg';
        });

        videoPlayer.fiftyPercentVol.addEventListener('click', function () {
            videoPlayer.vid.volume = 1;
            videoPlayer.vid.volume -= .5;
            videoPlayer.fullVol.classList.remove('add-color');
            videoPlayer.fiftyPercentVol.classList.add('add-color');
            videoPlayer.twentyfivePercentVol.classList.remove('add-color');
            videoPlayer.noVol.classList.remove('add-color');
            console.log(videoPlayer.vid.volume);
            videoPlayer.soundBtn.src = 'icons/volume_down.svg';
        });

        videoPlayer.twentyfivePercentVol.addEventListener('click', function () {
            videoPlayer.vid.volume = 1;
            videoPlayer.vid.volume -= .75;
            videoPlayer.fullVol.classList.remove('add-color');
            videoPlayer.fiftyPercentVol.classList.remove('add-color');
            videoPlayer.twentyfivePercentVol.classList.add('add-color');
            videoPlayer.noVol.classList.remove('add-color');
            console.log(videoPlayer.vid.volume);
            videoPlayer.soundBtn.src = 'icons/volume_down.svg';
        });

        videoPlayer.noVol.addEventListener('click', function () {
            videoPlayer.vid.volume = 1;
            videoPlayer.vid.volume -= 1;
            videoPlayer.fullVol.classList.remove('add-color');
            videoPlayer.fiftyPercentVol.classList.remove('add-color');
            videoPlayer.twentyfivePercentVol.classList.remove('add-color');
            videoPlayer.noVol.classList.add('add-color');
            console.log(videoPlayer.vid.volume);
            videoPlayer.soundBtn.src = 'icons/volume_off.svg';
        });
    },
    timeJump: function () {
        videoPlayer.jumpBack.addEventListener('mousedown', function () {
            videoPlayer.setTime(-10);
            videoPlayer.jumpBack.src = 'icons/replay_10_orange.svg';
        });
        videoPlayer.jumpBack.addEventListener('mouseup', function () {
            videoPlayer.jumpBack.src = 'icons/replay_10.svg';
        });

        videoPlayer.jumpForward.addEventListener('mousedown', function () {
            videoPlayer.setTime(10);
            videoPlayer.jumpForward.src = 'icons/forward_10_orange.svg';
        });
        videoPlayer.jumpForward.addEventListener('mouseup', function () {
            videoPlayer.jumpForward.src = 'icons/forward_10.svg';
        });
    },
    togglePlaybackDiv: function () {
        videoPlayer.playbackSpeed.addEventListener('click', function () {
            if (videoPlayer.plabackCallout.classList.contains('hidden')) {
                videoPlayer.plabackCallout.classList.remove('hidden');

            } else {
                videoPlayer.plabackCallout.classList.add('hidden');
            }
        });

    },
    desktopPlayback: function () {
        videoPlayer.desktopFastest.addEventListener('click', function () {
            videoPlayer.vid.playbackRate = 1;
            videoPlayer.vid.playbackRate += 1;
            videoPlayer.desktopNormal.classList.remove('add-color');
            videoPlayer.desktopFastest.classList.add('add-color');
            videoPlayer.desktopSlow.classList.remove('add-color');
            videoPlayer.desktopFast.classList.remove('add-color');
            console.log(videoPlayer.vid.playbackRate);
        });
        videoPlayer.desktopFast.addEventListener('click', function () {
            videoPlayer.vid.playbackRate = 1;
            videoPlayer.vid.playbackRate += .5;
            videoPlayer.desktopNormal.classList.remove('add-color');
            videoPlayer.desktopFastest.classList.remove('add-color');
            videoPlayer.desktopFast.classList.add('add-color');
            videoPlayer.desktopSlow.classList.remove('add-color');
            console.log(videoPlayer.vid.playbackRate);
        });
        videoPlayer.desktopNormal.addEventListener('click', function () {
            videoPlayer.vid.playbackRate = 1;

            videoPlayer.desktopNormal.classList.add('add-color');
            videoPlayer.desktopFastest.classList.remove('add-color');
            videoPlayer.desktopFast.classList.remove('add-color');
            videoPlayer.desktopSlow.classList.remove('add-color');
            console.log(videoPlayer.vid.playbackRate);
        });
        videoPlayer.desktopSlow.addEventListener('click', function () {
            videoPlayer.vid.playbackRate = 1;
            videoPlayer.vid.playbackRate -= .5;
            videoPlayer.desktopNormal.classList.remove('add-color');
            videoPlayer.desktopFastest.classList.remove('add-color');
            videoPlayer.desktopFast.classList.remove('add-color');
            videoPlayer.desktopSlow.classList.add('add-color');
            console.log(videoPlayer.vid.playbackRate);
        });
    },
    clickScript: function () {

        videoPlayer.transcripts[0].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 0;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[1].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 4.130;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[2].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 7.535;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[3].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 11.270;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[4].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 13.960;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[5].addEventListener('click', function () {
            videoPlayer.vid.currentTime = 17.940;
            videoPlayer.vid.play();
        });
        videoPlayer.transcripts[6].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 22.370;
                videoPlayer.vid.play();
            }
        });

        videoPlayer.transcripts[7].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 26.880;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[8].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 32.100;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[9].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 34.730;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[10].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 39.430;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[11].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 42.350;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[12].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 46.300;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[13].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 49.270;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[14].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 53.760;
                videoPlayer.vid.play();
            }
        });
        videoPlayer.transcripts[15].addEventListener('click', function () {
            if(!videoPlayer.vid.paused) {
                videoPlayer.vid.currentTime = 57.780;
                videoPlayer.vid.play();
            }
        });
    },
    checkFullScreen: function () {
        if (window.innerHeight !== screen.height) {
            videoPlayer.fullScreenBtn.src = 'http://' + window.location.host + '/icons/fullscreen.svg';
        } else {
            videoPlayer.fullScreenBtn.src = 'http://' + window.location.host + '/icons/fullscreen_exit.svg';
        }
    }
};

window.onload = init();


function init() {
    videoPlayer.playBtn.addEventListener('click', videoPlayer.playBack);
    videoPlayer.soundBtn.addEventListener('click', videoPlayer.toggleSoundDiv);
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
    videoPlayer.mobileSettings.addEventListener('click', videoPlayer.toggleMobileControls);
    videoPlayer.mobilePlayback();
    videoPlayer.mobileCaptions();
    videoPlayer.timeJump();
    videoPlayer.togglePlaybackDiv();
    videoPlayer.desktopPlayback();
    videoPlayer.changeSound();
    videoPlayer.clickScript();
    videoPlayer.vid.addEventListener('timeupdate', videoPlayer.checkFullScreen);
}

