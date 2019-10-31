import axios from 'axios';
import Vue from 'vue';

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false;

export const GetMountain = () => {
    return axios.get('/mountain.json')
}

export const GetDaoguan = () => {
    return axios.get('/daoguan.json')
}