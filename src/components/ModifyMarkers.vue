<script setup lang="ts">
import { type UUIDMark } from '@/interfaces/Mark';
import { defineProps } from 'vue';
import CreateMarker from './CreateMarker.vue';
import UpdateMarker from './UpdateMarker.vue';
defineProps<{
  mark?: UUIDMark,
}>()

</script>
<template>
  <div>
    <UpdateMarker class="child" v-if="mark" :mark="mark"/>
    <CreateMarker class="child" v-else/>
  </div>
</template>

<style scoped>
  .child::v-deep h1 {
  font-size: 20px;
  color: white;
  }

  .child::v-deep div {
    background-color: cadetblue;
    display: flex;
    flex: content;
    flex-direction: column;
    max-width: 300px;
  }

  .child::v-deep #createMarker * {
    padding: 1rem;
    margin: 1rem;
  }
</style>
