<template>
  <div id="json-upload" class="upload">
    <label
      :for="'json-file-upload'+this.dataKey"
      :class="'btn btn-primary custom-file-upload left '+this.dataKey"
    >
      <i class="fa fa-cloud-upload"></i>Upload JSON {{this.dataKey}}
    </label>
    <input
      type="file"
      :id="'json-file-upload'+this.dataKey"
      value="Import"
      @change="onFileChange"
    /><br />
    <div class="frames">
        {{ this.$store.state.filename[this.dataKey] .toString() }}  
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  props: ['dataKey'],
  components: {},
  methods: {
    onFileChange: function onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      var reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(files[0]);
      this.$store.commit("SetCurrentFilename", {data:files[0].name, key:this.dataKey});
    },
    onReaderLoad: function (event) {
      var obj = JSON.parse(event.target.result);
      this.$store.commit("SetJSONData", {data:obj,key:this.dataKey});
    },
  },
};
</script>

<style>
.upload {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  /* width: 30%; */
  height: 50px;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.filename {
  margin: 10px 10px;
}

.red {
  background-color: #ed553b !important;
}
.green {
  background-color: #3caea3 !important;
}
.blue {
  background-color: #20639b !important;
}
.frames {
  float: left;
  margin-left: 20px;
  margin-top: -15px;
}
.btn-primary {
  width: 200px;
}
</style>
