<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row" style="width: 500px; max-width: 600px">
      <q-form @submit="onSubmit" class="q-gutter-md full-width">
        <q-input
          filled
          v-model="userForm.identifier"
          label="Your email *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your email',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="userForm.password"
          label="Your password *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your password',
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
      <div
        class="text-subtitle2 text-weight-bold text-blue q-mt-lg cursor-pointer"
        @click="goToRegister"
      >
        Not registered yet? Register now
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import UserService from "../../services/Profile/user.service";
export default defineComponent({
  name: "LoginView",
  setup() {
    const router = useRouter();
    const userForm = ref({
      password: "",
      identifier: "",
    });
    const check = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { id } = jwtDecode(token);
      const user = await new UserService().getUserById(id);
    };
    check();
    const loginUser = async (user) => {
      const resp = await store.dispatch("user/signInUser", user);
      return resp;
    };
    return {
      userForm,
      goToRegister: () => router.push("/register"),
      onSubmit: async () => {
        const { ok, message } = await loginUser(userForm.value);
        if (!ok) Swal.fire("Error", message, "error");
        else router.push("/");
      },
    };
  },
});
</script>
