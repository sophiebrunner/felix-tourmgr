const menuButton = document.querySelector("#menuButton");

function toggleButton() {
  if (menuButton.getAttribute("aria-expanded") === "false") {
    menuButton.setAttribute("aria-expanded", "true");
  } else {
    menuButton.setAttribute("aria-expanded", "false");
  }
}

menuButton.addEventListener("click", toggleButton);

/* global Plyr */
(function iife(w, d) {
  d.querySelectorAll('video, audio').forEach((media) => new Plyr(media, {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'pip',
      'airplay', 'fullscreen'],
    i18n: {
      restart: 'Erneut abspielen',
      rewind: '{seektime} Sekunden zurückspulen',
      play: 'Abspielen',
      pause: 'Pausieren',
      fastForward: '{seektime} Sekunden vorspulen',
      seek: 'Suchen',
      seekLabel: '{currentTime} von {duration}',
      played: 'Gespielt',
      buffered: 'Gepuffert',
      currentTime: 'Aktuelle Abspielzeit',
      duration: 'Dauer',
      volume: 'Lautstärke',
      mute: 'Ton stummschalten',
      unmute: 'Ton anschalten',
      enableCaptions: 'Untertitel aktivieren',
      disableCaptions: 'Untertitel deaktivieren',
      download: 'Herunterladen',
      enterFullscreen: 'Vollbildmodus aktivieren',
      exitFullscreen: 'Vollbildmodus deaktivieren',
      frameTitle: 'Abspielen von {title}',
      captions: 'Untertitel',
      settings: 'Einstellungen',
      pip: 'Bild-in-Bild-Modus',
      menuBack: 'Zurück zum vorherigen Menü',
      speed: 'Geschwindigkeit',
      normal: 'Normal',
      quality: 'Qualität',
      loop: 'Am Ende erneut abspielen',
      start: 'Start',
      end: 'Ende',
      all: 'Alles',
      reset: 'Zurücksetzen',
      disabled: 'Deaktiviert',
      enabled: 'Aktiviert',
      advertisement: 'Werbung',
      qualityBadge: {
        2160: '4K', 1440: 'HD', 1080: 'HD', 720: 'HD', 576: 'SD', 480: 'SD'
      }
    }
  }));
}(typeof global !== 'undefined' ? global : window, document));

