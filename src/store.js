import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        currentBuffer: {
            red: null,
            blue: null,
            green: null
        },
        nextBuffer: {
            red: null,
            blue: null,
            green: null
        },
        bufferLoaded: {
            red: false,
            blue: false,
            green: false,
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
        fps: 25,
        slices: 240,
        currentSlice: 0,
        isPublicMode: true,
        isBufferedMode: false, 
    },
    getters: {
        canPlay: (state) => {
            return state.currentBuffer['red'] != null;
        },
        bufferLoaded: (state) => (key) => {
            return state.currentBuffer[key] != null;
        },
        frameLoaded: (state) => (key, idx) => {
            var bufferSize = Object.keys(state.currentBuffer["red"].frames).length;
            if (state.isBufferedMode) {
                return state.currentBuffer[key] != null &&
                    state.currentBuffer[key].frames[idx % bufferSize];
            }
            if (state.currentBuffer[key] == null ||
                state.currentBuffer[key].frames[idx] == null)
                return false;
            return true;        
        },
        bufferedFrame: (state) => (key, idx) => {
            if (state.isBufferedMode) {
                var bufferSize = Object.keys(state.currentBuffer["red"].frames).length;
                return state.currentBuffer[key].frames[idx % bufferSize];
            }
            return state.currentBuffer[key].frames[idx];
        },
        bufferedBones: (state) => (key) => {
            return state.currentBuffer[key].bones;
        },
        bufferSize: (state) => {
            return Object.keys(state.currentBuffer["red"].frames).length;
        },
        maxFrames: (state) => {
            var bufferSize = Object.keys(state.currentBuffer["red"].frames).length;
            if (state.isBufferedMode)
                return bufferSize * 240;
            return bufferSize;
        }
    },
    mutations: {
        SetJSONData(state, data) {
            console.log("SetJSONData", data.key)
            state.currentBuffer[data.key] = data.data;
            state.bufferLoaded[data.key] = true;
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
        },
        SetReady(state, data) {
            state.ready = data;
        },
        SetCurrentSlice(state, data) {
            state.currentSlice = data;
        },
        UpdateCurrentBuffer(state, data) {
            console.log("UpdateCurrentBuffer", data)
            state.currentBuffer[data.key] = data.data;
        },
        UpdateNextBuffer(state, data) {
            console.log("UpdateNextBuffer", data)
            state.nextBuffer[data.key] = data.data;
        }
    }
});