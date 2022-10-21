<template>
  <div class="header">
  </div>
  <div class="container">
    <drag-resize
      v-for="item in list"
      style="width: 100px;height:100px"
      :node-key="item"
      @on-drag-resize="handle"
    >
      {{ item }}
    </drag-resize>
    <drag-resize
      class="test"
      node-key="test"
      style="position:absolute;width:100px;height:100px"
      :init="{
        width:200,
        height:100,
        top:10,
        left:200
      }"
      @on-drag-resize="handle"
    >
    </drag-resize>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const list = ref<number[]>([])
for (let index = 0; index < 70; index++) {
    list.value.push(index)
}
const handle = (data) => {
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
