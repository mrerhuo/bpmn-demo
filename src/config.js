import axios from 'axios'
import {
  Notice,
  LoadingBar
} from 'iview'

var instance = axios.create({ //axios的全局配置-
  baseURL: 'http://localhost:8080/webapi/webapi', //测试环境
  withCredentials: true
});

instance.interceptors.request.use(config => {
  //loading动画打开
  LoadingBar.start();
  return config
}, function (error) {
  //请求超时关闭动画
  LoadingBar.finish();
  //请求超时
  Notice.error({
    title: '请求超时，请稍后重试或者请和管理员联系！'
  });
  return Promise.reject(error);
})
instance.interceptors.response.use(response => {
  //成功关闭动画
  LoadingBar.error();
  return response
}, function (error) {
  //请求失败关闭动画
  LoadingBar.error();
  console.log(error);
  //请求失败
  Notice.error({
    title: '超时，请重新登录系统！'
  });
  // window.location.href="/";
  return Promise.reject(error);
})
if (window.sessionStorage.getItem("token") != null) {
  var token = window.sessionStorage.getItem("token").replace('"', '').replace('"', '');
  if (token != null) {
    instance.defaults.headers.common["authorization"] = token;
  }
}

export default instance
