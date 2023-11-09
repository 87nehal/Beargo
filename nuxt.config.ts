// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules:['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  runtimeConfig:{
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFESH_TOKEN_SECRET,
    cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    perspectiveApiKey: process.env.PERSPECTIVE_API_KEY,
    finnhubApiKey: process.env.FINNHUB_API_KEY,
    sightengineUserKey: process.env.SIGHTENGINE_API_USER,
    sightEngineSecret: process.env.SIGHTENGINE_API_SECRET
  }
})
