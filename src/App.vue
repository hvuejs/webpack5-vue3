<template>
  <div class="home">
    <router-view />
  </div>
</template>

<script>
export default {
  setup () {
    return {
      msg: '测试手搭webpack5.x项目'
    }
  }
}
</script>
<style >
.home {
  color: red;
}
div {
  font-size: 18px;
}
</style>