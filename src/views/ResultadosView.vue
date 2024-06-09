<template>
    <div class="container mt-4">
      <h2>Resultados de votación por candidato</h2>
  
      <div class="row">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ResultadosView',
    data() {
      return {
        votesData: [],
        url: process.env.VUE_APP_API_URL // Asignación correcta dentro de data()
      };
    },
    methods: {
      fetchVotesData() {
        // Realizar la petición GET al endpoint /votes_per_candidate utilizando fetch
        const url = `${this.url}/votes_per_candidate`;
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            // Actualizar votesData con los datos obtenidos
            this.votesData = data.data;
  
            // Llamar a la función para actualizar el gráfico
            this.updateChart();
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
      },
    },
    mounted() {
      // Llamar al método para obtener los datos de votos
      this.fetchVotesData();
    },
  };
  </script>
  
  <style>
  /* Estilos opcionales para personalizar */
  </style>
  