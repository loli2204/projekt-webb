<template>
    <div class="workout-page">
      <h1>Träningspass</h1>
      <add-workout-form />
      <workout-list :workouts="workouts" />
    </div>
  </template>
  
  <script>
  import AddWorkoutForm from '@/components/AddWorkoutForm.vue';
  import WorkoutList from '@/components/WorkoutList.vue';
  
  export default {
    components: {
      AddWorkoutForm,
      WorkoutList
    },
    data() {
      return {
        workouts: [] // Använd riktig data från ditt API här
      };
    }
  };
  </script>
  
  <style scoped>
  .workout-page {
  background-color: #EEEEEE;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
}
.workout-page h1 {
  color: #31363F;
  padding-bottom: 5px;
  margin: 25px;
}
  </style>
  