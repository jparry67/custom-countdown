<template>
  <div id="app">  
    <router-view />
    <div class="footer">
      <a href="https://github.com/jparry67/custom-countdown" target="_blank">GitHub Repo</a>
      <div>Created by Jacob Parry and Spencer Mitchell</div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Anton|Baloo+Paaji+2|Comic+Neue|Dancing+Script|Dosis|Girassol|Gotu|Indie+Flower|Lobster|Montserrat|Open+Sans+Condensed:300|Oswald|PT+Sans+Narrow|Playfair+Display&display=swap');

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
  grid-template-rows: 1fr max-content
}

.footer {
  background-color: #343434;
  color: #ececec;
  display: grid;
  place-items: center;
  padding: 20px;
  gap: 20px;
}

.footer a {
  color: #ececec;
}

.footer a:hover {
  color: #3f51b5;  
}
</style>
