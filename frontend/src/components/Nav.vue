<script>
import { useAuthStore } from '../stores/auth'


export default {
  name: "NavComponent",

  data() {
    return {
      store: useAuthStore()
    }
  }
}
</script>
<template>


  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Strapi Videos</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <div>

          </div>
          <li class="nav-item" v-if="store.authVal.hasOwnProperty('token')">
            <a class="nav-link" href="/upload">Upload</a>
          </li>

          <li class="nav-item" v-if="store.authVal.hasOwnProperty('token')">
            <a class="nav-link" href="#" @click="store.logout">Log out</a>
          </li>

          <li class="nav-item" v-else>
            <a class="nav-link" href="/login">Log in</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>