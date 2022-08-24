<template>
  <div class="home">
    <img src="../assets/images/logo.png" alt="logo" />
    <h1>{{ msg }}</h1>
    首页
    <router-link to="/login">去登陆</router-link>
    <form class="login-form">
        <div class="login-form-item">
            <label class="h-label">姓名：</label>
            <div class="h-inner__wrapper">
                <input class="h-input__inner" type="text" v-model="username" placeholder="" />
            </div>
        </div>

        <div class="login-form-item">
            <input type="button" @click="handleSubmit" value="提交" />
        </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const username = ref<string>("");
let msg = ref<string>("搭建webpack5+vue3+ts项目")
const handleSubmit = () => {
    console.log(username.value);
}
</script>

<style lang="less" scoped>
.login-form {
    margin-top: 50px;
    color: #333;
    .login-form-item {
       display: flex;       
       font-size: 14px;
    }
    .h-label {
        display: inline-flex;
        justify-content: flex-end;
        align-items: flex-start;
        flex: 0 0 auto;
        font-size: inherit;
        color: #606266;
        height: 40px;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    }
    .h-inner__wrapper {
        display: inline-flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        padding: 1px 11px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        transition: box-shadow .2s cubic-bezier(.645, .054, .355, 1);
        box-shadow: 0 0 0 1px #dcdfe6 inset;
        &:hover {
            box-shadow: 0 0 0 1px #c0c4cc inset;
        }
        &.is-focus {
            box-shadow: 0 0 0 1px #409eff inset;
        }
        &:focus-within {
            box-shadow: 0 0 0 1px #409eff inset;
        }
        
    }
    .h-input__inner {
        width: 100%;
        flex-grow: 1;
        -webkit-appearance: none;
        border: none;
        outline: none;
        background: none;
        box-sizing: border-box;
        color: #333;
        font-size: inherit;
        height: 38px;
        line-height: 38px;
    }
}
</style>