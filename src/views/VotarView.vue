<template>
    <div class="wrapper" v-if="!ValidationVote">
        <form @submit.prevent="submitForm">
            <h4>PORTAL DE VOTACIÓN ELECTRÓNICA</h4>
            <div class="input-box">
                <input type="text" v-model="claveElector" placeholder="Clave de elector" required>
                <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
                <input type="text" v-model="seccion" placeholder="Sección" required>
                <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
                <select name="entidad" v-model="entidadSeleccionada">
                    <option value="" selected disabled>Entidad federativa</option>
                    <!-- Iterar sobre las entidades federativas obtenidas de la API -->
                    <option v-for="state in states" :key="state[0]" :value="state[0]">{{ state[1] }}</option>
                </select>
            </div>
            <button type="submit" class="btn">Entrar</button>
        </form>
    </div>
    <Votar v-else />
</template>

<script>
import Votar from '../components/Votar.vue';

export default {
    name: 'VotarView',
    components: {
        Votar
    },
    data() {
        return {
            ValidationVote: false,
            environmentVariable: process.env.VUE_APP_API_URL,
            states: [],  // Variable para almacenar las entidades federativas
            claveElector: '',
            seccion: '',
            entidadSeleccionada: '' // Variable para almacenar el ID de la entidad seleccionada
        }
    },
    mounted() {
        // Llamar a la función para obtener las entidades federativas
        this.fetchStates();
        console.log('Environment variable:', this.environmentVariable);
    },
    methods: {
        async submitForm() {
            try {
                const formData = {
                    claveElec: this.claveElector,
                    seccion: this.seccion,
                    entidad: this.entidadSeleccionada // Envía el ID de la entidad seleccionada
                };
                localStorage.setItem('claveElec', this.claveElector);
                localStorage.setItem('seccion', this.seccion);
                localStorage.setItem('entidad', this.entidadSeleccionada);
                
                const response = await fetch(`${this.environmentVariable}/check_voto`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (data.status === false) {
                    this.ValidationVote = true;
                }
                
                console.log(data.message);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
        async fetchStates() {
            try {
                const response = await fetch(`${this.environmentVariable}/estados`);
                const data = await response.json();
                // Asignar los datos de la respuesta al array de estados
                this.states = data.data;
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        }
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

.wrapper {
    width: 400px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    color: #fff;
    border-radius: 10px;
    padding: 30px 40px;
    margin: 0 auto; /* Add this line to center the wrapper */
    margin-top: 80px;
}

.wrapper h4 {
    font-size: 36px;
    text-align: center;
}

.input-box {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
}

.input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    border-radius: 40px;
    font-size: 16px;
    color: #fff;
    padding: 20px 45px 20px 20px;
}

.input-box input::placeholder {
    color: #fff;
}

.input-box i {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 20px;
}

.wrapper .btn {
    width: 100%;
    height: 45px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    font-size: 16px;
    color: #333;
    cursor: pointer;
    font-weight: 600;
}

</style>
