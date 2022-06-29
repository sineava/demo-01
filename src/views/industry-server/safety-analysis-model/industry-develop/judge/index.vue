<template>
  <el-card class="body-card fx">
    <div
      slot="header"
      class="clearfix"
    >
      <span>行业安全发展风险研判</span>
      <div style="display: inline-block; float: right;">
        <el-radio-group v-model="selected" size="small" @change="changeType">
          <el-radio-button :label="1">风险研判</el-radio-button>
          <el-radio-button :label="2">研判分析</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="安全形式分析" icon="el-icon-edit-outline" />
      <el-step title="安全形式评估" icon="el-icon-success" />
      <el-step title="安全分析结果" icon="el-icon-view" />
    </el-steps>

    <!-- 安全形式分析 -->
    <div v-if="active===1" style="margin-top: 20px;">
      <Assessment
        ref="assessment"
        :data="data"
        :isEdit="isEdit"
        :area="area"
      />
      <div v-if="id" class="backstage-edit-btn">
        <el-button
          v-if="isEdit && button_roles.update"
          size="medium"
          type="primary"
          @click="assess"
        >
          重新评估
        </el-button>
      </div>
      <div v-else class="backstage-edit-btn">
        <el-button
          v-if="isEdit && button_roles.create"
          size="medium"
          type="primary"
          @click="assess"
        >
          开始评估
        </el-button>
      </div>
      <Target
        ref="target"
        :data="indicatorDataList"
      />
    </div>
    <!-- 安全形式分析-评估 -->
    <div v-if="active === 2" style="margin-top: 20px;">
      <div v-for="(a, indexA) in assessData" :key="indexA">
        <div v-if="a.indicatorType === 1 && a.indicators.length > 0">
          {{ a.indicatorName }}
          <div v-for="(b, indexB) in a.indicators" :key="indexB">
            <div v-if="b.indicatorType === 1 && b.indicators.length > 0">
              <div>
                {{ b.indicatorName }}
              </div>
              <div>
                <Recursion :arr="b.indicators.filter((x) => x.indicatorType === 2)" />
              </div>
            </div>
          </div>
          <div>
            <Recursion :arr="a.indicators.filter((x) => x.indicatorType === 2)" />
          </div>
        </div>
      </div>
      <div>
        <Recursion :arr="assessData.filter((x) => x.indicatorType === 2)" />
      </div>
      <div class="backstage-edit-btn">
        <el-button
          v-if="button_roles.create"
          :loading="btnLoading"
          size="medium"
          type="primary"
          @click="submitAssess"
        >
          提交
        </el-button>
      </div>
    </div>
    <!-- 安全形式分析-结果 -->
    <div v-if="active === 3" style="margin-top: 20px;">
      <Assessment
        ref="assessment"
        :data="resultData"
        :isEdit="false"
        :area="area"
      />
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          type="plain"
          @click="resetAssess"
        >
          重新评估
        </el-button>
        <el-button
          v-if="button_roles.release"
          :loading="btnLoading"
          size="medium"
          type="primary"
          @click="completeAssess"
        >
          评估完成
        </el-button>
      </div>
      <Target
        ref="target"
        :data="indicatorDataList"
      />
    </div>
  </el-card>
</template>
<script>
import { getDataLevel } from '../../utils/index'
import { initData, assessData as assessInfo, completeData, areaInfo} from '@/api/analysis-model/level-index-area'
import { startAssess } from '@/api/analysis-model/indicator'
import Recursion from '../../components/Recursion'
import { mapGetters } from 'vuex'
import Assessment from '../../components/assessment'
import Target from '../../components/target'
export default {
  components: {
    Recursion,
    Assessment,
    Target
  },
  data() {
    return {
      id:'',
      active:1,
      isEdit:true,
      area:[],
      data:{},
      indicatorDataList: [], // 指标列表
      assessmentData:'',// 组件assessment 表单值
      assessData: [], // 步骤2表单对象
      resultData: {}, // 步骤2提交结果
      selected:1,
      btnLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.changeRoute()
  },
  methods: {
    changeType(e){
      this.$router.push({ path: '/safety-analysis-model/industry-develop/analysis'})
    },
    changeRoute(){
      this.init()
      this.id = this.$route.query.id
      this.isEdit = this.$route.query.isDetail ? false : true
    },
    async init(){
      const res = await initData()
      this.area = res.data && res.data.riskAreas ? res.data.riskAreas : []
      if (this.id){
        const info = await areaInfo(this.id)
        this.data = info.data || {}
        this.indicatorDataList = info.data.indicatorDataList || []
      } else {
        this.data = {
          orgId:res.data.orgId,
          orgName:res.data.orgName
        }
        this.indicatorDataList = res.data.indicatorDataList
      }
    },
    // 开始评估
    async assess() {
      const res = await this.$refs.assessment.submitForm()
      if (res===false){
        return false
      }
      this.assessmentData = res
      this.assessData = (await startAssess(4)).data
      this.active = 2
    },
    // 提交评估
    async submitAssess() {
      const assess = getDataLevel(this.assessData, [])
      let errmsg = ''
      assess.forEach(element => {
        if (element.collectedDataValue===null ||element.collectedDataValue==='' || element.collectedDataValue===undefined){
          errmsg = `请填写“${element.indicatorName}”采集数据值`
          return false
        }
      })
      if (errmsg){
        this.$message.error(errmsg)
        return true
      }
      const safeModeAppraisalAreaDto = {
        appraisalQuarter: this.assessmentData.appraisalQuarter,
        appraisalYear: Number(this.assessmentData.appraisalYear),
        orgId: this.assessmentData.orgId,
        orgName: this.assessmentData.orgName,
        riskAreaId: this.assessmentData.riskAreaId,
        riskAreaName: this.assessmentData.riskAreaName,
        id: null,
        records: [...assess]
      }
      this.btnLoading = true
      const res = await assessInfo(safeModeAppraisalAreaDto)
      this.btnLoading = false
      if (res.code==='0'){
        this.active = 3 // 评估结果页
        this.resultData = res.data
        this.indicatorDataList = res.data.indicatorDataList
      }
    },
    // 重新评估
    async resetAssess() {
      this.active = 1
      this.init()
    },
    // 完成评估
    async completeAssess() {
      this.btnLoading = true
      completeData(this.resultData.id).then(res => {
        if (res.code==='0'){
          this.active = 1 // 评估结果页
          this.id = this.resultData.id
          this.changeType()
        } else {
          this.$message.error(res.message)
        }
        this.step = 1
        this.btnLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fx {
    /deep/ .el-form-item__error {
        text-align: left;
    }
}
</style>
