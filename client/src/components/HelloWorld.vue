<template>
  <div class="hello">
    <h1>{{ food }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      food: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/food/list`)
    .then(response => {
      console.log(response.data)
      this.food = response.data
    })
  },
}
</script>

<style scoped>
</style>
