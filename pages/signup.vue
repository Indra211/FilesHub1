<template>
  <div>
    <div id="signup" class="flex flex-col gap-4 items-center justify-center w-screen h-screen">
      <form @submit.prevent="signup" class="flex flex-col gap-4 justify-center bg-white p-10 shadow-lg rounded">
        <div>
          <label class="text-sm font-medium text-black">UserName</label>
          <input type="text" v-model="name" placeholder="Enter Name..."
            class="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-2" />
        </div>
        <div>
          <label class="text-sm font-medium text-black">Email</label>
          <input type="email" v-model="email" placeholder="Enter Email..."
            class="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-2" />
        </div>
        <div>
          <label class="text-sm font-medium text-black">Password</label>
          <input type="password" v-model="password.password" placeholder="Enter Password"
            class="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-2" />
        </div>
        <div>
          <label class="text-sm font-medium text-black">Confirm Password</label>
          <input type="password" v-model="password.confirmPassword" placeholder="Enter confirm password"
            class="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-2" />
        </div>
        <button class="bg-blue-500 text-white rounded-lg px-3 py-2" type="submit">{{ loading ? 'Loading...' : 'Signup'
          }}</button>
        <p class="text-center">Already have an account? <span class="text-blue-500 underline"><router-link
              to="/login">Login</router-link></span></p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const name = ref('');
const email = ref('');
const password = ref({
  password: '',
  confirmPassword: ''
});

const signup = async () => {
  if (password.value.password !== password.value.confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  loading.value = true;
  try {

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name.value,
        email: email.value,
        password: password.value.password
      })
    })
    const json = await response.json();
    if (json?.error) {
      alert(json.error);
    } else {
      alert('Signup successful!');
      router.push('/login');
    }
  } catch (error) {
    alert('An unexpected error occurred. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
#signup {
  background: url("../assets/bg.jpg");
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
  margin: 0;
}
</style>
