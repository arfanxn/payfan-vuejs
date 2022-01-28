<template>
    <div v-if="error" class="alert alert-warning alert-dismissible fade show py-0" role="alert">
        <small class="text-danger">{{ error }}</small>
        <button
            @click="close()"
            type="button"
            class="btn-close py-1 px-1"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
const emits = defineEmits(["close"]);
defineProps({
    error: String()
})



function close() {
    emits("close");
}
</script>