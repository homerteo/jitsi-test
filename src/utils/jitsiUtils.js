import JitsiMeetJS from '@lyno/lib-jitsi-meet';
import $ from 'jquery';
import options from '../options/config';

window.$ = $;

JitsiMeetJS.init();
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);
//Cambia el nivel de registro de la biblioteca, lo que se podrá ver en la consola del navegador
// Los logs puede ser TRACE, DEBUG, INFO, LOG, WARN y ERROR

export function createTracksAndAddToRoom(room) {
  JitsiMeetJS.createLocalTracks({
    //createLocalTracks crea pistas multimedia y las devuelve a través del objeto Promise. Si se rechaza, pasa la instancia de JitsiTrackError al bloque de captura.
    devices: ['video', 'audio']
    // Matriz que puede contener los dispositivos "desktop", "video" and "audio" que se pasaran a ala GUM, si esta propiedad no se configura GUM intentará obtener todos los dispositivos disponibles
  }).then((tracks) => {
    tracks.forEach(track => {
      room.addTrack(track);
    });
  }).catch(error => {
      console.error('There was an error creating the local tracks:', error);
    }
  );
}

export function createAndJoinRoom(connection, roomName) {
  return new Promise((resolve) => {
    const room = connection.initJitsiConference(roomName, {});
    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
      // JitsiMeetJS.events permite acceder a eventos como cuando alguien deja una conferencia o hay cambio de speaker dominante
      resolve(room);
    });
    room.join();
  });
}

export function connect() {
  return new Promise(((resolve, reject) => {
    const connection = new JitsiMeetJS.JitsiConnection(null, null, options);
    // Constructor de JitsiConnection. Puede usarse para crear una nueva conexión de servidor.

    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => {
      resolve(connection);
    }); // Los lístener pueden servir para mostrar acciones en el front cuando sucede alguno de estos eventos
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, () => {
      reject('The connection failed.');
    });
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, () => {
      console.log("Connection disconnected");
    });

    connection.connect();
  }))
}

export function trackAudioListeners(track) {
  track.addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('Audio mutiado'))
  track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, () => console.log('Audio level changed'))
}