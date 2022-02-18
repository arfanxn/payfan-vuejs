<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button
            id="btn-modal-update-profile-pict"
            type="button"
            class="btn d-none btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-update-profile-pict"
        >Launch demo modal</button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="modal-update-profile-pict"
            tabindex="-1"
            aria-labelledby="modal-contant-detail"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column text-center">
                        <h2 class="fw-light mb-4">Choose a photo</h2>
                        <p
                            class="text-break mb-3"
                        >Your photo should clearly show your face so it’s easy for friends, family, and merchants know it’s you. A photo larger than 300 pixels works best.</p>

                        <div class="d-flex justify-content-center">
                            <img
                                src="@/assets/icons/default-profile-pict.png"
                                class="profile-pict-preview rounded-circle overflow-hidden"
                            />
                        </div>

                        <form v-on:submit.prevent>
                            <button
                                @click="triggerInputProfilePict()"
                                type="buttton"
                                class="btn btn-add-ur-photo text-white rounded-pill mt-4 py-2 w-75"
                            >Add Your Photo</button>
                            <input
                                @change="changeProfilePict"
                                class="d-none"
                                type="file"
                                name
                                id="input-profile-pict"
                            />
                        </form>

                        <p
                            v-if="state.input_error_profile_pict"
                            class="mt-4"
                        >{{ state.input_error_profile_pict }}</p>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { reactive } from "vue-demi";
import FileService from "../../../services/FileService";
const state = reactive({
    input_error_profile_pict: null
})

function triggerInputProfilePict() {
    document.querySelector("#input-profile-pict").click();
}


function changeProfilePict(event) {
    const preview = document.querySelector(".profile-pict-preview");
    const previousImgSrc = preview.src;
    let files = event.target.files || event.dataTransfer.files;
    if (!files.length) return;

    FileService.resizeImage({ file: files[0], maxSize: 500 }).then(blob => {
        let image = URL.createObjectURL(blob);
        preview.src = image;
    }, () => {
        state.input_error_profile_pict = `Make sure your photo is a JPG, JPEG, GIF, PNG, or BMP.`;
        event.target.files = [];
        preview.src = previousImgSrc;
        preview.src = null;
    });
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