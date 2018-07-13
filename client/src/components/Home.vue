<template>
  <div>
    <router-link to="/food">Nuevo alimento</router-link>
    <div v-for="food in foods" :key="food.id" class="food">
      <p>{{food.name}}</p>
      <p>{{food.temporality}}</p>
      <p>{{food.origin}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      foods: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/food/list`)
    .then(response => {
      response.data.forEach((element) => this.foods.push(element))
    })
  },
}
</script>

<style scoped>
.food{
  border: 1px solid green
}
</style>
