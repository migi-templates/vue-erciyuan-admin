import request from '@/utils/request.js';

export const getUrl = () => {
  return request({
    url: '/images',
    method: 'get',
  });
};

export const listRoutes  = () => {
  return request({
    url: '/getList',
    method: 'post'
  })
}
