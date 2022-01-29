<template>
    <div class="d-flex justify-content-around mb-5">
        <router-link to="/transfer">
            <div class="hover-underline">
                <img src="@/assets/icons/send-money.png" class="transfer-icons p-1 rounded-circle" />
                <small class="d-block text-center fw-bold text-dark">Send</small>
            </div>
        </router-link>
        <router-link to="/transfer">
            <div class="hover-underline cursor-pointer">
                <img
                    src="@/assets/icons/request-money.png"
                    class="transfer-icons p-1 rounded-circle"
                />
                <small class="d-block text-center fw-bold text-dark">Request</small>
            </div>
        </router-link>
    </div>
</template>

<script setup>

</script>

<style scoped>
.transfer-icons {
    background-color: #005ea6;
    width: 50px;
    height: 50px;
}
</style>