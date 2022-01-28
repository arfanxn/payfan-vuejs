<template>
    <div>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="inputFullname" class="form-label">Fullname</label>
                <input
                    type="text"
                    class="form-control"
                    id="inputFullname"
                    v-model="state.form.values.fullname"
                />
                <AlertError
                    class="mt-1"
                    @close="deleteFormErrorMessage(`fullname`)"
                    :error="state.form.errors.fullname"
                ></AlertError>
            </div>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    v-model="state.form.values.email"
                />
                <AlertError
                    class="mt-1"
                    @close="deleteFormErrorMessage(`email`)"
                    :error="state.form.errors.email"
                ></AlertError>
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="inputPassword"
                    v-model="state.form.values.password"
                />
                <AlertError
                    class="mt-1"
                    @close="deleteFormErrorMessage(`password`)"
                    :error="state.form.errors.password"
                ></AlertError>
            </div>
            <div class="mb-3">
                <label for="inputConfPassword" class="form-label">Confirm Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="inputConfPassword"
                    v-model="state.form.values.password_confirmation"
                />
                <AlertError
                    class="mt-1"
                    @close="deleteFormErrorMessage(`password_confirmation`)"
                    :error="state.form.errors.password_confirmation"
                ></AlertError>
            </div>
            <button
                type="submit"
                class="btn btn-outline-primary float-end mb-4"
                @click="handleRegister()"
            >Submit</button>
        </form>
    </div>
</template>

<script setup>
import AlertError from '../Errors/AlertError.vue';
import AuthService from '../../services/AuthService';
import { reactive, defineComponent } from 'vue';
import router from '../../router';
import Helpers from '../../Helpers';
defineComponent({ AlertError });
const state = reactive({
    form: {
        values: {
            fullname: "",
            email: "",
            password: "",
            password_confirmation: ""
        },
        errors: {
            fullname: "",
            email: "",
            password: "",
            password_confirmation: ""
        }
    }
});

function deleteFormErrorMessage(key) {
    state.form.errors[key] = null;
}

async function handleRegister() {
    // refresh errors message 
    // const errMessageKeys = Object.keys(state.form.errors);
    // errMessageKeys.forEach(key => {
    //     state.form.errors[key] = null;
    // })

    // handle the registration ;
    const formValues = state.form.values;
    AuthService.register(formValues.fullname, formValues.email,
        formValues.password, formValues.password_confirmation).then((r) => {
            if (r.status == 201) {
                console.log(r);
                router.go('/');
            } else {
                state.form.errors.fullname = Helpers.errorMessageAccessor(r.data, "name");
                state.form.errors.email = Helpers.errorMessageAccessor(r.data, "email");
                state.form.errors.password = Helpers.errorMessageAccessor(r.data, "password");
                state.form.errors.password_confirmation =
                    Helpers.errorMessageAccessor(r.data, "password_confirmation");
            }
        });
}
</script>   