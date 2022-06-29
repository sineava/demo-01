<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>作业单元风险等级评估</span>
    </div>
    <div class="card-content">
      <div class="card-left">
        <div class="icon-title">
          <span class="span" /> 风险作业单元
        </div>
        <el-button
          v-for="(item, index) in list"
          :key="index"
          :type="activeTabIndex===index?'success':'info'"
        >
          {{ item.activityName }}
        </el-button>
      </div>
      <div
        v-if="list.length > 0"
        class="card-right"
      >
        <div class="icon-title">
          <span class="span" /> 风险作业单元基本资料
        </div>
        <div class="list-column-wrap">
          <div class="info-list info-list-two">
            <div class="label">
              风险作业单元:
            </div><div class="content">
              {{ list[activeTabIndex].activityName }}
            </div>
          </div>
          <div class="info-list info-list-two">
            <div class="label">
              风险辨识范围:
            </div><div class="content">
              {{ list[activeTabIndex].children[eventIndex].scopeName }}
            </div>
          </div>
          <div class="info-list info-list-two">
            <div class="label">
              所属企业名称:
            </div><div class="content">
              {{ list[activeTabIndex].children[eventIndex].enterpriseName }}
            </div>
          </div>
          <div class="info-list info-list-two">
            <div class="label">
              企业类型:
            </div><div class="content">
              {{ getEnterpriseTypeName(list[activeTabIndex].children[eventIndex].enterpriseType) }}
            </div>
          </div>
          <div class="info-list info-list-two">
            <div class="label">
              作业区域:
            </div><div class="content">
              {{ list[activeTabIndex].children[eventIndex].taskArea }}
            </div>
          </div>
          <div class="info-list info-list-two">
            <div class="label">
              作业场所:
            </div><div class="content">
              {{ list[activeTabIndex].children[eventIndex].taskPlace }}
            </div>
          </div>
          <div class="info-list info-list-two">
            <div class="label">
              作业活动:
            </div><div class="content">
              {{ list[activeTabIndex].children[eventIndex].taskActivity }}
            </div>
          </div>
          <div class="info-list info-list-two">
            <div class="label">
              更新时间:
            </div><div class="content">
              {{ list[activeTabIndex].children[eventIndex].updateTime }}
            </div>
          </div>
        </div>
        <div class="icon-title">
          <span class="span" /> 风险事件评估
        </div>
        <div class="circle-title">
          <span class="circle" /> {{ list[activeTabIndex].children[eventIndex].incidentName }} <span style="margin-left: 50px;">{{ eventIndex+1 }}/{{ list[activeTabIndex].children.length }}</span>
        </div>
        <div class="circle-desc">
          {{ list[activeTabIndex].children[eventIndex].incidentDesc }}
        </div>
        <el-table
          :data="list[activeTabIndex].children[eventIndex].riskControlFactorsInfoVoList"
          stripe
          fit
          highlight-current-row
          class="table-border"
        >
          <el-table-column
            label="序号"
            width="55"
          >
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            label="制险因素"
            prop="factorsName"
            width="200"
          />
          <el-table-column
            label="制险因素分类"
            width="150"
          >
            <template v-slot="scope">
              {{ scope.row.factorsType===1?'人的因数':(scope.row.factorsType===2?'设备因素':(scope.row.factorsType===3?'环境因素':'管理因素')) }}
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
            prop="factorsDesc"
          />
        </el-table>
        <div class="form-view">
          <el-form
            ref="ruleForm"
            size="medium"
            label-width="150px"
            :model="list[activeTabIndex].children[eventIndex]"
            :rules="rules"
            class="form-input"
            :disabled="searchObj&&!searchObj.isEdit?true:false"
          >
            <el-form-item
              label="发生可能性（L）:"
              prop="happenPossibility"
            >
              <el-input-number
                v-model="list[activeTabIndex].children[eventIndex].happenPossibility"
                :min="1"
                :max="10"
                label="描述文字"
                @change="calculatingRisk"
              />
            </el-form-item>
            <el-form-item
              label="后果严重程度（C）:"
              prop="seriousDegree"
            >
              <el-select
                v-model="list[activeTabIndex].children[eventIndex].seriousDegree"
                placeholder="请选择"
                @change="calculatingRisk"
              >
                <el-option
                  label="不严重"
                  :value="1"
                />
                <el-option
                  label="较严重"
                  :value="2"
                />
                <el-option
                  label="严重"
                  :value="5"
                />
                <el-option
                  label="特别严重"
                  :value="10"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div class="form-body">
            <div class="form-body-list">
              风险值： <span class="form-body-list-text"> {{ list[activeTabIndex].children[eventIndex].riskValue }} </span>
            </div>
            <div class="form-body-list">
              风险等级：
              <el-tag
                v-if="list[activeTabIndex].children[eventIndex].riskValue"
                :type="getRiskGrade(list[activeTabIndex].children[eventIndex].riskValue).level===1?'success':(getRiskGrade(list[activeTabIndex].children[eventIndex].riskValue).level===2?
                  '':(getRiskGrade(list[activeTabIndex].children[eventIndex].riskValue).level===3?'warning':'danger'))"
                effect="dark"
                size="mini"
              >
                {{ getRiskGrade(list[activeTabIndex].children[eventIndex].riskValue).label }}
              </el-tag>
            </div>
          </div>
        </div>
        <div
          class="backstage-edit-btn"
          style="width: 100%;"
        >
          <el-button
            v-if="!searchObj&&(activeTabIndex!==0||eventIndex>0)"
            type="primary"
            size="medium"
            @click="lastItem"
          >
            上一项
          </el-button>
          <el-button
            size="medium"
            @click="returnBack"
          >
            返回
          </el-button>
          <div v-if="!searchObj">
            <el-button
              v-if="activeTabIndex===list.length-1&&eventIndex===list[activeTabIndex].children.length-1"
              :loading="loading"
              type="primary"
              size="medium"
              @click="submitForm"
            >
              提交
            </el-button>
            <el-button
              v-else
              :loading="loading"
              type="primary"
              size="medium"
              @click="next('ruleForm')"
            >
              下一项
            </el-button>
          </div>
          <el-button
            v-if="searchObj&&searchObj.isEdit"
            :loading="loading"
            type="primary"
            size="medium"
            @click="saveEventObj"
          >
            提交
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { addData, updateData, updateAssessTermInfo } from '@/api/port-services/risk-identification/risk-assess'
import { max } from 'lodash'
export default {
  data() {
    return {
      ruleForm: {
        enterpriseId: '',
        enterpriseName: '',
        enterpriseType: '',
        id: '',
        riskGrade: '',
        riskValue: ''
      },
      rules: {
        happenPossibility: [
          { required: true, message: '请输入发生可能性', trigger: 'blur' }
        ],
        seriousDegree: [
          { required: true, message: '请输入后果严重程度', trigger: 'blur' }
        ]
      },
      loading: false,
      list: [], // 所有风险单元
      activeTabIndex: 0, // 当前选中的风险单元下标
      eventIndex: 0, // 当前单元下选中的时间下标
      searchObj: null // 判断是否未详情/编辑
    }
  },
  async mounted() {
    if (this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id
    }
    this.list = this.$route.query.list
    this.activeTabIndex = 0
    this.eventIndex = 0
    this.ruleForm.enterpriseId = this.list[0].children[0].enterpriseId
    this.ruleForm.enterpriseName = this.list[0].children[0].enterpriseName
    this.ruleForm.enterpriseType = this.list[0].children[0].enterpriseType
    // 判断当前是否为详情/编辑
    if (this.$route.query.search) {
      this.searchObj = this.$route.query.search
      this.activeTabIndex = this.searchObj.activeTabIndex
      this.eventIndex = this.searchObj.eventIndex
    }
  },
  methods: {
    /**
     * 通过type获取企业类型名称
     */
    getEnterpriseTypeName(type) {
      const list = [
        { key: 1, val: '港口企业' },
        { key: 2, val: '港口服务企业' },
        { key: 3, val: '水路运输企业' },
        { key: 4, val: '水路运输代理企业' },
        { key: 5, val: '船舶管理企业' },
        { key: 6, val: '其他企业' }
      ]
      return list.filter(item => item.key === type)[0].val
    },
    // 通过风险值获取风险等级
    getRiskGrade(num) {
      const list = [
        { min: 0, max: 6, label: '较小风险', level: 1 },
        { min: 5, max: 21, label: '一般风险', level: 2 },
        { min: 20, max: 56, label: '较大风险', level: 3 },
        { min: 55, max: 101, label: '重大风险', level: 4 }
      ]
      return list.filter(item => num > item.min && num < item.max)[0]
    },
    /**
     * 计算风险值
     */
    calculatingRisk() {
      const happenPossibility = this.list[this.activeTabIndex].children[this.eventIndex].happenPossibility
      const seriousDegree = this.list[this.activeTabIndex].children[this.eventIndex].seriousDegree
      if (happenPossibility && seriousDegree) {
        const obj = this.list[this.activeTabIndex].children[this.eventIndex]
        obj.riskValue = happenPossibility * seriousDegree
        this.$set(this.list[this.activeTabIndex].children, this.eventIndex, obj)
      }
    },
    /**
     * 修改事件详情
     */
    saveEventObj() {
      const obj = this.list[this.activeTabIndex].children[this.eventIndex]
      const data = {
        id: obj.id,
        happenPossibility: obj.happenPossibility,
        riskValue: obj.riskValue,
        riskGrade: this.getRiskGrade(obj.riskValue).level,
        seriousDegree: obj.seriousDegree
      }
      updateAssessTermInfo(data).then(res => {
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 上一项
     */
    lastItem() {
      if (this.eventIndex === 0) {
        this.activeTabIndex--
        this.eventIndex = this.list[this.activeTabIndex].children.length - 1
      } else {
        this.eventIndex--
      }
    },
    /**
     * 下一项
     */
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.eventIndex === this.list[this.activeTabIndex].children.length - 1) {
            this.activeTabIndex++
            this.eventIndex = 0
          } else {
            this.eventIndex++
          }
        } else {
          return false
        }
      })
    },
    /**
     * 提交
     */
    async submitForm() {
      const data = { ...this.ruleForm }
      data.riskAssessTermInfoDtoList = []
      const numList = []
      this.list.forEach(item => {
        item.children.forEach(element => {
          data.riskAssessTermInfoDtoList.push({
            happenPossibility: element.happenPossibility,
            incidentId: element.incidentId,
            riskActivityId: element.riskActivityId,
            riskValue: element.riskValue,
            riskGrade: this.getRiskGrade(element.riskValue).level,
            seriousDegree: element.seriousDegree
          })
          numList.push(element.riskValue)
        })
      })
      data.riskValue = max(numList)
      data.riskGrade = this.getRiskGrade(data.riskValue).level
      this.loading = true
      let res = this.ruleForm.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.$router.push({ path: '/risk/gradeResoult', query: { id: res.data }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-content {
    display: flex;

    .card-left {
        width: 250px;

        /deep/ .el-button {
            margin-bottom: 10px;
            margin-left: 0;
            width: 80%;
        }
    }

    .card-right {
        flex: 1;

        .form-view {
            display: flex;
            margin-top: 20px;

            .form-input {
                margin-right: 50px;
                width: 45%;
            }

            .form-body {
                display: flex;
                border: 1px dashed red;
                width: 35%;
                height: 90px;
                flex-direction: column;
                align-items: center;

                .form-body-list {
                    margin-top: 20px;
                    width: 200px;
                }
            }
        }

        .circle-title {
            display: flex;
            height: 50px;
            font-weight: bold;
            align-items: center;

            .circle {
                margin-right: 5px;
                border-radius: 50%;
                width: 10px;
                height: 10px;
                background: #409eff;
            }
        }

        .circle-desc {
            margin-bottom: 40px;
            line-height: 24px;
        }
    }
}
</style>
