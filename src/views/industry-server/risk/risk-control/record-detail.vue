<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="风险管控措施记录详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 评估信息信息
    </div>
    <el-table
      :data="list"
      fit
      border
      class="table-border"
    >
      <el-table-column
        label="风险事件"
        prop="incidentName"
      />
      <el-table-column
        label="所属作业单元"
        prop="activityName"
      />
      <el-table-column
        label="制险因素"
        align="center"
      >
        <template v-slot="scope">
          <div
            v-for="(item,index) in scope.row.riskControlFactorsInfoVoList"
            :key="index"
            class="table-list"
          >
            {{ item.factorsName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="制险因素分类"
        align="center"
      >
        <template v-slot="scope">
          <div
            v-for="(item,index) in scope.row.riskControlFactorsInfoVoList"
            :key="index"
            class="table-list"
          >
            {{ item.factorsType===1?'人的因数':(item.factorsType===2?'设备因素':(item.factorsType===3?'环境因素':'管理因素')) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="制险因素相关描述"
        width="180"
        align="center"
      >
        <template v-slot="scope">
          <div
            v-for="(item,index) in scope.row.riskControlFactorsInfoVoList"
            :key="index"
            class="table-list"
          >
            {{ item.factorsDesc }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="发生可能性（L）"
        prop="happenPossibility"
        width="150"
      />
      <el-table-column
        label="后果严重程度（C）"
        prop="seriousDegree"
        width="180"
      />
      <el-table-column
        label="风险值"
        prop="riskValue"
      />
      <el-table-column label="风险等级">
        <template v-slot="scope">
          {{ scope.row.riskGrade===1?'较小风险':(scope.row.riskGrade===2?'一般风险':(scope.row.riskGrade===3?'较大风险':'重大风险')) }}
        </template>
      </el-table-column>
    </el-table>
    <div
      style="margin-top: 20px;"
      class="icon-title"
    >
      <span class="span" /> 风险管控措施
    </div>
    <el-form
      ref="ruleForm"
      size="medium"
      :model="ruleForm"
      label-width="150px"
      disabled
    >
      <el-form-item
        label="管控措施:"
        prop="controlMeasures"
      >
        <el-input
          v-model="ruleForm.controlMeasures"
          :rows="6"
          type="textarea"
        />
      </el-form-item>
      <el-form-item
        label="备注:"
        prop="controlMeasuresRemarks"
      >
        <el-input
          v-model="ruleForm.controlMeasuresRemarks"
          :rows="6"
          type="textarea"
        />
      </el-form-item>
      <el-form-item
        label="现场图片:"
        prop="sceneImg"
      >
        <img
          v-for="(item,index) in ruleForm.sceneImg"
          :key="index"
          :src="item.url"
          class="img-view"
        >
      </el-form-item>
    </el-form>
    <div
      class="backstage-edit-btn"
      style="width: 100%;"
    >
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { getInfo } from '@/api/port-services/risk-identification/risk-control-measures'
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        sceneImg: []
      },
      loading: false,
      info: {},
      list: []
    }
  },
  async mounted() {
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.ruleForm.id = this.$route.query.id
      this.info = (await getInfo(this.$route.query.id)).data
      this.list = [this.info]
      this.ruleForm.controlMeasures = this.info.controlMeasures
      this.ruleForm.controlMeasuresRemarks = this.info.controlMeasuresRemarks
      try {
        this.ruleForm.sceneImg = JSON.parse(this.info.sceneImg) || []
      } catch (err) {
        console.log()
      }
    }
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.ruleForm.sceneImg.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.ruleForm.sceneImg.splice(this.ruleForm.sceneImg.findIndex(item => item.uid === file.uid), 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-list {
    line-height: 50px;
}

.img-view {
    float: left;
    margin: 0 10px 10px 0;
    border-radius: 8px;
    width: 150px;
    height: 150px;
}
</style>
