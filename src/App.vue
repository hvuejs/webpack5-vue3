<template>
    <div class="home">
        <div>
            <router-link to="/utils">工具</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    setup() {
        return { };
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
