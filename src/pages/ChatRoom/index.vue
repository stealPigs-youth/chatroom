<template>
    <div class="chatroom">
        <ul class="memberlist">
            <li v-for="user in userList">{{user}}</li>
        </ul>
        <div class="chatcontent">
            <ul>
                <li v-for="chatcontent in chatContentList">{{ chatcontent.username+':'+chatcontent.message }}</li>
            </ul>
            <input type="text" :value="message" v-on:change="message=$event.target.value">
            <button v-on:click="sendMessage">发送</button>
        </div>
        

    </div>
</template>

<script setup>
import {ref,reactive} from 'vue'
import router from '@/router'
import { io } from "socket.io-client";
const {currentRoute}=router

let userList=reactive([])
let chatContentList=reactive([])
let message=ref('')

function sendMessage(){
    socket.emit('sendmessage',message.value)
}

const socket = io("ws://localhost:3000")
socket.emit('CtoS-username',currentRoute.value.params.username)

socket.on('StoC-userList',(receiveduserList)=>{
    for(let i=0;i<receiveduserList.length;i++){
        userList[i]=receiveduserList[i]
    }
})

socket.on('getmessage',(messageObj)=>{
    chatContentList.push(messageObj)
})


</script>

<style scoped lang='less'>
    .chatroom{
        display: flex;
        margin: auto;
        height: 500px;
        width: 800px;
        background-color: #ccc;
        .memberlist{
            flex: 1;
            border: 2px solid #aaa;
            padding: 10px 0 0 20px;
            
        }
        .chatcontent{
            flex: 5;
        }
    }
</style>
