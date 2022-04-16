<template>
    <!--  v-if="props.payment.details?.id == payment.id" -->
    <div class="d-flex justify-content-between border-top border-secondary text-dark mt-3 py-2">
        <div class="w-50">
            <small class="d-block">
                <span class="fw-bold">Payment ID :</span>
                {{ props.payment.id }}
            </small>
            <small>
                <span class="fw-bold">Transaction ID :</span>
                {{ props.payment.transaction_id }}
            </small>
        </div>

        <div class="w-50">
            <small class="d-block">
                <span class="fw-bold">Type :</span>
                {{ props.payment.type }}
            </small>
            <small class="d-block">
                <span class="fw-bold">Status :</span>
                {{ props.payment.status }}
            </small>
            <div class="d-block text-break mt-1">
                <small class="d-block fw-bold">Note :</small>
                <small>{{ props.payment.note }}</small>
            </div>

            <!--  -->
            <div class="d-flex">
                <small class="fw-bold me-2">Details&nbsp;:</small>
                <div class="w-100">
                    <div class="d-flex justify-content-between">
                        <small class="fw-bold">Amount</small>
                        <small>
                            {{
                                StrHelper.make(props?.payment?.amount).toUSD(false).get()
                            }} $
                        </small>
                    </div>
                    <div class="d-flex justify-content-between">
                        <small class="fw-bold">Charge</small>
                        <small>{{ props.payment.charge ? props.payment.charge : 0 }} $</small>
                    </div>
                    <div class="d-flex justify-content-between fw-bold border-top border-secondary mt-2 pt-2">
                        <small>Total</small>
                        <small>
                            {{
                                props.payment.charge ?
                                    StrHelper
                                        .make(/**/parseFloat(props?.payment?.amount) + parseFloat(props?.payment?.charge)/**/)
                                        .toUSD(false).get()
                                    : StrHelper.make(props?.payment?.amount).toUSD(false).get()
                            }} $
                        </small>
                    </div>
                </div>
            </div>

            <!--  -->
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import StrHelper from '../../helpers/StrHelper';
const props = defineProps({
    payment: {},
});

</script>