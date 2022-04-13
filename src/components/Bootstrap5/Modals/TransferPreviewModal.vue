<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button type="button" class="btn d-none btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-transfer-preview" id="btn-modal-transfer-preview">Launch static backdrop
            modal</button>

        <!-- Modal -->
        <div class="modal fade" id="modal-transfer-preview" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="modal-transfer-previewLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="modal-transfer-previewLabel"></h5>
                        <button type="button" id="btn-close-modal-transfer-preview" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column">
                        <div class="d-flex justify-content-center">
                            <div class="d-flex mb-1">
                                <div class="d-flex justify-content-center ">
                                    <UserAvatar :user="user" class="my-auto" style="width:80px; height:80px" />
                                </div>

                                <div class="my-auto ms-3">
                                    <span class="d-block">{{ props?.user?.name }}</span>
                                    <small class="text-secondary">{{ props?.user?.email }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex flex-column mt-3">
                            <input @change="amountToUSD" placeholder="Amount in USD" v-model="transfer.amountInUSD"
                                type="text" class="form-control fw-bold fs-5 text-center" />
                            <AlertError class="mt-1" @close="v$.$reset()"
                                :error="v$?.amountInUSD?.$errors[0]?.$message || v$?.amount?.$errors[0]?.$message" />
                        </div>

                        <div class="d-flex flex-column border-top mt-5 border-secondary border-1">
                            <textarea v-model="transfer.note" class="form-control scrollbar-thin mt-3"
                                placeholder="Add a note"></textarea>
                            <AlertError class="mt-2" @close="v$.$reset()" :error="v$?.note?.$errors[0]?.$message" />
                        </div>
                    </div>
                    <div class="modal-footer border-top-0 d-flex flex-column px-5 mt-2">
                        <small class="text-secondary mb-3">
                            For more information please read our
                            <a href="/help" class="text-navy">user agreement</a>.
                        </small>

                        <button @click="onNextClicked" type="button"
                            class="btn w-100 rounded-pill btn-light fw-bold text-secondary">
                            <slot name="nextButtonText">Continue</slot>
                        </button>
                        <a class="btn rounded-pill px-4 text-navy fw-bold hover-underline"
                            data-bs-dismiss="modal">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { maxLength, helpers, maxValue, minValue } from '@vuelidate/validators';
import { defineProps, defineEmits, reactive, defineComponent, watch } from "vue";
import UserAvatar from "@/components/Avatar/UserAvatar.vue";
import AlertError from "../../Errors/AlertError.vue";
import ValidatorService from "../../../services/ValidatorService";
defineComponent({ AlertError })
const props = defineProps({
    user: {},
});
const emits = defineEmits(["nextClicked",]);
const transfer = reactive({
    amountInUSD: null, amount: 0, note: ""
})

watch(() => props.user, () => {
    transfer.amountInUSD = null, transfer.amount = 0, transfer.note = '';
});

const v$ = useVuelidate({ // rules  
    amountInUSD: {
        $lazy: true, validCurrency: helpers.withMessage("Value must be a valid USD currency.", ValidatorService.isCurrency),
    }, amount: {
        minValue: helpers.withMessage("Minimum transaction is $0.10", minValue(0.10)),
        maxValue: helpers.withMessage("Maximum transaction is $100,000,000.00 ", maxValue(100000000))
    },
    note: { maxLength: maxLength(255) },
},  /*state */ transfer)

function amountToUSD() {
    if (!transfer.amountInUSD) return

    //remove dollar sign and commas , and replace duplicate "." with only a single "." ; 
    const amount = transfer.amountInUSD.replace(/[$,]/g, "").replace(/[.]+/g, ".");

    // amount string -> parse to float (if not the ".toFixed" funtion below will not work ) ; 
    transfer.amount = parseFloat(amount);

    // make the parsedFloat (amount) to USD currency format ;
    const converted = transfer.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return (transfer.amountInUSD = converted.toString().toLowerCase() != "nan" ? "$" + converted : null);
}

async function onNextClicked() {
    amountToUSD()
    const validator = await v$.value.$validate()
    if (!validator) return;

    emits('nextClicked', { ...props.user, ...transfer, });
}
</script>

<style scoped>
.form-control {
    box-shadow: none !important;
    border: none !important;
    background-color: transparent !important;
}
</style>