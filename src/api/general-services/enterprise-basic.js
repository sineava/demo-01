import request from '@/utils/request'

/**
 * 通过部门编号获取关联的企业列表
 */
export function getListById(params) {
  return request({
    url: '/general-services/v1/enterprise-basic/find-infos',
    method: 'get',
    params
  })
}
