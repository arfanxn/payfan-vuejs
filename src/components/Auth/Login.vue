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
                <AlertError
                    class="mt-1"
                    @close="deleteFormErrorMessage(`email`)"
                    :error="state.form.errors.email"
                ></AlertError>
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
                <AlertError
                    class="mt-1"
                    @close="deleteFormErrorMessage(`password`)"
                    :error="state.form.errors.password"
                ></AlertError>
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
import SwalPlugin from '../../plugins/SwalPlugin';
defineComponent({ AlertError })

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

function deleteFormErrorMessage(key) {
    state.form.errors[key] = null;
}

async function handleLogin() {
    // refresh errors message 
    Object.keys(state.form.errors).forEach(key => state.form.errors[key] = null);

    //cestructure the form values 
    const { email, password } = state.form.values;

    SwalPlugin.showLoading(() =>
        AuthService.login(email, password)
            .then((r) => {
                if (r.status == 200) {
                    router.go("/");
                } else if (r.statusText.toLowerCase() == "require2fa") {
                    AuthService.createVerificationCode(email).then(() => {
                        SwalPlugin.verificationCode("Verify to Login", async verificationCode => {
                            return await AuthService.login(email, password, verificationCode).then(r => {
                                if (r.status == 200) {
                                    router.go("/");
                                }

                                return r;
                            })
                        }, email);
                    })
                } else {
                    state.form.errors.email = Helpers.errorMessageAccessor(r.data, "email");
                    state.form.errors.password =
                        Helpers.errorMessageAccessor(r.data, "password");
                }
            })
    )
}
</script>