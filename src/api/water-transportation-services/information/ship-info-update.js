import request from '@/utils/request'

/**
 * 通过船舶识别号查询公务船舶信息
 */
 export function getInfoByIdentifier(params) {
  return request({
    url: `/water-transportation-services/v1/ship-info-update/official-ship-info`,
    method: 'post',
    params
  })
}