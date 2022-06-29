import request from '@/utils/request'

/**
 * 获取文件地址
 * @param {*} params
 */
export function getFileUrl(params) {
  return request({
    url: '/upload/v1/open/file/presGetObject',
    method: 'get',
    baseURL:'',
    params
  })
}
