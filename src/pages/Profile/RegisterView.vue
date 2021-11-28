<template>
  <q-page>
    <div class="row justify-center">
      <div class="text-h2 q-my-lg text-center">Register Form</div>
    </div>
    <q-separator inset />
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-mt-lg"
    >
      <div class="row q-px-lg justify-center">
        <div class="col-4">
          <q-input
            class="q-mx-md"
            v-model="userForm.username"
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
            v-model="userForm.email"
            filled
            type="email"
            hint="Email"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
              isValidEmail,
            ]"
          />
        </div>
      </div>
      <div class="row q-px-lg justify-center">
        <div class="col-4">
          <q-input
            class="q-mx-md"
            v-model="userForm.password"
            filled
            :type="isPwd ? 'password' : 'text'"
            hint="Password"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
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

      <div class="row q-px-lg justify-center">
        <div class="col-12 text-center q-pl-lg q-pt-md">
          <span class="subtitle1 text-weight-bold">Preferred Language:</span>
          <q-radio
            v-model="userForm.preferredLanguage"
            val="EN"
            label="English"
          />
          <q-radio
            v-model="userForm.preferredLanguage"
            val="CA"
            label="Catalan"
          />
          <q-radio
            v-model="userForm.preferredLanguage"
            val="ES"
            label="Spanish"
          />
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-8">
          <q-toggle
            class="col-8 q-pl-lg"
            v-model="accept"
            label="I accept the license and terms"
          />
        </div>
      </div>
      <div class="row q-px-lg justify-center">
        <div class="col-8 q-pl-lg q-mt-md">
          <q-btn
            icon-right="send"
            label="Register"
            type="submit"
            color="primary"
          />

          <q-btn label="Reset" type="reset" color="secondary" class="q-ml-sm" />
        </div>
      </div>
      <div class="row q-px-lg justify-center">
        <div
          class="
            col-8
            text-subtitle2 text-left
            align-center
            text-weight-bold text-blue
            q-ma-lg
            cursor-pointer
          "
          @click="goToLogin"
        >
          Registered? Login instead
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
export default defineComponent({
  name: "RegisterView",
  setup() {
    const router = useRouter();
    const store = useStore();
    const accept = ref(false);
    const userForm = ref({
      username: "",
      surname: "",
      password: "",
      preferredLanguage: "EN",
      address: "",
      email: "",
      nif: "",
    });
    const createUser = async (user) => {
      const resp = await store.dispatch("user/createUser", user);
      return resp;
    };
    const emptyForm = () => {
      userForm.value.username = "";
      userForm.value.surname = "";
      userForm.value.password = "";
      userForm.value.preferredLanguage = "EN";
      userForm.value.address = "";
      userForm.value.email = "";
      userForm.value.nif = "";
    };
    return {
      userForm,
      emptyForm,
      isPwd: ref(true),
      accept,
      createUser,
      isValidEmail: (val) => {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || "Please introduce a valid email";
      },
      goToLogin: () => {
        router.push("/login");
      },
      onSubmit: async () => {
        if (accept.value !== true) {
          Swal.fire(
            "Warning!",
            "You should accept the terms and conditions in order to register",
            "warning"
          );
        } else {
          const { ok, message } = await createUser(userForm.value);
          if (ok) {
            Swal.fire(
              "Succesful register",
              "You are logged into the system",
              "success"
            );
            router.push("/");
          } else {
            Swal.fire("Error", message, "error");
          }
        }
      },
      onReset: () => {
        emptyForm();
      },
    };
  },
});
</script>
