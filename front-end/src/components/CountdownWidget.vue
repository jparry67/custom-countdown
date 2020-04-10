<template>
  <div class="countdownwidget" v-bind:style="{ backgroundImage: 'url(' + this.path + ')' }">
    <div class="info" v-bind:style="getAlignment">
      <div class="title">{{ title }}</div>
      <div class="time" v-if="this.time">
        {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CountdownWidget",
  props: {
    title: String,
    time: Date,
    path: String,
    verticalAlign: String,
    horizontalAlign: String,
    size: Number,
    color: String,
  },
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  },
  created() {
    this.calculateTimeLeft();
  },
  computed: {
    getAlignment() {
      return {
        'justify-content': this.verticalAlign,
        'align-items': this.horizontalAlign,
        'color': this.color,
      }
    }
  },
  methods: {
    calculateTimeLeft() {
      const difference = this.time - new Date();
      if (difference < 0) {
        this.days = this.hours = this.minutes = this.seconds = 0;
      } else {
        this.days = Math.floor(difference / (1000 * 60 * 60 * 24)),
        this.hours = Math.floor((difference / (1000 * 60 * 60)) % 24),
        this.minutes = Math.floor((difference / (1000 * 60)) % 60),
        this.seconds = Math.floor((difference / 1000) % 60);
      }
      setTimeout(() => this.calculateTimeLeft(), 1000);
    },
  }
};
</script>

<style scoped>
.countdownwidget {
	background-size: cover;
  background-position: center;
  min-height: 100%;
  min-width: 100%;
  display: grid;
  place-items: center;
}

.info {
  height: 80%;
  width: 80%;
  display: flex;
  flex-direction: column;
  z-index: 10;
}
</style>