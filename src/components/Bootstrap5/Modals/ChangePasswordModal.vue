<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button id="btn-modal-change-password" type="button" class="btn d-none btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-change-password">Launch demo modal</button>

        <!-- Modal -->
        <div class="modal fade" id="modal-change-password" tabindex="-1" aria-labelledby="modal-change-password"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button id="btn-close-modal-change-password" type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column text-center">
                        <h2 class="fw-light">Change your password</h2>

                        <form @submit.prevent class="text-start mt-4" autocomplete="off">
                            <div class="mb-3">
                                <label for="inputCurrentPassword" class="form-label">Confirm your current
                                    password</label>
                                <input autocomplete="off" v-model.lazy="state.current_password" type="password"
                                    class="form-control" placeholder="Current password" id="inputCurrentPassword" />
                                <AlertError class="mt-1" @close="v$.$reset()"
                                    :error="v$?.current_password?.$errors[0]?.$message"></AlertError>
                            </div>
                            <div class="mt-4">
                                <div id="emailHelp" class="form-text text-dark mb-2">Enter your new password (Keep your
                                    account more secure. Don't use your name.)</div>
                                <input v-model.lazy="state.password" type="password" class="form-control"
                                    id="newPassword" placeholder="New password" />
                                <AlertError class="mt-1" @close="v$.$reset()"
                                    :error="v$?.password?.$errors[0]?.$message"></AlertError>

                                <input v-model.lazy="state.password_confirmation" type="password"
                                    class="form-control mt-3" id="newPasswordConfirmation"
                                    placeholder="Confirm new password" />
                                <AlertError class="mt-1" @close="v$.$reset()"
                                    :error="v$?.password_confirmation?.$errors[0]?.$message"></AlertError>
                            </div>
                            <button @click.prevent="changePassword" type="button"
                                class="btn btn-primary fw-bold rounded-pill text-white w-100 mt-4">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import AlertError from '../../Errors/AlertError.vue';
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";
import { reactive, defineComponent } from "vue";
import AuthService from "../../../services/AuthService";
import UserService from '../../../services/UserService';
import SwalPlugin from '../../../plugins/SwalPlugin';
import ValidatorService from '../../../services/ValidatorService';
import Helpers from '../../../Helpers';
defineComponent({
    AlertError
});

const state = reactive({
    current_password: "",
    password: "",
    password_confirmation: "",
});

const v$ = useVuelidate({ // rules
    current_password: {
        required, $lazy: true,
        sameAsCurrentPassword: helpers.withMessage("Wrong password!", helpers.withAsync(ValidatorService.passwordCheck))
    },
    password: { required, minLength: minLength(8) },
    password_confirmation: {
        required, minLength: minLength(8),
        sameAsPassword:
            helpers.withMessage("Password must match!", () => state.password == state.password_confirmation)
    }
}, state)

async function changePassword() {
    const validator = await v$.value.$validate();
    if (!validator) return;

    AuthService.createVerificationCode().then(() => {
        Helpers.closeBSModal(`#btn-close-modal-change-password`).then(() => {
            SwalPlugin.verificationCode("Verify to update password", async verificationCode => {
                return await UserService.updatePassword(state.current_password, state.password, state.password_confirmation, verificationCode)
                    .then(r => {
                        if (r.status == 200) {
                            SwalPlugin.autoCloseAlert("Password updated successfully", null, "success", 1000);
                        }
                        return r;
                    });
            })
        })
    });
}

</script>
