<script setup lang="ts">
import { ref, Ref } from 'vue';
import { doGraphQLFetch } from "../stores/fetch";
import LoginMessageResponse from "../interfaces/LoginMessageResponse";
import { loginQ } from "../querys/LoginQuery";
import { UserStoreHooks } from "../stores/UserStore";

const hover = ref(false);
const login: Ref<HTMLElement | null | undefined> = ref();
const apiURL = import.meta.env.VITE_BACKEND_URL;

const email = ref("");
const password = ref("");
const emit = defineEmits(['reload'])

const loginFunction = async () => {
  console.log(email.value + " " + password.value);
  const queryData = {
    email: email.value,
    password: password.value,
  };
  try {
    const loginData = (await doGraphQLFetch(apiURL, loginQ, queryData)) as LoginMessageResponse;
    console.log(loginData);
    if (loginData.login.token != null) {
      UserStoreHooks.saveToken(loginData.login.user.id, loginData.login.token);
      alert("Login successful");
      emit('reload');
    }
  } catch (error) {
    alert("Wrong username or password");
    console.log(error);
  }
}

const hoverControl = () => {
  hover.value = true;
  setTimeout(() => {
    hover.value = false;
  }, 5000);
}


</script>

<template>
  <div style="width: 250px; height: 250px; visibility: hidden;" id="form_borders">
    <div @mouseover="hover = true" @mouseleave="hoverControl" :class="{ active: hover, inactive: !hover }" ref="login"
      id="form_background">
      <div v-if="hover" class="active" id="form">
        <label for="uname"><b>Username</b></label>
        <input v-model="email" type="text" placeholder="Enter Username" name="uname" required>

        <label for="psw"><b>Password</b></label>
        <input v-model="password" type="password" placeholder="Enter Password" name="psw" required>

        <button @click="loginFunction">Login</button>
      </div>
      <img v-else src="@/assets/login_black_24dp.svg" alt="Login" />
    </div>
  </div>
</template>


<style scoped>
div {
  z-index: 100;
  background-color: cadetblue;
  visibility: visible;
  display: flex;
  flex: content;
  flex-direction: column;
  position: absolute;
  border-radius: 33% 33% 33% 33% / 33% 33% 33% 33%;

}

#form_borders {
  right: 1rem;
}

#form_background {
  width: 25%;
  height: 25%;
  right: 0;
}

#form * {
  margin: 5px 10% 15px 10%;
  right: 0
}

.active {
  animation-name: extend;
  animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  /* Chrome 16+, Safari 4+ */
  -moz-animation-fill-mode: forwards;
  /* FF 5+ */
  -o-animation-fill-mode: forwards;
  /* Not implemented yet */
  -ms-animation-fill-mode: forwards;
  /* IE 10+ */
  animation-fill-mode: forwards;
  /* When the spec is finished */
  border-radius: 11% 11% 11% 11% / 11% 11% 11% 11%;
}


@keyframes extend {
  from {
    width: 50%;
    height: 50%;
  }

  to {
    width: 100%;
    height: 100%;
  }
}
</style>
