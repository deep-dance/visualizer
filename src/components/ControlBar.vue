<template>
  <div id="playhead" v-if="this.$store.getters.canPlay">
    <div
      v-if="this.$store.getters.canPlay"
      id="controlBar"
    >
      <PlayIcon
        v-if="!this.$store.state.isPlaying"
        @click="StartAnimation()"
        class="icon"
      />
      <PauseIcon
        v-if="this.$store.state.isPlaying"
        @click="PauseAnimation()"
        class="icon"
      />
      <ProgressBar />

      <div class="minutes-control">
        <div class="minutes">
          {{ this.convertFrameToTime(this.$store.state.currentFrame) }}
          /
          {{ this.convertFrameToTime(this.$store.getters.maxFrames) 
          }}
          <span v-if="!this.$store.state.isPublicMode">
            ({{ this.$store.state.currentFrame }}
              /
            {{
              this.$store.getters.maxFrames
            }})
          </span>
          
        </div>
        <span v-if="!this.$store.state.isPublicMode">
          Jump to
        </span>
        <input
          @change="SetTime"
          value=""
          type="text"
          ref="timeInput"
          placeholder="mm:ss"
          v-if="!this.$store.state.isPublicMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlayIcon from "../icons/Play.svg";
import PauseIcon from "../icons/Pause.svg";
import ProgressBar from "./ProgressBar";

export default {
  name: "App",
  components: {
    PlayIcon,
    PauseIcon,
    ProgressBar,
  },
  data: function () {
    return {
      frameIdx: 0,
    };
  },

  methods: {
    alertInvalid() {
      alert("Please use a valid timestamp, e.g 13:12.");
      this.$refs.timeInput.value = ""
    },
    alertOutOfRange() {
      alert("Timestamp is after end of sequence.");
      this.$refs.timeInput.value = ""
    },
    SetTime() {
      var time = this.$refs.timeInput.value;
      var re = new RegExp('[0-9][0-9]*:([0-9][0-9]){1}');
      if (!re.test(time)) {
        this.alertInvalid();
      } else {
        var components = time.split(":");
        var minutes = parseInt(components[0]);
        var seconds = parseInt(components[1]);
        if (minutes < 0 || (seconds < 0 || seconds > 59)) {
          this.alertInvalid();
        }
        else {
          var timestamp = (minutes * 60) + seconds;
          var frame = timestamp * this.$store.state.fps;
          if (frame > this.$store.getters.maxFrames) {
            this.alertOutOfRange();
          } else {
            this.$store.commit("SetCurrentFrame", frame);

            var slice = 0;
            alert("Slice implementation missing.");
            this.$store.commit("SetCurrentSlice", this.$store.state.currentSlice + 1);
          }
        }
        
      }
    },
    StartAnimation() {
      this.$store.commit("SetAnimationStatus", true);
    },
    PauseAnimation() {
      this.$store.commit("SetAnimationStatus", false);
    },
    mapSeconds(value, inMin, inMax, outMin, outMax) {
      return (value - inMin) * (outMax - outMin) / 
        (inMax - inMin) + outMin;
    },
    convertFrameToTime(frame) {
      var value = Math.round(
        (frame / this.$store.state.fps / 60) *
          100
      ) / 100;
      var minutes = Math.floor(value);
      var seconds = Math.ceil(this.mapSeconds(value % 1, 0.0, 0.99999, 0, 59));
      return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    },
    convertTimeToFrame(minutes, seconds) {
      return 0;
    }
  },
  mounted() {},
};
</script>

<style scoped>
#playhead {
  height: 50px;
  position: absolute;
  top: 85vh;
  left: 20%;
  width: 60%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #d5d5d5;
}
@media (max-width: 1200px) {
  #playhead {
    width: 70%;
    left: 15%;
  }
}
@media (max-width: 1000px) {
  #playhead {
    width: 80%;
    left: 10%;
  }
}
@media (max-width: 760px) {
  #playhead {
    width: 90%;
    left: 5%;
  }
}
#controlBar {
  min-height: 50px;
  height: 50px;
}
.icon {
  width: 30px;
  height: 30px;
  margin: 10px;
  display: inline-block;
  vertical-align: middle;
}

.frames {
  height: 30px;
  margin-right: 3px;
  margin-top: -15px;
}
.filename {
  margin: 10px 10px;
}
.minutes-control {
  display: inline-block;
  vertical-align: middle;
}
.minutes {
  display: inline;
  width: 150px;
  margin-left: 10px;
  margin-right: 20px
}
input {
  width: 65px;
}
</style>
