//import "@/assets/css/index.css";
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from "./App.vue";
import router from "./router";
import { apolloClient } from "./apolloclient";

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(router).mount("#app");
