<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button
            id="btn-modal-security-question"
            type="button"
            class="btn d-none btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-security-question"
        >Launch demo modal</button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="modal-security-question"
            tabindex="-1"
            aria-labelledby="modal-contant-detail"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button
                            id="btn-close-modal-security-question"
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column text-center">
                        <h2 class="fw-light mb-2">Security Question</h2>

                        <span
                            class="text-secondary"
                        >We'll use these question as a way to make sure it's your account, like if you need to reset your password.</span>

                        <form class="text-start mt-4">
                            <div class="mb-3">
                                <label
                                    for="inputSecurityQuestion"
                                    class="form-label text-secondary"
                                >Security question :</label>
                                <input
                                    placeholder="Question : "
                                    type="text"
                                    class="form-control mb-1"
                                    id="inputSecurityQuestion"
                                    v-model="UserStore['self/settings']['security_question']"
                                />
                                <AlertError
                                    @close="v$.$reset()"
                                    :error="v$?.security_question?.$errors[0]?.$message"
                                />
                                <input
                                    :placeholder="Helpers.strCensor(20)"
                                    type="text"
                                    class="form-control mt-3 mb-1"
                                    id="inputSecurityAnswer"
                                    v-model="security_answer"
                                />
                                <AlertError
                                    @close="v$.$reset()"
                                    :error="v$?.security_answer?.$errors[0]?.$message"
                                />
                            </div>
                            <button
                                @click="updateSQ()"
                                type="button"
                                class="btn btn-primary fw-bold rounded-pill text-white w-100 mt-4"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { computed, defineComponent, ref } from 'vue-demi';
import Helpers from '../../../Helpers';
import SwalPlugin from '../../../plugins/SwalPlugin';
import UserService from '../../../services/UserService';
import { useUserStore } from '../../../stores/UserStore';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import AlertError from '../../Errors/AlertError.vue';
import AuthService from '../../../services/AuthService';
defineComponent({ AlertError });
const UserStore = useUserStore();
const security_answer = ref(null);

const v$ = useVuelidate({ // rules 
    security_question: { required, minLength: minLength(8), maxLength: maxLength(50) },
    security_answer: { required, minLength: minLength(8), maxLength: maxLength(50) }
}, computed(() => ({
    security_question: UserStore['self/settings']["security_question"],
    security_answer: security_answer.value
})))

async function updateSQ() {
    const validator = await v$.value.$validate();
    if (!validator) return;

    AuthService.createVerificationCode().then(() => {
        Helpers.closeBSModal("#btn-close-modal-security-question").then(() => {
            SwalPlugin.verificationCode("Verify to continue", verificationCode => UserService.updateSecurityQuestion(UserStore['self/settings']["security_question"], security_answer.value, verificationCode).then(r => {
                if (r.status == 200) {
                    SwalPlugin.autoCloseAlert(r.data["message"], null, "success", 1000);
                    security_answer.value = null;
                    v$.value.$reset();
                } else if ("error_message" in r.data) {
                    SwalPlugin.autoCloseAlert(r.data["error_message"], null, "error", 1000);
                }
                return r;
            }));
        });
    });


}
</script>
