import { getManagementDepartmentSelectList } from '@/api/general-services/supervisory-capability/management-department'

/**
 * 组装树
 * @returns Array
 */
function getTree(id, treeData) {
  const treeArr = []
  treeData.forEach((item) => {
    if (item.parentId === id) {
      const data = {
        label: item.departmentName,
        value: item.id,
        children: getTree(item.id, treeData)
      }
      if (data.children.length === 0) delete data.children
      treeArr.push(data)
    }
  })
  return treeArr
}

/**
 * 获取机构树信息
 */
const getDepts = async() => {
  const res = await getManagementDepartmentSelectList()
  if (!res.data) return
  return getTree(0, res.data)
}
export default getDepts
