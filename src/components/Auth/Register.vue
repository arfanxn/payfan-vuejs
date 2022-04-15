<template>
    <div>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="inputFullname" class="form-label">Fullname</label>
                <input type="text" class="form-control" id="inputFullname" v-model="state.form.fullname" />
                <AlertError class="mt-1" @close="v$.$reset()" :error="v$.fullname?.$errors[0]?.$message">
                </AlertError>
            </div>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="inputEmail" v-model.lazy="state.form.email" />
                <AlertError class="mt-1" @close="v$.$reset()" :error="v$.email?.$errors[0]?.$message">
                </AlertError>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="state.form.password" />
                <AlertError class="mt-1" @close="v$.$reset()" :error="v$.password?.$errors[0]?.$message">
                </AlertError>
            </div>
            <div class="mb-3">
                <label for="inputConfPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="inputConfPassword"
                    v-model="state.form.password_confirmation" />
                <AlertError class="mt-1" @close="v$.$reset()" :error="v$.password_confirmation?.$errors[0]?.$message">
                </AlertError>
            </div>
            <button type="submit" class="btn btn-outline-primary float-end mb-4"
                @click="handleRegister()">Submit</button>
        </form>
    </div>
</template>

<script setup>
import AlertError from '../Errors/AlertError.vue';
import AuthService from '../../services/AuthService';
import { reactive, defineComponent } from 'vue';
// import router from '../../router';
import SwalPlugin from '../../plugins/SwalPlugin';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators';
import ValidatorService from '../../services/ValidatorService';
defineComponent({ AlertError });
const state = reactive({
    form: {
        fullname: "",
        email: "",
        password: "",
        password_confirmation: ""
    }
});
const rules = {
    fullname: { required, minLength: minLength(2) },
    email: {
        required, email, $lazy: true, isUnique: helpers.withMessage("Email has been taken!",
            helpers.withAsync(ValidatorService.isEmailTaken))
    },
    password: { required, minLength: minLength(8) },
    password_confirmation: {
        required, minLength: minLength(8),
        sameAsPassword: helpers.withMessage("Password must match!", () => state.form.password == state.form.password_confirmation)
    }
};
const v$ = useVuelidate(rules, state.form);

async function handleRegister() {
    const validator = await v$.value.$validate(); // validate
    if (!validator) return;

    const { fullname, email, password, password_confirmation, } = state.form;

    // handle the registration ;
    SwalPlugin.showLoading();
    AuthService.createVerificationCode(email).then(() => {
        SwalPlugin.close();
        SwalPlugin.verificationCode("Verify your account", async verificationCode => {
            return await AuthService.register(fullname, email,
                password, password_confirmation,
                verificationCode).then(r => {
                    if (r.status == 201) {
                        SwalPlugin.autoCloseAlert('Account registered & verified successfully',
                            '<h5>Please wait a few seconds, we are redirecting you to your Dashboard.</h5>', "success", 2000)
                            .then(result => {
                                if (result.dismiss) {
                                    window.location.href = "/";
                                }
                            });
                    }
                    return r;
                });
        }, email);
    });
}
</script>    