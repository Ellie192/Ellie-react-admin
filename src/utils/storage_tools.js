
const USER_KEY ="USER_KEY";
const USER_TIME = 'USER_TIME';
const EXPIRES_IN = 1000 * 3600 * 24 * 7;
export const getItem = function () {
  // 读取7天免登录时间
  const startTime = localStorage.getItem(USER_TIME);
  //超过时间返回空对象，没有数据，并不会跳转到admin页面
  if(Date.now() - startTime > EXPIRES_IN ){
    removeItem();
    return {};
  }
  //数据没过期，返回正常数据
  return JSON.parse(localStorage.getItem(USER_KEY))
};
export const setItem = function(data) {
  //获取第一次输入成功数据的时间戳
  localStorage.setItem(USER_TIME,Date.now());
  //获取第一次输入成功数据的数据
  localStorage.setItem(USER_KEY,JSON.stringify(data))
};
export const removeItem = function() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(USER_TIME);
}
