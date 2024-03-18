<template>
  <div>
    <form class="add-workout-form" @submit.prevent="addWorkout">
      <h2>Lägg till träningspass</h2>
      <div class="form-group">
        <label for="dateTime">Datum och tid</label>
        <input type="datetime-local" id="dateTime" v-model="dateTime">
      </div>
      <div class="form-group">
        <label for="workoutType">Typ av träning</label>
        <input type="text" id="workoutType" v-model="workoutType">
      </div>
      <div class="form-group">
        <label for="duration">Varaktighet (minuter)</label>
        <input type="number" id="duration" v-model="duration">
      </div>
      <div class="form-group">
        <label for="distance">Sträcka (kilometer)</label>
        <input type="number" id="distance" v-model="distance">
      </div>
      <div class="form-group">
        <label for="caloriesBurned">Förbrända kalorier</label>
        <input type="number" id="caloriesBurned" v-model="caloriesBurned">
      </div>
      <div class="form-group">
        <label for="intensity">Intensitet</label>
        <input type="number" id="intensity" v-model="intensity">
      </div>
      <div class="form-group">
        <label for="comments">Kommentarer</label>
        <textarea id="comments" v-model="comments"></textarea>
      </div>
      <button type="submit">Lägg till</button>
    </form>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dateTime: '',
      workoutType: '',
      duration: 0,
      distance: 0,
      caloriesBurned: 0,
      intensity: 0,
      comments: '',
      userId: ''
    };
  },
  methods: {
    addWorkout() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'Du måste logga in först.';
        return;
      }

      // Hämta användar-ID från sparad användarinformation i localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        this.errorMessage = 'Felaktig användarinformation.';
        return;
      }
      this.userId = user._id;

      axios.post(`http://localhost:3000/api/users/${this.userId}/workouts`, {
        dateTime: this.dateTime,
        workoutType: this.workoutType,
        duration: this.duration,
        distance: this.distance,
        caloriesBurned: this.caloriesBurned,
        intensity: this.intensity,
        comments: this.comments
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Skicka JWT-token som en del av Authorization-header
        }
      }).then(response => {
        console.log('Träningspass tillagt:', response.data);
        // Återställ formuläret och eventuella felmeddelanden
        this.dateTime = '';
        this.workoutType = '';
        this.duration = 0;
        this.distance = 0;
        this.caloriesBurned = 0;
        this.intensity = 0;
        this.comments = '';
        this.errorMessage = '';
      }).catch(error => {
        console.error('Fel vid tillägg av träningspass:', error.response.data);
        this.errorMessage = 'Något gick fel. Försök igen senare.';
      });
       // Ladda om sidan för att visa det nya träningspasset 
       window.location.reload();
    }
  }
};
</script>

<style scoped>
.add-workout-form {
  background-color: #222831;
  padding: 20px;
  margin: 25px;
  border-radius: 10px;
  color: #76ABAE;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}
.add-workout-form h2 {
  padding-bottom: 15px;
}
.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #76ABAE;
}

input {
  width: 98%;
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
