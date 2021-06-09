<template>
  <div id="dmx-sender">
    <b-button
      variant="primary"
      class="mt-2 left"
      v-bind:class="{ btn_active: this.$store.state.dmxActive }"
      @click="toogleDMXActive()"
    >Send DMX</b-button>
  </div>
</template>

<script>
const http = require('http')
export default {
  name: "DMXSender",
  components: {},
  methods: {
    toogleDMXActive: function() {
      this.$store.commit("SetDMXActive", !this.$store.state.dmxActive);
    },
    sendDMXUpdate: function() {
      if (this.$store.state.dmxActive) {
        var state = this.$store.state;
        var frameIdx = state.currentFrame;

        if (state.currentJSONData['red'] && positions !== undefined) {
          var positions = state.currentJSONData['red'].positions[frameIdx];

          if (positions !== undefined) {
            positions.forEach(pos => {
              var path = pos + '/on';
              this.sendHttpRequest(path);
            });
          }
        }
      }      
    },
    sendHttpRequest: function(path) {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/' + path,
        method: 'GET'
      }
      var url = 'http://' + options.hostname + ':' + options.port + options.path
      console.log('Sending request', url);

      const req = http.request(options, res => {
        res.on('data', d => {
          process.stdout.write(d)
        })
      });

      req.on('error', error => {
        console.error(error)
      });

      req.end();
    }
  },
  mounted() {
    this.$store.watch(
      (state) => this.sendDMXUpdate()
    );
  },
};
</script>

<style>
#dmx-sender {
  margin-top: 30px;
  min-height: 32px;
  width:20%;
}
</style>