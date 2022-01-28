<template>
    <div class>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    v-model="state.form.values.email"
                    id="inputEmail"
                />
                <!-- <small class="text-danger" v-if="formErrors.email">{{ formErrors.email }}</small> -->
                <AlertError class="my-1" :error="state.form.errors.email"></AlertError>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    v-model="state.form.values.password"
                    id="inputPassword"
                />
                <AlertError class="my-1" :error="state.form.errors.password"></AlertError>
            </div>

            <button
                type="submit"
                class="btn btn-outline-primary float-end mb-4"
                @click="handleLogin()"
            >Submit</button>
        </form>
    </div>
</template>

<script setup>
import AlertError from '../Errors/AlertError.vue';
import AuthService from "../../services/AuthService.js";
import Helpers from "../../Helpers.js";
import { reactive, defineComponent } from 'vue';
import router from '../../router';
import { useStore } from "vuex";

defineComponent({ AlertError })

const store = useStore();
const state = reactive({
    form: {
        values: {
            email: "",
            password: ""
        },
        errors: {
            email: "",
            password: ""
        }
    }
});


async function handleLogin() {
    // AuthService.check().then(r => console.log(r));
    // AuthService.logout().then(r => console.log(r));


    AuthService.login(state.form.values.email, state.form.values.password)
        .then((r) => {
            if (r.status == 200) {
                router.go("/");
            } else {
                state.form.errors.email = Helpers.errorMessageAccessor(r.data, "email");
                state.form.errors.password =
                    Helpers.errorMessageAccessor(r.data, "password");
            }
        })





    store;
    // store.dispatch("auth/login", formValues.value).then(({ data, statusText }) => {
    //     if (data.email || data.password) {
    //         formErrors.value.email = "email" in data ? data.email[0] : null;
    //         formErrors.value.password = "password" in data ? data.password[0] : null;
    //     } else if (data.error_message) formErrors.value.password = data.error_message;

    //     if (statusText.toLowerCase() == "ok") {
    //         window.location = "/";
    //     }
    // })
}
</script>