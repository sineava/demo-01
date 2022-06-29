<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="填写现场检查记录" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基本资料
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="计划名称:">{{ info.planningName }}</el-descriptions-item>
        <el-descriptions-item label="计划类型:">{{ info.categoryName }}</el-descriptions-item>
        <el-descriptions-item label="检查企业:">{{ info.targetName }}</el-descriptions-item>
        <el-descriptions-item label="计划检查时间:">{{ info.planningTime }}</el-descriptions-item>
        <el-descriptions-item label="检查人员:">{{ info.personnel }}</el-descriptions-item>
        <el-descriptions-item label="是否邀请专家:">{{ info.isExpertInvited ? '是' : '否' }}</el-descriptions-item>
        <el-descriptions-item label="专家人员:">{{ info.expertPersonnel }}</el-descriptions-item>
        <el-descriptions-item label="提交时间:">{{ info.createTime }}</el-descriptions-item>
        <el-descriptions-item label="负责单位:">
          <el-tag v-for="(item,index) in info.isUseUnit" :key="index" style="margin: 5px;"> {{ item ? item[item.length-1] : '' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发布人:">{{ info.createBy }}</el-descriptions-item>
        <el-descriptions-item label="检查备注:">{{ info.remark }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="other-detail">
      <div class="icon-title">
        <span class="span" />检查情况
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        size="medium"
        :inline="true"
        class="three-column-input-table"
      >
        <el-form-item
          label="实际检查时间:"
          prop="actualInspectionTime"
        >
          <div>{{ ruleForm.actualInspectionTime }}</div>
        </el-form-item>
      </el-form>
      <el-table
        :data="info.safetyTargetItemInfoVoList"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          align="center"
          label="检查项"
          prop="name"
        />
        <el-table-column
          align="center"
          label="检查项分类"
          prop="categoryName"
        />
        <el-table-column
          align="center"
          label="危险等级"
        >
          <template v-slot="scope">
            {{ scope.row.riskLevel === 1 ? '一般' : '重大' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="存在问题"
        >
          <template v-slot="scope">
            {{ scope.row.isProblem === 0 ? '无' : (scope.row.isProblem === 1 ? '存在问题' : '存在隐患') }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="违规行为"
        >
          <template v-slot="scope">
            <span
              v-for="(item, index) in scope.row.safetyTargetItemViolationVoList"
              :key="index"
            >
              {{ index + 1 }}、 {{ item.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="是否需要整改"
        >
          <template v-slot="scope">
            {{ scope.row.isRectification === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="整改时限"
          prop="timeRequirement"
        />
        <el-table-column
          align="center"
          label="整改截止时间"
          prop="deadlineDate"
        />
        <el-table-column
          align="center"
          label="是否需要复查"
        >
          <template v-slot="scope">
            {{ scope.row.isReview === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="复查部门"
          prop="organizationName"
        />
        <el-table-column
          label="操作"
          width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              plain
              @click="handleAdd(scope.row, 2, 1)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="backstage-edit-btn">
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
import { findById, addSceneInspectRecord } from '@/api/general-services/safety-supervision-and-inspection/safetyInspectRecord'
import { addTransferRecord } from '@/api/general-services/safety-supervision-and-inspection/transferRecord'
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        planningId: '',
        actualInspectionTime: ''
      },
      dialogVisible: false,
      rules: {
        actualInspectionTime: [
          { required: true, message: '请选择实际检查时间', trigger: 'change' }
        ]
      },
      loading: false,
      transferForm: {
        targetItemId: '',
        transferUnit: '',
        transferTime: '',
        remark: ''
      },
      transferIndex: '',
      transRules: {},
      info: {}, // 详细信息
    }
  },
  async mounted() {
    // 查询详情信息
    if (this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id
      const res = await findById(this.$route.query.id)
      this.ruleForm.planningId = res.data.planningId
      this.ruleForm.actualInspectionTime = res.data.actualInspectionTime || ''
      const personnel = []
      res.data.safetyInspectorInfoVoList.forEach(element => {
        personnel.push(element.name)
      })
      res.data.personnel = personnel.join('、')
      const expertPersonnel = []
      res.data.safetyExpertInfoVoList.forEach(element => {
        expertPersonnel.push(element.name)
      })
      res.data.expertPersonnel = expertPersonnel.join('、')
      res.data.safetyTargetItemInfoVoList.forEach(element => {
        element.addType = 2
      })
      this.info = res.data
      this.info.isUseUnit = JSON.parse(this.info.isUseUnit)
    }
    // 判断添加回显
    if (localStorage.getItem('safetyTargetItemInfoVoList') && this.$route.query.item) {
      this.info.safetyTargetItemInfoVoList = JSON.parse(localStorage.getItem('safetyTargetItemInfoVoList'))
    }
    if (this.$route.query.item) {
      const item = this.$route.query.item
      if (item.addType === 1) { // 新增
        item.itemInfoId = item.id
        this.info.safetyTargetItemInfoVoList.push(item)
      } else { // 编辑
        this.info.safetyTargetItemInfoVoList.forEach((element, index) => {
          if (element.id === item.id) {
            this.info.safetyTargetItemInfoVoList[index] = item
          }
        })
      }
      localStorage.setItem('safetyTargetItemInfoVoList', JSON.stringify(this.info.safetyTargetItemInfoVoList))
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveSubmit()
        } else {
          return false
        }
      })
    },
    /**
     * 保存
     */
    async saveSubmit() {
      const data = { ...this.ruleForm }
      const sceneInspectRecordItemDtoList = this.info.safetyTargetItemInfoVoList
      data.sceneInspectRecordItemDtoList = []
      if (sceneInspectRecordItemDtoList.length <= 0) {
        this.$message.error('请添加检查项')
        return false
      }

      for (const index in sceneInspectRecordItemDtoList) {
        const item = sceneInspectRecordItemDtoList[index]
        if (item.isProblem < 0 || !item.inspectSituation || !item.isRectification < 0 || !item.isReview < 0) {
          this.$message.error(`请填写${item.name}检查项记录`)
          return true
        }
        if (!item.name) {
          this.$message.error('请添加检查项')
          return true
        }
        data.sceneInspectRecordItemDtoList.push({
          addType: item.addType,
          checkPicture: item.checkPicture,
          deadlineDate: item.deadlineDate,
          id: item.id,
          inspectSituation: item.inspectSituation,
          isProblem: item.isProblem,
          isRectification: item.isRectification,
          isReview: item.isReview,
          isTransfer: item.isTransfer,
          itemInfoId: item.itemInfoId,
          organizationId: item.organizationId,
          organizationName: item.organizationName,
          rectificationRequirement: item.rectificationRequirement,
          remark: item.remark,
          reviewTime: item.reviewTime,
          safetyTargetItemViolationDtoList: [],
          timeRequirement: item.timeRequirement
        })
        if (item.safetyTargetItemViolationVoList && item.safetyTargetItemViolationVoList.length > 0) {
          item.safetyTargetItemViolationVoList.forEach(child => {
            data.sceneInspectRecordItemDtoList[index].safetyTargetItemViolationDtoList.push({ violationId: child.id })
          })
        }
      }
      if (data.sceneInspectRecordItemDtoList.length <= 0) {
        return false
      }
      this.loading = true
      const res = await addSceneInspectRecord(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    /**
     * 移交
     */
    transferList(targetItemId, index) {
      this.transferForm.targetItemId = targetItemId
      this.transferIndex = index
      this.dialogVisible = true
    },
    transferSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = { ...this.transferForm }
          data.planningId = this.info.planningId
          data.targetInfoId = this.info.id
          addTransferRecord(data).then(res => {
            if (res.code === '0') {
              this.$message.success('移交成功')
              this.dialogVisible = false
              this.info.safetyTargetItemInfoVoList[this.transferIndex].isTransfer = 1
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return false
        }
      })
    },
    // 添加/编辑/详情检查情况
    handleAdd(item, addType, disabled) {
      const checkIdList = []
      this.info.safetyTargetItemInfoVoList.forEach(idItem => {
        checkIdList.push(idItem.itemInfoId)
      })
      this.$router.push({ path: '/safe/supervise/checkrecordCheckAdd', query: { item: item, id: this.ruleForm.id, checkIdList: checkIdList, addType: addType, disabled: disabled }})
    },
    returnBack() {
      this.$router.push({ path: '/safe/supervise/checkrecord' })
    }
  }
}
</script>

<style lang="scss" scoped>
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
        width: 20%;
        line-height: 30px;
    }
}

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}

.title {
    display: flex;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    align-items: center;

    .span {
        display: inline-block;
        margin-right: 7px;
        width: 6px;
        height: 18px;
        background-color: #409eff;
    }
}
</style>
