<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <router-link to="/" class="logo">Fitness Tracker</router-link>
        <nav>
          <router-link v-if="isLoggedIn" to="/">Start</router-link>
          <router-link v-if="isLoggedIn" to="/profile">Profil</router-link>
          <router-link v-if="isLoggedIn" to="/workouts">Träningspass</router-link>
          <router-link v-if="!isLoggedIn" to="/login">Logga in</router-link>
          <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logga ut</button>
        </nav>
      </div>
    </header>

    <router-view />

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Fitness Tracker - Louise Lindberg</p>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    // Kontrollera om användaren är inloggad när komponenten skapas
    this.isLoggedIn = localStorage.getItem('token') !== null;
  },
  methods: {
    logout() {
      // Ta bort JWT-token från localStorage vid utloggning
      localStorage.removeItem('token');
      // Uppdatera inloggningstillståndet och omdirigera till startsidan
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
};
</script>


<style>
/* Header-stil */
* {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}
.header {
  background-color: #31363F;
  color: #EEEEEE;
  padding: 15px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #76ABAE;
}

nav {
  display: flex;
}

nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #EEEEEE;
}

nav a:hover {
  color: #76ABAE;
}

/* Logga ut knapp stil */
.logout-btn {
  background-color: #76ABAE;
  color: #fff;
  border: none;
  padding: 5px 20px;
  margin-left: 35px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #00adba;
}
/* Footer-stil */
.footer {
  background-color: #222831;
  color: #EEEEEE;
  padding: 15px 0;
  text-align: center;
}
</style>