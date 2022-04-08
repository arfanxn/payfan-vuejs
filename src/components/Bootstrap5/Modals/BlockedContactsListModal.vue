<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button
            id="btn-modal-blocked-contacts"
            type="button"
            class="btn d-none btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-blocked-contacts"
        >Launch demo modal</button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="modal-blocked-contacts"
            tabindex="-1"
            aria-labelledby="modal-contant-detail"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column">
                        <h5 class="text-center mb-4">Blocked Contacts</h5>
                        <!-- <span class="text-secondary mb-5 pb-5">No blocked contacts yet.</span> -->
                        <div
                            class="d-flex justify-content-between cursor-pointer border-bottom border-secondary py-3 px-3"
                            v-for="(item, index) in [1, 2, 3]"
                            :key="index"
                        >
                            <a class="d-flex text-dark w-100 me-2">
                                <div
                                    class="contact-icon-size shadow bg-warning rounded-circle d-flex justify-content-center"
                                >
                                    <span class="fw-bold my-auto">AM</span>
                                </div>
                                <span class="ms-3 my-auto">Alif Maulana</span>
                            </a>

                            <a
                                @click="unblockContact(index)"
                                :id="`top-contact-${index}`"
                                class="my-auto text-navy fw-bold hover-underline"
                            >Unblock</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
function unblockContact(event) {
    event;
}
</script>

<style scoped>
.contact-icon-size {
    width: 75px;
    height: 75px;
}

.contact-icon-size {
    width: 60px;
    height: 60px;
}
</style>