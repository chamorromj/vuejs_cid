<template>
  <q-page>
    <div class="row justify-center">
      <div class="text-h2 q-my-lg text-center">Update User Data</div>
    </div>
    <q-separator inset color="blue" />
    <q-form @submit="onSubmit" class="q-gutter-md q-mt-lg">
      <div class="row q-px-lg justify-center">
        <div class="col-4">
          <q-input
            class="q-mx-md"
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
        <div class="col-4">
          <q-input
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
        <div class="col-4">
          <q-input
            class="q-mx-md"
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
        <div class="col-4">
          <q-input
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
        <div class="col-4 text-center">
          <q-btn
            color="primary"
            icon-right="password"
            label="Change Password"
            @click="changePassword = true"
          />
        </div>
        <div class="col-4">
          <q-input
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
      </div>
      <div class="row q-px-lg justify-center" v-if="changePassword">
        <div class="col-4">
          <q-input
            class="q-mx-md"
            v-model="userForm.password"
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
        <div class="col-4">
          <q-input
            class="q-mx-md"
            v-model="password2"
            filled
            type="password"
            hint="Repeat Password"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
              matchsWithPassword1,
            ]"
          />
        </div>
      </div>
      <div>
        <q-input class="hidden" v-model="userForm.id" />
      </div>

      <div class="row q-px-lg justify-center">
        <div class="col-12 text-center q-pl-lg q-pt-md">
          <span class="subtitle1 text-weight-bold">Preferred Language:</span>
          <q-radio v-model="userForm.languageId" val="1" label="English" />
          <q-radio v-model="userForm.languageId" val="3" label="Catalan" />
          <q-radio v-model="userForm.languageId" val="2" label="Spanish" />
        </div>
      </div>

      <div class="row q-px-lg justify-center">
        <div class="col-8 q-pl-lg q-mt-md">
          <q-btn
            icon-right="send"
            label="Submit changes"
            type="submit"
            color="primary"
          />

          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import UserService from "src/services/Profile/user.service";
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
export default defineComponent({
  name: "UpdateUserView",
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.getters["user/getUser"]);
    const changePassword = ref(false);
    const password2 = ref("");
    const userForm = ref({
      name: user.value.name,
      surname: user.value.surname,
      password: user.value.password,
      languageId: user.value.languageId,
      address: user.value.address,
      username: user.value.username,
      nif: user.value.nif,
      id: user.value.id,
    });
    const updateUser = async (user) => {
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
      userForm.value.password.value = "";
    };
    return {
      user,
      userForm,
      resetForm,
      changePassword,
      updateUser,
      password2,
      isPwd: ref(true),
      async onSubmit() {
        const { ok, message } = await updateUser(userForm.value);
        if (!ok) Swal.fire("Error", message, "error");
        else Swal.fire("Succesful!", "Your data has been updated", "success");
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
      matchsWithPassword1(val) {
        return val == formData.password;
      },
      goToLogin() {
        router.go("/login");
      },
    };
  },
});
</script>
