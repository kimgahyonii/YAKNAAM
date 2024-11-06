<template>
    <router-view></router-view>
</template>

<script>
import {createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
// Vue 애플리케이션에 router 추가
    .use(router)
    .mount('#app');
</script>