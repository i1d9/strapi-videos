<script>

import { useAuthStore } from "../stores/auth";

export default {
    name: "RegisterComponent",
    setup() {
        const store = useAuthStore();
        return {
            store
        }
    },
    data() {
        return {
            form: {
                username: "",
                email: "",
                password: "",
            },
            showError: false
        }
    },
    methods: {
        async submit() {
            try {
                this.store.register(this.form.username, this.form.email, this.form.password)

                this.showError = false


                this.$router.push("/upload");
            } catch (e) {

                
                this.showError = true
            }
        }
    }
}
</script>
<template>
    <div class="container my-5">
        <form @submit.prevent="submit" class="d-flex flex-column">

            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Username" name="username"
                    v-model="form.username" />
            </div>

            <div class="mb-3">
                <input type="email" class="form-control" placeholder="Email Address" name="email"
                    v-model="form.email" />
            </div>

            <div class="mb-3">
                <input type="password" class="form-control" name="password" v-model="form.password"
                    placeholder="Password" />
            </div>

            <button type="submit" class="btn btn-success m-1">
                Create Account
            </button>

            <router-link to="/login" class="btn btn-outline-primary m-1">
                Login
            </router-link>
        </form>

        <p v-if="showError" id="error">Could not create an account with the details provided</p>
    </div>
</template>
