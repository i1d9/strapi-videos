<script>
export default {

    name: "CardComponent",

    props: ['title', 'description', 'id', 'thumbnail'],


    computed: {
        imageSrc() {
            return "http://localhost:1337" + this.thumbnail;
        }
    }
}
</script>
<template>
    <div class="card m-1"  style="width:350px" @click="this.$router.push('/'+this.id)">


        <img class="card-img-top" :src="imageSrc" :alt="this.title">
        <div class="card-body">

            <router-link :to="'/'+this.id">
                <h5 class="card-title">{{this.title}}</h5>
            </router-link>


        </div>
    </div>
</template>