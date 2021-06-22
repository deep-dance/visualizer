<template>
  <div id="progressbar-outer" ref="progressbar" @click=SetFrame>
    <div
      class="progressbar-inner"
      :style="{ width: progressWidth + 'px' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  components: {},
  computed: {
    progressWidth: function () {
      var currentFrame = this.$store.state.currentFrame;
      return (500 * currentFrame) / this.$store.getters.maxFrames;
    },
  },

  methods: {
    SetFrame(event) {
        var x = event.clientX - this.$refs.progressbar.getBoundingClientRect().left
        var frame = Math.round((this.$store.getters.maxFrames * x) / 500);
        console.log("Progress: ", frame);
        this.$store.commit("SetCurrentFrame", frame);
    },
  },
  mounted() {

  },
};
</script>

<style>
#progressbar-outer {
    vertical-align: middle;
  width: 500px;
  height: 10px;

  width: 500px;
  background-color: #d5d5d5;
  display: inline-block;
}
.progressbar-inner {
  height: 10px;
  background-color: rgb(0, 0, 0);
}
@media (max-width: 760px) {
  #progressbar-outer, .progressbar-inne {
    display: none;
  }
}
</style>
