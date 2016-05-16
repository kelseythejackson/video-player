let video = document.getElementById('video'),
    playBtn = document.querySelector('.inner-controls-1').children[0];

playBtn.addEventListener('click', function () {
   video.play();
});