<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="企业自查执行情况详情页" />
      </span>
    </div>
    <div class="info-detail detail">
      <div class="icon-title">
        <span class="span" />自查项信息
      </div>
      <el-form
        ref="ruleForm"
        label-width="100px"
        size="medium"
        :model="ruleForm"
        :rules="rules"
        :disabled="isDisabled ? true : false"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="自查名称:"
              prop="examineName"
            >
              <el-input v-model.trim="ruleForm.examineName" placeholder="请输入自查项名称" maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="开展时间:"
              prop="launchTime"
            >
              <el-date-picker
                v-model="ruleForm.launchTime"
                type="date"
                placeholder="请选择开展时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="自查项分类:"
              prop="categoryId"
            >
              <el-select
                v-model="ruleForm.categoryId"
                clearable
                placeholder="请选择自查项分类"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div class="icon-title">
            <span class="span" /><i class="required" style="margin-right: 10px;" /> 自查项
          </div>
          <div
            v-if="!isDisabled"
            style="margin: 10px;"
          >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-circle-plus-outline"
              @click="addItem"
            >
              新增自查项
            </el-button>
          </div>
          <div style="margin: 10px 10px 30px 10px;">
            <el-table
              :data="tableData"
              border
              style="width: 100%;"
              :header-cell-style="{ background: '#f2f2f2' }"
            >
              <el-table-column
                prop="itemName"
                label="自查项名称"
                align="center"
                width="200"
              />
              <el-table-column
                label="自查周期"
                width="100"
                align="center"
              >
                <template v-slot="scope">
                  <span>{{ scope.row.cycle === 1 ? '周' : (scope.row.cycle === 2 ? '月' : (scope.row.cycle === 3 ? '季' : '年')) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="categoryName"
                label="自查项类别"
                align="center"
                width="150"
              />
              <el-table-column
                prop="standard"
                label="自查内容"
              />
              <el-table-column
                v-if="!isDisabled"
                label="操作"
                align="center"
                width="100"
              >
                <template v-slot="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    plain
                    @click="handleDelete(scope.$index, scope.row)"
                  >
                    <em class="el-icon-delete" /> 删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <div v-if="tableData && tableData.length>0" class="icon-title">
          <span class="span" />自查项情况
        </div>
        <div
          v-for="(item, index) in tableData"
          :key="item.id"
          :offset="index"
        >
          <item
            :ref="`items${item.id}`"
            :operation="item.operation"
            :item-obj="item"
            :item-index="index+1"
          />
        </div>
      </el-form>
      <div class="backstage-edit-btn">
        <el-button
          v-if="!isDisabled"
          type="primary"
          size="medium"
          :loading="loading"
          @click="submitForm('ruleForm')"
        >
          保存
        </el-button>
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="自查项列表"
      width="90%"
    >
      <itemTab
        :selected="tableData"
        @addItemData="addItemData"
      />
    </el-dialog>
  </el-card>
</template>

<script>
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import { getSituation, updateExamineSituation, addExamineSituation } from '@/api/general-services/enterprise-self-inspection/examineSituation'
import { momentDate } from '@/utils/index'
import item from './item'
import itemTab from './itemTab'
export default {
  components: {
    item,
    itemTab
  },
  data() {
    return {
      list: [{
        name: '自查项名称1',
        cycle: '一个月',
        content: '1.自查内容.'
      }],
      loading: false,
      categoryList: [],
      dialogTableVisible: false,
      isDisabled: false,
      tableData: [],
      ruleForm: {
        examineName: '',
        categoryId: '',
        launchTime: '',
        id: ''
      },
      enterpriseExamineSituationItemInfoDtoList: [],
      rules: {
        examineName: [
          { required: true, message: '请选择自查名称', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择自查类别', trigger: 'change' }
        ],
        launchTime: [
          { required: true, message: '请选择开展时间', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    const res = await findByCategoryList({ type: 1 })
    this.categoryList = res.data
    if (this.$route.query.disabled) {
      this.isDisabled = true
    }
    if (this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id
      this.initEdit(this.ruleForm.id)
    }
  },
  methods: {
    initEdit(id) {
      getSituation(this.ruleForm.id).then(res => {
        this.ruleForm = {
          examineName: res.data.enterpriseName,
          categoryId: res.data.categoryId,
          launchTime: res.data.launchTime,
          id: res.data.id
        }
        this.assembleItemTabData(res.data.enterpriseExamineSituationItemInfoVoList)
      })
    },
    /**
     * 新增自查项
     */
    addItem() {
      this.dialogTableVisible = true
    },
    /**
     * 添加自查项
     */
    addItemData(data) {
      this.dialogTableVisible = false
      let ruleForm = null
      let operation = 'add'
      if (this.enterpriseExamineSituationItemInfoDtoList && this.enterpriseExamineSituationItemInfoDtoList.length > 0) {
        this.enterpriseExamineSituationItemInfoDtoList.forEach((item, index) => {
          if (data.id === item.itemInfoId) {
            ruleForm = item
            operation = 'update'
            this.enterpriseExamineSituationItemInfoDtoList.splice(index, 1)
            return false
          }
        })
      }
      this.tableData.push(
        {
          id: data.id,
          itemName: data.itemName,
          standard: data.standard,
          cycle: data.cycle,
          isUseUnit: data.isUseUnit,
          categoryName: data.categoryName,
          operation: operation,
          examineSituationId: this.ruleForm.id, // 企业自查情况ID 修改回显时有
          ruleForm: ruleForm // 企业自查情况信息 ，修改时有
        }
      )
    },
    /**
     * 删除自查项
     */
    handleDelete(index, item) {
      this.assembleDeleteDTO(item)
      this.tableData.splice(index, 1)
    },
    /**
     * 组装删除DTO数据
     */
    assembleDeleteDTO(item) {
      if (item.operation === 'update' && item.examineSituationId) {
        item.ruleForm.operation = 'delete'
        this.enterpriseExamineSituationItemInfoDtoList.push(item.ruleForm)
      }
    },
    /**
     * 组装修改表格数据
     */
    assembleItemTabData(data) {
      const table = []
      if (!data || data.length === 0) { return false }
      data.forEach(item => {
        table.push({
          id: item.itemInfoId,
          itemName: item.itemName,
          standard: item.standard,
          cycle: item.cycle,
          isUseUnit: item.isUseUnit,
          categoryName: item.categoryName,
          operation: 'update',
          examineSituationId: item.id, // 企业自查情况ID 修改回显时有
          ruleForm: {
            checkPicture: item.checkPicture, // 检查图片（多张用json）
            dangerDesc: item.dangerDesc, // 隐患描述
            deadlineDate: item.deadlineDate, // 整改截止时间
            id: item.id, // 业自查情况自查项ID
            inspectSituation: item.inspectSituation, // 检查情况
            isProblem: item.isProblem, // 检查情况-是否存在问题（0检查正常 1存在问题 2存在隐患）
            isRectification: item.isRectification, // 是否需要整改（0 否 1是）
            itemInfoId: item.itemInfoId, // 企业自查项ID
            operation: item.operation, // 操作类型 add 添加 update 修改（业自查情况自查项ID必传）delete 删除（业自查情况自查项ID必传）
            rectificationRequirement: item.rectificationRequirement, // 整改要求
            riskLevel: item.riskLevel, // 危险等级（1、一般，2、重大）
            timeRequirement: item.timeRequirement // 整改时限（停业整改，限期整改，立即整改，挂牌督办）
          } // 企业自查情况信息 ，修改时有
        })
      })
      this.tableData = table
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/safe/self/situation' })
    },
    // 保存
    submitForm(formName) {
      if (this.tableData && this.tableData.length === 0) {
        this.$message.error('请添加自查项')
        return false
      }
      const that = this
      this.ruleForm.launchTime = momentDate(this.ruleForm.launchTime)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const DTO = []
          this.tableData.forEach((item) => {
            const isyz = that.$refs[`items${item.id}`][0].submitForm('ruleForm')
            if (isyz === false) {
              return true
            }
            DTO.push(isyz)
          })
          this.enterpriseExamineSituationItemInfoDtoList.forEach((item) => {
            if (item.operation === 'delete') {
              DTO.push(item)
            }
          })
          this.ruleForm.enterpriseExamineSituationItemInfoDtoList = DTO
          if (this.ruleForm.id) { // 修改
            updateExamineSituation(this.ruleForm).then(res => {
              if (res.code === '0') {
                this.returnBack()
              } else {
                this.$message.error(res.message)
              }
            })
          } else { // 添加
            addExamineSituation(this.ruleForm).then(res => {
              if (res.code === '0') {
                this.returnBack()
              } else {
                this.$message.error(res.message)
              }
            })
          }
          this.loading = false
        } else {
          this.loading = false

          return false
        }
      })
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
    .three-column-input-table {
        display: flex;
        flex-wrap: wrap;
    }

    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }
}
</style>
