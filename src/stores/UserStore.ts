import { reactive } from 'vue'

const store: {userId: string | null, token: string | null} = {
  userId: null,
  token: null
}
const UserStore = reactive(store)

export const UserStoreHooks = {
  saveToken: (userName: string, token: string): void => {
    UserStore.userId = userName;
    UserStore.token = token;
  },
  getToken: (): string | null => {
    return UserStore.token
  },
  getUserId: (): string | null => {
    return UserStore.userId
  }
}
