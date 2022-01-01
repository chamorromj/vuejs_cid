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

      <div class="col-12 col-md-4 ">
        <q-btn
          class="q-mx-md q-mb-xs"
          color="primary"
          icon-right="password"
          label="Open to Change the Password"
          @click="changePassword = !changePassword"
        />
      </div>

      <q-dialog class="row q-px-lg justify-center" v-model="changePassword">
        <q-card style="width: 600px">
          <q-card-section>
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
            <div class="text-h6">Introduce the new password</div>
          </q-card-section>
          <q-separator inset></q-separator>
          <q-card-section class="q-pt-none">
            <q-form class="q-gutter-md">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-input
                      class="q-mx-md q-mb-xs"
                      v-model="password1"
                      filled
                      type="password"
                      hint="Password"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-input
                      class="q-mx-md q-mb-xs"
                      v-model="password2"
                      filled
                      type="password"
                      hint="Repeat Password"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <div v-if="passwordsDontMatch" class="text-red-9 text-center text-bold">The passwords don't match</div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-card-actions align="center">
              <q-btn
                class="col-12 col-md-8 q-my-sm q-mx-sm"
                label="Change password"
                color="primary"
                @click="saveNewPassword"
              />
            </q-card-actions>
          </q-card-section>
        </q-card
        >
      </q-dialog>

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
    const router = useRouter()
    const store = useStore()
    const $q = useQuasar()
    const administratorToUpdate = ref(null)
    let password1 = ref('')
    let password2 = ref('')
    let passwordsDontMatch = computed (() => password1.value != password2.value)
    const changePassword = ref(false)
    const name = ref("")
    const surname = ref("")
    const password = ref("")
    const username = ref("")

    onMounted(() => {
      getAdministratorData()
    });

    const getAdministratorData = () =>{
      const administrator = computed(
        () => store.getters["administration/getElement"]
      );
      if(administrator.value == null) router.push("/administrators-list")
      administratorToUpdate.value = administrator.value
      name.value = administrator.value.name
      surname.value = administrator.value.surname
      password.value = administrator.value.password
      username.value = administrator.value.username
    }

    const saveNewPassword = () => {
      updateAdministrator()
      changePassword.value = false
      $q.notify({ type: 'positive', message: 'The password has been updated correctly', color: 'blue' })
    }

    const updateAdministrator = async () =>{
        const administratorData = {
          name: name.value,
          surname: surname.value,
          username: username.value,
          password: password1.value,
          id: administratorToUpdate.value.id,
        };
        try {
          const administratorService = new AdministratorService()
          const ok = await administratorService.updateAdministrator(administratorData)
          return ok

        } catch (error) {
          console.log(error)
        }
      }

      const emptyForm = ()=>{
        name.value = ''
        surname.value = ''
        password1.value = ''
        password2.value = ''
        username.value = ''
      }

    return {
      name,
      surname,
      password,
      username,
      administratorToUpdate,
      password1,
      password2,
      passwordsDontMatch,
      changePassword,
      saveNewPassword,
      getAdministratorData,
      updateAdministrator,
      async onSubmit() {
        const ok = await updateAdministrator()
        if(ok){
          $q.notify({ type: 'positive', message: 'The Administrator has been updated', color: 'blue' })
          await router.push("/administrators-list");
        } else{
          $q.notify({ type: 'warning', message: 'Email already in use!'})
          getAdministratorData()
        }},
      onReset() {
        emptyForm()
      },
    };
  },
};
</script>

