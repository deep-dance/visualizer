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
    toogleSlowMo: function () {
      this.$store.commit("SetSlowMo", !this.$store.state.slowMo);
    },
    loadJSON: function(figure, key) {
      var publicPath = process.env.NODE_ENV === 'production'
        ? '/deep-dance-visualizer/'
        : '/';
      axios.get(publicPath + 'deepdance_170421_' + figure + '_0_15001.json').then(response => {
        this.$store.commit("SetJSONData", { data: response.data, key: key });
      });
    }
  },
  mounted() {
    if (this.$store.state.isPublicMode) {
      console.log(this.$route.params);
      switch (this.$route.params.figureIdx) {
        case "0":
          this.loadJSON('red', 'red');
          break;
        case "1":
          this.loadJSON('blue', 'red');
          break;
        case "2":
          this.loadJSON('green', 'red');
          break;
        case "3":
          this.loadJSON('red', 'red');
          this.loadJSON('blue', 'blue');
          this.loadJSON('green', 'green');
          break;
        default:
          this.loadJSON('red', 'red');
          break;
      }
    }
  },
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
