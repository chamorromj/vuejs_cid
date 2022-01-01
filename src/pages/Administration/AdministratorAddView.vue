<template>
  <div class="row justify-center">
    <div class="text-h2 q-my-lg text-center align-center col-8">
      New Administrator
    </div>
  </div>
  <q-separator inset />

  <div class="row q-pa-md justify-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md col-xs-12 col-md-8 q-py-md"
      autofocus
    >
      <q-input
        filled
        type="text"
        v-model="name"
        label="Name"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type the name',
        ]"
      />

      <q-input
        filled
        autogrow
        type="text"
        v-model="surname"
        label="Surname"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type the surname',
        ]"
      />

      <q-input
        filled
        type="email"
        v-model="username"
        label="Email"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type the email',
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type the password',
        ]"
      />

      <div class="row justify-between">
        <q-btn label="Submit" type="submit" class="col-12 q-mt-sm" color="primary" />
        <q-btn label="Reset" type="reset" class="col-12 q-mt-sm" color="blue" />
        <q-btn
          label="Cancel"
          type="button"
          color="secondary"
          to="/administrators-list"
          class="col-12 q-mt-sm"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import AdministratorService from "../../services/Administration/administrator.service";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import {useQuasar} from "quasar";

export default {
  name: "AdministratorAddView",

  setup() {
    const name = ref(null);
    const surname = ref(null);
    const username = ref(null);
    const password = ref(null);
    const router = useRouter();
    const $q = useQuasar()

    return {
      name,
      surname,
      password,
      username,
      async onSubmit() {
        const administrator = {
          name: name.value,
          surname: surname.value,
          username: username.value,
          password: password.value,
        };
        try {
          const administratorService = new AdministratorService();
          const ok = await administratorService.addAdministrator(administrator)
          if(ok){
            $q.notify({ type: 'positive', message: 'The new Administrator has been created', color: 'blue' })
            await router.push("/administrators-list")
          } else {
            $q.notify({ type: 'warning', message: 'The username is in use. Introduce another email'})
            username.value = ''
          }

        } catch (error) {
          console.log(error);
        }
      },
      onReset() {
        name.value = null;
        surname.value = null;
        username.value = null;
        password.value = null;
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
