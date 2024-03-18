<template>
  <div class="profile">
    <h1>Profil</h1>
    <div v-if="userData">
      <p>Namn: {{ userData.name }}</p>
      <p>E-post: {{ userData.email }}</p>
      <button @click="editProfile">Redigera profil</button>
      <button @click="deleteAccount">Radera konto</button>
    </div>
    <div v-else>
      Laddar användardata...
    </div>
    <div v-if="showEditForm" class="edit-form">
      <h2>Redigera profil</h2>
      <form @submit.prevent="updateProfile">
        <label for="name">Namn:</label>
        <input id="name" type="text" v-model="updatedName">
        <label for="email">E-post:</label>
        <input id="email" type="email" v-model="updatedEmail">
        <div class="button-group">
          <button type="submit">Spara</button>
          <button type="button" @click="cancelEdit">Avbryt</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userData: null,
      showEditForm: false,
      updatedName: '',
      updatedEmail: ''
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.userData = user;
      }
    },
    editProfile() {
      this.showEditForm = true;
      this.updatedName = this.userData.name;
      this.updatedEmail = this.userData.email;
    },
    async updateProfile() {
      try {
        const response = await axios.put(`http://localhost:3000/api/users/${this.userData._id}`, {
          name: this.updatedName,
          email: this.updatedEmail
        });
        this.userData = response.data;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.showEditForm = false;
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
    cancelEdit() {
      this.showEditForm = false;
    },
    async deleteAccount() {
      try {
        await axios.delete(`http://localhost:3000/api/users/${this.userData._id}`);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect eller gör något annat efter radering av kontot
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  }
};
</script>


<style scoped>
.profile {
  background-color: #222831;
  padding: 20px;
  margin: 25px;
  border-radius: 10px;
  color: #EEEEEE;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}

.profile h1 {
  color: #76ABAE;
  padding-bottom: 5px;
}
h2 {
  color: #76ABAE;
}
button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #76ABAE;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #31363F;
}

.edit-form {
  margin-top: 20px;
}

label {
  margin-top: 10px;
  display: block;
}

input {
  padding: 5px;
  margin-top: 5px;
}

.button-group {
  margin-top: 15px;
}
</style>
