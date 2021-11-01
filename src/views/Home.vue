<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <img src="" alt="">
    <component :is="name">
      <template #add="{ val, fn }">
        <span>{{ val }}{{ fn() }}</span>
      </template>
    </component>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      name: 'HelloWorld'
    }
  }
}
</script>
