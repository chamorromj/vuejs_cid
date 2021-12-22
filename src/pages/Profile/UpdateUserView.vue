<template>
  <q-page>
    <div class="row justify-center">
      <div class="text-h2 q-my-lg text-center">Update User Data</div>
    </div>
    <q-separator inset color="blue" />
    <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg">
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
      <div class="row q-px-lg justify-center" v-if="changePassword">
        <div class="col-12 col-md-4 ">
          <q-input
            class="q-mx-md q-mb-xs"
            v-model="password1"
            filled
            type="password"
            hint="Password"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
            ]"
          />
        </div>
        <div class="col-12 col-md-4 ">
          <q-input
            class="q-mx-md q-mb-xs"
            v-model="password2"
            filled
            type="password"
            hint="Repeat Password"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please repeat your password',
              isSamePassword,
            ]"
          />
        </div>
      </div>

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
    const changePassword = ref(false);
    let password1 = ''
    let password2 = ''
    const languages = ref([]);


    onBeforeMount(async ()=>{
      if (!user.value){
        user.value = userService.getUserById(route.params.id)
        console.log(user.value)
      }

      const langs = await userService.getLanguages();
      if(langs){
        for (let language of langs){
          languages.value.push({value: language.id, label: language.name})
        }
      }
    })
    const userForm = ref({
      name: user.value.name,
      surname: user.value.surname,
      password: user.value.password,
      languageId: user.value.languageId,
      address: user.value.address,
      username: user.value.username,
      nif: user.value.nif,
      id: user.value.id,
      roleId: user.value.roleId
    });


    const updateUser = async (user) => {
      console.log(user)
      const resp = await store.dispatch("user/updateUser", user);
      return resp;
    };
    const resetForm = () => {
      userForm.value.address.value = user.value.address;
      userForm.value.surname.value = user.value.surname;
      userForm.value.languageId.value = user.value.languageId;
      userForm.value.nif.value = user.value.nif;
      userForm.value.username.value = user.value.username;
      userForm.value.name.value = user.value.name;
      // userForm.value.password.value = user.value.password;
    };
    return {
      user,
      languages,
      userForm,
      resetForm,
      password1,
      password2,
      changePassword,
      updateUser,
      isPwd: ref(true),
      async onSubmit() {
        if(password1!==''){
          userForm.value.password = password1
        }
        const { ok, message } = await updateUser(userForm.value);
        if (!ok) Swal.fire("Error", message, "error");
        else $q.notify({ type: 'positive', message: 'Your data has been updated correctly', color: 'blue' })
        router.push("/");
      },
      onReset() {
        resetForm();
      },
      isValidEmail(val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || "Please introduce a valid email";
      },
      isSamePassword(val) {
        return (val !== password1) || 'Passwords do not match'
      },
      goToLogin() {
        router.go("/login");
      },
    };
  },
});
</script>
