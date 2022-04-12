<template>
    <teleport to='footer'>
        <div class="mt-5 bg-white pt-4 border-top">
            <div class="container-md custom-container">
                <!--  -->

                <div class="d-flex justify-content-start border-bottom   pb-3 ">
                    <router-link to="/help" class="me-3 text-secondary hover-underline">
                        HELP
                    </router-link>
                    <router-link to="/help" class="me-3 text-secondary hover-underline">
                        CONTACT US
                    </router-link>
                </div>

                <div class="d-flex justify-content-end py-3 text-secondary fs-7">
                    <small>Copyright &copy;2003-{{ (new Date()).getFullYear() }}&nbsp;{{
                        Helpers.ENV("APP_TITLE")
                    }}.&nbsp;All rights reserved.</small>

                    <small class="mx-3 fw-bold text-dark">|</small>

                    <small class="fw-bold">{{ Helpers.ENV("APP_TITLE") }}</small>
                </div>


                <!--  -->
            </div>
        </div>
    </teleport>

    <!--  -->
</template>

<script setup>
import Helpers from "@/Helpers";


</script>

<style>
</style>