import axios from 'axios';
import Vue from 'vue';

axios.defaults.baseURL = '/url';
Vue.config.productionTip = false;
Vue.config.devlopmentTip = false;

export const GetUser = (name, password) => {
    return axios.get(`/api/services/app/Register/GetUserByName?Name=${name}&Password=${password}`)
}

export const GetMountain = () => {
    return axios.get(`/mountain.json`)
}

export const GetDaoguan = () => {
    return axios.get(`/daoguan.json`)
}

export const GetMountainIfm = (name) => {
    return axios.get(`/app/Mountain/GetMountainByName?Name=${name}`)
}

export const GetDaoguanIfm = (name) => {
    return axios.get(`/api/services/app/Palace/GetPalaceByName?Name${name}`)
}

export const GetDynasty = (name) => {
    return axios.get(`/api/services/app/Dynasty/GetDynastyByDnt?Dnt=${name}`)
}