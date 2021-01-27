<template>
  <div class="home">“喂你好，是老张吗？我是叮咚买菜的送菜员，由于您电话打不通，特意在页面里跟您说一声，您菜到家了。” {{msg}}</div>
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
<style>
.home {
  color: red;
}
</style>