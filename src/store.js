import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        currentJSONData: {
            red: null,
            blue: null,
            green: null
        },
        currentFrame: 0,
        isPlaying: false,
        filename: {
            red: "",
            blue: "",
            green: ""
        },
        dmxActive: false,
        addMinVal: true,
        slowMo: true,
        fps: 25
    },
    mutations: {
        SetJSONData(state, data) {
            console.log("SET DATA FOR ",data.key)
            state.currentJSONData[data.key] = data.data;
        },
        SetAnimationStatus(state, data) {
            state.isPlaying = data
        },
        SetCurrentFrame(state, data) {
            state.currentFrame = data
            //console.log("current frame in store ",data)
        },
        SetCurrentFilename(state, data) {
            state.filename[data.key] = data.data
        },
        SetDMXActive(state, data) {
            state.dmxActive = data
        },
        SetSlowMo(state, data) {
            state.slowMo = data
        }

    }
});