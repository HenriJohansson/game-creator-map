import { MarkerStoreHooks } from './MarkerStore';
import { UserStoreHooks } from './UserStore';
import { UUIDMark } from '@/interfaces/Mark'
import { useQuery } from '@vue/apollo-composable';
import { reactive, watch } from 'vue'
import { Queries } from './QueryStore';

const store: {marksArray: UUIDMark[], chosenMark: UUIDMark | null} = {
  marksArray: [],
  chosenMark: null
}

const MarkerStore = reactive(store);

export const MarkerStoreHooks = {

  getMarkArray: (): Readonly<UUIDMark[]> => {
    return MarkerStore.marksArray;
  },
  /**
   * When pushing a Mark, new Date is automatically created.
   * OrderedMark default placement start value is -2.
   * @param mark Mark you want to push
   */
  marksArrayPush: (mark: UUIDMark): void => {
    const markIndex = MarkerStoreHooks.findIndexOfMark(mark);
    if( markIndex === -1){
      mark.creation_date = new Date();
      console.log(mark);
      console.log(MarkerStore.marksArray);
      MarkerStore.marksArray = [...MarkerStore.marksArray, mark];
    } else{
      MarkerStoreHooks.setToArrayIndex(mark, markIndex);
    }

  },
  setToArrayIndex: (mark: UUIDMark , index: number): void => {
    MarkerStore.marksArray[index] = mark;
  },
  findIndexOfMark:(mark: UUIDMark): number => {
    return MarkerStore.marksArray
    .findIndex(m=> m.id === mark.id);
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

watch(UserStoreHooks.getUserStore(), () => {
  const { result } = useQuery(Queries.queryForMarkersByUser);

  watch(result, ()=> {
    console.log(result.value.markersByUser);
    MarkerStore.marksArray = result.value.markersByUser as UUIDMark[];
  })
})

