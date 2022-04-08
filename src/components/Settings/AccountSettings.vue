<template>
    <div class>
        <div class="pt-3 px-4 pb-4">
            <h5>Profile</h5>
            <div class="d-flex mt-3">
                <div class="text-center pe-3">
                    <img
                        v-if="AuthUserStore.data?.profile_pict"
                        @click="updateProfilePict"
                        class="rounded-circle update-profile-pict-img mb-2"
                        :src="AuthUserStore.data?.profile_pict"
                    />
                    <small
                        @click="updateProfilePict"
                        class="cursor-pointer text-navy hover-underline"
                    >Update&nbsp;Photo</small>
                </div>
                <div class="w-100">
                    <h5 v-if="!state.current.isChangeName">{{ AuthUserStore.data.name }}</h5>
                    <input
                        v-else
                        @blur="saveChangeName"
                        placeholder="Your new name"
                        v-model="AuthUserStore.data.name"
                        class="form-control"
                        type="text"
                    />
                    <AlertError
                        class="mt-1 mb-1 d-block"
                        @close="v$.$reset()"
                        :error="v$?.name?.$errors[0]?.$message"
                    ></AlertError>
                    <div class="d-flex justify-content-between">
                        <span class="text-secondary">
                            Joined in {{
                                Helpers.tap(new Date(AuthUserStore.data?.created_at), (created_at) =>
                                    `${DateHelper.numericMonthtoString(created_at.getMonth())} ${created_at.getFullYear()}`)
                            }}
                        </span>
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
                <span v-if="!state.current.isChangeEmail">{{ AuthUserStore.data.email }}</span>
                <div class="d-flex flex-column w-100">
                    <input
                        v-if="state.current.isChangeEmail"
                        @blur="saveChangeEmail"
                        placeholder="Your new email"
                        v-model.lazy="AuthUserStore.data.email"
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
import { useAuthUserStore } from "../../stores/auth/AuthUserStore.js";
import UpdateProfilePictModal from "../Bootstrap5/Modals/UpdateProfilePictModal.vue";
import Helpers from "../../Helpers";
import DateHelper from "../../helpers/DateHelper";
DateHelper;
defineComponent({ AlertError, UpdateProfilePictModal });
const AuthUserStore = useAuthUserStore();

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
}, computed(() => AuthUserStore.data));

function updateProfilePict() {
    Helpers.triggerBSModal("#btn-modal-update-profile-pict");
}

async function saveChangeName() {
    const validator = await v$.value.$validate(); // validate
    if (!validator) return;

    UserService.updateFullname(AuthUserStore.data.name).then(r => {
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

    AuthService.createVerificationCode(AuthUserStore.data.email).then(() => {
        SwalPlugin.verificationCode("Verify your new Email", async verificationCode => {
            return await UserService.updateEmail(AuthUserStore.data.email, verificationCode).then(r => {
                if (r.status == 200) {
                    SwalPlugin.autoCloseAlert("Email updated successfully", null, "success", 1000);
                }
                return r;
            });
        }, AuthUserStore.data['email']);
    })
}
</script>


<style scoped>
.update-profile-pict-img {
    height: 100px;
    width: 100px;
}
</style>