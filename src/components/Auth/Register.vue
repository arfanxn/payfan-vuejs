<template>
    <div>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="inputFullname" class="form-label">Fullname</label>
                <input
                    type="text"
                    class="form-control"
                    id="inputFullname"
                    v-model="state.form.values.fullname"
                />
                <AlertError
                    class="mt-1"
                    @close="v$.$reset()"
                    :error="v$?.form?.values?.fullname?.$errors[0]?.$message"
                ></AlertError>
            </div>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    v-model.lazy="state.form.values.email"
                />
                <AlertError
                    class="mt-1"
                    @close="v$.$reset()"
                    :error="v$?.form?.values?.email?.$errors[0]?.$message"
                ></AlertError>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="inputPassword"
                    v-model="state.form.values.password"
                />
                <AlertError
                    class="mt-1"
                    @close="v$.$reset()"
                    :error="v$?.form?.values?.password?.$errors[0]?.$message"
                ></AlertError>
            </div>
            <div class="mb-3">
                <label for="inputConfPassword" class="form-label">Confirm Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="inputConfPassword"
                    v-model="state.form.values.password_confirmation"
                />
                <AlertError
                    class="mt-1"
                    @close="v$.$reset()"
                    :error="v$?.form?.values?.password_confirmation?.$errors[0]?.$message"
                ></AlertError>
            </div>
            <button
                type="submit"
                class="btn btn-outline-primary float-end mb-4"
                @click="handleRegister()"
            >Submit</button>
        </form>
    </div>
</template>

<script setup>
import AlertError from '../Errors/AlertError.vue';
import AuthService from '../../services/AuthService';
import { reactive, defineComponent } from 'vue';
import router from '../../router';
import SwalPlugin from '../../plugins/SwalPlugin';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators';
import ValidatorService from '../../services/ValidatorService';
defineComponent({ AlertError });
const state = reactive({
    form: {
        values: {
            fullname: "",
            email: "",
            password: "",
            password_confirmation: ""
        }
    }
});
const rules = {
    form: {
        values: {
            fullname: { required, minLength: minLength(2) },
            email: {
                required, email, $lazy: true, isUnique: helpers.withMessage("Email has been taken!",
                    helpers.withAsync(ValidatorService.isEmailTaken))
            },
            password: { required, minLength: minLength(6) },
            password_confirmation: {
                required, minLength: minLength(6),
                sameAsPassword: helpers.withMessage("Password must match!", () => state.form.values.password == state.form.values.password_confirmation)
            }
        }
    }
};
const v$ = useVuelidate(rules, state);

async function handleRegister() {
    const validator = await v$.value.$validate(); // validate
    if (!validator) return;

    // handle the registration ;
    const formValues = state.form.values;

    SwalPlugin.showLoading();
    AuthService.createVerificationCode(formValues.email).then(() => {
        SwalPlugin.close();
        SwalPlugin.verificationCode("Verify your account", verificationCode => {
            AuthService.register(formValues.fullname, formValues.email,
                formValues.password, formValues.password_confirmation,
                verificationCode).then(r => {
                    if (r.status == 201) {
                        SwalPlugin.autoCloseAlert('Account verified successfully',
                            '<h5>Please wait a few seconds, we are redirecting you to your Dashboard.</h5>', "info", 2000)
                            .then(result => {
                                if (result.dismiss) {
                                    router.go('/');
                                }
                            });
                    }
                    return r;
                });
        }, formValues.email);
    });
}
</script>    