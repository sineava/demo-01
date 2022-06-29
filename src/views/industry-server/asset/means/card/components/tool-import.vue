<template>
  <span>
    <el-dropdown style="margin: 0 5px;">
      <el-button size="small" type="primary">
        导入数据<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in items" :key="index">
          <ExcelRead
            :ref="`excel_read_${item.value}`"
            :button="{text:item.lable,isButton:false}"
            :extend="{id:item.value,lable:item.lable}"
            @readData="readData"
          />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <ExcelTableOne ref="excelTableOne" />
    <ExcelTableTwo ref="ExcelTableTwo" />
    <ExcelTableThree ref="ExcelTableThree" />
    <ExcelTableFour ref="ExcelTableFour" />
    <ExcelTableFive ref="ExcelTableFive" />
    <ExcelTableSix ref="ExcelTableSix" />
    <ExcelTableSeven ref="ExcelTableSeven" />
    <ExcelTableBuilding ref="ExcelTableBuilding" />
    <ExcelTableCar ref="ExcelTableCar" />
    <ExcelTableLand ref="ExcelTableLand" />
  </span>
</template>

<script>
import ExcelRead from '@/components/ExcelRead'
import ExcelTableOne from '../excel-table/table-one'
import ExcelTableTwo from '../excel-table/table-two'
import ExcelTableThree from '../excel-table/table-three'
import ExcelTableFour from '../excel-table/table-four'
import ExcelTableFive from '../excel-table/table-five'
import ExcelTableSix from '../excel-table/table-six'
import ExcelTableSeven from '../excel-table/table-seven'
import ExcelTableBuilding from '../excel-table/table-building'
import ExcelTableCar from '../excel-table/table-car'
import ExcelTableLand from '../excel-table/table-land'
export default {
  components:{
    ExcelRead,
    ExcelTableOne,
    ExcelTableTwo,
    ExcelTableThree,
    ExcelTableFour,
    ExcelTableFive,
    ExcelTableSix,
    ExcelTableSeven,
    ExcelTableBuilding,
    ExcelTableLand,
    ExcelTableCar,
  },
  props:{
    button_roles:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      items: [
        { value:1, lable:'房屋' },
        { value:2, lable:'设备' },
        { value:3, lable:'文物' },
        { value:4, lable:'图书' },
        { value:5, lable:'家具' },
        { value:6, lable:'动植物' },
        { value:7, lable:'物资' },
        { value:101, lable:'构筑物' },
        { value:102, lable:'土地' },
        { value:201, lable:'车辆' },
      ]
    }
  },
  created() {
  },
  methods: {
    // EXCEL读取数据
    readData(excelData,extend){
      if (excelData && excelData.length>0){
        excelData.splice(0,1)
      }
      const excel = excelData
      if (excel.length>0){
        this.dialogVisible = true
        switch (extend.id) {
        case 1:
          this.$nextTick(()=>{
            this.$refs.excelTableOne.opens(excel)
          })
          break
        case 2:
          this.$nextTick(()=>{
            this.$refs.ExcelTableTwo.opens(excel)
          })
          break
        case 3:
          this.$nextTick(()=>{
            this.$refs.ExcelTableThree.opens(excel)
          })
          break
        case 4:
          this.$nextTick(()=>{
            this.$refs.ExcelTableFour.opens(excel)
          })
          break
        case 5:
          this.$nextTick(()=>{
            this.$refs.ExcelTableFive.opens(excel)
          })
          break
        case 6:
          this.$nextTick(()=>{
            this.$refs.ExcelTableSix.opens(excel)
          })
          break
        case 7:
          this.$nextTick(()=>{
            this.$refs.ExcelTableSeven.opens(excel)
          })
          break
        case 101:
          this.$nextTick(()=>{
            this.$refs.ExcelTableBuilding.opens(excel)
          })
          break
        case 102:
          this.$nextTick(()=>{
            this.$refs.ExcelTableLand.opens(excel)
          })
          break
        default:
          this.$nextTick(()=>{
            this.$refs.ExcelTableCar.opens(excel)
          })
          break
        }
      }
    },
  }
}
</script>
