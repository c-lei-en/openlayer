import axios from 'axios';
import Vue from 'vue';
let mes = window.location;
let _baseurl = `//${mes.hostname}:${mes.port}`;

axios.defaults.baseURL = _baseurl;
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false;



export function GetUser(user, password){
    return axios.get(`/api/services/app/Register/GetUserByName?Name=${user}&Password=${password}`)
}

export function GetMountain() {
    return axios.get( `http://47.98.245.7:9999/mountain.json`)
}

export function GetDaoguan() {
    return axios.get(`http://47.98.245.7:9999/daoguan.json`)
}