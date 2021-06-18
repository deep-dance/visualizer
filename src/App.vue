<template>
  <div id="app">
    <DanceScene />
    <ControlBar v-if="this.$store.state.isPublicMode" />
    <div class="content" v-if="!this.$store.state.isPublicMode">
      <ControlBar />
      <Upload dataKey="red" v-if="!this.$store.state.isPublicMode" />
      <Upload dataKey="green" v-if="!this.$store.state.isPublicMode" />
      <Upload dataKey="blue" v-if="!this.$store.state.isPublicMode" />
      <!-- <DMXSender /> -->
      <!-- <LEDSim /> -->
      <!-- <b-button
      variant="primary"
      class="mt-2 left"
      v-bind:class="{ btn_active: this.$store.state.slowMo }"
      @click="toogleSlowMo()"
      >Activate SlowMo</b-button> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import DanceScene from "./components/DanceScene.vue";
import ControlBar from "./components/ControlBar";
import Upload from "./components/Upload";

export default {
  name: "App",
  components: {
    DanceScene,
    ControlBar,
    // LEDSim,
    Upload,
    // DMXSender
  },
  methods: {
    publicPath: function() {
      var publicPath = process.env.NODE_ENV === 'production'
        ? '/deep-dance-visualizer/'
        : '/';
      return publicPath;
    },
    toogleSlowMo: function () {
      this.$store.commit("SetSlowMo", !this.$store.state.slowMo);
    },
    loadJSON: function(figure, key) {
      axios.get(this.publicPath() + 'deepdance_170421_' + figure + '_0_15001.json').then(response => {
        this.$store.commit("SetJSONData", { data: response.data, key: key });
      });
    },
    initSlice: function(figure, key) {
      var id = 'deepdance_170421_' + figure;
      axios.get(this.publicPath() + id + '/' + id + '_0.json').then(response => {
        this.$store.commit("SetJSONData", { data: response.data, key: key });
      });
    },
    loadSlice: function(figure, key, seq) {
      var id = 'deepdance_170421_' + figure;
      axios.get(this.publicPath() + id + '/' + id + '_' + seq + '.json').then(response => {
        this.$store.commit("UpdateNextBuffer", { data: response.data, key: key });
      });
    },
    onCurrentFrame: function(oldFrame, newFrame) {
      var bufferIdx = newFrame % this.$store.getters.bufferSize;
      console.log("Frame in buffer:", bufferIdx);
      console.log("Buffer size:", this.$store.getters.bufferSize);
      console.log("Slice:", this.$store.state.currentSlice);

      if (bufferIdx == 1) {
        // load next buffer
        this.loadSlice('red', 'red', this.$store.state.currentSlice + 1);
      }
      if (bufferIdx == this.$store.getters.bufferSize - 1) {
        // switch buffer
        var nextBuffer = {
          red: this.$store.state.nextBuffer['red'],
          blue: this.$store.state.nextBuffer['blue'],
          green: this.$store.state.nextBuffer['green'],
        }
        this.$store.commit("UpdateCurrentBuffer", nextBuffer);
        var nextSlice = this.$store.state.currentSlice + 1;
        this.$store.commit("SetCurrentSlice", nextSlice);
      }
    },
    togglePlay(event) {
      if (event.code == "Space") {
        this.$store.commit("SetAnimationStatus", !this.$store.state.isPlaying);
      } 
    },
  },
  mounted() {
    if (this.$store.state.isPublicMode) {
      console.log(this.$route.params);
      switch (this.$route.params.figureIdx) {
        case "0":
          if (this.$store.state.isBufferedMode)
            this.initSlice('red', 'red');
          else
            this.loadJSON('red', 'red');
          break;
        case "1":
          if (this.$store.state.isBufferedMode)
            this.initSlice('blue', 'red');
          else
            this.loadJSON('blue', 'red');
          break;
        case "2":
          if (this.$store.state.isBufferedMode)
            this.initSlice('green', 'red');
          else
            this.loadJSON('gree', 'red');
          break;
        case "3":
          if (this.$store.state.isBufferedMode) {
            this.initSlice('red', 'red');
            this.initSlice('blue', 'blue');
            this.initSlice('green', 'green');
          } else {
            this.loadJSON('red', 'red');
            this.loadJSON('blue', 'blue');
            this.loadJSON('green', 'green');
          }
          
          break;
        default:
          if (this.$store.state.isBufferedMode)
            this.initSlice('red', 'red');
          else
            this.loadJSON('red', 'red');
          break;
      }
    }

    this.$store.watch(
      (state) => state.currentFrame,
      (newFrame, oldFrame) => {
        this.onCurrentFrame(oldFrame, newFrame);
      }
    );
  },    
  created() {
    window.addEventListener('keypress', this.togglePlay);
  },
  destroyed() {
    window.removeEventListener('keypress', this.togglePlay);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-bottom: 300px; */
}
.left {
  float: left;
}
.content {
  width: 85%;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  /* height: 80px; */
  min-height: 40px;
}
.v-spacer-large {
  /* height: 80px; */
}
.btn_active,
.not-collapsed {
  background-color: lightsalmon !important;
}
</style>
