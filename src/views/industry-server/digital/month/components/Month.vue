<template>
  <el-table
    id="out-table"
    v-loading="loading"
    :data="table"
    :span-method="merge"
    fit
    max-height="650"
  >
    <el-table-column
      label="表四：港口月报"
      class-name="strong"
    >
      <el-table-column
        prop="name"
        label="指标名称"
        width="140"
      />
      <el-table-column
        prop="unit"
        label="计量单位"
        width="100"
      />
      <el-table-column label="本年实际（含重庆港区间吞吐量）">
        <el-table-column label="本月">
          <template v-slot="{row, $index}">
            <span v-if="disabled">{{ row.value }}</span>
            <el-input-number
              v-else
              v-model="table[$index].value"
              :precision="2"
              :min="0"
              :max="99999999999"
              :controls="false"
              style="width: 100%;"
            />
          </template>
        </el-table-column>
        <!-- TODO: -->
        <el-table-column
          label="累计"
        >
          <template v-slot="{row, $index}">
            {{ table[$index].value ? (table[$index].cumulativeValue || 0) + (table[$index].value || 0) : (table[$index].cumulativeValue || 0) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="一套表本年本月数据">
        <template v-slot="{row, $index}">
          <span v-if="disabled">{{ row.tableValue }}</span>
          <el-input-number
            v-else
            v-model="table[$index].tableValue"
            :precision="2"
            :min="0"
            :max="99999999999"
            :controls="false"
            style="width: 100%;"
          />
        </template>
      </el-table-column>
      <el-table-column label="本月与一套表差值（重庆港区内吞吐量绝对值）" width="180">
        <template v-slot="{row, $index}">
          {{ table[$index].value ? Math.abs((table[$index].value || 0) - (table[$index].tableValue || 0)) : 0 }}
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import XLSX2 from "xlsx"
import XLSX from "xlsx-style"
export default {
  props: {
    table: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    exportExcel() {
    /* generate workbook object from table */
      let xlsxParam = { raw: true } // 这个保证表格只进行解析 不做运算
      let wb = XLSX2.utils.table_to_sheet(document.querySelector("#out-table"),xlsxParam)// mytable为表格的id名
      /*
       * if(!wb['!merges']){   //这个东西是当表格有合并的时候才会存在  并不能作为判断有无数据的标准
       *   this.$message.warning('无法导出：报表无数据');
       *   return
       * }
       */
      for (let i = 0;i<11;i++){
        wb["!cols"][i]={wpx:130}
      }
      /*
       * 样式的文档地址
       * https://www.npmjs.com/package/xlsx-style
       */
      for (const key in wb) {
        if (key.indexOf('!') === -1&&wb[key].v){
          wb[key].s ={
            font:{// 字体设置
              sz:13,
              bold:false,
              color:{
                rgb:'000000'// 十六进制，不带#
              }
            },
            alignment:{// 文字居中
              horizontal:'center',
              vertical:'center',
              wrap_text:true
            },
            border: { // 设置边框
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
          }
        }
      }
      let data = this.addRangeBorder(wb['!merges'],wb) // 合并项添加边框
      let filedata = this.sheet2blob(data)
      this.openDownloadDialog(filedata,"港口月报.xlsx")
    },
    openDownloadDialog(url, saveName) {
      if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url) // 创建blob地址
      }
      let aLink = document.createElement('a')
      aLink.href = url
      aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      let event
      if (window.MouseEvent) event = new MouseEvent('click')
      else {
        event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      }
      aLink.dispatchEvent(event)
    },
    sheet2blob(sheet, sheetName) {
      sheetName = sheetName || 'sheet1'
      let workbook = {
        SheetNames: [sheetName],
        Sheets: {}
      }
      workbook.Sheets[sheetName] = sheet // 生成excel的配置项

      let wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
      }
      let wbout = XLSX.write(workbook, wopts)
      let blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
      }) // 字符串转ArrayBuffer
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length)
        let view = new Uint8Array(buf)
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
      }
      return blob
    },
    // 为合并项添加边框
    addRangeBorder(range,ws){
      let arr = ["A","B","C","D","E","F"]
      if (range){
        range.forEach(item=>{
          let startColNumber = Number(item.s.r); let endColNumber = Number(item.e.r)
          let startRowNumber = Number(item.s.c); let endRowNumber = Number(item.e.c)
          const test = ws[arr[startRowNumber] + (startColNumber + 1)]
          for (let col = startColNumber ; col <= endColNumber ; col++)
          {
            for (let row = startRowNumber; row <= endRowNumber ; row++)
            {
              ws[arr[row] + (col + 1)] = test
            }
          }
        })
      }
      return ws
    },
    merge({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if ([6, 8, 10, 12, 14, 17, 19, 21, 23, 25].includes(rowIndex)) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        if ([7, 9, 11, 13, 15, 18, 20, 22, 24, 26].includes(rowIndex)) {
          return [0, 0]
        }
        return [1,1]
      }
    }
  }
}
</script>


<style lang="scss" scoped>
/deep/ .strong {
    font-size: 18px;
    color: #2b85e4;
}

.el-table {
    margin-bottom: 20px;
}

.wrapper {
    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}
</style>
