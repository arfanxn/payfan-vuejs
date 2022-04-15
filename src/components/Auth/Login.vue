<template>
    <div class>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="state.form.email" id="inputEmail" />
                <AlertError class="mt-1" @close="v$.$reset()" :error="v$.email?.$errors[0]?.$message">
                </AlertError>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="state.form.password" id="inputPassword" />
                <AlertError class="mt-1" @close="v$.$reset()" :error="v$.password?.$errors[0]?.$message">
                </AlertError>
                <AlertError class="mt-1" @close="error_message = ''" :error="error_message"></AlertError>
            </div>

            <div class="d-flex justify-content-between mb-4">
                <!--  -->
                <a @click="() => Helpers.triggerBSModal('#btn-modal-forgot-password')"
                    class="cursor-pointer my-auto text-navy hover-underline fw-bold">Forgot password?
                </a>
                <button type="submit" class="btn btn-outline-primary my-auto" @click="handleLogin()">Submit</button>
                <!--  -->
            </div>
        </form>

        <ForgotPasswordModal />
    </div>
</template>

<script setup>
import AlertError from '../Errors/AlertError.vue';
import AuthService from "../../services/AuthService.js";
import ForgotPasswordModal from "@/components/Bootstrap5/Modals/ForgotPasswordModal.vue";
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { reactive, defineComponent, ref } from 'vue';
import Helpers from "../../Helpers.js";
// import router from '../../router';
import SwalPlugin from '../../plugins/SwalPlugin';
defineComponent({ AlertError, ForgotPasswordModal })

const state = reactive({
    form: {
        email: "",
        password: ""
    }
});
const error_message = ref('');

const v$ = useVuelidate({
    email: { required, email, },
    password: { required, minLength: minLength(8), maxLength: maxLength(50) },
}, state.form);

async function handleLogin() {
    const validator = await v$.value.$validate().then(() => {
        if (v$.value.email?.$errors[0]
            || v$.value.password?.$errors[0]) return false;

        return true;
    });
    if (!validator) return;

    //destructure the form values 
    const { email, password } = state.form;

    SwalPlugin.showLoading(() =>
        AuthService.login(email, password)
            .then((r) => {
                if (r.status == 200) {
                    // router.push("/");
                    window.location.href = "/";
                } else if (r.statusText.toLowerCase() == "require2fa") {
                    AuthService.createVerificationCode(email).then(() => { //send the verification code 
                        SwalPlugin.verificationCode("Verify to Login", async verificationCode => { // open the modal for verify code
                            return await AuthService.login(email, password, verificationCode).then(r => { // handle the login
                                if (r.status == 200) {
                                    // router.push("/");
                                    window.location.href = "/";
                                }

                                return r;
                            })
                        }, email);
                    })
                } else if ("error_message" in r.data) {
                    error_message.value = r.data.error_message;
                }
            })
    )
}
</script>