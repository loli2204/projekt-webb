<template>
  <div class="button-container">
    <button class="action-button" @click="showLoginForm">Logga in</button>
    <button class="action-button" @click="showRegisterForm">Registrera</button>
    
    <Login v-if="showLogin" @close="closeLoginForm" />
    <Register v-if="showRegister" @close="closeRegisterForm" />
  </div>
</template>

<script>
import Login from '@/components/LoginForm.vue';
import Register from '@/components/RegisterUser.vue';

export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      showLogin: false,
      showRegister: false
    };
  },
  methods: {
    showLoginForm() {
      this.showLogin = true;
      this.showRegister = false;
    },
    closeLoginForm() {
      this.showLogin = false;
    },
    showRegisterForm() {
      this.showRegister = true;
      this.showLogin = false;
    },
    closeRegisterForm() {
      this.showRegister = false;
    }
  }
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px;
  margin-top: 20px;
}

.action-button {
  padding: 15px 30px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #76ABAE;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 10px;
}

.action-button:hover {
  background-color: #5c8991;
}
</style>

