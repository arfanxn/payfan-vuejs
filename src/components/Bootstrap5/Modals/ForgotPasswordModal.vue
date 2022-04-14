<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button id="btn-modal-forgot-password" type="button" class="btn d-none btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-forgot-password">Launch demo modal</button>

        <!-- Modal -->
        <div class="modal fade" id="modal-forgot-password" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="modal-forgot-passwordLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button @click="closeModal()" id="btn-close-modal-forgot-password" type="button"
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column ">
                        <div class="text-center">
                            <h2 class="fw-light">Need help with your password?</h2>
                            <small class="text-secondary fs-7">Enter the email you use for PayPal, and we’ll help you
                                create a new
                                password.</small>
                        </div>


                        <form @submit.prevent class="text-start mt-4" autocomplete="off">
                            <!-- stage 1 (insert the related email to the forgot password account )  -->
                            <div>
                                <div v-show="currentStep == recoveryPasswordStep[0]">
                                    <input v-model.lazy="state.form.email" autocomplete="off" type="email"
                                        class="form-control" placeholder="Your email" />
                                    <AlertError class="mt-1" @close="v$.email.$reset()"
                                        :error="v$?.email?.email?.$errors[0]?.$message"></AlertError>
                                </div>
                                <div v-if="currentStep != recoveryPasswordStep[0]"
                                    class="bg-light d-flex justify-content-center px-2 py-1  rounded border overflow-hidden">
                                    <span class="my-auto m-0 p-0">{{ state.form.email }}</span>
                                </div>
                            </div>

                            <!-- stage 2 (verify ) -->
                            <div v-if="currentStep == recoveryPasswordStep[1]" class="mt-3 ">
                                <!-- if verifyWith verificationCode show this -->
                                <div v-if="verifyWith == verifyOptions[0]">
                                    <input v-model="state.form.verificationCode" autocomplete="off" type="text"
                                        class="form-control" placeholder="Verification Code / OTP"
                                        id="inputVerificationCode" />
                                    <label for="inputVerificationCode" class="form-label w-100  text-center fs-7">
                                        OTP has been sent to your email.
                                    </label>
                                    <AlertError v-show="!errors.verificationCode" class="mt-1"
                                        @close="v$.verificationCode.$reset()"
                                        :error="(v$?.verificationCode?.verificationCode?.$errors[0]?.$message/**/)">
                                    </AlertError>
                                    <AlertError v-show="errors.verificationCode" class="mt-1"
                                        @close="errors.verificationCode = ``" :error="errors.verificationCode">
                                    </AlertError>
                                </div>
                                <!-- if verifyWith SecurityQuestion show this -->
                                <div v-else-if="verifyWith == verifyOptions[1]">
                                    <label for="inputSA" class="form-label w-100  ">
                                        <span class="fw-bold">Security question :</span><br>"{{
                                            state.securityQuestion
                                        }}"
                                    </label>
                                    <input v-model.trim="state.form.securityAnswer" autocomplete="off" type="text"
                                        class="form-control" placeholder="Security answer" id="inputSA" />
                                    <AlertError v-show="!errors.securityAnswer" class="mt-1"
                                        @close="v$.securityQuestion.$reset()"
                                        :error="(v$?.securityQuestion?.securityAnswer?.$errors[0]?.$message/**/)">
                                    </AlertError>
                                    <AlertError v-show="errors.securityAnswer" class="mt-1"
                                        @close="errors.securityAnswer = ``" :error="errors.securityAnswer">
                                    </AlertError>
                                </div>
                            </div>

                            <!-- stage 3 (create a new password) -->
                            <div v-if="currentStep == recoveryPasswordStep[2]" class="mt-4">
                                <div>
                                    <input v-model="state.form.new_password" autocomplete="off" type="password"
                                        class="form-control" placeholder="New password" />
                                    <AlertError class="mt-1" @close="v$.newPassword.$reset()"
                                        :error="v$?.newPassword?.new_password?.$errors[0]?.$message"></AlertError>
                                </div>
                                <div class="mt-2">
                                    <label for="inputConfirmNewPassword" class="form-label mb-1 ">
                                        Confirm password
                                    </label>
                                    <input v-model="state.form.confirm_new_password" autocomplete="off" type="password"
                                        id="inputConfirmNewPassword" class="form-control"
                                        placeholder="Confirm new password" />
                                    <AlertError class="mt-1" @close="v$.newPassword.$reset()"
                                        :error="v$?.newPassword?.confirm_new_password?.$errors[0]?.$message">
                                    </AlertError>
                                </div>
                            </div>

                            <div class="">
                                <!-- btn stage 1 -->
                                <div v-if="currentStep == recoveryPasswordStep[0]" class="mt-3">
                                    <small class="text-secondary fs-7 fw-bold d-block">Recover password with ?</small>
                                    <div class="mt-1">
                                        <button type="button" @click.prevent="verifyWithVerificationCode()"
                                            class="btn btn-secondary fw-bold rounded-pill w-100 py-1  ">Verification
                                            Code / OTP
                                        </button>
                                        <div class="my-1"></div>
                                        <button type="button" @click.prevent="verifyWithSecurityQuestion()"
                                            class="btn btn-primary fw-bold rounded-pill  w-100 py-1 ">Security
                                            Question</button>
                                    </div>
                                </div>
                                <!-- btn stage 2 -->
                                <div v-if="currentStep == recoveryPasswordStep[1]">
                                    <!-- if verifyWith verificationCode show this -->
                                    <div v-if="(verifyWith == verifyOptions[0])"
                                        class="d-flex justify-content-between mt-4">
                                        <button id="btnResendVerificationCode" @click.prevent="sendVerificationCode"
                                            type="button"
                                            class="btn btn-outline-secondary fw-bold rounded-pill w-100">Resend
                                            OTP<span class="ms-1"></span>
                                        </button>
                                        <div class="mx-2"></div>
                                        <button @click.prevent="next()" type="button"
                                            class="btn btn-primary fw-bold rounded-pill text-white w-100">Next</button>
                                    </div>
                                    <!-- if verifyWith SecurityQuestion show this -->
                                    <button v-else-if="(verifyWith == verifyOptions[1])" @click.prevent="next()"
                                        type="button"
                                        class="btn btn-primary fw-bold rounded-pill text-white w-100 mt-4">Next</button>
                                    <!--  -->
                                </div>
                                <!-- btn stage 3 -->
                                <button v-if="currentStep == recoveryPasswordStep[2]" @click.prevent="next()"
                                    type="button"
                                    class="btn btn-primary fw-bold rounded-pill text-white w-100 mt-4">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { reactive, ref, defineComponent } from 'vue';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import AlertError from '../../Errors/AlertError.vue';
import useVuelidate from '@vuelidate/core';
import ValidatorService from '../../../services/ValidatorService';
import Helpers from '@/Helpers';
// import SwalPlugin from '../../../plugins/SwalPlugin';
import AuthService from '../../../services/AuthService';
import SwalPlugin from '../../../plugins/SwalPlugin';
import axios from 'axios';
defineComponent({ AlertError });

const state = reactive({
    form: {
        email: "",
        verificationCode: "",
        securityAnswer: "",
        new_password: "",
        confirm_new_password: "",
    },
    securityQuestion: "",
});
const errors = reactive({
    verificationCode: "",
    securityAnswer: "",
});

const recoveryPasswordStep = ref(['insertEmail', "verify", "createNewPassword"]);
const verifyOptions = ref(['verification_code', "security_question"]);
const verifyWith = ref("");
const currentStep = ref(recoveryPasswordStep.value[0]);

const v$ = reactive({
    email: useVuelidate({
        email: {
            required, email, $lazy: true, isExist: helpers.withMessage("Email doesn't exist in our records!",
                helpers.withAsync(async () => ! await ValidatorService.isEmailTaken(state.form.email)/**/) /**/)
        }
    }, state.form),
    verificationCode: useVuelidate({
        verificationCode: {
            required: helpers.withMessage(`Please enter Verification Code!`, required),
            "length6Chars": helpers.withMessage("Verification Code must be 6 chars!", () => state.form.verificationCode.length == 6),
            "number": helpers.withMessage("Please enter number only!", () => !!(state.form.verificationCode).match(/[0-9]{6,6}/g))
        },
    }, state.form),
    securityQuestion: useVuelidate({
        securityAnswer: {
            required,
        },
    }, state.form),
    newPassword: useVuelidate({
        new_password: { required, minLength: minLength(6) },
        confirm_new_password: {
            required, minLength: minLength(6),
            sameAsPassword: helpers.withMessage("Password must match!", () => state.form.new_password == state.form.confirm_new_password)
        }
    }, state.form),
})

async function verifyWithVerificationCode() {
    const validatorEmail = await v$.email.$validate(); // validate
    if (!validatorEmail) return;

    sendVerificationCode();
    verifyWith.value = verifyOptions.value[0];
    currentStep.value = recoveryPasswordStep.value[1]
}
async function verifyWithSecurityQuestion() {
    const validatorEmail = await v$.email.$validate(); // validate
    if (!validatorEmail) return;

    axios.get(`/api/user/${state.form.email}/settings`).then(r => {
        state.securityQuestion = r.data.user_settings.security_question;
        verifyWith.value = verifyOptions.value[1];
        currentStep.value = recoveryPasswordStep.value[1]
    });
}

async function next() {
    errors.verificationCode = '';
    errors.securityAnswer = '';

    const { email, verificationCode, securityAnswer, new_password, confirm_new_password } = state.form;

    if (currentStep.value == recoveryPasswordStep.value[1]) { // stage 2 
        if (verifyWith.value == verifyOptions.value[0]) {
            const validatorVerificationCode = await v$.verificationCode.$validate(); // validate
            if (!validatorVerificationCode) return;

            currentStep.value = recoveryPasswordStep.value[2];
            return;
        } else if (verifyWith.value == verifyOptions.value[1]) {
            const validatorSQ = await v$.securityQuestion.$validate(); // validate
            if (!validatorSQ) return;

            currentStep.value = recoveryPasswordStep.value[2];
            return;
        }
    }

    if (currentStep.value == recoveryPasswordStep.value[2]) { // stage 3
        const validatornewPassword = await v$.newPassword.$validate(); // validate
        if (!validatornewPassword) return;

        AuthService.passwordRecovery({
            email, code: verificationCode,
            "security_answer": securityAnswer, new_password,
            new_password_confirmation: confirm_new_password
        }).then(r => {
            if (r.status == 200) {
                closeModal(() =>
                    SwalPlugin.autoCloseAlert("Password updated successfully",
                        `Your password has been reseted, please <a href="/auth/login">login</a>.`, "success", 2000));
                return;
            }

            if (r.statusText.toLowerCase() == "VerificationCodeOrSequrityQuestionMiddleware".toLowerCase()) {
                if ("verification_code_error_message" in r.data) {
                    currentStep.value = recoveryPasswordStep.value[1]
                    errors.verificationCode = `${r.data.verification_code_error_message}`;
                }

                if ("security_answer_error_message" in r.data) {
                    currentStep.value = recoveryPasswordStep.value[1]
                    errors.securityAnswer = `${r.data.security_answer_error_message}`;
                }
                return;
            }
        })
    }
}

function sendVerificationCode() {
    AuthService.createVerificationCode(state.form.email).then(r => {  // send verificationCode 
        let ratelimitRemaining = 60 * (parseInt(r.headers['x-ratelimit-remaining']) + 1); //seconds remaining

        new Promise(() => {
            let btnResendCode = document.getElementById(`btnResendVerificationCode`);

            if (btnResendCode) {
                const countdownBtnResendCode = setInterval(() => {
                    ratelimitRemaining -= 1;
                    btnResendCode.childNodes[1].innerHTML = `(${ratelimitRemaining})`;
                    btnResendCode.disabled = true;

                    if (!ratelimitRemaining) {
                        btnResendCode.childNodes[1].innerHTML = ``;
                        btnResendCode.disabled = false;
                        clearInterval(countdownBtnResendCode);
                    }
                }, 1000);
            }
        })
        // 
    })
}

function closeModal(afterCloseCallback = null) { // close the modal and reset all values
    // back to stage 1
    currentStep.value = recoveryPasswordStep.value[0];

    // close the modal
    Helpers.closeBSModal("#btn-close-modal-forgot-password").then(() => {
        if (typeof afterCloseCallback == "function") afterCloseCallback()

        // reset all values
        Object.keys(state.form).forEach(key => {
            state.form[key] = "";
        });
        Object.keys(v$).forEach(key => {
            v$[key].$reset();
        })
    });

}
</script>