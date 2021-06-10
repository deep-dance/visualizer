<template>
  <div id="scene"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import LineFigure from "./LineFigure";
export default {
  name: "DanceScene",
  props: {
    msg: String,
  },
  data: function () {
    return {
      mouseX: 0,
      mouseY: 0,
      mouseDown: false,
      clock: null,
      delta: 0,
      interval: 1 / 25,
      linesFigRed: null,
      linesFigGreen: null,
      linesFigBlue: null,
    };
  },
  methods: {
    setMouseState: function (isDown) {
      this.mouseDown = isDown;
    },
    initScene: function () {
      this.clock = new THREE.Clock();

      //Scene Setup
      this.container = document.getElementById("scene");

      this.camera = new THREE.PerspectiveCamera(
        50,
        this.container.clientWidth / this.container.clientHeight,
        0.01,
        50
      );
      this.camera.position.set(0, 1, 3);
      this.scene = new THREE.Scene();

      const controls = new OrbitControls(this.camera, this.container);
      controls.target.set(0, 1, 0);
      controls.update();

      //FloorPlane
      const planeGeometry = new THREE.PlaneGeometry(60, 60, 32);
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        //side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(0, 0, 0);
      plane.rotation.x = -Math.PI / 2;
      plane.castShadow = true;
      plane.receiveShadow = true;
      this.scene.add(plane);

      //lights
      const pointLight = new THREE.PointLight(0xffffff, 3);
      pointLight.position.set(0, 6, 0);
      pointLight.castShadow = true;
      pointLight.shadow.mapSize.width = 2048; // default
      pointLight.shadow.mapSize.height = 2048; // default
      pointLight.shadow.camera.near = 1; // default
      pointLight.shadow.camera.far = 1000; // default
      this.scene.add(pointLight);

      //Fog
      var fogColor = new THREE.Color(0x333333);
      this.scene.fog = new THREE.Fog(fogColor, 5, 20);
      this.scene.background = fogColor;

      //Container for lines and points
      this.meshGroup = new THREE.Group();
      this.meshGroup.position.set(0, 0, 0);
      this.scene.add(this.meshGroup);

      /*this.pointMaterial = new THREE.MeshStandardMaterial({
        //side: THREE.DoubleSide,
        color: 0xd3d3d3,
      });*/
      this.pointGeometry = new THREE.SphereGeometry(0.005, 32);

      //Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      //this.renderer.setClearColor( 0x333333, 1);

      this.container.appendChild(this.renderer.domElement);
    },

    removeFigure: function () {
      if (this.meshGroup == undefined) {
        return;
      }

      //Remove Lines
      this.linesFigRed?.RemoveAllLines();
      this.linesFigGreen?.RemoveAllLines();
      this.linesFigBlue?.RemoveAllLines();
    },

    initFigure: function () {
      //0xb8d8d8

      var color = 0xbb7093;

      if (this.$store.state.isPublicMode) {
        switch (this.$route.params.figureIdx) {
          case "0":
            console.log("Color ", color);
            color = 0xbb7093;
            break;
          case "1":
            console.log("Color ", color);
            color = 0xd4a55e;
            break;
          case "2":
            console.log("Color ", color);
            color = 0x77c4ce;
            break;
          default:
            break;
        }
      }

      this.linesFigRed = new LineFigure(
        this.$store,
        color,
        {
          x: -2,
          y: 0,
          z: 2,
        },
        "red"
      );

      this.linesFigGreen = new LineFigure(
        this.$store,
        0xd4a55e,
        {
          x: -4,
          y: 0,
          z: 0,
        },
        "green"
      );

      this.linesFigBlue = new LineFigure(
        this.$store,
        0x77c4ce,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        "blue"
      );

      console.log("Init Figures ", this.linesFigRed);

      this.meshGroup.add(
        this.linesFigRed.GetGroup(),
        this.linesFigGreen.GetGroup(),
        this.linesFigBlue.GetGroup()
      );

      /*
      this.pointGroup = new THREE.Group();
      this.meshGroup.add(this.pointGroup);

      
      firstFrame.forEach((element) => {
        this.mesh = new THREE.Mesh(this.pointGeometry, this.pointMaterial);
        this.mesh.position.set(element[0], element[2], element[1]);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.pointGroup.add(this.mesh);
      });*/
      this.linesFigRed.CreateLines(0);
      this.linesFigGreen.CreateLines(0);
      this.linesFigBlue.CreateLines(0);
    },

    animate: function () {
      requestAnimationFrame(this.animate);
      if (!this.$store.state.isPlaying) {
        this.renderer.render(this.scene, this.camera);
        return;
      }
      var slowMo = this.$store.state.slowMo;
      var interval = 1 / (slowMo ? 25 : 50);

      this.delta += this.clock.getDelta();
      if (this.delta > interval) {
        // console.log("Set frame from scene ",this.$store.state.currentFrame + 1)
        this.$store.commit(
          "SetCurrentFrame",
          this.$store.state.currentFrame + 1
        );

        //Reset Animation on End
        if (
          this.$store.state.currentFrame >=
          Object.keys(this.$store.state.currentJSONData["red"].frames).length
        ) {
          this.$store.commit("SetAnimationStatus", false);
          this.$store.commit("SetCurrentFrame", 0);
          return;
        }

        //Update Figure Points
        /*this.pointGroup.children.forEach((child, idx) => {
          var pos = frame[idx];
          child.position.set(pos[0] * -1, pos[2], pos[1]);
        });*/

        this.removeFigure();

        if (
          this.linesFigRed != null &&
          this.linesFigGreen != null &&
          this.linesFigGreen != null
        ) {
          //Create new Lines
          this.linesFigRed.CreateLines(this.$store.state.currentFrame);
          this.linesFigGreen.CreateLines(this.$store.state.currentFrame);
          this.linesFigBlue.CreateLines(this.$store.state.currentFrame);
        }

        this.delta = this.delta % interval;
      }
      this.renderer.setClearColor(0x000011);
      this.renderer.render(this.scene, this.camera);
    },
    onDataChanged() {
      console.log("Update JSON Data");
      this.removeFigure();
      //this.$store.commit("SetCurrentFrame", 0);
      this.$store.commit("SetAnimationStatus", false);
      this.initFigure();
    },
  },
  mounted() {
    this.initScene();
    this.animate();

    this.$store.watch(
      (state) => state.currentJSONData["red"],
      (newValue, oldValue) => {
        this.onDataChanged();
      }
    );

    this.$store.watch(
      (state) => state.currentJSONData["green"],
      (newValue, oldValue) => {
        this.onDataChanged();
      }
    );

    this.$store.watch(
      (state) => state.currentJSONData["blue"],
      (newValue, oldValue) => {
        this.onDataChanged();
      }
    );
  },
};
</script>


<style>
#scene {
  position: relative;
  top: 0px;
  height: 100vh;
  width: 100%;
  margin: auto;
}
</style>
