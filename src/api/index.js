import request from "./request";

export function isPass(username){
    return request({
        url:`/ispass?username=${username}`,
        method:'get'
    })
}