<template>
  <l-marker :key="index" v-for="(marker, index) in MarkerStoreHooks.getMarkArray()" :lat-lng="marker.location.coordinates" draggable>
    <l-popup>{{ marker.marker_name }}</l-popup>
  </l-marker>
</template>

<script setup lang="ts">
import {LMarker ,LPopup } from "@vue-leaflet/vue-leaflet";
import { MarkerStoreHooks } from "@/stores/MarkerStore";

</script>
