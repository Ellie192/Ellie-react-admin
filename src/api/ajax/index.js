import Ajax from './ajax';

// export const login = (data) =>  Ajax('/login',data,'post');
//export const login = ({username, password}) => Ajax('/login',{username, password},'post');
export const login = (username, password) => Ajax('/login',{username, password},'post');
