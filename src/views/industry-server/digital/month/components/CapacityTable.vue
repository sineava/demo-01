<template>
  <div class="wrapper">
    <el-table
      id="out-table"
      v-loading="loading"
      :data="table"
      fit
      max-height="650"
    >
      <el-table-column
        label="表二：运力情况增减变动月报表"
        class-name="strong"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="单位名称"
          prop="enterpriseName"
        />
        <el-table-column label="客船艘数（艘）">
          <el-table-column
            :label="`${year}年${month}月`"
            prop="shipsCurrentData"
          />
          <el-table-column
            :label="`${Number(year)-1}年${month}月`"
            prop="shipsLastData"
          />
          <el-table-column
            label="增长百分比(%)"
            prop="shipsPercentage"
          />
        </el-table-column>
        <el-table-column label="客船客位数">
          <el-table-column
            :label="`${year}年${month}月`"
            prop="seatCurrentData"
          />
          <el-table-column
            :label="`${Number(year)-1}年${month}月`"
            prop="seatLastData"
          />
          <el-table-column
            label="增长百分比(%)"
            prop="seatPercentage"
          />
        </el-table-column>
        <el-table-column label="货船艘数（艘）">
          <el-table-column
            :label="`${year}年1月`"
            prop="cargoShipCurrentData"
          />
          <el-table-column
            :label="`${Number(year)}年${month}月`"
            prop="cargoShipLastData"
          />
          <el-table-column
            label="增长百分比(%)"
            prop="cargoShipPercentage"
          />
        </el-table-column>
        <el-table-column label="货船吨位数（艘）">
          <el-table-column
            :label="`${year}年${month}月`"
            prop="cargoShipTonnageCurrentData"
          />
          <el-table-column
            :label="`${Number(year)-1}年${month}月`"
            prop="cargoShipTonnageLastData"
          />
          <el-table-column
            label="增长百分比(%)"
            prop="cargoShipTonnagePercentage"
          />
        </el-table-column>
        <el-table-column label="客运量(人)" prop="passengerTraffic" />
        <el-table-column label="旅客周转量(人/公里)" prop="passengerTurnover" />
        <el-table-column label="货运量(吨)" prop="freight" />
        <el-table-column label="货物周转量(吨/公里)" prop="cargoTurnover" />
        <el-table-column label="客运运距" prop="passengerSpace" />
        <el-table-column label="货运运距" prop="freightSpace" />
        <el-table-column label="客船单船产量" prop="outputOfPassengerShipsPerVessel" />
        <el-table-column label="客船单船单客位产量" prop="seatProduction" />
        <el-table-column label="货船单船产量" prop="cargoShipOutputPerVessel" />
        <el-table-column label="货船单船单吨位产量" prop="tonnageProduction" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
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
    date:{
      type:String,
      default:''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      year:'',
      month:''
    }
  },
  watch: {
    date(newV) {
      this.year = moment(newV).format('YYYY')
      this.month = moment(newV).format('MM')
    }
  },
  mounted(){
    this.year = this.date?moment(this.date).format('YYYY'):''
    this.month = this.date?moment(this.date).format('MM'):''
  },
  methods:{
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
      this.openDownloadDialog(filedata,"运力情况增减变动月报表.xlsx")
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
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .strong {
    font-size: 18px;
    color: #2b85e4;
}
</style>
