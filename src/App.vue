<template>
  <div class="main-page">
    <h2 style="margin: 0px; font-family:sans-serif ;">
      ぼちぼち、りすと。
    </h2>
    <TodoList />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TodoList from './components/TodoList.vue';

export default defineComponent({
  name: 'App',
  components: {
    TodoList
}
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
