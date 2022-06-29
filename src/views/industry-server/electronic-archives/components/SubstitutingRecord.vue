<template>
  <div>
    <div class="icon-title">
      <span class="span" /> 船检记录
    </div>
    <el-table
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="listA"
        element-loading-text="Loading"
        stripe
        fit
        border
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检验编号"
          prop="shipSurveyNo"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          label="船名"
          prop="shipName"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          label="检验种类"
          prop="shipSurveyItemName"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          label="检验开始时间"
          prop="shipSurveyStartDate"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          label="检验地点"
          prop="shipSurveyPlace"
          show-overflow-tooltip
          width="200"
        />
        <el-table-column
          label="下次检验日期"
          prop="nextInspectionDate"
          show-overflow-tooltip
          width="170"
        />  
        <el-table-column
          label="操作"
          align="center"
        >
          <template v-slot="scope">
            <el-button size="mini" plain @click="handleInfo(scope.row.id)">
              <em class="el-icon-info" />详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-two">
      <el-table
        v-if="listB.length>0"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="listB"
        :show-header="false"
        element-loading-text="Loading"
        stripe
        fit
        max-height="330"
        border
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ scope.$index + 6 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="检验编号"
          prop="shipSurveyNo"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          label="船名"
          prop="shipName"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          label="检验种类"
          prop="shipSurveyItemName"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          label="检验开始时间"
          prop="shipSurveyStartDate"
          show-overflow-tooltip
          width="150"
        />
        <el-table-column
          label="检验地点"
          prop="shipSurveyPlace"
          show-overflow-tooltip
          width="200"
        />
        <el-table-column
          label="下次检验日期"
          prop="nextInspectionDate"
          show-overflow-tooltip
          width="170"
        />  
        <el-table-column
          label="操作"
          align="center"
        >
          <template v-slot="scope">
            <el-button size="mini" plain @click="handleInfo(scope.row.id)">
              <em class="el-icon-info" />详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      listA:[],
      listB:[]
    };
  },
  async mounted() {
    if(this.list){
      this.list.forEach((item,index) => {
        if(index<5){
          this.listA.push(item)
        }else{
          this.listB.push(item)
        }
      });
    }
  },
  methods: {
    handleInfo(id) {
      this.$emit('tabClick', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-two{
  /deep/ .table-border{
    margin-top: -1px;
  }
}
</style>
