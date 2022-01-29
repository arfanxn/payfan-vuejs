<template>
    <main class="d-flex justify-content-center">
        <div class="col-md-8 col-12 bg-white my-auto border border-top-0 rounded">
            <div class="bg-navy p-3 rounded-top d-flex justify-content-between text-white">
                <div class="my-auto">
                    <h5 class="fw-bold">Payfan</h5>
                </div>
                <div class="my-auto">
                    <a
                        href
                        class="text-decoration-none text-white fw-bold d-inline me-3"
                        @click.prevent="changeAuthType(`login`)"
                    >Login</a>
                    <a
                        href
                        class="text-decoration-none text-white fw-bold d-inline"
                        @click.prevent="changeAuthType(`register`)"
                    >Register</a>
                </div>
            </div>

            <div class="p-4">
                <keep-alive>
                    <Login v-if="currentStep == `login`"></Login>
                </keep-alive>
                <keep-alive>
                    <Register v-if="currentStep == `register`"></Register>
                </keep-alive>
            </div>
        </div>
    </main>
</template>

<script setup>
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';
import router from '../router';
const route = useRoute();

const currentStep = ref("login");

defineComponent({ Login, Register });

onBeforeMount(() => {
    changeAuthType(route.params.type);
});

function changeAuthType(type) {
    if (type == "register") {
        currentStep.value = "register";
        router.replace({
            ...router.currentRoute,
            params: {
                type: "register"
            }
        })
    } else {
        currentStep.value = "login";
        router.replace({
            ...router.currentRoute,
            params: {
                type: "login"
            }
        })
    }
}

</script>

<style scoped>
main {
    margin-bottom: 200px !important;
    min-height: 100vh;
}
</style>