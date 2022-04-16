<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button id="btn-modal-update-profile-pict" type="button" class="btn d-none btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-update-profile-pict">Launch demo modal</button>

        <!-- Modal -->
        <div class="modal fade" id="modal-update-profile-pict" tabindex="-1" aria-labelledby="modal-contant-detail"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button @click="closeModal()" id="btn-close-modal-update-profile-pict" type="button"
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column text-center">
                        <h2 class="fw-light mb-4">Choose a photo</h2>
                        <p class="text-break mb-4">Your photo should clearly show your face so it’s easy for friends,
                            family, and merchants know it’s you. A photo larger than 300 pixels works best.</p>

                        <div class="d-flex justify-content-center">
                            <UserAvatar :user="AuthUserStore.data" id="previewUserAvatar"
                                style="width : 150px; height : 150px" />
                        </div>

                        <form v-on:submit.prevent class="mt-4" enctype="multipart/form-data">
                            <button v-show="!state.form.profile_pict.value" @click="triggerInputProfilePict()"
                                type="buttton" class="btn btn-add-ur-photo text-white rounded-pill py-2 w-75">Add Your
                                Photo</button>
                            <div class v-show="state.form.profile_pict.value">
                                <button @click="triggerInputProfilePict()"
                                    class="btn btn-add-ur-photo text-white rounded-pill py-2 px-3">Change</button>
                                <span class="mx-1"></span>
                                <button @click="uploadProfilePict()"
                                    class="btn btn-add-ur-photo text-white rounded-pill py-2 px-3">Save</button>
                            </div>
                            <input @change="changeProfilePict" class="d-none" type="file" name id="input-profile-pict"
                                accept="image/*" />
                        </form>

                        <p v-if="state.form.profile_pict.error" class="mt-4">
                            {{ state.form.profile_pict.error }}</p>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { reactive, defineComponent, onMounted } from "vue";
import SwalPlugin from "../../../plugins/SwalPlugin";
import FileService from "../../../services/FileService";
import UserService from "../../../services/UserService";
import UserAvatar from "@/components/Avatar/UserAvatar.vue";
import { useAuthUserStore } from "../../../stores/auth/AuthUserStore";
import Helpers from "../../../Helpers";
defineComponent({ UserAvatar });
const AuthUserStore = useAuthUserStore();

const state = reactive({
    form: {
        profile_pict: {
            previousValue: null,
            value: null,
            error: null,
        }
    }
});

onMounted(() => {
    state.form.profile_pict.previousValue = AuthUserStore.data['profile_pict'];
})

function triggerInputProfilePict() {
    document.querySelector("#input-profile-pict").click();
}

function changeProfilePict(event) {
    const previousAvatar = state.form.profile_pict.previousValue;
    let files = event.target.files || event.dataTransfer.files;
    if (!files.length) return;

    FileService.resizeImage({ file: files[0], maxSize: 500 }).then(blob => {
        state.form.profile_pict.value = blob;
        state.form.profile_pict.error = null;
        let avatar = URL.createObjectURL(blob);
        AuthUserStore.data['profile_pict'] = avatar;
    }, () => {
        state.form.profile_pict.value = null;
        state.form.profile_pict.error = `Make sure your photo is a JPG, JPEG, GIF, PNG, or BMP.`;
        event.target.files = [];
        AuthUserStore.data['profile_pict'] = previousAvatar;
    });
}

function uploadProfilePict() {
    let formData = new FormData();
    formData.append("profile_pict", state.form.profile_pict.value);

    UserService.updateProfilePict(formData).then(r => {
        if (r.status == 200) {
            // if update is successful then update the previousValue to the new current value
            state.form.profile_pict.previousValue = AuthUserStore.data['profile_pict'];

            closeModal();

            SwalPlugin.autoCloseAlert(r.data.message, null, "success", 2000)
        } else if ("error_message" in r.data) {
            SwalPlugin.alert({ title: r.data.error_message, icon: "warning" });
        }
    });
}

function closeModal() {
    Helpers.closeBSModal('#btn-close-modal-update-profile-pict');
    AuthUserStore.data[`profile_pict`] = state.form.profile_pict.previousValue
    state.form.profile_pict.value = null;
}

</script>


<style scoped>
.profile-pict-preview {
    width: 175px;
    height: 175px;
}

.btn-add-ur-photo {
    background-color: #0079ad !important;
}

.btn-add-ur-photo:hover {
    background-color: #003087 !important;
}
</style>