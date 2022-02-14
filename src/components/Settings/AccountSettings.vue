<template>
    <div class>
        <div class="pt-3 px-4 pb-4">
            <h5>Profile</h5>
            <div class="d-flex mt-3">
                <div class="text-center pe-3">
                    <img
                        class="rounded-circle update-profile-pict-img mb-2"
                        src="@/assets/icons/default-profile-pict.png"
                    />
                    <small class="cursor-pointer text-navy hover-underline">Update&nbsp;Photo</small>
                </div>
                <div class="w-100">
                    <h5>Muhammad Arfan</h5>
                    <div class="d-flex justify-content-between">
                        <span class="text-secondary">Joined in 2020</span>
                        <span class="cursor-pointer fw-bold text-navy hover-underline">Change name</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-light py-3 px-0"></div>

        <div class="pt-3 px-4 pb-4">
            <h5>Email</h5>
            <div class="d-flex mt-3 justify-content-between mb-2">
                <span class>arf@gm.com</span>
                <span class="cursor-pointer fw-bold text-navy hover-underline">Change email</span>
            </div>
            <small
                class="text-secondary"
            >To update an email address, you must verify your new email address.</small>
        </div>
    </div>
</template>


<style scoped>
.update-profile-pict-img {
    height: 100px;
    width: 100px;
}
</style>