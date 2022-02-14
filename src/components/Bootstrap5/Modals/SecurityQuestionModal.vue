<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button
            id="btn-modal-security-question"
            type="button"
            class="btn d-none btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-security-question"
        >Launch demo modal</button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="modal-security-question"
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
                        <h2 class="fw-light mb-2">Security Question</h2>

                        <span
                            class="text-secondary"
                        >We'll use these question as a way to make sure it's your account, like if you need to reset your password.</span>

                        <form class="text-start mt-4">
                            <div class="mb-3">
                                <label
                                    for="inputSecurityQuestion"
                                    class="form-label text-secondary"
                                >Security question :</label>
                                <input
                                    placeholder="Question : "
                                    type="text"
                                    class="form-control mb-3"
                                    id="inputSecurityQuestion"
                                />
                                <input
                                    placeholder="Answer"
                                    type="text"
                                    class="form-control"
                                    id="inputSecurityQuestion"
                                />
                            </div>
                            <button
                                type="submit"
                                class="btn btn-primary fw-bold rounded-pill text-white w-100 mt-4"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>


</script>
