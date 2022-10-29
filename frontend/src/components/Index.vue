<script>
import Card from "./Card.vue";
import axios from 'axios';
export default {
    name: "HomeComponent",
    components: {
        Card,
    },
    async mounted() {
        try {
            const response = await axios.get("http://localhost:1337/api/medias?populate=thumbnail");
            this.videos = response.data.data;
        }
        catch (error) {
            this.videos = [];
        }
    },
    data() {
        return { videos: [] }
    }
}
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div v-for="video in videos" :key="video.id">
                <div class="col-sm-4 col-md-3 col-md-4">
                    <Card :title="video.attributes.name" :description="video.attributes.description" :id="video.id"
                        :thumbnail="video.attributes.thumbnail.data.attributes.url" />
                </div>
            </div>
        </div>
    </div>
</template>