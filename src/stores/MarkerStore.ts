import { UUIDMark } from '@/interfaces/Mark'
import { reactive, watch } from 'vue'

const store: {marksArray: UUIDMark[], chosenMark: UUIDMark | null} = {
  marksArray: [],
  chosenMark: null
}

const MarkerStore = reactive(store);

export const MarkerStoreHooks = {

  getMarkArray: (): UUIDMark[] => {
    return MarkerStore.marksArray;
  },
  /**
   * When pushing a Mark, new Date is automatically created.
   * OrderedMark default placement start value is -2.
   * @param mark Mark you want to push
   */
  marksArrayPush: (mark: UUIDMark): void => {
    const markIndex = MarkerStoreHooks.findIndexOfMark(mark)
    if( markIndex === -1){
      mark.creation_date = new Date()
      MarkerStore.marksArray.push(mark)
    } else{
      MarkerStoreHooks.setToArrayIndex(mark, markIndex)
    }

  },
  setToArrayIndex: (mark: UUIDMark , index: number): void => {
    MarkerStore.marksArray[index] = mark
  },
  findIndexOfMark:(mark: UUIDMark): number => {
    return MarkerStore.marksArray
    .findIndex(m=> m.id === mark.id)
  },
  /**
   * ChosenMark is the mark that the user is either creating or modifying at this time.
   * @returns ChosenMark that has been set at this current time
   */

  getChosenMark: (): UUIDMark | null => {
    return MarkerStore.chosenMark as UUIDMark | null;
  },
  setChosenMark: (mark: UUIDMark): void => {
    MarkerStore.chosenMark = mark;
  }
}

watch(MarkerStore, () => {
  console.log("marker store updated")
}, {deep:true})
