<template>
    <div class="ms-4 p-5">
        <div class>
            <h5 class="text-dark mb-4">Contacts</h5>
            <div class="form-floating mb-4">
                <input
                    type="email"
                    class="form-control"
                    id="inputSendTo"
                    placeholder="Name on your contacts or Email"
                />
                <label class="text-secondary" for="inputSendTo">Search</label>
            </div>
        </div>
        <div class>
            <small class="text-secondary">Top contacts</small>
            <div
                class="d-flex justify-content-between cursor-pointer my-4 px-3"
                v-for="(item, index) in [1, 2, 3, 4, 5]"
                :key="index"
            >
                <router-link to="/" class="d-flex text-dark w-100 me-2">
                    <div
                        class="contact-icon-size shadow bg-warning rounded-circle d-flex justify-content-center"
                    >
                        <span class="fw-bold my-auto">AM</span>
                    </div>
                    <span class="ms-3 my-auto">Alif Maulana</span>
                </router-link>

                <div
                    @click="addOrRmFavoriteContact(index)"
                    :id="`top-contact-${index}`"
                    class="my-auto text-dark"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-star-fill my-auto"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                        />
                    </svg>
                </div>
            </div>

            <div class="d-flex justify-content-center mt-5">
                <small
                    class="fw-bold text-navy hover-underline cursor-pointer text-center"
                >View blocked contacts</small>
            </div>
        </div>
    </div>
</template>

<script setup>


function addOrRmFavoriteContact(id) {
    const elem = document.getElementById(`top-contact-${id}`);
    if (elem.classList.contains("text-dark")) {
        elem.classList.remove("text-dark");
        elem.classList.add("text-success");
    } else {
        elem.classList.remove("text-success");
        elem.classList.add("text-dark");
    }
}
</script>

<style scoped>
.contact-icon-size {
    width: 65px;
    height: 65px;
}
</style>