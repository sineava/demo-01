<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="填写现场检查记录" />
      </span>
      <span class="detail-header-button">
        <el-button type="primary" @click="exportRecord" size="small">导出检查记录表</el-button>
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
          <el-date-picker
            v-if="isEdit"
            v-model="ruleForm.actualInspectionTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择实际检查时间"
            style="width: 100%;"
          />
          <div v-else>{{ ruleForm.actualInspectionTime }}</div>
        </el-form-item>
        <el-form-item
          v-if="!info.actualInspectionTime && isEdit"
          label-width="20px"
        >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="handleAdd({}, 1)"
          >
            添加检查情况
          </el-button>
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
          :show-overflow-tooltip="true"
        />
        <el-table-column
          align="center"
          label="检查项分类"
          prop="categoryName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          align="center"
          label="危险等级"
        >
          <template v-slot="scope">
            {{ scope.row.riskLevel ? (scope.row.riskLevel === 1 ? '一般' : '重大') : '' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          label="存在问题"
        >
          <template v-slot="scope">
            {{ scope.row.isProblem===null ? '' : (scope.row.isProblem === 1 ? '存在问题' : (scope.row.isProblem === 0 ? '无' : '存在隐患')) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="违规行为"
          :show-overflow-tooltip="true"
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
            {{ scope.row.isRectification!==null ? (scope.row.isRectification === 1 ? '是' : '否') : '' }}
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
            {{ scope.row.isReview!==null ? (scope.row.isReview === 1 ? '是' : '否') : '' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="复查部门"
          prop="organizationName"
        />
        <el-table-column
          label="操作"
          align="center"
          :width=" isEdit ? 300 : 100"
        >
          <template v-slot="scope">
            <el-button
              v-if="!scope.row.isTransfer && isEdit"
              size="mini"
              plain
              @click="transferList(scope.row.id, scope.$index)"
            >
              <em class="el-icon-s-tools" /> 移交
            </el-button>
            <el-button
              v-if="!info.actualInspectionTime && isEdit"
              size="mini"
              plain
              @click="handleAdd(scope.row, 2)"
            >
              <em class="el-icon-edit-outline" /> 填写记录
            </el-button>
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

    <el-dialog
      :visible.sync="dialogVisible"
      title="检查项移交"
      width="400"
    >
      <el-form
        ref="transferForm"
        :model="transferForm"
        :rules="transRules"
        label-width="100px"
        size="medium"
        class="three-column-input-table"
      >
        <el-form-item
          label="移交机构:"
          prop="transferUnit"
        >
          <el-input
            v-model.trim="transferForm.transferUnit"
            placeholder="请输入移交机构"
          />
        </el-form-item>
        <el-form-item
          label="移交时间:"
          prop="transferTime"
        >
          <el-date-picker
            v-model="transferForm.transferTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="请选择移交时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="移交说明:"
          prop="remark"
        >
          <el-input
            v-model.trim="transferForm.remark"
            type="textarea"
            :rows="6"
            placeholder="请输入移交说明"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="transferSubmitForm('transferForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
      <el-button
        v-if="!info.actualInspectionTime && isEdit"
        type="primary"
        size="medium"
        :loading="loading"
        @click="submitForm('ruleForm')"
      >
        保存
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { findById, addSceneInspectRecord,getWordData } from '@/api/general-services/safety-supervision-and-inspection/safetyInspectRecord'
import { addTransferRecord } from '@/api/general-services/safety-supervision-and-inspection/transferRecord'
import { exportWord } from '@/components/word/exportFile'
import {assemblyCheckItemParameters} from './word'
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
      transRules: {
        transferUnit: [
          { required: true, message: '请输入移交机构', trigger: 'blur' }
        ],
        transferTime: [
          { required: true, message: '请选择移交时间', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入移交说明', trigger: 'blur' }
        ]
      },
      info: {}, // 详细信息
      isEdit: true
    }
  },
  async mounted() {
    this.isEdit = this.$route.query.isEdit ? false : true
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
          this.$message.error(`请填写“${item.name}”检查项`)
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
          riskLevel:item.riskLevel,
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
          timeRequirement: item.timeRequirement,
          signaturePath:item.signaturePath
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
      localStorage.setItem('checkrecordCheckAddInfo', JSON.stringify(item))
      this.$router.push({ path: '/safe/supervise/checkrecordCheckAdd', query: { id: this.ruleForm.id, checkIdList, addType, disabled }})
    },
    returnBack() {
      this.$router.push({ path: '/safe/supervise/checkrecord' })
    },
    async assemblyParameters(){
      let res  = await getWordData({id:this.info.id})
      let info = this.info
      let isUseUnit = []
      info.isUseUnit.forEach(item=>{
        isUseUnit.push(item[item.length-1])
      })
      let list = await assemblyCheckItemParameters(res.data.checkItemInfoList)
      return {
        actualInspectionTime:info.actualInspectionTime || '', //检查时间
        planningName:info.planningName || '',//检查名称
        targetName:info.targetName || '',//被检查企业
        categoryName:info.categoryName || '',//检查类型
        isExpertInvited:info.isExpertInvited ? '是' : '否',//,info.isExpertInvited ? '是' : '否' 是否邀请专家
        personnel:info.personnel || '',//检查人员
        expertPersonnel:info.expertPersonnel || '',//专家人员
        isUseUnit:isUseUnit.length>0?isUseUnit.join('、') : '',//list item[item.length-1]负责机构
        remark:info.remark || '',//备注
        list:list,//检查情况
      }
    },
    async exportRecord(){
      const loading = this.$loading({
        lock: true,
        text: '正在导出检查记录表，请耐心等待...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let data = await this.assemblyParameters()
      let imgSize = {
        src:[250, 141], //控制导出的word图片大小
        signature:[250, 141]
      };
      console.log(data,'导出数据')
      exportWord('./excels/检查情况记录单.docx',data,`检查情况记录单.docx`,imgSize)
      loading.close()
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

