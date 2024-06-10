<template>
    <div class="wrapper">
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
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        environmentVariable: process.env.VUE_APP_API_URL
      };
    },
    methods: {
      async submitForm() {
        try {
          const formData = {
            username: this.username,
            password: this.password
          };
  
          const response = await fetch(`${this.environmentVariable}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
  
          const data = await response.json();
  
          if (data.status) {
            // Guardar el token o cualquier otra información necesaria en el localStorage
            localStorage.setItem('token', data.token);
            this.$router.push('/dashboard'); // Redirigir al dashboard o página principal
          } else {
            alert('Inicio de sesión fallido. Verifique sus credenciales.');
          }
  
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
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
  </style>
  