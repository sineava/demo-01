<template>
  <el-table
    id="out-table"
    v-loading="loading"
    :data="table"
    :cell-style="changeCellStyle"
    fit
    max-height="650"
  >
    <el-table-column
      label="表一：水路运输主要指标电讯月报"
      class-name="strong"
    >
      <el-table-column
        label="编号"
        width="55"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="项目"
        prop="name"
      >
        <template v-slot="scope">
          <span
            v-if="['个体', '旅客周转量', '货运量', '货物周转量', '箱运量', '货运车数量', '商品车数量'].includes(scope.row.name)"
            class="pre-line"
          >
            {{ scope.row.name }}
          </span>
          <span v-else>
            {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="计算单位">
        <template v-slot="scope">
          {{ scope.row.calculatingUnit }}
        </template>
      </el-table-column>
      <el-table-column label="本月汇总（含远洋）">
        <template v-slot="scope">
          <span v-if="scope.$index === 0">
            {{ passengerA }}
          </span>
          <span v-else-if="scope.$index === 4">
            {{ travelerA }}
          </span>
          <span v-else-if="scope.$index === 8">
            {{ freightA }}
          </span>
          <span v-else-if="scope.$index === 13">
            {{ turnoverA }}
          </span>
          <span v-else-if="scope.$index === 18" />
          <span v-else-if="disabled">{{ scope.row.month }}</span>
          <el-input-number
            v-else
            v-model="table[scope.$index].month"
            :min="0"
            :max="999999999"
            :controls="false"
            :placeholder="`请输入${scope.row.name}本月汇总（含远洋）数量`"
            style="width: 100%;"
          />
        </template>
      </el-table-column>
      <el-table-column label="本月远洋">
        <template v-slot="scope">
          <span v-if="scope.$index === 0">
            {{ passengerB }}
          </span>
          <span v-else-if="scope.$index === 4">
            {{ travelerB }}
          </span>
          <span v-else-if="scope.$index === 8">
            {{ freightB }}
          </span>
          <span v-else-if="scope.$index === 13">
            {{ turnoverB }}
          </span>
          <span v-else-if="scope.$index === 18" />
          <span v-else-if="disabled">{{ scope.row.ocean }}</span>
          <el-input-number
            v-else
            v-model="table[scope.$index].ocean"
            :min="0"
            :max="999999999"
            :controls="false"
            :placeholder="`请输入${scope.row.name}本月远洋数量`"
            style="width: 100%;"
          />
        </template>
      </el-table-column>
      <el-table-column label="本月止累计汇总">
        <template v-slot="scope">
          <span v-if="scope.$index === 18" />
          <span v-else>{{ scope.row.monthCumulative }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本月止累计远洋">
        <template v-slot="scope">
          <span v-if="scope.$index === 18" />
          <span v-else>{{ scope.row.oceanCumulative }}</span>
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
  computed: {
    passengerA() {
      const [rowA = 0, rowB = 0] = [this.table[1].month, this.table[3].month]
      return rowA + rowB
    },
    travelerA() {
      const [rowA = 0, rowB = 0] = [this.table[5].month, this.table[7].month]
      return rowA + rowB
    },
    freightA() {
      const [rowA = 0, rowB = 0] = [this.table[9].month, this.table[11].month]
      return rowA + rowB
    },
    turnoverA() {
      const [rowA = 0, rowB = 0] = [this.table[14].month, this.table[16].month]
      return rowA + rowB
    },
    passengerB() {
      const [rowA = 0, rowB = 0] = [this.table[1].ocean, this.table[3].ocean]
      return rowA + rowB
    },
    travelerB() {
      const [rowA = 0, rowB = 0] = [this.table[5].ocean, this.table[7].ocean]
      return rowA + rowB
    },
    freightB() {
      const [rowA = 0, rowB = 0] = [this.table[9].ocean, this.table[11].ocean]
      return rowA + rowB
    },
    turnoverB() {
      const [rowA = 0, rowB = 0] = [this.table[14].ocean, this.table[16].ocean]
      return rowA + rowB
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
      this.openDownloadDialog(filedata,"水路运输主要指标电讯月报.xlsx")
    },
    // 为合并项添加边框
    addRangeBorder(range,ws){
      let arr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
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
    // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
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
    // 改变单元格样式
    changeCellStyle({ rowIndex, columnIndex }) {
      const hightlightRow = [0, 4, 8, 13, 18]
      if (hightlightRow.includes(rowIndex) && [1, 2, 3, 4, 5, 6].includes(columnIndex)) {
        return {
          backgroundColor: '#F2F2F2'
        }
      }
    },
    // 获取处理后的表格数据
    getWrapperTable() {
      return this.table.map((x, index) => {
        if (index === 0) {
          return { ...x, month: this.passengerA, ocean: this.passengerB }
        }
        if (index === 4) {
          return { ...x, month: this.travelerA, ocean: this.travelerB }
        }
        if (index === 8) {
          return { ...x, month: this.freightA, ocean: this.freightB }
        }
        if (index === 13) {
          return { ...x, month: this.turnoverA, ocean: this.turnoverB }
        }
        return { ...x }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .strong {
    font-size: 18px;
    color: #2b85e4;
}

#out-table {
    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}

</style>
