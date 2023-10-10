<template>
  <div id="createMarker">
    <h1>Create Marker</h1>
    <input id="marker_name"
      v-model="nameRef"
      placeholder="Marker name" />
    <textarea id="marker_description"
      v-model="descriptionRef"
      placeholder="Marker description">
    </textarea>
  </div>
</template>

<script setup lang="ts">
import { type UUIDMark } from '@/interfaces/Mark';
import { defineExpose, onMounted, ref, watch} from 'vue';
import { MarkerStoreHooks } from '@/stores/MarkerStore'
import { orderedMarkerFactorySingleton } from '@/classes/OrderedMarkFactory'

const currentCreationID: string = crypto.randomUUID();
const nameRef = ref<string>();
const descriptionRef = ref<string>();
onMounted(() => {
  const mark: UUIDMark = orderedMarkerFactorySingleton.createDefaultOrderedMarker()
  mark.id = currentCreationID;
  watch([nameRef, descriptionRef], ([newNameRef, newDescriptionRef]) =>{
    if(newNameRef)
      mark.marker_name = newNameRef;
    if(newDescriptionRef){
      mark.description = newDescriptionRef;
    }
    MarkerStoreHooks.setChosenMark(mark);
  })
})

defineExpose({nameRef, descriptionRef})
</script>

<style scoped>
h1 {
  font-size: 20px;
  color: white;
}

div {
  background-color: cadetblue;
  display: flex;
  flex: content;
  flex-direction: column;
  max-width: 300px;
}

#createMarker * {
  padding: 1rem;
  margin: 1rem;
}
</style>
