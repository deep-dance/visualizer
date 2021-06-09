<template>
  <div id="app">
    <DanceScene />
    <ControlBar v-if="this.$store.state.isPublicMode"/>
    <div class="content" v-if="!this.$store.state.isPublicMode">
      <ControlBar />
      <Upload dataKey='red' v-if="!this.$store.state.isPublicMode"/>
      <Upload dataKey='green' v-if="!this.$store.state.isPublicMode"/>
      <Upload dataKey='blue' v-if="!this.$store.state.isPublicMode"/>
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
import DanceScene from "./components/DanceScene.vue";
import ControlBar from "./components/ControlBar";
import Upload from "./components/Upload";

import json_red from './deepdance_170421_red.json'
// import json_blue from './deepdance_170421_blue.json'
// import json_green from './deepdance_170421_green.json'

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
    toogleSlowMo: function() {
      this.$store.commit("SetSlowMo", !this.$store.state.slowMo);
    },
  },
  mounted() {
    if (this.$store.state.isPublicMode) {
      this.$store.commit("SetJSONData", {data:json_red, key:"red"});
      // this.$store.commit("SetJSONData", {data:json_blue, key:"blue"});
      // this.$store.commit("SetJSONData", {data:json_green, key:"green"});
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
.btn_active, .not-collapsed {
  background-color: lightsalmon !important;
}
</style>
