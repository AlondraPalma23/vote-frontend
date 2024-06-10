<template>
    <div class="home-view">
        <div class="header">
            <h1>Bienvenido al Sistema de Votación Electrónica</h1>
        </div>
        <div class="content">
            <p>Estimado ciudadano,</p>
            <p>Te damos la bienvenida a nuestro sistema de votación en línea. Este portal te permite emitir tu voto de manera fácil y segura desde cualquier lugar.</p>
            <p>A continuación, encontrarás algunas instrucciones para comenzar:</p>
            <ul>
                <li>Asegúrate de colocar correctamente tu clave de elector.</li>
                <li>Verifica tu seccióna la que perteneces y tu entidad.</li>
                <li>Selecciona tu candidato preferido y emite tu voto.</li>
            </ul>
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
            <button @click="goToVoting">Ir a la sección de votación</button>
        </div>
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
    methods: {
        goToVoting() {
            this.$router.push('/Votar');
        }
    }
}
</script>

<style scoped>
.home-view {
    text-align: center;
    margin-top: 50px;
    font-family: 'Arial', sans-serif;
    color: #333;
}

.header {
    background-color: #0056b3;
    color: white;
    padding: 20px 0;
    margin-bottom: 20px;
}

.header h1 {
    margin: 0;
    font-size: 2.5em;
}

.content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: left;
}

ul {
    list-style-type: disc;
    padding-left: 40px;
}

li {
    margin: 10px 0;
    line-height: 1.6;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #0056b3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #003f7f;
}
</style>
