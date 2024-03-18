<template>
  <div class="statistics">
    <h2>Träningsstatistik</h2>
    <table>
      <thead>
        <tr>
          <th>Datum och tid</th>
          <th>Typ av träning</th>
          <th>Varaktighet (minuter)</th>
          <th>Sträcka (km)</th>
          <th>Förbrända kalorier</th>
          <th>Intensitet</th>
          <th>Kommentarer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workout in userWorkouts" :key="workout._id">
          <td>{{ formatDate(workout.dateTime) }}</td>
          <td>{{ workout.workoutType }}</td>
          <td>{{ workout.duration }}</td>
          <td>{{ workout.distance }}</td>
          <td>{{ workout.caloriesBurned }}</td>
          <td>{{ workout.intensity }}</td>
          <td>{{ workout.comments }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      userWorkouts: []
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
    formatDate(dateTime) {
      const date = new Date(dateTime);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
    }
  }
};
</script>

<style scoped>
.statistics {
  background-color: #222831;
  padding: 20px;
  margin: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #EEEEEE;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}

.statistics h2 {
  color: #76ABAE;
  padding-bottom: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #76ABAE;
}

thead th {
  background-color: #31363F;
  color: #EEEEEE;
}

tbody tr:nth-child(even) {
  background-color: #31363F;
  color: #EEEEEE;
}
</style>
