<template>
    <div class="d-flex justify-content-center
        shadow rounded-circle overflow-hidden" :class="`user-avatar-${props?.user?.id}`"
        style="width : 50px ;  height : 50px ; "
        :style="`background-color : ${props?.user?.profile_pict} !important; `">

        <span v-if="props?.user?.profile_pict?.includes(`#`)" class="fw-bold my-auto text-white">{{
            StrHelper.make(props["user"]["name"]).firstCharEachWord().get().slice(0, 2)
        }}</span>

        <img v-else :src="props?.user?.profile_pict">
    </div>
    <!--  -->
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import StrHelper from "@/helpers/StrHelper.js";
const props = defineProps({
    user: Object,
    widthAndHeight: String || null
});

onMounted(() => {
    if (typeof props.widthAndHeight == "string") {
        const userAvatar = document.querySelector(`user-avatar-${props.user.id}`);
        userAvatar.style.width =
            props.widthAndHeight.includes("px") ? props.widthAndHeight : props.widthAndHeight + "px";
        userAvatar.style.height =
            props.widthAndHeight.includes("px") ? props.widthAndHeight : props.widthAndHeight + "px";
    }
});

</script>