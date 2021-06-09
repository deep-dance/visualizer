<template>
  <div id="app">
    <div class="content">
    <div class="v-spacer-large"></div>
    <h1>deep.dance | visualizer</h1>
    </div>
    <DanceScene />
    <div class="content">
      <ControlBar />
      <Upload dataKey='red'/>
      <Upload dataKey='green'/>
      <Upload dataKey='blue'/>
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
// import DMXSender from "./components/DMXSender";
// import LEDSim from "./components/LEDSim";

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
  margin-bottom: 300px;
}
.left {
  float: left;
}
.content {
  width: 85%;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0px 0px 15px black;
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
