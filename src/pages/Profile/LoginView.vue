<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row">
      <q-form @submit="onSubmit" class="q-gutter-md col-12">
        <q-input
          filled
          v-model="userForm.username"
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
          @keydown.enter="onSubmit"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your password',
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" class="full-width q-mb-sm"  color="primary" />
          <q-btn label="Cancel" type="button" class="full-width" color="secondary" to="/"/>
        </div>
      </q-form>
      <div
        class="col-12 col-md-8
            text-subtitle2
            text-center
            text-weight-bold text-blue
            q-mt-lg
            cursor-pointer
          "
        @click="goToRegister"
        @keydown.enter="goToRegister"
      >
        Not registered yet? Register now
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar'
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginView",
  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar()
    const userForm = ref({
      username: "",
      password: "",
    });

   const loginUser = async (user) => {
      return await store.dispatch("user/signInUser", user)
    };

    return {
      userForm,
      loginUser,
      goToRegister: () => router.push("/register"),
      onSubmit: async () => {
        const ok = await loginUser(userForm.value)
        if (!ok){
          $q.notify({ type: 'warning', message: 'You have entered an invalid username or password' })
        }
        else {
          $q.notify({ type: 'positive', message: 'You are logged in the system', color: 'blue' })
          await router.push("/");
        }
      },
    };
  },
});
</script>
