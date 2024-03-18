<template>
  <div class="start-page">
    <h1>Välkommen till Fitness Tracker {{ userName }}</h1>
    <statistics :workouts="workouts" />
    <workout-list :workouts="workouts" />
  </div>
</template>

<script>
import Statistics from '@/components/StatisticsView.vue';
import WorkoutList from '@/components/WorkoutList.vue';

export default {
  components: {
    Statistics,
    WorkoutList
  },
  data() {
    return {
      workouts: [] // Använd riktig data från ditt API här
    };
  },
  computed: {
  userName() {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData ? userData.name : '';
  }
},
};
</script>

<style scoped>
.start-page {
  background-color: #EEEEEE;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}

.start-page h1 {
  color: #31363F;
  padding-bottom: 5px;
  margin: 25px;
}
</style>

