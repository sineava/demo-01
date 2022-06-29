<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增检查计划': type === 'edit' ? '编辑检查计划' : '检查计划详情'" />
      </span>
    </div>
    <div class="cert-basic-detail">
      <div class="icon-title">
        <span class="span" />基本资料
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        size="medium"
        style="width: 100%;"
        :disabled="isDisabled ? true : false"
      >
        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="situation-title"
          contentClassName="situation-text"
          border
        >
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />计划名称:</template>
          <el-form-item v-if="!isDisabled" prop="planningName">
            <el-input v-model.trim="ruleForm.planningName" placeholder="请输入计划名称" maxlength="100" />
          </el-form-item>
          <span v-else>{{ ruleForm.planningName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />计划类型:</template>
          <el-form-item v-if="!isDisabled" prop="categoryId">
            <el-select
              v-model="ruleForm.categoryId"
              clearable
              placeholder="请选择计划类型"
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
          <span v-else>{{ getIdToName(categoryList,ruleForm.categoryId) }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />计划检查时间:</template>
          <el-form-item v-if="!isDisabled" prop="planningTime">
            <el-date-picker
              v-model="ruleForm.planningTime"
              type="datetime"
              placeholder="请选择计划检查时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%;"
            />
          </el-form-item>
          <span v-else>{{ ruleForm.planningTime }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />检查单位:</template>
          <el-form-item v-if="!isDisabled" prop="isUseUnit">
            <el-cascader
              v-model="ruleForm.isUseUnit"
              style="width: 100%;"
              :options="treeData"
              collapse-tags
              :props="{ multiple: true, checkStrictly: true}"
              clearable
            />
          </el-form-item>
          <span v-else>
            <el-tag v-for="(item,index) in ruleForm.isUseUnit" :key="index">{{item[item.length-1]}}</el-tag>
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />是否暗访:</template>
          <el-form-item v-if="!isDisabled" prop="isSecret">
            <el-radio-group v-model="ruleForm.isSecret">
              <el-radio :label="0">
                否
              </el-radio>
              <el-radio :label="1">
                是
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <span v-else>
            <el-tag :type="ruleForm.isSecret ? 'warning': 'success'">{{ ruleForm.isSecret ? '是' : '否' }}</el-tag>
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />检查对象类型:</template>
          <el-form-item v-if="!isDisabled" prop="isSecret">
            <el-radio-group v-model="ruleForm.inspectionTarget">
              <el-radio :label="1">
                选择企业
              </el-radio>
              <el-radio
                v-if="showSelectOrgan"
                :label="2"
              >
                选择机构
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <span v-else>
            <el-tag :type="ruleForm.inspectionTarget === 1 ? 'success': ''">{{ ruleForm.inspectionTarget === 1 ? '选择企业' : '选择机构' }}</el-tag>
          </span>
        </el-descriptions-item>

      </el-descriptions>

      <div class="icon-title">
        <span class="span" /><i v-if="!isDisabled" class="required" />{{ ruleForm.inspectionTarget ===1 ? '检查企业对象' : '检查机构对象' }}信息
      </div>

      <el-descriptions
          v-if="!isDisabled"
          class="descriptions-one"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="situation-title"
          contentClassName="situation-text"
          border
        >
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />{{ ruleForm.inspectionTarget ===1 ? '企业选择' : '机构选择' }}:</template>
          <el-form-item
            v-show="ruleForm.inspectionTarget === 2"
            prop="agency"
          >
            <el-select
              v-if="!isDisabled"
              v-model="mechanismId"
              clearable
              filterable
              placeholder="请选择机构"
              style="width: 30%;"
              :disabled="enteroriseChecked"
            >
              <el-option
                v-for="item in managementDepartmentList"
                :key="item.value"
                :label="item.orgName"
                :value="item.orgId"
              />
            </el-select>
            <el-button
              v-if="!isDisabled"
              :disabled="enteroriseChecked"
              type="primary"
              size="small"
              style="margin-left: 10px;"
              @click="addMechanism"
            >
              添加
            </el-button>
            <el-button
              v-if="!isDisabled"
              :disabled="enteroriseChecked"
              type="primary"
              size="small"
              @click="randomMechanism"
            >
              随机生成
            </el-button>
            <el-button
              v-if="!isDisabled"
              :disabled="enteroriseChecked"
              type="primary"
              size="small"
              style="margin-right: 10px;"
              @click="mechanismRandomRange"
            >
              随机抽选范围
            </el-button>
            <el-checkbox
              v-show="mechanismId && safetyTargetInfoDtoList.length"
              v-model="enteroriseChecked"
              @change="handleExtend"
            >
              延伸到企业
            </el-checkbox>
          </el-form-item>

          <el-form-item
            v-show="enteroriseChecked || ruleForm.inspectionTarget === 1"
            prop="agency"
          >
            <el-select
              v-model="enterpriseId"
              clearable
              filterable
              placeholder="请选择企业"
              style="width: 30%;"
            >
              <el-option
                v-for="item in enterpriseList"
                :key="item.id"
                :label="item.enterpriseName"
                :value="item.id"
              />
            </el-select>
            <el-button
              v-if="!isDisabled"
              type="primary"
              size="small"
              style="margin-left: 10px;"
              @click="addEnterprise('','')"
            >
              添加
            </el-button>
            <el-button
              v-if="!isDisabled"
              type="primary"
              size="small"
              :disabled="enterpriseList && enterpriseList.length>0 ? false: true"
              @click="randomEnterprise"
            >
              随机生成
            </el-button>
            <el-button
              v-if="!isDisabled"
              type="primary"
              size="small"
              :disabled="enterpriseList && enterpriseList.length>0 ? false: true"
              @click="enterpriseRandomRange"
            >
              随机抽选范围
            </el-button>
          </el-form-item>
        </el-descriptions-item>
      </el-descriptions>
      <div
        v-for="(item, index) in safetyTargetInfoDtoList"
        :key="index"
        style="margin-top: 10px;"
      >
        <div class="table-head">
          <div class="text-wrapper">
            {{ item.targetName }}
          </div>
          <div v-if="!isDisabled">
            <el-button
              type="danger"
              size="small"
              style="margin-left: 10px;"
              @click="safetyTargetInfoDtoList.splice(index, 1)"
            >
              移除
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="addCheck(index)"
            >
              添加检查项
            </el-button>
          </div>
        </div>
        <el-table
          :data="item.safetyTargetItemInfoDtoList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            label="检查项"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="检查项分类"
            align="center"
            prop="categoryName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="检查内容"
            align="center"
            prop="content"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="!isDisabled"
            label="操作"
            align="center"
            width="95"
          >
            <template v-slot="scope">
              <el-button
                size="small"
                type="danger"
                plain
                @click="item.safetyTargetItemInfoDtoList.splice(scope.$index, 1)"
              >
                <em class="el-icon-delete" /> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="icon-title" style="margin-top: 20px;">
        <span class="span" /><i v-if="!isDisabled" class="required" />计划检查人员信息
      </div>
      <el-descriptions
          v-if="!isDisabled"
          class="descriptions-one"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="situation-title"
          contentClassName="situation-text"
          border
        >
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />计划检查人员:</template>
          <el-form-item
            label="计划检查人员:"
            style="width: 100%;"
            prop="inspectorValue"
          >
            <el-select
              v-model="inspectorValue"
              multiple
              clearable
              filterable
              placeholder="请选择检查人员或点击按钮进行随机选择(多选)"
              style="width: 30%;"
            >
              <el-option
                v-for="(item,index) in inspectorList"
                :key="index"
                :label="item.name"
                :value="item.personnelId"
                :disabled="istableInspectorList(item.personnelId) ? true : false"
              />
            </el-select>
            <el-button
              v-if="!isDisabled"
              type="primary"
              size="small"
              style="margin-left: 10px;"
              @click="addInspector('','')"
            >
              添加
            </el-button>
            <el-button
              v-if="!isDisabled"
              type="primary"
              size="small"
              :disabled="inspectorList && inspectorList.length>0 ? false: true"
              @click="randomInspector"
            >
              随机抽取
            </el-button>
          </el-form-item>
        </el-descriptions-item>
      </el-descriptions>
      <div>
        <el-table
          :data="tableInspectorList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          class="table-border"
        >
          <el-table-column
            label="姓名"
            prop="name"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="手机号码"
            prop="mobilePhone"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="职务"
            prop="post"
            :show-overflow-tooltip="true"
          >
            <template v-slot="{row}">
              {{ ['局长', '副局长', '处长', '副处长', '科员'][Number(row.post)] }}
            </template>
          </el-table-column>
          <el-table-column
            label="所属单位"
            prop="departmentName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="!isDisabled"
            label="操作"
            align="center"
            width="95"
          >
            <template v-slot="scope">
              <el-button
                size="small"
                type="danger"
                plain
                @click="tableInspectorList.splice(scope.$index, 1)"
              >
                <em class="el-icon-delete" /> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="icon-title" style="margin-top: 20px;">
        <span class="span" />专家信息
      </div>
      <el-descriptions
          v-if="!isDisabled"
          class="descriptions-one"
          :column="1"
          :colon="true"
          size="medium"
          labelClassName="situation-title"
          contentClassName="situation-text"
          border
        >
        <el-descriptions-item>
          <template slot="label"><i v-if="!isDisabled" class="required" />是否邀请专家:</template>
          <el-form-item
            prop="isExpertInvited"
            v-if="!isDisabled"
          >
            <el-radio-group v-model="ruleForm.isExpertInvited">
              <el-radio :label="0">
                否
              </el-radio>
              <el-radio :label="1">
                是
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <span v-else>
              <el-tag :type="ruleForm.isExpertInvited ? 'success': ''">{{ ruleForm.isExpertInvited ? '是' : '否' }}</el-tag>
          </span>
        </el-descriptions-item>
        <el-descriptions-item v-if="ruleForm.isExpertInvited">
          <template slot="label"><i v-if="!isDisabled && ruleForm.isExpertInvited" class="required" />专家:</template>
          <el-form-item
            v-if="ruleForm.isExpertInvited"
            style="width: 100%;"
          >
            <el-select
              v-model="expertSelectValue"
              multiple
              clearable
              filterable
              placeholder="请选择检专家"
              style="width: 30%;"
            >
              <el-option
                v-for="(item,index) in expertSelectList"
                :key="index"
                :label="item.name"
                :value="item.id"
                :disabled="istableExpertSelectList(item.id) ? true : false"
              />
            </el-select>
            <el-button
              v-if="!isDisabled"
              type="primary"
              size="small"
              style="margin-left: 10px;"
              @click="addExpert"
            >
              添加
            </el-button>
            <el-button
              v-if="!isDisabled"
              type="primary"
              size="small"
              :disabled="expertSelectList && expertSelectList.length>0 ? false: true"
              @click="randomExpert"
            >
              随机抽取
            </el-button>
          </el-form-item>
        </el-descriptions-item>
      </el-descriptions>
      <el-table
        :data="tableExpertSelectList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="姓名"
          prop="name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="手机号码"
          prop="mobilePhone"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="职务"
          prop="post"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="工作单位及部门"
          prop="departmentName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="技术职称"
          prop="technicalTitle"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="!isDisabled"
          label="操作"
          align="center"
          width="95"
        >
          <template v-slot="scope">
            <el-button
              size="small"
              type="danger"
              plain
              @click="tableExpertSelectList.splice(scope.$index, 1)"
            >
              <em class="el-icon-delete" /> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;">
        <el-descriptions
            v-if="!isDisabled"
            class="descriptions-one"
            :column="1"
            :colon="true"
            size="medium"
            labelClassName="situation-title"
            contentClassName="situation-text"
            border
          >
          <el-descriptions-item>
            <template slot="label">检查备注:</template>
            <el-form-item
              prop="isExpertInvited"
              v-if="!isDisabled"
            >
              <el-input
                v-model="ruleForm.remark"
                type="textarea"
                rows="7"
                style="width: 100%;"
                placeholder="请选择检查备注"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
            <span v-else>
                {{ruleForm.remark}}
            </span>
          </el-descriptions-item>
        </el-descriptions>
       </div>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="检查项管理"
      width="80%"
      :close-on-click-modal="false"
    >
      <check-items @getCheckItems="getCheckItems" />
    </el-dialog>
    <el-dialog
      :visible.sync="treeDialogVisible"
      title="随机抽选范围"
      width="500"
    >
      <tree
        v-if="treeDialogVisible"
        ref="treeSub"
        :tree-data="activeRange === 1 ? enterpriseList : managementDepartmentList"
        :default-props="defaultProps"
        :default-range="activeRange === 1 ? enterpriseRange : mechanismRange"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="treeDialogVisible = false" size="small">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="treeSubmit"
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
        v-if="!isDisabled"
        type="primary"
        size="medium"
        :loading="saveLoading"
        @click="submitForm('ruleForm', 0)"
      >
        保存
      </el-button>
      <el-button
        v-if="!isDisabled"
        type="primary"
        size="medium"
        :loading="saveLoading"
        @click="submitForm('ruleForm', 1)"
      >
        保存并发布
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckItems from './components/CheckItems'
import Tree from './components/tree'
import { getOrgList, addPlan, updatePlan, inspectorList, allEnterpriseList, expertSelectList, findById } from '@/api/general-services/safety-supervision-and-inspection/safetyPlanning'
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import { getAllEnList } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { getSelectDepartments } from '@/api/general-services/intact'
export default {
  components: {
    CheckItems,
    Tree
  },
  data() {
    return {
      type: '',
      saveLoading:false,
      treeData:[],
      ruleForm: {
        id: '',
        categoryId: '',
        planningName: '',
        planningTime: '',
        inspectionTarget: 1,
        isUseUnit: [],
        isExpertInvited: 1,
        remark: '',
        publishStatus: '',
        isSecret:0
      },
      useUnitList:[],
      disableEnterprise: true, // 显示选择企业
      disableOrgan: true, // 显示选择机构
      enteroriseChecked: false,
      dialogVisible: false,
      treeDialogVisible: false,
      categoryList: [],
      managementDepartmentSearchList: [],
      managementDepartmentList: [],
      enterpriseList: [], // 企业
      enterpriseId: '', // 选中企业id
      mechanismId: null, // 选中机构id
      safetyTargetInfoDtoList: [], // card选中的企业/机构
      inspectorList: [], // 人员
      tableInspectorList: [], // table选中人员
      inspectorValue: [], // select选中人员
      expertSelectList: [], // 专家
      tableExpertSelectList: [], // table选中专家
      expertSelectValue: [], // select选中专家
      defaultProps: {},
      activeRange: '', // 当前随机范围弹窗是企业/机构（1、企业 2、机构）
      enterpriseRange: [], // 企业范围,
      mechanismRange: [], // 机构范围
      activeSafetyTargetItemInfoDto: '', // 当前点击的检查项
      isDisabled: true,
      showSelectOrgan: true, // 是否可选择机构
      rules: {
        isUseUnit:[
          { required: true, message: '请选择检查单位', trigger: 'change' }
        ],
        planningName: [
          { required: true, message: '请输入计划名称', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择计划类型', trigger: 'blur' }
        ],
        planningTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        inspectionTarget: [
          { required: true, message: '请选择计划检查对象', trigger: 'change' }
        ],
        isExpertInvited: [
          { required: true, message: '请选择是否邀请专家', trigger: 'change' }
        ],
        isSecret: [
          { required: true, message: '请选择是否暗访', trigger: 'change' }
        ],
      }
    }
  },
  computed: {
    ...mapGetters(['user_info', 'token_str'])
  },
  async mounted() {
    const { type, disabled } = this.$route.query
    this.type = type
    this.isDisabled = !!disabled
    if (this.user_info.orgcategory !== '1') this.showSelectOrgan = false
    // 检查项类别
    const info = await findByCategoryList({ type: 1 })
    this.categoryList = info.data
    // 查询计划检查人员列表
    const res = await inspectorList({ tokenStr: this.token_str })
    this.inspectorList = this.unique(res.data)
    // 专家信息
    const obj = await expertSelectList()
    this.expertSelectList = obj.data
    // 机构列表
    this.selectManagementDepartment()
    // 企业列表
    this.allEnterpriseList()

    this.fetchData()
    // 查询详情
    if (this.$route.query && this.$route.query.id) {
      const data = await findById(this.$route.query.id)
      this.ruleForm = {
        id: data.data.id,
        categoryId: data.data.categoryId,
        planningName: data.data.planningName,
        planningTime: data.data.planningTime,
        inspectionTarget: data.data.inspectionTarget,
        isUseUnit: data.data.isUseUnit ? JSON.parse(data.data.isUseUnit) : [],
        isExpertInvited: data.data.isExpertInvited,
        remark: data.data.remark,
        isSecret:data.data.isSecret || 0
      }
      this.tableExpertSelectList = data.data.safetyExpertInfoVoList
      this.tableInspectorList = data.data.safetyInspectorInfoVoList
      this.safetyTargetInfoDtoList = data.data.safetyTargetInfoVoList
      this.safetyTargetInfoDtoList.forEach(item => {
        item.safetyTargetItemInfoDtoList = item.safetyTargetItemInfoVOList
      })
    }
  },
  methods: {
    getIdToName(arr,id){
      let name = ''
      for(let i=0;i<arr.length;i++){
        if(arr[i].id===id){
          name = arr[i].name
          return name
        }
      }
      return name
    },
    fetchData() {
      getSelectDepartments().then(res => {
        if (!res.data) return
        this.useUnitList = res.data
        this.treeData = this.gettreeData(res.data)
      })
    },
    gettreeData(data){
      let map = {}
      let val = []
      // 生成数据对象集合
      data.forEach(it=>{
        map[it.enterpriseId] = it
      })
      // 生成结果集
      data.forEach(it=>{
        const parent = map[it.parentId]
        it.label = it.departmentName
        it.value = it.departmentName
        if (parent){
          if (!Array.isArray(parent.children)) parent.children = []
          parent.children.push(it)
        } else {
          val.push(it)
        }
      })
      return val
    },
    /**
     * 判断计划检查人员是否已选中
     *
     */
    istableInspectorList(personnelId){
      let i = 0
      this.tableInspectorList.forEach(item=>{
        if (personnelId===item.personnelId){
          i++
          return false
        }
      })
      return i
    },
    /**
     * 判断专家是否已选中
     */
    istableExpertSelectList(id){
      let i = 0
      this.tableExpertSelectList.forEach(item=>{
        if (id===item.id ||item.expertId===id){
          i++
          return false
        }
      })
      return i
    },
    unique(newarr) {
      if (!newarr ||newarr.length===0){
        return []
      }
      const res = new Map()
      return newarr.filter((newarr) => !res.has(newarr.personnelId) && res.set(newarr.personnelId, 1))
    },
    async allEnterpriseList() {
      // 中心机构显示全部企业,区县/直属机构显示机构下面企业
      const obj = this.user_info.orgcategory === '1' ? await getAllEnList() : await allEnterpriseList({ orgId: Number(this.user_info.orgid) })
      this.enterpriseList = obj.data ? obj.data : []
    },
    async selectManagementDepartment() {
      const res = await getOrgList({ tokenStr: this.token_str })
      this.managementDepartmentSearchList = res.data || []
      this.managementDepartmentList = res.data || []
    },
    // 添加专家
    addExpert() {
      this.expertSelectList.forEach(item => {
        this.expertSelectValue.forEach(child => {
          if (item.id === child) {
            if (this.judgmentRepetition(this.tableExpertSelectList, 'id', child)) {
              this.tableExpertSelectList.push(item)
            } else {
              this.$message.error('专家已添加')
            }
          }
        })
      })
    },
    // 随机专家
    randomExpert() {
      const max = this.expertSelectList.length - 1
      const index = Math.round(Math.random() * max)
      this.expertSelectValue = [this.expertSelectList[index].id]
    },
    // 添加人员
    addInspector(isRandom,Ids) {
      const personnelIds = Ids || this.inspectorValue
      this.inspectorList.forEach(item => {
        personnelIds.forEach(child => {
          if (item.personnelId === child) {
            if (this.judgmentRepetition(this.tableInspectorList, 'personnelId', child)) {
              const items = JSON.parse(JSON.stringify(item))
              items.isRandom = isRandom || 0
              this.tableInspectorList.push(items)
            } else {
              if (!isRandom){
                this.$message.error('人员已添加')
              }
            }
          }
        })
      })
    },
    // 随机人员
    randomInspector() {
      const max = this.inspectorList.length - 1
      const index = Math.round(Math.random() * max)
      const personnelId = [this.inspectorList[index].personnelId]
      // this.inspectorValue = [this.inspectorList[index].personnelId]
      this.addInspector(1,personnelId)
    },
    // 添加企业
    addEnterprise(isRandom,Id) {
      const enterpriseId = Id || this.enterpriseId
      this.enterpriseList.forEach(item => {
        if (item.id === enterpriseId) {
          if (this.judgmentRepetition(this.safetyTargetInfoDtoList, 'targetId', enterpriseId, 1)) {
            this.safetyTargetInfoDtoList.push({ inspectionTarget: 1, safetyTargetItemInfoDtoList: [], targetId: item.id, targetName: item.enterpriseName,isRandom:isRandom || 0 })
          } else {
            if (!isRandom){
              this.$message.error('企业已添加')
            }
          }
        }
      })
    },
    // 添加机构
    addMechanism() {
      const mechanismId = this.mechanismId
      this.managementDepartmentSearchList.forEach(item => {
        if (item.orgId === mechanismId) {
          if (this.judgmentRepetition(this.safetyTargetInfoDtoList, 'targetId', mechanismId, 2)) {
            this.safetyTargetInfoDtoList.push({ inspectionTarget: 2, safetyTargetItemInfoDtoList: [], targetId: item.orgId, targetName: item.orgName })
          } else {
            this.$message.error('机构已添加')
          }
        }
      })
    },
    // 企业随机范围
    enterpriseRandomRange() {
      this.activeRange = 1
      this.defaultProps = {
        children: 'children',
        label: 'enterpriseName'
      }
      this.treeDialogVisible = true
    },
    // 企业随机生成
    randomEnterprise() {
      const list = this.enterpriseRange.length > 0 ? this.enterpriseRange : this.enterpriseList
      const max = list.length - 1
      const index = Math.round(Math.random() * max)
      const enterpriseId = list[index].id ? list[index].id : list[index]
      this.addEnterprise(1,enterpriseId)
    },
    // 机构随机范围
    mechanismRandomRange() {
      this.managementDepartmentList = this.managementDepartmentList.map(item => ({ ...item, id: item.orgId }))
      this.activeRange = 2
      this.treeDialogVisible = true
      this.defaultProps = {
        children: 'children',
        label: 'orgName'
      }
    },
    // 机构随机生成 - 随机生成
    randomMechanism() {
      const list = this.mechanismRange.length > 0 ? this.mechanismRange : this.managementDepartmentList
      const max = list.length - 1
      const index = Math.round(Math.random() * max)
      if (this.mechanismRange.length > 0) {
        this.mechanismId = list[index]
      } else {
        this.mechanismId = list[index].orgId
      }
    },
    // 判断重复
    judgmentRepetition(data, key, id, type) {
      let isRepeat = true
      data.forEach(item => {
        if (item[key] === id ||(item.expertId && item.expertId===id)) {
          if (type) {
            if (type === item.inspectionTarget) {
              isRepeat = false
            }
          } else {
            isRepeat = false
          }
        }
      })
      return isRepeat
    },
    // 随机范围提交
    treeSubmit() {
      const range = this.$refs.treeSub.getCheckedNodes()
      if (this.activeRange === 1) {
        this.enterpriseRange = range
      } else {
        this.mechanismRange = range
      }
      this.treeDialogVisible = false
    },
    // 检查项数据提交
    getCheckItems(obj) {
      if (this.judgmentRepetition(this.safetyTargetInfoDtoList[this.activeSafetyTargetItemInfoDto].safetyTargetItemInfoDtoList, 'id', obj.id)) {
        this.safetyTargetInfoDtoList[this.activeSafetyTargetItemInfoDto].safetyTargetItemInfoDtoList.push(obj)
      }
      this.dialogVisible = false
    },
    uniques(arr) {
      return Array.from(new Set(arr))
    },
    getSafetyPlanningUnitDtoList(){
      let isUseUnit = []
      if (typeof this.ruleForm.isUseUnit === 'string'){
        isUseUnit = JSON.parse(this.ruleForm.isUseUnit)
      } else {
        isUseUnit = this.ruleForm.isUseUnit
      }
      let merge = []
      isUseUnit.forEach(item=>{
        merge.push(item[item.length-1])
      })
      const SafetyPlanningUnitDto = []
      this.uniques(merge).forEach(element => {
        const id = this.getSafetyPlanningUnitNameToId(element)
        if (id){
          SafetyPlanningUnitDto.push({
            orgId:id,
            orgName:element
          })
        }
      })
      return SafetyPlanningUnitDto
    },
    getSafetyPlanningUnitNameToId(name){
      let id = ''
      this.useUnitList.forEach(item=>{
        if (item.departmentName===name){
          id = item.enterpriseId
          return item.enterpriseId
        }
      })
      return id
    },
    // 提交
    submitForm(formName, type) {
      this.ruleForm.publishStatus = type
      if (typeof this.ruleForm.isUseUnit === 'object'){
        this.ruleForm.isUseUnit = JSON.stringify(this.ruleForm.isUseUnit)
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.safetyTargetInfoDtoList.length <= 0) {
            this.$message.error('请添加检查对象')
            return false
          }
          if (this.ruleForm.isExpertInvited && this.tableExpertSelectList.length <= 0) {
            this.$message.error('请添加专家')
            return false
          }
          for (let key in this.safetyTargetInfoDtoList) {
            if (this.safetyTargetInfoDtoList.hasOwnProperty(key)) {
              const item = this.safetyTargetInfoDtoList[key]
              if (item.safetyTargetItemInfoDtoList.length <= 0) {
                this.$message.error(`请添加${item.targetName}的检查项`)
                return true
              }
            }
          }
          this.saveSubmit()
        } else {
          return false
        }
      })
    },
    // 提交数据
    async saveSubmit() {
      this.saveLoading = true
      const data = { ...this.ruleForm }
      data.safetyExpertInfoDtoList = []
      if (data.isExpertInvited === 1) {
        this.tableExpertSelectList.forEach(item => {
          data.safetyExpertInfoDtoList.push({ expertId: item.expertId || item.id })
        })
      }
      if (!this.tableInspectorList || this.tableInspectorList.length===0){
        this.$message.error('请添加计划检查人员')
        this.saveLoading = false
        return false
      }
      data.safetyInspectorInfoDtoList = []
      this.tableInspectorList.forEach(item => {
        data.safetyInspectorInfoDtoList.push({
          personnelId: item.personnelId,
          departmentName: item.departmentName,
          mobilePhone: item.mobilePhone,
          name: item.name,
          post: item.post,
          title: item.title,
          isRandom:item.isRandom || 0
        })
      })
      const safetyTargetInfoDtoList = [...this.safetyTargetInfoDtoList]
      data.safetyTargetInfoDtoList = []
      safetyTargetInfoDtoList.forEach((item, index) => {
        data.safetyTargetInfoDtoList.push({ inspectionTarget: item.inspectionTarget, safetyTargetItemInfoDtoList: [], targetId: item.targetId, targetName: item.targetName,isRandom:item.isRandom || 0 })
        item.safetyTargetItemInfoDtoList.forEach(child => {
          data.safetyTargetInfoDtoList[index].safetyTargetItemInfoDtoList.push({ itemInfoId: child.itemInfoId || child.id })
        })
      })
      delete data.inspectorValue
      data.safetyPlanningUnitDtoList = this.getSafetyPlanningUnitDtoList()
      const res = this.ruleForm.id ? await updatePlan(data) : await addPlan(data)
      this.saveLoading = false

      if (res.code === '0') {
        this.returnBack()
      }

    },
    // 添加检查项
    addCheck(index) {
      this.activeSafetyTargetItemInfoDto = index
      this.dialogVisible = true
    },
    // 延伸到企业
    async handleExtend(checked) {
      if (checked) {
        const mechanismId = this.mechanismId.length > 0 ? this.mechanismId[this.mechanismId.length - 1] : this.mechanismId
        const res = await allEnterpriseList({ orgId: mechanismId })
        this.enterpriseList = res.data || []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cert-basic-detail {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .situation-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .situation-text {
            width: 40%;
            line-height: 30px;
        }
    }
    .descriptions-one{
      margin-bottom: 20px;

        /deep/ .situation-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .situation-text {
            width: 90%;
            line-height: 30px;
        }
    }
    /deep/ .el-table {
        margin-top: 10px;
    }

    /deep/ .icon-title {
        border-radius: 5px;
        height: 40px;
        background: #f3f3f3;
    }

    .table-head {
        display: flex;
        margin-bottom: - 10px;
        border: 1px solid #ebeef5;
        padding: 10px 20px;
        background-color: rgba(240, 242, 245, 1);
        align-items: center;
        justify-content: space-between;

        .text-wrapper {
            font-weight: bold;
        }
    }

    .three-column-input-table {
        display: flex;
        margin: 20px 0;
        padding-right: 50px;
        flex-wrap: wrap;

        /deep/ .el-form-item {
            width: 50%;
            background-color: #ffffff;

            .el-image {
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>
