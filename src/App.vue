<template>
  <div id="app">
    <h1>Aplicación de prueba</h1>
    <video v-for="track in videoTracks" :key="`track-${track.getId()}`" :ref="track.getId()" autoplay />
    <audio v-for="track in audioTracks" :key="`track-${track.getId()}`" :ref="track.getId()" autoplay />
    <br>
    <button @click="muteAudio">📞</button>
    <button @click="muteVideo">📹</button>
    <button>🖥</button>
  </div>
</template>

<script>
import { connect, createAndJoinRoom, createTracksAndAddToRoom, trackAudioListeners } from './utils/jitsiUtils';
import JitsiMeetJS from '@lyno/lib-jitsi-meet';

export default {
  name: 'App',
  data() {
    return {
      videoTracks: [],
      audioTracks: []
    }
  },
  methods: {
    // se añaden los tracks en un array de datos locales para poder manipularlos
    addTrack(track) {
      if (track.getType() === 'video') {
        this.videoTracks.push(track);
      } else if (track.getType() === 'audio') {
        this.audioTracks.push(track);
      }
      this.$nextTick().then(() => {
        track.attach(this.$refs[track.getId()][0]);
      })
    },
    addTrackListeners(track) {
    // añade event listeners de los eventos de audio
    // Este es solo un ejemplo, pero se deben añadir listeners a eventos de tracks locales y remotos
    // como de conexión de usuarios remotos para definir el comportamiento de la app cuando alguien en la sala haga una acción
    // Por ejemplo se deben añadir lísteners para conexiones de usuarios remotos para poder mostrarlos conectados en la pantalla personal
    // así como para poder apagarles el micrófono desde el administrador de la sala, etc
      if (track.getType() === 'audio') {
        trackAudioListeners(track)
      }
    },
    muteAudio() {
      // Funcionalidad para apagar micrófono 
      this.audioTracks.forEach(track => {
        if(!track.isMuted()) {
          track.mute()
        } else {
          track.unmute()
        }
      })
    },
    muteVideo() {
        // Funcionalidad para apagar cámara
      this.videoTracks.forEach(track => { 
        if(!track.isMuted()) {
          track.mute()
        } else {
          track.unmute()
        }
      })
    }
  },
  mounted() {
    connect().then(connection => { // crea la conexión y añade una sala de llamadas
      return createAndJoinRoom(connection, 'prueba-vue-meet-indie');
    })
    .then(room => { // añade los canales locales de audio y video
      room.on(JitsiMeetJS.events.conference.TRACK_ADDED, async track => {
        await this.addTrack(track)
        this.addTrackListeners(track)
      });
      createTracksAndAddToRoom(room);
    })
    .catch(error => console.error(error));
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>