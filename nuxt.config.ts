// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    jwtsecret: "1111112222222444444@1345678",
  },
  modules: ["@nuxtjs/tailwindcss"],
});
