<template>
  <div>
    <div id="login" class="flex flex-col gap-4 items-center justify-center w-screen h-screen">
      <form @submit.prevent="login" class="flex flex-col gap-4 justify-center bg-white p-10 shadow-lg rounded">
        <div>
          <label class="text-sm font-medium text-black">UserName</label>
          <input type="text" v-model="name" placeholder="Enter Name..."
            class="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-2" />
        </div>

        <div>
          <label class="text-sm font-medium text-black">Password</label>
          <input type="password" v-model="password" placeholder="Enter Password"
            class="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-2" />
        </div>
        <button class="bg-blue-500 text-white rounded-lg px-3 py-2" type="submit">{{ loading ? 'Loading...' : 'Login'
          }}</button>
        <p class="text-center">Don't have an account ? <span class="text-blue-500 underline"><router-link
              to="/signup">Sign
              up</router-link></span></p>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
const name = ref('')
const password = ref("")
const router = useRouter();
const login = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name.value,
        password: password.value
      })
    })
    const json = await response.json();
    if (json?.error) {
      alert(json.error);
    } else {
      storeLocalData("token", json?.token);
      alert('Login successful!');
      router.push('/');
    }

  } catch (error) {
    alert('An unexpected error occurred. Please try again.');
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
#login {
  background: url("../assets/bg.jpg");
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
  margin: 0;
}
</style>
