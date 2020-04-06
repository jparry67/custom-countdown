<template>
  <div class="countdown">
    <img :src="this.path"/>
    <div class="title">{{ title }}</div>
    <div class="time">{{ time }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Countdown",
  data() {
    return {
      title,
      time,
      path,
      days,
      hours,
      minutes,
      seconds,
    }
  },
  created() {
    this.getCountdown();
  },
  methods: {
    async getCountdown() {
      try {
        const response = await axios.get("/api/countdowns/" + this.$route.params.id);
        this.title = response.data.title;
        this.time = new Date(response.data.time);
        this.path = response.data.path;
      } catch (error) {
        console.error(error);
      }
    },
    calculateTimeLeft() {

      // this will rerun every second
      // setTimeout(() => calculateTimeLeft(), 1000);
    }
  }
};
</script>

<style scoped>
</style>