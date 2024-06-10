<template>
    <div class="container">
        <h3>Elección Federal 2024</h3>
        <h1>Presidencia de los Estados Unidos Mexicanos</h1>
        <div class="rectangles">
            <Button v-for="candidate in candidates" :key="candidate.Id_CandPre"
                :class="['candidate', { selected: selectedCandidate === candidate.Id_CandPre }]"
                @click="selectCandidate(candidate.Id_CandPre)">
                <img :src="'data:image/jpeg;base64,' + candidate.imagenPart" alt="Imagen del candidato">
                <h3>{{ candidate.nombreComp }}</h3>
                <p>{{ candidate.descripcion }}</p>
                <p>{{ candidate.partido }}</p>
            </Button>
        </div>
        <div class="buttons">
            <button class="accept" @click="acceptSelection">Aceptar</button>
            <button class="cancel" @click="deselectCandidate">Anular mi Voto</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Votar',
    data() {
        return {
            URL: process.env.VUE_APP_API_URL + '/candidatos',
            votarURL: process.env.VUE_APP_API_URL + '/votar',
            claveElector: localStorage.getItem('claveElec') || '',
            seccion: localStorage.getItem('seccion') || '',
            entidadSeleccionada: localStorage.getItem('entidad') || '',
            candidates: [],
            selectedCandidate: null
        }
    },
    mounted() {
        console.log('Clave de elector:', this.claveElector);
        console.log('Sección:', this.seccion);
        console.log('Entidad seleccionada:', this.entidadSeleccionada);

        // Fetch candidates from the API
        this.fetchCandidates();
    },
    methods: {
        async fetchCandidates() {
            try {
                const response = await fetch(this.URL);
                const data = await response.json();
                if (data.status) {
                    this.candidates = data.data;
                } else {
                    console.error('Error fetching candidates:', data.message);
                }
            } catch (error) {
                console.error('API error:', error);
            }
        },
        selectCandidate(id) {
            this.selectedCandidate = id;
        },
        deselectCandidate() {
            this.selectedCandidate = null;
        },
        async acceptSelection() {
            if (this.selectedCandidate !== null) {
                const voto = {
                    claveElec: this.claveElector,
                    id_estado: this.entidadSeleccionada,
                    seccion: this.seccion,
                    id_candPre: this.selectedCandidate
                };

                // Confirmar la selección antes de votar
                if (!confirm('¿Estás seguro de que quieres votar por este candidato?')) {
                    return;
                }

                try {
                    const response = await fetch(this.votarURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(voto)
                    });
                    const data = await response.json();
                    if (data.status) {
                        alert('Voto registrado con éxito.');
                        // Redirigir a /Resultados
                        window.location.href = '/Resultados';
                    } else {
                        console.error('Error al registrar el voto:', data.message);
                        alert('Error al registrar el voto.');
                    }
                } catch (error) {
                    console.error('Error al conectar con la API:', error);
                    alert('Error al conectar con la API.');
                }
            } else {
                alert('No ha seleccionado ningún candidato.');
            }
        }
    }
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-image: linear-gradient(66deg, rgba(37, 37, 37, 0.05) 0%, rgba(37, 37, 37, 0.05) 33.333%, rgba(89, 89, 89, 0.05) 33.333%, rgba(89, 89, 89, 0.05) 66.666%, rgba(234, 234, 234, 0.05) 66.666%, rgba(234, 234, 234, 0.05) 99.999%), linear-gradient(130deg, rgba(104, 104, 104, 0.05) 0%, rgba(104, 104, 104, 0.05) 33.333%, rgba(246, 246, 246, 0.05) 33.333%, rgba(246, 246, 246, 0.05) 66.666%, rgba(178, 178, 178, 0.05) 66.666%, rgba(178, 178, 178, 0.05) 99.999%), linear-gradient(72deg, rgba(168, 168, 168, 0.05) 0%, rgba(168, 168, 168, 0.05) 33.333%, rgba(73, 73, 73, 0.05) 33.333%, rgba(73, 73, 73, 0.05) 66.666%, rgba(253, 253, 253, 0.05) 66.666%, rgba(253, 253, 253, 0.05) 99.999%), linear-gradient(139deg, rgba(241, 241, 241, 0.05) 0%, rgba(241, 241, 241, 0.05) 33.333%, rgba(109, 109, 109, 0.05) 33.333%, rgba(109, 109, 109, 0.05) 66.666%, rgba(100, 100, 100, 0.05) 66.666%, rgba(100, 100, 100, 0.05) 99.999%), linear-gradient(111deg, rgba(65, 65, 65, 0.05) 0%, rgba(65, 65, 65, 0.05) 33.333%, rgba(223, 223, 223, 0.05) 33.333%, rgba(223, 223, 223, 0.05) 66.666%, rgba(50, 50, 50, 0.05) 66.666%, rgba(50, 50, 50, 0.05) 99.999%), linear-gradient(90deg, rgb(41, 89, 88), rgb(80, 210, 116));
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
    cursor: pointer;
}

.candidate img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
}

.candidate.selected {
    background-color: #228B22;
    color: white;
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