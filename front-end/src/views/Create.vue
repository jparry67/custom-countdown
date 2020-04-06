<template>
  <div class="home">
    <input v-model="title">
    <datetime v-model="date"></datetime>
    <input type="file" name="photo" @change="fileChanged">
    <button @click="upload">Submit</button>
    <!-- Form -->
    <!-- After submission, either redirect to new page or create dialog with a link -->
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import axios from "axios";

export default {
  name: "Create",
  components: {
    datetime: Datetime,
  },
  data() {
    return {
      title: "",
      time: "",
      date: "",
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        const r1 = await axios.post("/api/photos", formData);
        const r2 = await axios.post("/api/countdowns", {
          title: this.title,
          time: this.time,
          path: r1.data.path
        });
        console.log(r2.data);
        const id = r2.data._id;
        window.location.replace("http://localhost:8080/countdown/" + id);
      } catch(error) {
        console.error(error);
      }
    },
  }
};
</script>
