import axios from 'axios'
import {Message, Alert} from 'element-ui'
import url from '../utils/url';
import {getCookie,delCookie} from "../utils/utils";
import sessionStorage from '../utils/sessionStorage'
import router from '../router'
// axios.defaults.headers.common['Authentication'] = sessionStorage.getSessionStorage("ms_token");
axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  console.log("1111111111===============11111111111111",data)
  if(data.status== 200){
    
    if(data.data.status==503){

      router.push({path: "/error"});

    }
    if(data.data.status==555){

      Message.error({message: '超过最大增加个数!'});

      }
    
  }
  if (data.status && data.status == 200 && data.data.status == 'error') {
    
    // Message.error({message: data.data.msg});
    return;
  }
  return data;
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    // Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status == 403) {
    // Message.error({message: '权限不足,请联系管理员!'});
  }else if (err.response.status == 400) {
    // Message.error({message: '登录已失效，请重新登录'});
    
  //   router.replace({
  //     path: '/login',
  //     query: {
  //         redirect: router.currentRoute.fullPath
  //     }
  // })
  // this.$router.push({ path: '/login' })

    
    
    
  }else {
    // Message.error({message: '未知错误!!!!'});
  }
  return Promise.resolve(err);
})

var base = url.server;
// var userToken=`?token=${getCookie("token")}`;

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`, //?token=${getCookie("token")}
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      'token': sessionStorage.getSessionStorage("ms_token")
      // 'token': 111111111
      // num: "1111111111111"
      
    }
  });
}




export const postRequestLogin = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',

    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': sessionStorage.getSessionStorage("ms_token")
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
// export const getRequest = (url) => {
//   return axios({
//     method: 'get',
//     url: `${base}${url}`
//   });
// }