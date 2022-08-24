<template>
    <div>

    </div>
</template>

<script setup lang="ts">
const arr = [1,2,3,4,5,6,7,8];
for(let i=0, len = arr.length; i < len; i++) {
    if (arr[i] < 5) {
        arr.splice(i, 1)
        i--;
    }
}
console.log(arr);

</script>

<style scoped>

</style>