<script>
import { useAuthStore } from "../stores/auth";
import axios from 'axios';
export default {
    name: "FormComponent",
    data() {
        return {
            form: {
                name: "",
                description: "",
            },
            showError: false,
            formData: new FormData()
        }
    }, setup() {
        const store = useAuthStore();
        return {
            store
        }
    },
    methods: {
        async submit() {
            try {   
                this.formData.append(`data`, JSON.stringify({ name: this.form.name, description: this.form.description, uploader: this.store.authVal.id }));
                const { data } = await axios.post(`http://localhost:1337/api/medias/`, this.formData, {
                    headers: {
                        'Authorization': `Bearer ${this.store.authVal.token}`
                    }
                });
                this.$router.push("/" + data.data.id);
            } catch (error) {
                console.log(error);
            }
        },
        async appendVideo($event) {
            Array.from($event.target.files)
                .forEach(file => {
                    this.formData.append(`files.video`, file, file.name);
                });
        },
        async appendThumbnail($event) {
            Array.from($event.target.files)
                .forEach(file => {
                    this.formData.append(`files.thumbnail`, file, file.name);
                });
        }
    }
}
</script>
<template>
    <div class="container my-5">
        <form @submit.prevent="submit" class="d-flex flex-column">
            <div class="mb-3">
                <input required type="text" class="form-control" placeholder="Title" name="title" v-model="form.name" />
            </div>
            <div class="mb-3">
                <input required class="form-control" type="text" name="description" v-model="form.description"
                    placeholder="Description" />
            </div>
            <div class="mb-3">
                <input required class="form-control" accept="image/*" type="file" name="thumbnail_source"
                    @change="appendThumbnail" />
            </div>
            <div class="mb-3">
                <input required class="form-control" accept="video/mp4" type="file" name="video_source"
                    @change="appendVideo" />
            </div>
            <button type="submit" class="btn btn-success m-1">
                Upload
            </button>
        </form>
        <p v-if="showError" id="error">Invalid Email/Password</p>
    </div>
</template>
