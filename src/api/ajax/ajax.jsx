import axios from "axios";
import {message} from "antd";

export default function Ajax(url,data = {},method = 'GET') {
  method = method.toLowerCase();
  let reqParams = data;
  if(method === 'get'){
    reqParams = {
      params:data
    }
  }
  console.log(reqParams)
  return axios[method](url, reqParams)
    .then(res => {

      if(res.data.status === 0){

        return res.data.data || {};
      }else{
        message.error(res.data.msg);
      }
    })
    .catch(error => {
      message.error('网络延迟，请重新刷新');
    })
}

/*
axios.post('/login', {username, password})
  .then(res => {
    console.log(res);
    if(res.data.status === 0){
      this.props.history.replace('/admin');
    }else{
      message.error(res.data.msg);
      this.props.form.resetFields(['password'])
    }
  })
  .catch(error => {
    message.error('网络延迟，请重新刷新');
    this.props.form.resetFields(['password'])
  })*/
