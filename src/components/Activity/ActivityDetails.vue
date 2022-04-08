<template>
    <!--  v-if="props.order.details?.id == order.id" -->
    <div class="d-flex justify-content-between border-top border-secondary text-dark mt-3 py-2">
        <div class="w-50">
            <small class="d-block">
                <span class="fw-bold">Order ID :</span>
                {{ props.order.id }}
            </small>
            <small>
                <span class="fw-bold">Transaction ID :</span>
                {{ props.order.transaction_id }}
            </small>
        </div>

        <div class="w-50">
            <small class="d-block">
                <span class="fw-bold">Type :</span>
                {{ props.order.type }}
            </small>
            <small class="d-block">
                <span class="fw-bold">Status :</span>
                {{ props.order.status }}
            </small>
            <div class="d-block text-break mt-1">
                <small class="d-block fw-bold">Note :</small>
                <small>{{ props.order.note }}</small>
            </div>

            <!--  -->
            <div class="d-flex">
                <small class="fw-bold me-2">Details&nbsp;:</small>
                <div class="w-100">
                    <div class="d-flex justify-content-between">
                        <small class="fw-bold">Amount</small>
                        <small>
                            {{
                                StrHelper.make(props.order.amount).toUSD(false).get()
                            }} $
                        </small>
                    </div>
                    <div class="d-flex justify-content-between">
                        <small class="fw-bold">Charge</small>
                        <small>{{ props.order.charge ? props.order.charge : 0 }} $</small>
                    </div>
                    <div
                        class="d-flex justify-content-between fw-bold border-top border-secondary mt-2 pt-2"
                    >
                        <small>Total</small>
                        <small>
                            {{
                                props.order.charge ?
                                    StrHelper
                                        .make(/**/parseFloat(props.order.amount) + parseFloat(props.order.charge)/**/)
                                        .toUSD(false).get()
                                    : StrHelper.make(props.order.amount).toUSD(false).get()
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
    order: {},
});

</script>