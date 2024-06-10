<template>
  <div class="container mt-4">
    <h2>Resultados de votación por candidato</h2>
    <div class="row">
      <canvas id="votesChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  name: 'ResultadosView',
  data() {
    return {
      votesData: [],
      url: process.env.VUE_APP_API_URL, // Asignación correcta dentro de data()
      chart: null // Variable para almacenar la instancia del gráfico
    };
  },
  methods: {
    fetchVotesData() {
      const url = `${this.url}/votes_per_candidate`;
      fetch(url, {
        headers: {
          
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
        throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.votesData = data.data;
          console.log(this.votesData)
          this.updateChart();
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    },
    updateChart() {
      // Obtener los nombres de los candidatos y los totales de votos
      const labels = this.votesData.map(candidate => candidate.nombre);
      const data = this.votesData.map(candidate => candidate.total);

      if (this.chart) {
        // Si el gráfico ya existe, actualiza sus datos
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      } else {
        // Crear un nuevo gráfico
        const ctx = document.getElementById('votesChart').getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Total de votos',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  },
  mounted() {
    this.fetchVotesData();
  }
};
</script>

<style>
/* Estilos opcionales para personalizar */
</style>
