<template>
    <div style="height: 75vh; width: 100%;">
        <l-map :use-global-leaflet="false" v-model="zoom" v-model:zoom="zoom" v-model:center="centerRef" @click=placeOnClick()>
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-markers :key="markersKey" @reload="reloadMarkers()"></l-markers>
        </l-map>
    </div>
</template>

<script setup lang="ts">
import LMarkers from "@/components/LMarkers.vue";
import { MarkerStoreHooks } from "@/stores/MarkerStore";
import {
    LMap,
    LTileLayer
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css"
import { ref, watch, onMounted } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { MutationStore } from "@/stores/MutationStore";
import { ApolloError } from "@apollo/client/core";
/* import { UUIDMark } from "@/interfaces/Mark"; */

const centerRef = ref<{lat:number, lng: number}>({lat:47.41322, lng:-1.219482})
const markersKey = ref<string | number | symbol | undefined>(1)

const zoom = 2;
const emit = defineEmits(['reload'])
let mutationVariables: Object;
let placeOnClick: Function;
onMounted(async () => {

  const {mutate: addMarker, onError } = await useMutation(
    MutationStore.ADD_MARKER_MUTATION
    , () =>(
    mutationVariables
    )
  )

  placeOnClick = (): void => {
    const placedMarker = MarkerStoreHooks.getChosenMark()
    if (placedMarker
    && centerRef.value
    && MarkerStoreHooks.findIndexOfMark(placedMarker) === -1) {
      if (placedMarker.marker_name) {
        placedMarker.location.coordinates = [centerRef.value.lat, centerRef.value.lng];
        mutationVariables = MutationStore.getAddMarkerVariables(placedMarker);
        MarkerStoreHooks.marksArrayPush(placedMarker);
        addMarker();
        emit('reload');
      }
    }
  };
  onError((error: ApolloError) => {
    console.error("Errors: ", error);
  })
})

const reloadMarkers = () => {
  (markersKey.value as number) += 1;
}

watch(MarkerStoreHooks.getMarkArray(), () => {
  reloadMarkers();
})

</script>
<style>
 .leaflet-pane { z-index: 0 !important; }
</style>
