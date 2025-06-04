import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 创建axios实例
const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1', // 暂时没有服务器
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器 - 添加认证token
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn('获取token失败', error);
  }
  return config;
});

// 响应拦截器 - 统一错误处理
apiClient.interceptors.response.use(
  response => {
    // 成功响应直接返回数据部分
    return response.data;
  },
  error => {
    // 统一错误处理
    if (error.response) {
      // 服务器返回错误 (4xx, 5xx)
      const status = error.response.status;
      
      switch (status) {
        case 401:
          // token过期处理
          console.log('认证过期，跳转登录页');
          // router.replace('/login'); // 在组件中使用router
          break;
        case 403:
          console.log('权限不足');
          break;
        case 404:
          console.log('资源不存在');
          break;
        case 500:
          console.log('服务器错误');
          break;
        default:
          console.log(`未知错误: ${status}`);
      }
      
      return Promise.reject({
        status,
        message: error.response.data?.message || '请求失败'
      });
    } else if (error.request) {
      // 请求已发出但无响应 (网络问题)
      return Promise.reject({
        status: -1,
        message: '网络连接异常，请检查网络'
      });
    } else {
      // 请求配置错误
      return Promise.reject({
        status: -2,
        message: '请求配置错误'
      });
    }
  }
);

export default apiClient;
