import FileSaver from 'file-saver'
import XLSX from 'xlsx'

const htmlToExcel = {
  getExcel(dom, title = '默认标题') {
    let excelTitle = title
    let wb = XLSX.utils.table_to_book(document.querySelector(dom))
    /* 获取二进制字符串作为输出 */
    let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        excelTitle + '.xlsx'
      )
    } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout)
    }
    return wbout
  },
  getJsonExcel(table = [], title = '默认标题') {
    let excelTitle = title
    /**
     * 所需格式
     * var ws = XLSX.utils.json_to_sheet([
     *    {S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
     *    {S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
     *  ], {header:["S","h","e","e_1","t","J","S_1"]});
     */
    const wb = {
      Sheets: {
        sheet1: XLSX.utils.json_to_sheet(table, { skipHeader: true })
      },
      SheetNames: ['sheet1']
    }
    /* 获取二进制字符串作为输出 */
    let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        excelTitle + '.xlsx'
      )
    } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout)
    }
    return wbout
  },
  getMoreSheet(data = {}) {
    const obj = {}
    data.data.forEach((item,index) => {
      obj[data.sheetName[index]] =  XLSX.utils.json_to_sheet(item, { skipHeader: true })
    })
    const wb = {
      Sheets: obj,
      SheetNames: data.sheetName
    }
    /* 获取二进制字符串作为输出 */
    let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        data.name
      )
    } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout)
    }
    return wbout
  },
  parseExcelDate(n, isDate1904) {
    const parsed = XLSX.SSF.parse_date_code(n, { date1904: isDate1904 });
    // return `${parsed.y}-${parsed.m}-${parsed.d}`;
    return new Date(parsed.y, parsed.m, parsed.d, parsed.H, parsed.M, parsed.S);
  }
}

export default htmlToExcel
