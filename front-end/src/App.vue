<template>
  <div id="app">
    <div id="header">
      <router-link to="/">Home</router-link>
      <!-- Create header -->
    </div>

    <router-view />

    <div class="footer">
      <!-- Create footer -->
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

body {
  margin: 0;
}

#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: grid;
  grid-template-rows: max-content 1fr max-content
}

#header {
  padding: 30px;
}

#header a {
  font-weight: bold;
  color: #2c3e50;
}

#header a.router-link-exact-active {
  color: #42b983;
}
</style>
