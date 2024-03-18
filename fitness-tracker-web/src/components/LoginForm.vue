<template>
  <form class="login-form" @submit.prevent="login">
    <h2>Logga in</h2>
    <div class="form-group">
      <label for="email">E-postadress</label>
      <input id="email" type="email" v-model="email">
    </div>
    <div class="form-group">
      <label for="password">Lösenord</label>
      <input id="password" type="password" v-model="password">
    </div>
    <button type="submit">Logga in</button>
    <p>{{ errorMessage }}</p>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
  async login() {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: this.email,
        password: this.password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      this.$router.push('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.errorMessage = 'Fel e-postadress eller lösenord';
      } else {
        this.errorMessage = 'Något gick fel. Försök igen senare.';
      }
    }
  }}};
</script>

<style scoped>
.login-form {
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
