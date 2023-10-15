<template>
    <div style="height: 75vh; width: 100%;">
        <l-map :use-global-leaflet="false" v-model="zoom" v-model:zoom="zoom" v-model:center="centerRef" @click=placeOnClick()>
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
import { ref, watch, onMounted } from "vue";
import { Queries } from '@/stores/QueryStore';
import { useMutation, useQuery } from "@vue/apollo-composable";
import { MutationStore } from "@/stores/MutationStore";
import { ApolloError, FetchResult } from "@apollo/client/core";
/* import { UUIDMark } from "@/interfaces/Mark"; */

const centerRef = ref<{lat:number, lng: number}>({lat:47.41322, lng:-1.219482})
const zoom = 2;
const emit = defineEmits(['reload'])
let mutationVariables: Object;
let placeOnClick: Function;
onMounted(async () => {

  console.log(MarkerStoreHooks.getMarkArray());

  const {mutate: addMarker, onDone, onError } = await useMutation(
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
        console.log(MarkerStoreHooks.getMarkArray());
        addMarker();
        emit('reload');
      }
    }
  };
  onDone((result: FetchResult<any, Record<string, any>, Record<string, any>>) => {
    console.log("Results: ", result)
  })
  onError((error: ApolloError) => {
    console.error("Errors: ", error);
  })
})




onMounted( () => {
  const { result } = useQuery(Queries.queryForMarkers);

  watch(result, ()=> {
    console.log("Found Markers: ", result.value);
  })
})

const logMarkers = () => {
  const { result } = useQuery(Queries.queryForMarkersByUser);

  watch(result, ()=> {
    console.log("Found Markers: ", result.value);
  })
}

</script>
<style>
 .leaflet-pane { z-index: 0 !important; }
</style>
