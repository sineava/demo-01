import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import {saveAs} from 'file-saver'
import moment from 'moment'

/**
 * 导出word
 *
 * @export
 * @param {*} templateUrl 模板地址
 * @param {*} exportData 模板对应的数据
 * @param {*} exportName 导出word名称
 */
export function exportWord(templateUrl,exportData,exportName) {
  // 读取并获得模板文件的二进制内容
  JSZipUtils.getBinaryContent(templateUrl, (error, content) => {
    // 抛出异常
    if (error) {
      throw error
    }

    // 创建一个PizZip实例，内容为模板的内容
    let zip = new PizZip(content)
    // 创建并加载docxtemplater实例对象
    // eslint-disable-next-line new-cap
    let doc = new docxtemplater().loadZip(zip)
    // 设置模板变量的值
    doc.setData(exportData)

    try {
      // 用模板变量的值替换所有模板变量
      doc.render()
    } catch (error) {
      // 抛出异常
      let e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties
      }
      // console.log(JSON.stringify({ error: e }))
      throw error
    }
    // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
    let out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    })
    // 将目标文件对象保存为目标类型的文件，并命名
    saveAs(out, (exportName || moment(new Date().getTime()).format('YYYYMMDDHHmmss'))+'.docx')
  })
}
