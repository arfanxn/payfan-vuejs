<template>
    <div class="d-flex justify-content-around mb-4">
        <router-link to="/transfer/send">
            <div class="hover-underline">
                <div class="transfer-icons p-1 rounded-circle d-flex">
                    <img src="@/assets/icons/send-payment.png" class="m-auto w-100 h-100 invert-100" />
                </div>

                <small class="d-block text-center fw-bold text-dark">Send</small>
            </div>
        </router-link>
        <router-link to="/transfer/request">
            <div class="hover-underline cursor-pointer">
                <div class="transfer-icons p-1 rounded-circle d-flex">
                    <img src="@/assets/icons/request-payment.png" class="m-auto w-100 h-100 invert-100" />
                </div>
                <small class="d-block text-center fw-bold text-dark">Request</small>
            </div>
        </router-link>
    </div>
    <!--  -->
</template>

<script setup>

</script>

<style scoped>
.transfer-icons {
    background-color: #005ea6;
    width: 52.5px;
    height: 52.5px;
}
</style>