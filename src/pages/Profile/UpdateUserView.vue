<template>
  <q-page>
    <div class="row justify-center">
      <div class="text-h2 q-my-lg text-center">Update User Data</div>
    </div>
    <q-separator inset color="blue" />
    <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg" @keydown.enter="onSubmit">
      <div class="row q-px-lg justify-center">
        <div class="col-12 col-md-4 ">
          <q-input
            class="q-mx-md q-mb-xs"
            v-model="userForm.name"
            filled
            type="text"
            hint="Name"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your name',
            ]"
          />
        </div>
        <div class="col-12 col-md-4 ">
          <q-input
            class="q-mx-md q-mb-xs"
            v-model="userForm.surname"
            filled
            type="text"
            hint="Surname"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your surname',
            ]"
          />
        </div>
      </div>
      <div class="row q-px-lg justify-center">
        <div class="col-12 col-md-4 ">
          <q-input
            class="q-mx-md q-mb-xs"
            v-model="userForm.nif"
            filled
            type="text"
            hint="NIF"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your NIF',
              (val) => (val.length<=9)||'Max length is 9 characters',
            ]"
          />
        </div>
        <div class="col-12 col-md-4 ">
          <q-input
            class="q-mx-md q-mb-xs"
            v-model="userForm.username"
            filled
            type="email"
            hint="Email"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your email',
              isValidEmail,
            ]"
          />
        </div>
      </div>
      <div class="row q-px-lg justify-center">
        <div class="col-12 col-md-4 ">
          <q-input
            class="q-mx-md q-mb-xs"
            v-model="userForm.address"
            filled
            type="text"
            hint="Address"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your address',
            ]"
          />
        </div>
        <div class="col-12 col-md-4 ">
          <q-btn
            class="q-mx-md q-mb-xs"
            color="primary"
            icon-right="password"
            label="Open to Change the Password"
            @click="changePassword = !changePassword"
          />
        </div>

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
              <q-btn
                class="col-12 col-md-8 q-my-sm q-mx-sm"
                label="CANCEL"
                color="secondary"
                v-close-popup
              />
            </q-card-actions>
          </q-card-section>
        </q-card
        >
      </q-dialog>

      <div>
        <q-input class="hidden" v-model="userForm.id" />
        <q-input class="hidden" v-model="userForm.roleId" />
        <q-input class="hidden" v-model="userForm.password" />

      </div>

      <div class="row q-px-lg justify-center">
        <div class="col-12 text-center q-pl-lg q-pt-md">
          <span class="subtitle1 text-weight-bold">Preferred Language:</span>
          <q-option-group
            v-model="userForm.languageId"
            :options="languages"
            color="primary"
            inline
          />
        </div>
      </div>

      <div class="row q-px-lg justify-center">
        <q-btn
          class="col-12 col-md-8 q-my-sm q-mx-sm"
            icon-right="send"
            label="Submit changes"
            type="submit"
            color="primary"
          />

          <q-btn
            label="Reset"
            type="reset" color="secondary"
            class="q-mx-sm col-12 col-md-8" />
        </div>

    </q-form>
  </q-page>
</template>

<script>
import UserService from "src/services/Profile/user.service";
import {defineComponent, ref, onMounted, computed, onBeforeMount} from "vue";
import {useRoute, useRouter} from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import {useQuasar} from "quasar";
export default defineComponent({
  name: "UpdateUserView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userService = new UserService();
    const store = useStore();
    const $q = useQuasar()
    const user = computed(() => store.getters["user/getUser"]);
    const languages = ref([]);
    const changePassword = ref(false)
    let password1 = ref('')
    let password2 = ref('')
    let passwordsDontMatch = computed (() => password1.value != password2.value)
    const userForm = ref()
    const usernameOriginal = ref('')

    onBeforeMount(async ()=>{
      if (!user.value){
        user.value = userService.getUserById(route.params.id)
      }

      usernameOriginal.value = user.value.username

      const langs = await userService.getLanguages();
      if(langs){
        for (let language of langs){
          languages.value.push({value: language.id, label: language.name})
        }
      }
    })


    const setUserData = () => {
      userForm.value = {
        name: user.value.name,
        surname: user.value.surname,
        languageId: user.value.languageId,
        address: user.value.address,
        username: user.value.username,
        nif: user.value.nif,
        id: user.value.id,
        roleId: user.value.roleId
      };
    }

    setUserData()

    const updateUser = async (user) => {
      if(userForm.value.nif.length>9){
        $q.notify({ type: 'warning', message: 'The length of the field NIF is too large. The maximum is 9 characters'})
        return false
      } else if(userForm.value.username !== usernameOriginal.value) {
        $q.notify({ type: 'warning', message: 'Sorry, changing username is not allowed. Contact the administrator'})
        userForm.value.username = usernameOriginal.value
        return false
      }
      else {
        const ok = await store.dispatch("user/updateUser", user);
        return ok
      }

    };

    const saveNewPassword = () => {
        const userFormPassword = {
          password: password1.value,
          name: user.value.name,
          surname: user.value.surname,
          languageId: user.value.languageId,
          address: user.value.address,
          username: user.value.username,
          nif: user.value.nif,
          id: user.value.id,
          roleId: user.value.roleId
        }
        updateUser(userFormPassword)
        changePassword.value = false

        $q.notify({ type: 'positive', message: 'The password has been updated correctly', color: 'blue' })
    }
    const resetForm = () => {
      userForm.value.address.value = user.value.address;
      userForm.value.surname.value = user.value.surname;
      userForm.value.languageId.value = user.value.languageId;
      userForm.value.nif.value = user.value.nif;
      userForm.value.username.value = user.value.username;
      userForm.value.name.value = user.value.name;
      userForm.value.password.value = user.value.password;
    };
    return {
      user,
      languages,
      userForm,
      resetForm,
      password1,
      password2,
      passwordsDontMatch,
      changePassword,
      usernameOriginal,
      saveNewPassword,
      setUserData,
      updateUser,
      isPwd: ref(true),
      async onSubmit() {
        if(password1.value === ''){
          delete userForm.value.password
        }
        const ok = await updateUser(userForm.value);
        if(ok){
          $q.notify({ type: 'positive', message: 'Your data has been updated correctly', color: 'blue' })
          await router.push("/");
        }

      },
      onReset() {
        resetForm();
      },
      isValidEmail(val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || "Please introduce a valid email";
      },
      goToLogin() {
        router.push("/login");
      },
    };
  },
});
</script>
