<template>
  <div class="row justify-center">
    <div class="text-h2 q-my-lg text-center">Update Administrator</div>
  </div>
  <q-separator inset color="blue" />

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
        autogrow
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type the password',
        ]"
      />

      <div class="row justify-right">
        <q-btn label="Submit" type="submit" class="col-12 q-mt-sm" color="primary" />
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
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import {useQuasar} from "quasar";

export default {
  name: "AdministratorAddView",

  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar()
    const administratorToUpdate = ref(null);

    const name = ref("");
    const surname = ref("");
    const password = ref("");
    const username = ref("");

    onMounted(() => {
      const administrator = computed(
        () => store.getters["administration/getElement"]
      );
      if(administrator.value == null) router.push("/administrators-list")
      administratorToUpdate.value = administrator.value;
      name.value = administrator.value.name;
      surname.value = administrator.value.surname;
      password.value = administrator.value.password;
      username.value = administrator.value.username;
    });

    return {
      name,
      surname,
      password,
      username,
      administratorToUpdate,
      async onSubmit() {
        const administratorData = {
          name: name.value,
          surname: surname.value,
          username: username.value,
          password: password.value,
          id: administratorToUpdate.value.id,
        };
        try {
          const administratorService = new AdministratorService();
          const {ok, error} = await administratorService.updateAdministrator(administratorData);
          if(ok){
            $q.notify({ type: 'positive', message: 'The Administrator has been updated', color: 'blue' })
            router.push("/administrators-list");
          } else{
            router.push("/administrators-list");
            //Swal.fire("Error founded!", "Email already in use!", "warning");
            //username.value = null;
          }

        } catch (error) {
          console.log(error);
        }
      },
      onReset() {
        emptyForm();
      },
    };
  },
};
</script>
