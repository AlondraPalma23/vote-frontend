<template>
    <div class="container">
        <h3>Elección Federal 2024</h3>
        <h1>Presidencia de los Estados Unidos Mexicanos</h1>
        <div class="rectangles">
            <div class="candidate">
                <img src="../assets/pri.png" alt="Partido 1">
                <h3>Bertha Xóchitl Gálvez Ruíz</h3>
                <p>"Xóchitl"</p>
            </div>
            <div class="candidate">
                <img src="../assets/pan.png" alt="Partido 2">
                <h3>Alejandro Moreno Cardenas</h3>
                <p>"Alito"</p>
            </div>
            <div class="candidate">
                <img src="../assets/morena.png" alt="Partido 3">
                <h3>Claudia Sheinbaum Pardo</h3>
            </div>
        </div>
        <div class="buttons">
            <button class="accept">Aceptar</button>
            <button class="cancel">Anular mi Voto</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Votar',
    data() {
        return {
            claveElector: localStorage.getItem('claveElec') || '',
            seccion: localStorage.getItem('seccion') || '',
            entidadSeleccionada: localStorage.getItem('entidad') || ''
        }
    },
    mounted() {
        console.log('Clave de elector:', this.claveElector);
        console.log('Sección:', this.seccion);
        console.log('Entidad seleccionada:', this.entidadSeleccionada);
        
    },
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-image: linear-gradient(66deg, rgba(37, 37, 37, 0.05) 0%, rgba(37, 37, 37, 0.05) 33.333%,rgba(89, 89, 89, 0.05) 33.333%, rgba(89, 89, 89, 0.05) 66.666%,rgba(234, 234, 234, 0.05) 66.666%, rgba(234, 234, 234, 0.05) 99.999%),linear-gradient(130deg, rgba(104, 104, 104, 0.05) 0%, rgba(104, 104, 104, 0.05) 33.333%,rgba(246, 246, 246, 0.05) 33.333%, rgba(246, 246, 246, 0.05) 66.666%,rgba(178, 178, 178, 0.05) 66.666%, rgba(178, 178, 178, 0.05) 99.999%),linear-gradient(72deg, rgba(168, 168, 168, 0.05) 0%, rgba(168, 168, 168, 0.05) 33.333%,rgba(73, 73, 73, 0.05) 33.333%, rgba(73, 73, 73, 0.05) 66.666%,rgba(253, 253, 253, 0.05) 66.666%, rgba(253, 253, 253, 0.05) 99.999%),linear-gradient(139deg, rgba(241, 241, 241, 0.05) 0%, rgba(241, 241, 241, 0.05) 33.333%,rgba(109, 109, 109, 0.05) 33.333%, rgba(109, 109, 109, 0.05) 66.666%,rgba(100, 100, 100, 0.05) 66.666%, rgba(100, 100, 100, 0.05) 99.999%),linear-gradient(111deg, rgba(65, 65, 65, 0.05) 0%, rgba(65, 65, 65, 0.05) 33.333%,rgba(223, 223, 223, 0.05) 33.333%, rgba(223, 223, 223, 0.05) 66.666%,rgba(50, 50, 50, 0.05) 66.666%, rgba(50, 50, 50, 0.05) 99.999%),linear-gradient(90deg, rgb(41, 89, 88),rgb(80, 210, 116));
    margin: 0;
    padding: 0;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    text-align: center;
}

.rectangles {
    display: flex;
    justify-content: space-around;
}

.candidate {
    width: 200px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.candidate:hover {
    cursor: pointer;
    background-color: #228B22;
    color: white;
}

.candidate img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    /* Ensures the image remains within the bounds without distortion */
    border-radius: 10px;
    margin-bottom: 10px;
}

.buttons {
    margin-top: 30px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin: 0 10px;
    cursor: pointer;
}

.accept {
    background-color: #228B22;
    color: #fff;
}

.cancel {
    background-color: #DC143C;
    color: #fff;
}
</style>