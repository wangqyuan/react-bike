import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }

  static ajax(options){
    let loading;
    if (options.data && options.data.isShowLoading !== false){
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    let baseApi = 'https://mock.yonyoucloud.com/mock/3558/api';
      return new Promise((resolve, reject) => {
        axios({
          url:options.url,
          method:'get',
          baseURL:baseApi,
          timeout:5000,
          params: (options.data && options.data.params) || ''
        }).then((res)=>{
          if(res.status===200){
            if(res.data.code === 0){
              loading.style.display = 'none';
              resolve(res.data)
            } else {
              Modal.info({
                title:"提示",
                content:res.data.msg
              })
            }
          } else {
            reject(res.data)
          }
        })
      })
  }
}