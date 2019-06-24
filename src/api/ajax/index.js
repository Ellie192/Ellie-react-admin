import Ajax from './ajax';
import jsonp from 'jsonp';
import {message} from 'antd';

// export const login = (data) =>  Ajax('/login',data,'post');
//export const login = ({username, password}) => Ajax('/login',{username, password},'post');
export const reqlogin = (username, password) => Ajax('/login',{username, password},'post');

//请求验证用户信息
export const reqValidateUserInfo = (id) => Ajax('/validate/user',{id},'POST');

//请求天气

export const reqWeather = function() {
  return new Promise((resolve, reject) => {
    jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',{},function(err,data){
      if(!err){
        const {weather,dayPictureUrl} = data.results[0].weather_data[0];
        resolve(
          {
            weatherImg:dayPictureUrl,
            weather
          }
        )
      }else{
        message.error('请求天气数据失败，请刷新重试');
        reject();
      }
    })
  })

};

//请求category数据
export const reqCategories = (parentId) => Ajax('manage/category/list',{parentId});