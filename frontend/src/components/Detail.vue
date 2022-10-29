<script>
import Player from "./Player.vue";
import Card from "./Card.vue";
import axios from 'axios';
export default {
    name: "DetailComponent",
    data(){
        return {
            video: {},
        }
    },
    async mounted() {
        try {
            const response = await axios.get(`http://localhost:1337/api/medias/${this.$route.params.id}`);
            this.video = response.data.data.attributes;
        }
        catch (error) {
            this.video = {};
            this.$router.push('/');   
        }
    },
    components: {
        Card,
        Player
    }
}
</script>
<template>
    <Player :id="this.$route.params.id" />
    <h1>
        {{this.video.name}}
    </h1>
    <p>
        {{this.video.description}}
    </p>
</template>