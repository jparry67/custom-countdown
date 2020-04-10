<template>
  <div class="create">
    <div class="form">
      <div class="section title-section">
        <h2 class="label title-label">Countdown Title</h2>
        <input class="input" v-model="title" placeholder="Title">
        <h2 class="label date-label">Countdown Date</h2>
        <datetime type="datetime" v-model="time"
          input-style="font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            background-color: #eeeeee;
            border-radius: 8px;
            padding: 10px;
            width: 100%;" 
          placeholder="Click to Select">
        </datetime>
        <h2 class="label file-label">Background Picture</h2>
        <input class="input custom-file-input" type="file" name="photo" @change="fileChanged">
        <h2 class="label">Vertical Alignment</h2>
        <select class="input" v-model="verticalAlign">
          <option value="flex-start">Top</option>
          <option value="center">Middle</option>
          <option value="flex-end">Bottom</option>
        </select>
        <h2 class="label">Horizontal Alignment</h2>
        <select class="input" v-model="horizontalAlign">
          <option value="flex-start">Left</option>
          <option value="center">Center</option>
          <option value="flex-end">Right</option>
        </select>
        <h2 class="label">Select Text Color</h2>
        <slider-picker v-model="color" />
        <button class="upload-btn" @click="createCountdown">Create Countdown</button>
        <!-- Preview/customizable font family/color/location (alignment i.e. center, left, etc.) of title 
        Create new preview component that all views use. This component will allow us to change how the countdown works-->
      </div>
      <div class="error" v-if="this.error">{{this.error}}</div>
    </div>
    <h2>Preview</h2>
    <div class="preview">
      <div class="mobile-container">
        <h4>Mobile</h4>
        <div class="mobile">
          <CountdownWidget :title="this.title" 
            :time="this.getTime" 
            :path="this.filePath" 
            :verticalAlign="this.verticalAlign" 
            :horizontalAlign="this.horizontalAlign" 
            :color="this.color.hex"/>
        </div>
      </div>
      <div class="desktop-container">
        <h4>Desktop</h4>
        <div class="desktop">
          <CountdownWidget :title="this.title" 
            :time="this.getTime" 
            :path="this.filePath" 
            :verticalAlign="this.verticalAlign" 
            :horizontalAlign="this.horizontalAlign" 
            :color="this.color.hex"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import axios from "axios";
import Slider from 'vue-color/src/components/Slider.vue';
import CountdownWidget from "../components/CountdownWidget.vue";

export default {
  name: "Create",
  components: {
    CountdownWidget,
    datetime: Datetime,
    'slider-picker': Slider,
  },
  data() {
    return {
      title: "",
      time: null,
      filePath: "",
      verticalAlign: "center",
      horizontalAlign: "center",
      error: null,
      color: { hex: '#194d33' },
    }
  },
  computed: {
    getTime() {
      return this.time ? new Date(this.time) : null;
    },
    isValid() {
      return this.title && this.getTime && this.filePath;
    }
  },
  methods: {
    async fileChanged(event) {
      try {
        this.file = event.target.files[0];
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        const response = await axios.post("/api/photos", formData);
        this.filePath = response.data.path;
      } catch(error) {
        //console.error(error)
      }
    },
    async createCountdown() {
      if (this.isValid) {
        this.error = null;
        await this.upload();
      } else {
        this.error = "Invalid field. Make sure all fields are filled.";
      }
    },
    async upload() {
      try {
        const response = await axios.post("/api/countdowns", {
          title: this.title,
          time: this.getTime.getTime(),
          path: this.filePath,
          verticalAlign: this.verticalAlign,
          horizontalAlign: this.horizontalAlign,
          color: this.color.hex,
        });
        const id = response.data._id;
        window.location.replace("http://localhost:8080/countdown/" + id);
      } catch(error) {
        //console.error(error);
      }
    },
  }
};
</script>

<style scoped>
.create {
  background-color: #b0c4de;
  padding: 20px 0px;
}

.form {
  width: 40%;
  margin: 30px auto;
  padding: 20px 0px;
  background-color: #f9f9f9;
  border-radius: 20px;
  display: grid;
  place-items: center;
}

.section {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 20px;
  align-items: center;
}

.label {
  font-size: 24px;
  color: #565656;
}

.input {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  background-color: #eeeeee;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
}

.button-section {
  flex-direction: column;
}

button {
  border-radius: 10px;
  border: 1px solid #3f51b5;
  background: linear-gradient(to bottom, #3f51b5, #3849a2);
  margin: 10px 0px;
  padding: 8px 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 30px;
  color: #FFFFFF;
  grid-column: 1 / -1;
  box-shadow: 0px 0px 15px 3px rgba(0,0,0,.5);
}

.error {
  color: red;
  font-weight: bold; 
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'Select file';
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 5px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 600;
  font-size: 16px;
}
.custom-file-input:hover::before {
  border-color: #3f51b5;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

.preview {
  margin: 0 25%;
  display: flex;
  justify-content: space-evenly;
}

.mobile {
  border: 2px black solid;
  border-radius: 5px;
  background-color: white;
  height: 300px;
  width: 175px;
}

.desktop {
  border: 2px black solid;
  border-radius: 5px;
  background-color: white;
  height: 300px;
  width: 475px;
}
</style>