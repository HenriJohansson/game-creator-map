<template>
  <l-marker :key="index" v-for="(marker, index) in MarkerStoreHooks.getMarkArray()"
    :lat-lng="marker.location.coordinates"
    draggable>
    <l-popup>{{ marker.marker_name }}
      <button @click="deleteMarker(marker)"
      style="background-color: red; color: white;">
        Delete
      </button>
    </l-popup>
  </l-marker>
</template>

<script setup lang="ts">
import {LMarker ,LPopup } from "@vue-leaflet/vue-leaflet";
import { MarkerStoreHooks } from "@/stores/MarkerStore";
import { useMutation } from "@vue/apollo-composable";
import { MutationStore } from "@/stores/MutationStore";
import { onMounted } from "vue";
import { UUIDMark } from "@/interfaces/Mark";
import { ApolloError } from "@apollo/client/errors/index";

const emit = defineEmits(['reload'])

let deleteMarker: Function

onMounted( async () => {
  deleteMarker = async (marker: UUIDMark)=> {
    const {mutate: deleteMark, onDone, onError } = await useMutation(
    MutationStore.DELETE_MARKER
      , () => (
        MutationStore.getDeleteMarkerVariables(marker)
      )
    )
    /* Send a delete mutation */
    deleteMark()
    onDone(() => {
      /* Local deletion for UI update */
      MarkerStoreHooks.deleteMarkerFromIndex(MarkerStoreHooks.findIndexOfMark(marker));
      MarkerStoreHooks.updateMarkerStore()
      //reload component
      emit('reload');
    })
    onError((error: ApolloError) => {
      console.error(error);
    })
  }


})



</script>
