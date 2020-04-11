<template>
<div class="countdown">
    <div class="widget">
        <CountdownWidget
            :title="this.title" 
            :time="this.time" 
            :path="this.path"
            :horizontalAlign="this.horizontalAlign" 
            :verticalAlign="this.verticalAlign"
            :color="this.color"
            :size="this.size"
            :font="this.font" ></CountdownWidget>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import CountdownWidget from '../components/CountdownWidget.vue';

export default {
  name: "Countdown",
  components: {
      CountdownWidget
  },
  data() {
    return {
      title: "",
      time: null,
      path: "",
      horizontalAlign: "",
      verticalAlign: "",
      color: "",
      size: "",
      font: "",
      justCreated: false,
    }
  },
  created() {
    this.getCountdown();
    this.alertUser();
  },
  methods: {
    async getCountdown() {
      try {
        const response = await axios.get("/api/countdowns/" + this.$route.params.id);
        this.title = response.data.title;
        this.time = new Date(response.data.time);
        this.path = response.data.path;
        this.horizontalAlign = response.data.horizontalAlign;
        this.verticalAlign = response.data.verticalAlign;
        this.color = response.data.color;
        this.size = response.data.size;
        this.font = response.data.font;
        this.justCreated = response.data.justCreated;
      } catch (error) {
        //console.error(error);
      }
    },
    alertUser() {
      setTimeout(() => {
        if (this.justCreated) {
          alert(`Your countdown was just created! Be sure to copy the url and bookmark this page!`);
        }
      }, 3000);
    }
  }
};
</script>

<style scoped>
.widget {
    height: 100%;
    width: 100%;
}
</style>