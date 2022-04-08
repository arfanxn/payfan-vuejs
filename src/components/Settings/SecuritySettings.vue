<template>
    <div class="ps-5 pe-4 pb-3">
        <div @click="changePassword" class="cursor-pointer py-4 border-bottom border-secondary">
            <h5>Password</h5>
            <div class="d-flex justify-content-between">
                <span class="text-secondary">Create or update your password.</span>
                <a class="cursor-pointer hover-underline text-navy fw-bold">Update</a>
            </div>
        </div>
        <div class="cursor-pointer py-4 border-bottom border-secondary">
            <h5>2-step verification</h5>
            <div class="d-flex justify-content-between">
                <span
                    class="text-secondary"
                >Add an extra layer of security to your account by using a one-time security code in addition to your password each time you log in.</span>
                <div class="form-check form-switch ms-3">
                    <input
                        @click.prevent="enableOrDisable2FA"
                        class="form-check-input"
                        type="checkbox"
                        id="swicthEnableOrDisable2FA"
                        :checked="AuthUserStore['setting']['data']['two_factor_auth']"
                    />
                </div>
            </div>
        </div>
        <div @click="securityQuestion" class="cursor-pointer py-4 border-bottom border-secondary">
            <h5>Security questions</h5>
            <div class="d-flex justify-content-between">
                <span
                    class="text-secondary"
                >For your protection, please choose 2 security questions. This way, we can verify it’s really you if there’s ever a doubt.</span>
                <a class="cursor-pointer hover-underline text-navy fw-bold ms-3">Create</a>
            </div>
        </div>
        <ChangePasswordModal />
        <SecurityQuestionModal />
    </div>
</template>

<script setup>
import { defineComponent } from "vue";
import ChangePasswordModal from "@/components/Bootstrap5/Modals/ChangePasswordModal.vue";
import SecurityQuestionModal from "@/components/Bootstrap5/Modals/SecurityQuestionModal.vue";
import Helpers from "../../Helpers";
import Swal from "sweetalert2";
import { useAuthUserStore } from "../../stores/auth/AuthUserStore";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import SwalPlugin from "../../plugins/SwalPlugin";
const AuthUserStore = useAuthUserStore();
defineComponent({ ChangePasswordModal, SecurityQuestionModal });

function securityQuestion(event) {
    event;
    Helpers.triggerBSModal(`#btn-modal-security-question`);
}

function enableOrDisable2FA(event) {
    // make sure the switch isn't getting clicked / checked / unchecked 
    event.target.checked = !event.target.checked;

    //  do the operations 
    if (event.target.checked == true) {
        Swal.fire({
            icon: "warning",
            title: "Disable 2-step verification ?",
            showCancelButton: true,
            confirmButtonText: "Disable",

        }).then(result => {
            if (result.isConfirmed) {
                AuthService.createVerificationCode().then(() => {
                    SwalPlugin.verificationCode("Verify to continue", async verificationCode => {
                        const r = await UserService.disableOrEnable2FA(verificationCode).then(r, e => console.log(e));

                        if (r.status == 200) {
                            event.target.checked = false;
                            AuthUserStore['setting']['data']['two_factor_auth'] = false;
                            SwalPlugin.autoCloseAlert(`2-step verification disabled.`, null, "success", 1000);
                        }

                        return r;
                    })
                })
            }
        });
    } else {
        Swal.fire({
            icon: "question",
            title: "Enable 2-step verification ?",
            html: `<small class="text-secondary">Each time you log in, you’ll use a one-time code in addition to your password. Choose how you’ll get your code.</small>`,
            showCancelButton: true,
            confirmButtonText: "Enable",

        }).then(result => {
            if (result.isConfirmed) {
                AuthService.createVerificationCode().then(() => {
                    SwalPlugin.verificationCode("Verify to continue", async verificationCode => {
                        const r = await UserService.disableOrEnable2FA(verificationCode);

                        if (r.status == 200) {
                            event.target.checked = true;
                            AuthUserStore['setting']['data']['two_factor_auth'] = true;
                            SwalPlugin.autoCloseAlert(`2-step verification enabled.`, null, "success", 1000);
                        }

                        return r;
                    })
                })
            }
        });
    }
}

function changePassword() {
    Helpers.triggerBSModal(`#btn-modal-change-password`);
}


</script>