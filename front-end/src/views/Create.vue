<template>
  <div class="create">
    <header id="header">
      <p>Countdown Creator</p>
      <nav>
        <i class="far fa-calendar-alt fa-2x" style="color:#FFFFFF;"></i>
      </nav>
    </header>
    <div class="form">
      <div class="section">
        <h2 class="label">Countdown Title</h2>
        <input class="input" v-model="title" placeholder="Title">
        <h2 class="label">Countdown Date</h2>
        <datetime type="datetime" v-model="time" :week-start="0" placeholder="Click to Select"
          input-style="font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            background-color: #eeeeee;
            border-radius: 8px;
            padding: 10px;
            width: 100%;" >
        </datetime>
        <h2 class="label file-label">Background Picture</h2>
        <input class="input custom-file-input" type="file" name="photo" @change="fileChanged">
      </div>
      <div class="text-section">
        <h1 class="label">Text Options</h1>
        <div class="section text-section-grid">
          <h2 class="label">Vertical Alignment</h2>
          <select class="input input-text" v-model="verticalAlign">
            <option value="flex-start">Top</option>
            <option value="center">Middle</option>
            <option value="flex-end">Bottom</option>
          </select>
          <h2 class="label">Horizontal Alignment</h2>
          <select class="input input-text" v-model="horizontalAlign">
            <option value="flex-start">Left</option>
            <option value="center">Center</option>
            <option value="flex-end">Right</option>
          </select>
          <h2 class="label">Color</h2>
          <div class="color-input">
            <div class="color-btn white" :class="{ 'color-selected': this.color.hex === '#FFFFFF' }" @click="updateColor('#FFFFFF')"></div>
            <slider-picker v-model="color" />
            <div class="color-btn black" :class="{ 'color-selected': this.color.hex === '#000000' }" @click="updateColor('#000000')"></div>
          </div>
          <h2 class="label">Size</h2>
          <select class="input input-text" v-model="size">
            <option value="16px">Small</option>
            <option value="20px">Medium</option>
            <option value="28px">Large</option>
          </select>
          <h2 class="label">Font</h2>
          <select class="input input-text" v-model="font">
            <option v-for="font in fonts" :key="font.name" :style="'font-family: ' + font.style" :value="font.style">{{font.name}}</option>
          </select>
        </div>
      </div>
      <button class="upload-btn" @click="createCountdown">Create Countdown</button>
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
            :color="this.color.hex"
            :size="this.size"
            :font="this.font" />
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
            :color="this.color.hex"
            :size="this.size"
            :font="this.font" />
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
      color: { hex: '#194d33' },
      size: "16px",
      font: "",
      error: null,
      fonts: [
        {
          name: "Anton",
          style: "'Anton', sans-serif"
        },
        {
          name: "Baloo Paaji 2",
          style: "'Baloo Paaji 2', cursive"
        },
        {
          name: "Comic Neue",
          style: "'Comic Neue', cursive"
        },
        {
          name: "Dancing Script",
          style: "'Dancing Script', cursive"
        },
        {
          name: "Dosis",
          style: "'Dosis', sans-serif"
        },
        {
          name: "Girassol",
          style: "'Girassol', cursive"
        },
        {
          name: "Gotu",
          style: "'Gotu', sans-serif"
        },
        {
          name: "Indie Flower",
          style: "'Indie Flower', cursive"
        },
        {
          name: "Lobster",
          style: "'Lobster', cursive"
        },
        {
          name: "Montserrat",
          style: "'Montserrat', sans-serif"
        },
        {
          name: "Open Sans Condensed",
          style: "'Open Sans Condensed', sans-serif"
        },
        {
          name: "Oswald",
          style: "'Oswald', sans-serif"
        },
        {
          name: "PT Sans Narrow",
          style: "'PT Sans Narrow', sans-serif"
        },
        {
          name: "Playfair Display",
          style: "'Playfair Display', serif"
        },
      ]
    }
  },
  computed: {
    getTime() {
      return this.time ? new Date(this.time) : null;
    },
    isValid() {
      return this.title && this.getTime && this.filePath;
    },

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
    updateColor(color) {
      this.color = { hex: color };
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
          size: (this.size.substring(0,2)*3) + "px",
          font: this.font
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
#header {
  /* Semi-circle */
  margin: 0 0 0 0;
  height: 85px;
  width: 300px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  /* Fixed position */
  position: relative;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #3f51b5;
  text-align: center;
  box-shadow: 0 0 0 5px #FFF;
}

nav {
  display: flex;
  justify-content: center;
}

#header p {
  margin-top: 0px;
  margin-bottom: 6px;
  padding-top: 8px;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

.create {
  background-color: #b0c4de;
  padding-bottom: 60px;
}

.form {
  width: 45%;
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

.text-section-grid {
  place-items: center;
}

.text-section {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 16px 16px;
  padding-top: 0px;
  margin: 30px 0px;
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

.input-text {
  width: 80%;
}

.color-input {
  display: flex;
  align-items: flex-end;  
}

.color-btn {
  height: 10px;
  width: 45px;
  margin: 0 1px;
}

.white {
  background-color: white;
  border: grey 1px solid;
}

.black {
  background-color: black;
  border: black 1px solid;
}

.color-selected {
  margin-bottom: -5px;
  height: 20px;
  border-radius: 3px;
}

.vc-slider {
  width: 250px;
}

button {
  border-radius: 10px;
  border: 1px solid #3f51b5;
  background: linear-gradient(to bottom, #3f51b5, #3849a2);
  margin: 10px 0px;
  padding: 8px 8px;
  width: 75%;
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