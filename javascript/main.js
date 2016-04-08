(function () {
  'use strict';
  function MediaPlayer() {
    const buttonBackward = document.getElementById('before');
    const buttonPlay = document.getElementById('play_pause');
    const buttonForward = document.getElementById('next');
    const buttonVolume = document.getElementById('sound');
    const timePassed = document.getElementById('time');
    const progressBar = document.getElementsByTagName('progress')[0];
    const timeLeft = document.getElementById('timeLeft');
    const arrayMappingSongsAndCovers = [
      ['02 Common Free Style feat. Common.mp3', 'rhfactor'],
      ['11 Big Weenie.wav', 'eminem'],
      ['GUSH - MASSIVE DRUM.mp3', 'gush'],
      ['Wonderwall (oasis).mp3', 'oasis'],
      ['ComeTogether.wav', 'beatles']
    ];
    const mapOfSongsAndCovers = new Map(arrayMappingSongsAndCovers);
    const covers = [document.getElementById('top'), document.getElementById('image1')];
    const currentSong = new Audio(arrayMappingSongsAndCovers[0][0]);
    const currentTime = new Date(0);
    const remainingTime = new Date(0);
    let currentSongIndex = 0;
    let intervalID;

    /*
     * startTiming()
     *        Unfortunately, MediaController which do have specifications to many useful things I would have used there,
     *        isn't supported by either Chromium nor Firefox, so this is a kind of hack.
     *        Takes care of the visual timers of the MediaPlayer and the progression bar, but only if the metadata of the audio was loaded (readyState > 1).
     * Return:
     *        Nothing.
     */
    const startTiming = function () {
      intervalID = setInterval(function () {
        if (currentSong.readyState > 1 ) {
          currentTime.setTime(0);
          remainingTime.setTime(0);
          currentTime.setSeconds(currentSong.currentTime);
          remainingTime.setSeconds(currentSong.duration - currentSong.currentTime);
          timePassed.textContent = currentTime.toISOString().substr(11, 8);
          timeLeft.textContent = `-${remainingTime.toISOString().substr(11, 8)}`;
          progressBar.value = parseFloat(currentSong.currentTime * 100 / currentSong.duration).toString();
        }
      }, 250);
    };

    /*
     * togglePlay()
     *        Toggles between playing and pausing the current track.
     *        If shouldPlay is undefined, toggles as usual but if true keeps using the state before changing the track.
     *        Changes class of the <i> (buttonPlay's child) element to 'fa fa-play' or to 'fa fa-pause'.
     *        Also sets the corresponding background and img of the song being played.
     * Return:
     *        Nothing.
     */
    const togglePlay = function (shouldPlay = undefined) {
       covers[0].style.backgroundSize= "cover";
       covers[0].style.backgroundPosition= "center";
       covers[0].style.backgroundImage = `url('images/${mapOfSongsAndCovers.get(arrayMappingSongsAndCovers[currentSongIndex][0])}_blurred.jpg')`;
      covers[1].src = `images/${mapOfSongsAndCovers.get(arrayMappingSongsAndCovers[currentSongIndex][0])}.jpg`;
      if ((currentSong.paused === true && shouldPlay === undefined) || (currentSong.paused === true && shouldPlay === true)) {
        currentSong.play();
        if (intervalID === undefined) {
          startTiming();
        }
        buttonPlay.children[0].className = 'fa fa-pause';
      } else if (currentSong.paused === false) {
        clearInterval(intervalID);
        intervalID = undefined;
        currentSong.pause();
        buttonPlay.children[0].className = 'fa fa-play';
      }
    };

    /*
     * goPrevTrack()
     *        Checks playing state before changing the current track to the previous one in the arrayOfSongs.
     * Return:
     *        Nothing.
     */
    const goPrevTrack = function () {
      if (currentSongIndex === 0) {
        currentSongIndex = arrayMappingSongsAndCovers.length - 1;;
      } else {
        currentSongIndex -= 1;
      }
      const shouldPlay = currentSong.paused === false ? true : false;
      currentSong.src = arrayMappingSongsAndCovers[currentSongIndex][0];
      togglePlay(shouldPlay);
    };

    /*
     * goNextTrack()
     *        Checks playing state before changing the current track to the next one in the arrayOfSongs.
     * Return:
     *        Nothing.
     */
    const goNextTrack = function (automatic = false) {
      if (currentSongIndex === arrayMappingSongsAndCovers.length - 1) {
        currentSongIndex = 0;
      } else {
        currentSongIndex += 1;
      }
      const shouldPlay = (automatic === true || currentSong.paused === false) ? true : false;
      currentSong.src = arrayMappingSongsAndCovers[currentSongIndex][0];
      togglePlay(shouldPlay);
    };

    /*
     * toggleVolume()
     *        Changes class of the <i> (buttonVolume's child) element to 'fa fa-volume-off' or 'fa fa-volume-up'.
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
      }
    };

    buttonBackward.addEventListener('click', goPrevTrack);
    buttonPlay.addEventListener('click', function () {
      togglePlay();
    });
    buttonForward.addEventListener('click', goNextTrack);
    buttonVolume.addEventListener('click', toggleVolume);
    currentSong.addEventListener('ended', function () {
      goNextTrack(true);
    });
    currentSong.addEventListener('error', function () {
      if (arrayMappingSongsAndCovers.length - 1 < 2) {
        /*
         * @TODO: An error message or something if there's no playable song.
         */
      } else {
        goNextTrack();
      }
    });


    covers[0].style.backgroundImage = `url('images/${mapOfSongsAndCovers.get(arrayMappingSongsAndCovers[currentSongIndex][0])}_blurred.jpg')`;
    covers[1].src = `images/${mapOfSongsAndCovers.get(arrayMappingSongsAndCovers[currentSongIndex][0])}.jpg`;
  }

  const myMediaPlayer = MediaPlayer();

}());
