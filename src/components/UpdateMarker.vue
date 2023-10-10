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
import { UUIDMark } from '@/interfaces/Mark';
import { defineExpose, defineProps, onMounted, ref, watch } from 'vue';
import { MarkerStoreHooks } from '@/stores/MarkerStore'
//import { orderedMarkerFactorySingleton } from '@/classes/OrderedMarkFactory'
//import OrderedMarker from '@/classes/OrderedMarker';

const props = defineProps<{
  mark: UUIDMark,
}>()
let markRef = ref<UUIDMark>(props.mark)
const nameRef = ref<string>(props.mark.marker_name);
const descriptionRef = ref<string>(props.mark.description);
onMounted(() => {

  /* if(nameRef.value)
    markRef = ref(props.mark);
  else {
    markRef = ref(orderedMarkerFactorySingleton.createDefaultOrderedMarker())
  } */
  watch([nameRef, descriptionRef], ([newNameRef, newDescriptionRef]) =>{
    /* console.log("watch triggered")
    let markIndex = 0;

    markIndex = StoreHooks.findIndexOfMark(markRef.value)
    if(markIndex === -1 || undefined){

    } */
    console.log("new name: ", newNameRef);
    console.log("new description", newDescriptionRef);
    markRef.value.marker_name = newNameRef;
    markRef.value.description = newDescriptionRef;
    MarkerStoreHooks.marksArrayPush(markRef.value);
  })
})

const emit = defineEmits<{
  (e: 'updateNewMarker', mark: string ): void
}>()
/* watch(markRef, async (newMark, oldMark) => {
  console.log("watch effect triggered")
  let markIndex = 0;
  if(markRef.value){
    markIndex = StoreHooks.findIndexOfMark(markRef.value)
  }
  if(markIndex === -1 || undefined && newMark){
    if(newMark){
      newMark.placement = StoreHooks.getArrayLength() - 1;
      newMark.placement = (newMark.placement < 0) ? 1 : newMark.placement
      StoreHooks.marksArrayPush(newMark as OrderedMark)
    }
  } else if(newMark) {
    StoreHooks.setToArrayIndex(newMark as OrderedMark, markIndex);
  }
},{ deep: true })
 */

/*
const updateNewMarker = (event: Event) :void => {
  if(event.target){
    emit("updateNewMarker", (event.target as HTMLInputElement).value);
  }
}
*/
defineExpose({nameRef, descriptionRef})
</script>
