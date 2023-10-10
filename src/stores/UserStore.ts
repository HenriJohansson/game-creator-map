import { reactive } from 'vue'

const store: {userName: string | null, token: string | null} = {
  userName: null,
  token: null
}
const UserStore = reactive(store)

export const UserStoreHooks = {
  saveToken: (userName: string, token: string): void => {
    UserStore.userName = userName;
    UserStore.token = token;
  },
  getToken: (): string | null => {
    return UserStore.token
  }
}
