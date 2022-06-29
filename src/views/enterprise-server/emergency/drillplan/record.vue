<template>
  <div>
    <div class="basic-detail">
      <el-table
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        element-loading-text="Loading"
        height="665"
        stripe
        fit
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
        <el-table-column label="所属管理部门" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.enterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="演习名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="演习类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.actingType }}
          </template>
        </el-table-column>
        <el-table-column label="演习类型细类" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.actingTypeDetailed }}
          </template>
        </el-table-column>
        <el-table-column label="演习地点" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planAddress }}
          </template>
        </el-table-column>
        <el-table-column label="演练牵头单位" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planOriginator }}
          </template>
        </el-table-column>
        <el-table-column label="计划天数" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planDays }}
          </template>
        </el-table-column>
        <el-table-column label="参演人员" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planPersons }}
          </template>
        </el-table-column>
        <el-table-column label="年度计划" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ ['应急演练','综合演练'][scope.row.planType-1] }}
          </template>
        </el-table-column>
        <el-table-column label="发布状态" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <el-tag :type="scope.row.postStatus===2 ? 'success':'info'">{{ scope.row.postStatus===2 ? '已发布':'未发布' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="计划填报时间" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.planFillInTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :width="120"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="变更记录信息"
      :visible.sync="dialogVisible"
      width="90%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      custom-class="add-company"
    >
      <Detail ref="detail" :dataObj="row" />
    </el-dialog>
  </div>
</template>

<script>
import { queryVersionDetail } from '@/api/emergency-services/exercise-plan'
import Detail from './detail'
export default {
  components: {
    Detail
  },
  props:{
    id:{
      type:[Number,String],
      default:0
    },
    oper:{
      type:String,
      default:'add'
    }
  },
  data() {
    return {
      dialogVisible:false,
      listLoading:false,
      list:[],
      row:{}
    }
  },
  watch:{
    id(newV,e){
      this.fetchDetail(newV)
    }
  },
  created() {
    this.fetchDetail(this.id)
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      queryVersionDetail({ id }).then(res => {
        this.list = res.data
      })
    },
    handleDetail(item){
      this.row = item
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
.add-company {
    .el-dialog__body {
        min-height: 100px;
    }
}
</style>
<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }
}

.add-yjyljh {
    .el-form-item {
        margin: 0;
    }

    .input-number {
        width: 100%;

        /deep/ .el-input__inner {
            text-align: left;
        }
    }
}
</style>
