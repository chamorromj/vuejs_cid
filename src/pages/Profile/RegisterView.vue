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
        <div class="col-12 col-md-4">
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
        <div class="col-12 col-md-4">
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
        <div class="col-12 col-md-4">
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
        <div class="col-12 col-md-4">
          <q-input
            class="q-mx-md q-mb-xs"
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
        <div class="col-12 col-md-4">
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
      </div>

      <div class="row q-px-lg justify-center">
        <div class="col-12 text-center q-pl-lg q-pt-md">
          <span class="subtitle1 text-weight-bold">Preferred Language:</span>
          <q-option-group
            spread
            v-model="userForm.languageId"
            :options="languages"
            color="primary"
            inline
          />
        </div>
      </div>
      <div class="row justify-center col-12 col-md-8">
          <q-checkbox
            v-model="accept"
          /><div class="cursor-pointer q-pt-sm text-grey text-subtitle2" >I accept the <span @click="show_terms=true" class="text-primary text-bold">Terms and Conditions</span>
      </div>
      </div>
      <q-dialog v-model="show_terms">
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
            <div class="text-h6">Terms and Conditions</div>
          </q-card-section>
          <q-separator inset/>
          <q-card-section class="q-mt-sm">
            This webapp has the standard terms and conditions. For education purposes only.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="CLOSE"
              color="primary"
              dense
              v-close-popup
            ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="row q-px-lg justify-center">
<!--        <div class="col-12 col-md-8 q-pl-lg q-mt-md">-->

          <q-btn
            class="col-12 col-md-8 q-my-sm q-mx-sm"
            icon-right="send"
            label="Register"
            type="submit"
            color="primary"
          />

          <q-btn label="Reset" type="reset" color="blue" class="col-12 col-md-8 q-my-sm q-mx-sm" />
          <q-btn label="Cancel" type="button" color="secondary" class="col-12 col-md-8 q-my-sm q-mx-sm" to="/"/>
        </div>
<!--      </div>-->
        <div
          class="
            col-12 col-md-8
            text-subtitle2
            text-center
            text-weight-bold text-blue
            q-ma-lg
            cursor-pointer
          "
          @click="goToLogin"
        >
          Registered? Login instead
        </div>

    </q-form>
  </q-page>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import {useStore} from "vuex"
import UserService from "src/services/Profile/user.service";
import {Notify, useQuasar} from "quasar";

export default defineComponent({
  name: "RegisterView",

  setup() {
    const router = useRouter();
    const store = useStore();
    const accept = ref(false);
    const languages = ref([]);
    const $q = useQuasar()
    const userService = new UserService();
    const userForm = ref({
      name: "",
      surname: "",
      password: "",
      username: "",
      languageId: 3,
      address: "",
      nif: "",
    });

    onMounted(async ()=>{
      const langs = await userService.getLanguages();
      for (let language of langs){
        languages.value.push({value: language.id, label: language.name})
      }
    })

    const createUser = async (user) => {
      const resp = await store.dispatch("user/createUser", user);
      return resp;
    };

    const emptyForm = () => {
      userForm.value.name = "";
      userForm.value.surname = "";
      userForm.value.password = "";
      userForm.value.languageId = 3;
      userForm.value.address = "";
      userForm.value.username = "";
      userForm.value.nif = "";
    };

    return {
      languages,
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
          const ok = await createUser(userForm.value);
          if (!ok) {
            Notify.create({
              type: 'warning', message: "The username is in use. Try with another"
            })
            userForm.value.username = null
          }
          else {
            $q.notify({ type: 'positive', message: 'Great! Your user has been created and you are now logged in the system', color: 'blue' })

            router.push("/");
          }


        }
      },
      onReset: () => {
        emptyForm();
      },
      show_terms: ref(false)
    };
  },
});
</script>
