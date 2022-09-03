

<template>
  <div class="header">

  </div>
<div class="container">
  <drag-resize style="width: 100px;height:100px" v-for="item in list" @onDragResize="handle" :nodeKey="item">
      {{item}}
  </drag-resize>
</div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const list = ref<number[]>([])
for (let index = 0; index < 70; index++) {
  list.value.push(index)
}
const handle = (data)=>{
  console.log(data)
} 
</script>
<style scoped>
  .header{
    width: 100%;
    height: 80px;
  }
  .container{
    width: 1920px;
    height: calc(100vh - 80px);
  }
</style>
