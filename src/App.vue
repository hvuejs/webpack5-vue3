<template>
    <div class="home">
        <img src="./assets/images/logo.png" alt="logo" />
        <h1>{{ msg }}</h1>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    setup() {
        return {
            msg: "搭建webpack5+vue3+ts项目",
        };
    },
});
</script>

<style lang="less">
html, body {
    font-size: 14px;
}
.home {
    color: red;
}
a {
    font-size: 16px;
}
</style>
