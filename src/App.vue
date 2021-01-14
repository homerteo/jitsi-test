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
      if (track.getType() === 'audio') {
        trackAudioListeners(track)
      }
    },
    muteAudio() {
      this.audioTracks.forEach(track => {
        if(!track.isMuted()) {
          track.mute()
        } else {
          track.unmute()
        }
      })
    },
    muteVideo() {
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
    connect().then(connection => {
      return createAndJoinRoom(connection, 'prueba-vue-meet-indie');
    })
    .then(room => {
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