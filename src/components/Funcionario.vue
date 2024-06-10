<template>
    <div id="app">
      <div class="container">
        <h1>Funcionario</h1>
  
        <div class="candidatos-resumen">
          <h2>Resumen de Candidatos</h2>
          <div class="candidatos-wrapper">
            <div class="candidato" v-for="(candidato, index) in candidatosResumen" :key="index">
              <h3>{{ candidato.nombre }}</h3>
              <p>{{ candidato.partido }}</p>
              <p>{{ candidato.votos }} Votos Totales</p>
            </div>
          </div>
        </div>
  
        <hr class="separator">
  
        <div class="resultados-electorales">
          <h2>Resultados Electorales de Casilla</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(candidato, index) in candidatos" :key="index">
                <td>{{ candidato.nombre }}</td>
                <td>{{ candidato.fecha }}</td>
              </tr>
            </tbody>
          </table>
          <button @click="generarPDF">Generar PDF</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        candidatos: [
          { nombre: 'Bertha Xóchitl Gálvez Ruíz', fecha: '2024-06-09' },
          { nombre: 'Alejandro Moreno Cardenas', fecha: '2024-06-09' },
          { nombre: 'Claudia Sheinbaum Pardo', fecha: '2024-06-09' }
        ],
        candidatosResumen: [
          { nombre: 'Bertha Xóchitl Gálvez Ruíz', partido: 'PAN', votos: 0 },
          { nombre: 'Alejandro Moreno Cardena', partido: 'PRI', votos: 1 },
          { nombre: 'Claudia Sheinbaum Pardo', partido: 'MORENA', votos: 10 }
        ]
      };
    },
    methods: {
      generarPDF() {
        // Lógica para generar PDF
        alert('PDF generado correctamente.');
      }
    }
  };
  </script>
  
  <style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background-image: radial-gradient(circle at 29% 55%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 4%,transparent 4%, transparent 44%,transparent 44%, transparent 100%),radial-gradient(circle at 85% 89%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 52%,transparent 52%, transparent 100%),radial-gradient(circle at 6% 90%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 53%,transparent 53%, transparent 64%,transparent 64%, transparent 100%),radial-gradient(circle at 35% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 6%,transparent 6%, transparent 98%,transparent 98%, transparent 100%),radial-gradient(circle at 56% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 16%,transparent 16%, transparent 23%,transparent 23%, transparent 100%),radial-gradient(circle at 42% 0%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 3%,transparent 3%, transparent 26%,transparent 26%, transparent 100%),radial-gradient(circle at 29% 28%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 75%,transparent 75%, transparent 100%),radial-gradient(circle at 77% 21%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 35%,transparent 35%, transparent 55%,transparent 55%, transparent 100%),radial-gradient(circle at 65% 91%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 46%,transparent 46%, transparent 76%,transparent 76%, transparent 100%),linear-gradient(45deg, rgb(83, 91, 235),rgb(76, 11, 174));
  background-size: cover;
  background-attachment: fixed;
  padding: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  color: #ffffff;
  font-size: 2.5em;
}

.candidatos-resumen, .resultados-electorales {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9); /* Blanco con transparencia */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.candidatos-resumen h2, .resultados-electorales h2 {
  margin-bottom: 20px;
  color: #007bff;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table, th, td {
  border: 1px solid rgba(0, 0, 0, 0.1); /* Borde con transparencia */
  background-color: rgba(255, 255, 255, 0.7); /* Fondo con transparencia */
  padding: 10px;
  text-align: left;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.separator {
  width: 100%;
  border-top: 2px solid rgba(0, 0, 0, 0.1); /* Borde con transparencia */
  margin: 20px 0;
}

.candidatos-wrapper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.candidato {
  width: 30%;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1); /* Borde con transparencia */
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7); /* Fondo con transparencia */
}

.candidato h3 {
  color: #0056b3;
}

.candidato p {
  margin: 5px 0;
}

@media (max-width: 768px) {
  .candidato {
    width: 45%;
  }
}

@media (max-width: 480px) {
  .candidato {
    width: 100%;
  }
}
</style>
