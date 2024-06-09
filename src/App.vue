<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}

body {
    min-height: 100vh;
    background-image: linear-gradient(135deg, transparent 0%, transparent 21%,rgba(131, 20, 209,0.4) 21%, rgba(131, 20, 209,0.4) 51%,transparent 51%, transparent 100%),linear-gradient(45deg, transparent 0%, transparent 16%,rgb(131, 20, 209) 16%, rgb(131, 20, 209) 21%,rgb(88, 22, 184) 21%, rgb(88, 22, 184) 64%,transparent 64%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255)); 
    background-size: cover;
    background-position: center;
}
</style>
