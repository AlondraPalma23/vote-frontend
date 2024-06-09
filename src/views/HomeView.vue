<template>
    <div class="home-view">
        <h1>Bienvenido a mi página de presentación</h1>
        <p>¡Hola! Soy [Tu nombre] y esta es mi página de presentación.</p>
        <p>Me encanta programar en Vue y estoy emocionado de compartir mis conocimientos contigo.</p>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data() {
        return {
            environmentVariable: process.env.VUE_APP_API_URL
        }
    },
    mounted() {
        console.log('Environment variable:', this.environmentVariable)
    },
}
</script>

<style scoped>
.home-view {
    text-align: center;
    margin-top: 50px;
}
</style>