import Ajax from './ajax';

// export const login = (data) =>  Ajax('/login',data,'post');
//export const login = ({username, password}) => Ajax('/login',{username, password},'post');
export const reqlogin = (username, password) => Ajax('/login',{username, password},'post');

//请求验证用户信息
export const reqValidateUserInfo = (id) => Ajax('/validate/user',{id},'POST')