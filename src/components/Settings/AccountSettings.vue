<template>
    <div class>
        <div class="pt-3 px-4 pb-4">
            <h5>Profile</h5>
            <div class="d-flex mt-3">
                <div class="text-center pe-3">
                    <img
                        v-if="userStore.self.profile_pict"
                        @click="updateProfilePict"
                        class="rounded-circle update-profile-pict-img mb-2"
                        :src="userStore.self.profile_pict"
                    />
                    <small
                        @click="updateProfilePict"
                        class="cursor-pointer text-navy hover-underline"
                    >Update&nbsp;Photo</small>
                </div>
                <div class="w-100">
                    <h5 v-if="!state.current.isChangeName">{{ userStore.self.name }}</h5>
                    <input
                        v-else
                        @blur="saveChangeName"
                        placeholder="Your new name"
                        v-model="userStore.self.name"
                        class="form-control"
                        type="text"
                    />
                    <AlertError
                        class="mt-1 mb-1 d-block"
                        @close="v$.$reset()"
                        :error="v$?.name?.$errors[0]?.$message"
                    ></AlertError>
                    <div class="d-flex justify-content-between">
                        <span class="text-secondary">Joined at {{ userStore['self/joined_at'] }}</span>
                        <a
                            v-show="!state.current.isChangeName"
                            @click.prevent="state.current.isChangeName = true"
                            class="cursor-pointer fw-bold text-navy hover-underline"
                        >Change name</a>
                        <a
                            v-show="state.current.isChangeName"
                            @click.prevent="state.current.isChangeName = false"
                            class="cursor-pointer fw-bold text-danger hover-underline"
                        >Cancel</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-light py-3 px-0"></div>

        <div class="pt-3 px-4 pb-4">
            <h5>Email</h5>
            <div class="d-flex mt-3 justify-content-between mb-2">
                <span v-if="!state.current.isChangeEmail">{{ userStore.self.email }}</span>
                <div class="d-flex flex-column w-100">
                    <input
                        v-if="state.current.isChangeEmail"
                        @blur="saveChangeEmail"
                        placeholder="Your new email"
                        v-model.lazy="userStore.self.email"
                        class="form-control"
                        type="text"
                    />
                    <AlertError
                        class="mt-1 mb-1"
                        @close="v$.$reset()"
                        :error="v$?.email?.$errors[0]?.$message"
                    ></AlertError>
                </div>
                <a
                    v-show="!state.current.isChangeEmail"
                    @click="state.current.isChangeEmail = true"
                    class="cursor-pointer fw-bold text-navy hover-underline"
                >Change&nbsp;email</a>
            </div>
            <div class="d-flex justify-content-between">
                <small
                    class="text-secondary"
                >To update an email address, you must verify your new email address.</small>
                <a
                    v-show="state.current.isChangeEmail"
                    @click.prevent="state.current.isChangeEmail = false"
                    class="cursor-pointer fw-bold text-danger hover-underline"
                >Cancel</a>
            </div>
        </div>
        <UpdateProfilePictModal />
    </div>
</template>

<script setup>

import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { computed, defineComponent, reactive } from "vue";
import AlertError from "../Errors/AlertError.vue";
import ValidatorService from "../../services/ValidatorService";
import SwalPlugin from "../../plugins/SwalPlugin";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import UpdateProfilePictModal from "../Bootstrap5/Modals/UpdateProfilePictModal.vue";
import Swal from "sweetalert2";
import Helpers from "../../Helpers";
import { useUserStore } from "@/stores/UserStore.js";
defineComponent({ AlertError, UpdateProfilePictModal });
const userStore = useUserStore();

const state = reactive({
    current: {
        isChangeName: false,
        isChangeEmail: false,
    }
});
const v$ = useVuelidate({ // rules  
    name: { required, minLength: minLength(2) },
    email: {
        required, email, $lazy: true, isUnique: helpers.withMessage("Email has been taken!",
            helpers.withAsync(ValidatorService.isEmailTakenExceptSelf))
    }
}, computed(() => userStore.self));

function updateProfilePict() {
    Helpers.triggerBSModal("#btn-modal-update-profile-pict");
}

async function saveChangeName() {
    const validator = await v$.value.$validate(); // validate
    if (!validator) return;

    UserService.updateFullname(userStore.self.name).then(r => {
        if (r.status == 200) {
            SwalPlugin.autoCloseAlert("Name updated successfully", null, "success", 1000);
        }
    });

    // set cureently is change name/email to false again 
    state.current.isChangeName = false;
}

async function saveChangeEmail() {
    const validator = await v$.value.$validate(); // validate
    if (!validator) return;

    // set cureently is change email to false again 
    state.current.isChangeEmail = false;

    AuthService.createVerificationCode(userStore.self.email).then(() => {
        SwalPlugin.verificationCode("Verify your new Email", verificationCode => {
            UserService.updateEmail(userStore.self.email, verificationCode).then(r => {
                if (r.status == 200) {
                    SwalPlugin.autoCloseAlert("Email updated successfully", null, "success", 1000);
                } else if (ValidatorService.statusTextIsVerifyCodeMiddleware(r.statusText)) {
                    if ("verification_code_error_message" in r.data)
                        Swal.showValidationMessage(`${r.data.verification_code_error_message}`);
                }
            });
        }, userStore.self.email);
    })
}
</script>


<style scoped>
.update-profile-pict-img {
    height: 100px;
    width: 100px;
}
</style>