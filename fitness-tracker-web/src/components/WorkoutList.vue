<template>
  <div class="workout-list">
    <h2>Träningspass</h2>
    <ul>
      <li v-for="workout in userWorkouts" :key="workout._id" class="workout-item">
        <div class="workout-details">
          <p class="workout-type">{{ workout.workoutType }}</p>
          <p class="workout-duration">{{ workout.duration }} min</p>
          <button @click="startEdit(workout)">Redigera</button>
          <button @click="deleteWorkout(workout._id)">Radera</button>
        </div>
        <div v-if="workout._id === editWorkoutId" class="edit-form">
          <form @submit.prevent="saveEdit">
            <input type="text" v-model="editWorkout.workoutType" placeholder="Typ av träning">
            <input type="number" v-model="editWorkout.duration" placeholder="Varaktighet (minuter)">
            <button type="submit">Spara</button>
            <button @click="cancelEdit">Avbryt</button>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userWorkouts: [],
      editWorkoutId: null,
      editWorkout: {
        workoutType: '',
        duration: 0
      }
    };
  },
  mounted() {
    this.getUserWorkouts();
  },
  methods: {
    async getUserWorkouts() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Ingen JWT-token tillgänglig.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      console.error('Felaktig användarinformation.');
      return;
    }

    const userId = user._id;

    const response = await axios.get(`http://localhost:3000/api/users/${userId}/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.userWorkouts = response.data;
  } catch (error) {
    console.error('Hämtning av träningspass misslyckades:', error);
  }
},
    startEdit(workout) {
      this.editWorkoutId = workout._id;
      this.editWorkout = { ...workout };
    },
    async saveEdit() {
      try {
        // Skicka begäran till servern för att spara ändringarna
        await axios.put(`http://localhost:3000/api/workouts/${this.editWorkoutId}`, this.editWorkout);
        // Uppdatera användarens träningspass efter redigering
        this.getUserWorkouts();
        // Återställ redigeringsformuläret
        this.editWorkoutId = null;
        this.editWorkout = { workoutType: '', duration: 0 };
        console.log('Träningspass uppdaterat');
      } catch (error) {
        console.error('Fel vid uppdatering av träningspass:', error);
      }
    },
    cancelEdit() {
      // Avbryt redigering och återställ formuläret
      this.editWorkoutId = null;
      this.editWorkout = { workoutType: '', duration: 0 };
    },
    async deleteWorkout(workoutId) {
      try {
        // Skicka begäran till servern för att radera träningspasset
        await axios.delete(`http://localhost:3000/api/workouts/${workoutId}`);
        // Uppdatera användarens träningspass efter borttagning
        this.getUserWorkouts();
        console.log('Träningspass raderat');
      } catch (error) {
        console.error('Fel vid radering av träningspass:', error);
      }
    },
  }
};
</script>

<style scoped>
.workout-list {
  background-color: #222831;
  padding: 20px;
  margin: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #EEEEEE;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}

.workout-list h2 {
  color: #76ABAE;
  margin-bottom: 10px;
}

.workout-item {
  background-color: #EEEEEE;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.workout-details {
  display: flex;
  justify-content: space-between;
}

.workout-date {
  font-weight: bold;
}

.workout-type {
  color: #76ABAE;
}

.workout-duration {
  color: #31363F;
}

button {
  padding: 5px 10px;
  background-color: #76ABAE;
  color: #FFFFFF;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #31363F;
}
</style>
