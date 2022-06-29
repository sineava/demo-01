<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm config"
  >
    <el-form-item label="风险评估标准" prop="pip">
      <el-radio-group v-model="ruleForm.pip">
        <el-radio :label="0">顺序</el-radio>
        <el-radio :label="1">倒叙</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
    >
      <el-table-column
        label="很低"
        align="center"
      >
        <template v-slot="scope">
          <span class="variable">X</span>
          <span class="unit">{{ ruleForm.pip===0 ? '≤': '≥' }}</span>
          <span class="vlaue">
            <el-input-number
              v-model="scope.row.a"
              :controls="false"
              :precision="2"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="较低"
        align="center"
      >
        <template v-slot="scope">
          <span class="vlaue">
            <el-input-number
              v-model="scope.row.a"
              :controls="false"
              :precision="2"
            />
          </span>
          <span class="unit">{{ ruleForm.pip===0 ? '＜' : '＞' }}</span>
          <span class="variable">X</span>
          <span class="unit">{{ ruleForm.pip===0 ? '≤' : '≥' }}</span>
          <span class="vlaue">
            <el-input-number
              v-model="scope.row.b"
              :precision="2"
              :controls="false"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="一般"
        align="center"
      >
        <template v-slot="scope">
          <span class="vlaue">
            <el-input-number
              v-model="scope.row.b"
              controls-position
              :precision="2"
              :controls="false"
            />
          </span>
          <span class="unit">{{ ruleForm.pip===0 ? '＜' : '＞' }}</span>
          <span class="variable">X</span>
          <span class="unit">{{ ruleForm.pip===0 ? '≤' : '≥' }}</span>
          <span class="vlaue">
            <el-input-number
              v-model="scope.row.c"
              :precision="2"
              :controls="false"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="较高"
        align="center"
      >
        <template v-slot="scope">
          <span class="vlaue">
            <el-input-number
              v-model="scope.row.c"
              :precision="2"
              :controls="false"
            />
          </span>
          <span class="unit">{{ ruleForm.pip===0 ? '＜' : '＞' }}</span>
          <span class="variable">X</span>
          <span class="unit">{{ ruleForm.pip===0 ? '≤' : '≥' }}</span>
          <span class="vlaue">
            <el-input-number
              v-model="scope.row.d"
              :precision="2"
              :controls="false"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="很高"
        align="center"
      >
        <template v-slot="scope">
          <span class="vlaue">
            <el-input-number
              v-model="scope.row.e"
              :precision="2"
              :controls="false"
            />
          </span>
          <span class="unit">{{ ruleForm.pip===0 ? '＜' : '＞' }}</span>
          <span class="variable">X</span>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
export default {
  props: {
    thresholds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ruleForm: {
        pip: 0
      },
      tableData:[{
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
      }],
      rules: {
        pip: [
          { required: true, message: '请选择评估标准', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    thresholds: {
      handler(newName, oldName) {
        this.thresholds = newName
        this.assembleTableData()
      },
      immediate: true,
      deep:true
    }
  },
  /*
   * created() {
   *   this.assembleTableData()
   * },
   */
  methods:{
    assembleTableData(){
      this.thresholds.forEach(item => {
        switch (Number(item.riskGrade)){
        case 1: // 高风险
          this.tableData[0].e = item.riskGradeMax
          break
        case 2: // 较高风险度
          this.tableData[0].d = item.riskGradeMax
          break
        case 3: // 一般风险度
          this.tableData[0].c = item.riskGradeMax
          break
        case 4: // 较低风险度
          this.tableData[0].b = item.riskGradeMax
          break
        case 5: // 低风险度
          this.tableData[0].a = item.riskGradeMax
          this.ruleForm.pip = item.riskGradeMaxSymbol===3?0:1
          break
        }
      })
    },
    getThresholds(){
      this.tableData[0]
      if (!this.tableData[0].a || !this.tableData[0].b|| !this.tableData[0].c|| !this.tableData[0].d){
        return false
      }
      return [
        {
          gradeName:'很低',
          riskGrade:5,
          riskGradeMax:this.tableData[0].a,
          riskGradeMaxSymbol:this.ruleForm.pip===0?3:1,
          riskGradeMin:'',
          riskGradeMinSymbol:'',
          unit:''
        },
        {
          gradeName:'较低',
          riskGrade:4,
          riskGradeMax:this.tableData[0].b,
          riskGradeMaxSymbol:this.ruleForm.pip===0?3:1,
          riskGradeMin:this.tableData[0].a,
          riskGradeMinSymbol:this.ruleForm.pip===0?4:2,
          unit:''
        },
        {
          gradeName:'一般',
          riskGrade:3,
          riskGradeMax:this.tableData[0].c,
          riskGradeMaxSymbol:this.ruleForm.pip===0?3:1,
          riskGradeMin:this.tableData[0].b,
          riskGradeMinSymbol:this.ruleForm.pip===0?4:2,
          unit:''
        },
        {
          gradeName:'较高',
          riskGrade:2,
          riskGradeMax:this.tableData[0].d,
          riskGradeMaxSymbol:this.ruleForm.pip===0?3:1,
          riskGradeMin:this.tableData[0].c,
          riskGradeMinSymbol:this.ruleForm.pip===0?4:2,
          unit:''
        },
        {
          gradeName:'很高',
          riskGrade:1,
          riskGradeMax:this.tableData[0].d,
          riskGradeMaxSymbol:this.ruleForm.pip===0?4:2,
          riskGradeMin:'',
          riskGradeMinSymbol:'',
          unit:''
        },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
.config {
    /deep/ .el-input-number {
        display: inline-block;
        width: 60px;
    }

    .vlaue {
        margin: 0 5px;
    }

    .variable {
        margin: 0 5px;
        font-weight: bold;
    }
}

</style>
