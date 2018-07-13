<template>
  <div>
    <router-link to="/">Home</router-link>

    <form class="vue-form" @submit.prevent="submit">
      <label>Name:</label>
      <input type="text" name="name" v-model="name">
      <input type="submit" value="Send Form">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../route'

export default {
  name: 'AddFood',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    submit: function() {
      axios.post(`http://localhost:3000/food`, {name: this.name})
      router.push('/')
    }
  },
}
</script>

<style scoped>
</style>
