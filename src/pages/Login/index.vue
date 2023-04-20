<template>
    <div id="login">
        <div>
            <span>用户名</span><input type="text" :value="username" v-on:change="username=$event.target.value">
        </div>
        <div>
            <span>密码</span><input type="text" id="password" :value="password" v-on:change="password=$event.target.value">
        </div>
        <button v-on:click="toChatRoom">进入聊天室</button>
    </div>
</template>
<script setup>
import router from '@/router';
import { isPass } from '@/api';
import {ref} from 'vue'
let username=ref('')
let password=ref('123456')

async function toChatRoom(){
    if(username.value==''){
        alert('用户名不能为空')
        return
    }
    if(password.value!='123456'){
        alert('密码是123456')
        return
    }
    let result=await isPass(username.value)
    if(result.data!=true){
        alert('用户名已被使用')
        return
    }
    router.push({
        name:'chatroom',
        params:{username:username.value}
    })
}

</script>
<style scoped lang='less'>
    #login{
            margin: auto;
            margin-top: 200px;
            width: 300px;
            height: 100px;
            padding: 20px;
            background-color: #ccc;
            box-sizing: border-box;
        }
</style>
