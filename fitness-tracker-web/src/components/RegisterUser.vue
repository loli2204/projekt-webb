<template>
  <div>
    <form class="register-form" @submit.prevent="register">
      <h2>Registrera användare</h2>
      <div class="form-group">
        <label for="name">Namn</label>
        <input id="name" type="text" v-model="name">
      </div>
      <div class="form-group">
        <label for="email">E-postadress</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Lösenord</label>
        <input id="password" type="password" v-model="password">
      </div>
      <button type="submit">Registrera</button>
      <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
      <p class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:3000/api/users', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        // Visa ett lyckat meddelande om registreringen lyckades
        this.successMessage = response.data.message || 'Registreringen lyckades!';
        // Återställ formuläret
        this.name = '';
        this.email = '';
        this.password = '';
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Något gick fel. Försök igen senare.';
        this.successMessage = ''; // Återställ successMessage om det fanns något
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
}

.success-message {
  color: green;
}

  .register-form {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    margin-top: 105px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
    color: #333333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #76ABAE;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #31363F;
  }
  </style>
  