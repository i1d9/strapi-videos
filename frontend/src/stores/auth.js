import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useAAuthStore = defineStore('auth', () => {

  const auth = ref({});

  async function login(identifier, password) {

    const json = JSON.stringify({ identifier, password });
    const { data } = await axios
      .post('http://localhost:1337/api/auth/local/', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

    auth.value = { ...data.user, token: data.jwt };

  }

  async function register(username, email, password) {
    const json = JSON.stringify({ username, email, password });

    const { data } = await axios
      .post('http://localhost:1337/api/auth/local/register', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

    auth.value = { ...data.user, token: data.jwt };
  }

  function logout() {
    auth.value = {};
  }

  const getAuth = computed(() => auth.value);

  return { auth, register, login, logout, getAuth };


});

export const useAuthStore = defineStore('counter', {
  state: () => ({ count: 5, name: 'Eduardo', auth: {} }),
  getters: {
    
    authVal: (state) => state.auth
  },
  actions: {
    increment() {
      this.count++
    },
    logout() {
      this.auth = {}
    },
    async login(identifier, password) {

      const json = JSON.stringify({ identifier, password });
      const { data } = await axios
        .post('http://localhost:1337/api/auth/local/', json, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

      this.auth = { ...data.user, token: data.jwt };

    },
    async register(username, email, password) {
      const json = JSON.stringify({ username, email, password });

      const { data } = await axios
        .post('http://localhost:1337/api/auth/local/register', json, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

      this.auth = { ...data.user, token: data.jwt };
    }

  },
  persist: true
});
