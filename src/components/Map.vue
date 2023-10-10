<template>
    <div style="height: 75vh; width: 50vw;">
        <l-map :use-global-leaflet="false" v-model="zoom" v-model:zoom="zoom" v-model:center="centerRef" @click=placeOnClick(centerRef)>
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker :key="index" v-for="(marker, index) in MarkerStoreHooks.getMarkArray()" :lat-lng="marker.location.coordinates" draggable>
                <l-popup>{{ marker.marker_name }}</l-popup>
            </l-marker>
        </l-map>
        <button @click="logMarkers">TestQuery</button>
    </div>
</template>

<script setup lang="ts">
import { MarkerStoreHooks } from "@/stores/MarkerStore";
import {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css"
import { ref,watch } from "vue";
import { Queries } from '@/stores/QueryStore';
import { useQuery } from "@vue/apollo-composable";

const centerRef = ref<[number, number]>([47.41322, -1.219482])
const zoom = 2;
const emit = defineEmits(['reload'])

const placeOnClick = (coordinates: [number, number] | undefined): void => {
  const placedMarker = MarkerStoreHooks.getChosenMark()
  if (placedMarker
  && coordinates
  && MarkerStoreHooks.findIndexOfMark(placedMarker) === -1) {
    if (placedMarker.marker_name) {
      placedMarker.location.coordinates = coordinates;
      MarkerStoreHooks.marksArrayPush(placedMarker);
      emit('reload')
    }
  }
};

const logMarkers = () => {
  const { result } = useQuery(Queries.queryForMarkers);

  watch(result, ()=> {
    console.log("Found Markers: ", result.value);
  })
}

</script>
<style>
 .leaflet-pane { z-index: 0 !important; }
</style>
