<template>
  <div class="wrapper" v-if="login">
    <form @submit.prevent="submitForm">
      <h4>PORTAL DE FUNCIONARIOS DE CASILLA</h4>
      <div class="input-box">
        <input type="text" v-model="username" placeholder="Nombre de usuario" required>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box">
        <input type="password" v-model="password" placeholder="Contraseña" required>
        <i class='bx bxs-lock'></i>
      </div>
      <button type="submit" class="btn">Iniciar Sesión</button>
    </form>
  </div>
  <div v-else>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4" v-for="vote in votes" :key="vote.nombre">
          <div class="card mb-4 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ vote.nombre }}</h5>
              <p class="card-text">{{ vote.partido }}</p>
              <p class="card-text"><strong>Total de votos:</strong> {{ vote.total }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <input type="file" @change="handleFileUpload">
        <button @click="uploadPDF" class="btn btn-primary mt-2">Subir PDF</button>
      </div>
      <div class="mt-4">
        <h4>Resultados</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID Resultado</th>
              <th>Total Votos</th>
              <th>Fecha</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resultado in resultados" :key="resultado.Id_RE">
              <td>{{ resultado.Id_RE }}</td>
              <td>{{ resultado.totalVotos }}</td>
              <td>{{ resultado.date }}</td>
              <td><a :href="`data:application/pdf;base64,${resultado.PDF}`" target="_blank">Ver PDF</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      URL: process.env.VUE_APP_API_URL,
      login: true,
      Id_Casilla: null,
      votes: [],
      selectedFile: null,
      resultados: []
    };
  },
  methods: {
    async submitForm() {
      try {
        const formData = {
          name: this.username,
          password: this.password
        };

        const response = await fetch(`${this.URL}/Login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.status) {
          console.log('Inicio de sesión exitoso:', data);
          this.Id_Casilla = data.data.Id_Casilla;
          alert('Inicio de sesión exitoso.');
          this.login = false;
          this.fetchVotes();
          this.fetchResultados();
        } else {
          alert('Inicio de sesión fallido. Verifique sus credenciales.');
        }

      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
    async fetchVotes() {
      try {
        const response = await fetch(`${this.URL}/votes_per_casilla/${this.Id_Casilla}`);
        const data = await response.json();

        if (data.status) {
          this.votes = data.Count;
        } else {
          alert('Error al obtener los datos de votos.');
        }
      } catch (error) {
        console.error('Error al obtener los datos de votos:', error);
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadPDF() {
      if (!this.selectedFile) {
        alert('Por favor, seleccione un archivo PDF.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = async () => {
        const base64String = reader.result.split(',')[1];
        const payload = {
          Id_Casilla: this.Id_Casilla,
          PDF: base64String
        };

        try {
          const response = await fetch(`${this.URL}/add_resultado`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (data.status) {
            alert('PDF subido exitosamente.');
            this.fetchResultados();
          } else {
            alert('Error al subir el PDF.');
          }

        } catch (error) {
          console.error('Error al subir el PDF:', error);
        }
      };
    },
    async fetchResultados() {
      try {
        const response = await fetch(`${this.URL}/resultados/${this.Id_Casilla}`);
        const data = await response.json();

        if (data.status) {
          this.resultados = data.data;
        } else {
          alert('Error al obtener los resultados.');
        }
      } catch (error) {
        console.error('Error al obtener los resultados:', error);
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
  margin: 0 auto;
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

.card {
  margin-bottom: 20px;
}
</style>
