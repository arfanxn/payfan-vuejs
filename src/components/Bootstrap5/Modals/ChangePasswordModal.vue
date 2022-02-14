<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button
            id="btn-modal-change-password"
            type="button"
            class="btn d-none btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-change-password"
        >Launch demo modal</button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="modal-change-password"
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
                        <h2 class="fw-light">Change your password</h2>

                        <form class="text-start mt-4">
                            <div class="mb-3">
                                <label
                                    for="inputCurrentPassword"
                                    class="form-label"
                                >Confirm your current password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Current password"
                                    id="inputCurrentPassword"
                                />
                            </div>
                            <div class="mt-4">
                                <div
                                    id="emailHelp"
                                    class="form-text text-dark mb-2"
                                >Enter your new password (Keep your account more secure. Don't use your name.)</div>
                                <input
                                    type="password"
                                    class="form-control mb-3"
                                    id="newPassword"
                                    placeholder="New password"
                                />
                                <input
                                    type="password"
                                    class="form-control"
                                    id="newPasswordConfirmation"
                                    placeholder="Confirm new password"
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
