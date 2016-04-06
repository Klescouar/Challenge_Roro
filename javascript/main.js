(function () {
  'use strict';
  function MediaPlayer() {
    let currentSongIndex = 0;
    const buttonPlay = document.getElementById('play_pause');
    const buttonBackward = document.getElementById('before');
    const buttonForward = document.getElementById('next');
    const timePassed = document.getElementById('timePassed');
    const progressBar = document.getElementById('bar');
    const timeLeft = document.getElementById('timeLeft');
    const buttonVolume = document.getElementById('sound');
    const arrayOfSongs = ['ComeTogether.wav', 'test_oneshot_make_a_move.wav'];
    const currentSong = new Audio(arrayOfSongs[currentSongIndex]);

    /*
     * togglePlay()
     *        Toggles between playing and pausing the current track.
     *        Changes class of the <i> (buttonPlay's child) element to 'fa fa-play' or to 'fa fa-pause'.
     * Return:
     *        Nothing.
     */
    const togglePlay = function (keepState = false) {
      if (currentSong.paused === true) {
        currentSong.play();
        buttonPlay.children[0].className = 'fa fa-pause';
      } else if (currentSong.paused === false) {
        currentSong.pause();
        buttonPlay.children[0].className = 'fa fa-play';
      }
    };

    /*
     * goPrevTrack()
     *        Go to the prev track in the arrayOfSongs.
     * Return:
     *        Nothing.
     */
    const goPrevTrack = function () {
      if (currentSongIndex === 0) {
        currentSongIndex = arrayOfSongs.length - 1;;
      } else {
        currentSongIndex -= 1;
      }
      currentSong.src = arrayOfSongs[currentSongIndex];
      togglePlay(true);
    };
    
    /*
     * goNextTrack()
     *        Go to the next track in the arrayOfSongs.
     * Return:
     *        Nothing.
     */
    const goNextTrack = function () {
      if (currentSongIndex === arrayOfSongs.length - 1) {
        currentSongIndex = 0;
      } else {
        currentSongIndex += 1;
      }
      currentSong.src = arrayOfSongs[currentSongIndex];
      togglePlay(true);
    };

    /*
     * toggleVolume()
     *        Changes class of the <i> (buttonVolume's child) element to volumeOn or volumeOff.
     * Return:
     *        Nothing.
     */
    const toggleVolume = function () {
      if (currentSong.muted === false) {
        currentSong.muted = true;
        buttonVolume.children[0].className = 'fa fa-volume-off';
      } else {
        currentSong.muted = false;
        buttonVolume.children[0].className = 'fa fa-volume-up';
//      sample.volume = 0.5;
      }
    };

    buttonBackward.addEventListener('click', goPrevTrack);
    buttonPlay.addEventListener('click', function() {
      togglePlay();
    });
    buttonForward.addEventListener('click', goNextTrack);
    buttonVolume.addEventListener('click', toggleVolume);
    currentSong.addEventListener('ended', function () {
      if (currentSongIndex < arrayOfSongs.length - 1) {
        goNextTrack();
      }
    });
  }

  const myMediaPlayer = MediaPlayer();

}());
