<template>
  <el-card id="zckps" ref="bodys" class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>轻资产卡片</span>
    </div>
    <div class="app-container">
      <div>
        <el-form
          ref="searchForm"
          :inline="true"
          size="small"
          :model="search"
          class="demo-form-inline"
        >
          <el-form-item label="资产名称" prop="name">
            <el-input v-model.trim="search.name" clearable placeholder="资产名称" />
          </el-form-item>
          <el-form-item label="使用状态" prop="usingState">
            <el-input v-model.trim="search.usingState" clearable placeholder="使用状态" />
          </el-form-item>
          <el-form-item label="资产分类">
            <el-select
              v-model="search.type"
              prop="type"
              clearable
              placeholder="资产分类"
            >
              <el-option label="房屋" value="1" />
              <el-option label="设备" value="2" />
              <el-option label="文物" value="3" />
              <el-option label="图书" value="4" />
              <el-option label="家具" value="5" />
              <el-option label="动植物" value="6" />
              <el-option label="物资" value="7" />
              <el-option label="构筑物" value="101" />
              <el-option label="土地" value="102" />
              <el-option label="车辆" value="201" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="user_info.orgid==='1375'" label="所属部门" prop="useDeptIds">
            <el-select
              v-model="search.deptIds"
              clearable
              filterable
              collapse-tags
              multiple
              style="width: 240px;"
              prop="orgId"
              placeholder="请选择管理部门"
            >
              <el-option
                v-for="(item,index) in orgList"
                :key="index"
                :label="item.orgName"
                :value="item.orgId"
              />
            </el-select>
          </el-form-item>

          <span v-show="ismore">
            <el-form-item label="资产价值">
              <el-input-number
                v-model="search.startCost"
                :precision="2"
                :min="0"
                :max="100000000000"
                clearable
                placeholder="资产价值开始"
                :controls="false"
              />
              ~
              <el-input-number
                v-model="search.endCost"
                :precision="2"
                :min="0"
                :max="100000000000"
                clearable
                placeholder="资产价值结束"
                :controls="false"
              />
            </el-form-item>
            <el-form-item label="使用部门" prop="useDeptIds">
              <el-select
                v-model="search.useDeptIds"
                clearable
                filterable
                collapse-tags
                multiple
                style="width: 240px;"
                prop="useDeptIds"
                placeholder="请选择使用部门"
              >
                <el-option
                  v-for="(item,index) in orgList"
                  :key="index"
                  :label="item.orgName"
                  :value="item.orgId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="价值类型" prop="valueType">
              <el-input v-model.trim="search.valueType" clearable placeholder="请输入价值类型" />
            </el-form-item>
            <el-form-item label="使用人" prop="userThe">
              <el-input v-model.trim="search.userThe" clearable placeholder="请输入使用人" />
            </el-form-item>
            <el-form-item label="财务入账时间">
              <el-date-picker
                v-model="financialEntry"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              />
            </el-form-item>
            <el-form-item label="取得方式" prop="makeWay">
              <el-input v-model.trim="search.makeWay" clearable placeholder="请输入取得方式" />
            </el-form-item>
            <el-form-item label="取得时间">
              <el-date-picker
                v-model="makeDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                clearable
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="使用时间">
              <el-date-picker
                v-model="useDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              />
            </el-form-item>
            <el-form-item label="设备用途" prop="euse">
              <el-input v-model.trim="search.euse" clearable placeholder="请输入设备用途" />
            </el-form-item>
          </span>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button type="success" icon="el-icon-more" @click="ismore=!ismore">更多</el-button>
            <el-button
              size="small"
              icon="el-icon-refresh-left"
              @click="resetForm('searchForm')"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-button">
        <AddButton :button_roles="button_roles" />
        <TemplateButton :button_roles="button_roles" />
        <ExportButton :button_roles="button_roles" :search="search" :talbeTitle="[]" />
        <ImportButton :button_roles="button_roles" />
      </div>
      <el-table
        v-loading="loading"
        :data="data"
        element-loading-text="Loading"
        border
        highlight-current-row
        class="table-border"
        max-height="600"
      >
        <el-table-column
          label="序号"
          width="65"
          fixed="left"
          align="center"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.findIndex(item => item=== '资产编号')!==-1"
          label="资产编号"
          align="center"
          prop="onlyCode"
          fixed="left"
          min-width="150"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '资产名称')!==-1"
          label="资产名称"
          prop="name"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '资产大类')!==-1"
          label="资产大类"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ filter(scope.row,'type') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.findIndex(item => item=== '资产分类')!==-1"
          label="资产分类"
          prop="typeName"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '财务入账日期')!==-1"
          label="财务入账日期"
          prop="dateOfFinancialEntry"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '会计凭证号')!==-1"
          label="会计凭证号"
          prop="accountingCN"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '取得日期')!==-1"
          label="取得日期"
          prop="makeDate"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '价值类型')!==-1"
          label="价值类型"
          prop="valueType"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '数量')!==-1"
          label="数量"
          prop="number"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '单价')!==-1"
          label="单价"
          prop="unitPrice"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '价值')!==-1"
          label="价值"
          prop="cost"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '财政性资金')!==-1"
          label="财政性资金"
          prop="funding"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '非财政性资金')!==-1"
          label="非财政性资金"
          prop="noFunding"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '取得方式')!==-1"
          label="取得方式"
          prop="makeWay"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '使用状况')!==-1"
          label="使用状况"
          prop="usingState"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '使用部门')!==-1"
          label="使用部门"
          prop="useDeptName"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '管理部门')!==-1"
          label="管理部门"
          prop="deptName"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '存放地点')!==-1"
          label="存放地点"
          prop="storagePlace"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '使用人')!==-1"
          label="使用人"
          prop="userThe"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '面积')!==-1"
          label="面积"
          prop="hfloorArea"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '规格型号')!==-1"
          label="规格型号"
          prop="specifications"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '产权形式')!==-1"
          label="产权形式"
          prop="propertyRF"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ filter(scope.row,'propertyRF') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.findIndex(item => item=== '产权分类')!==-1"
          label="产权分类"
          prop="hpropertyClassification"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '折旧状态')!==-1"
          label="折旧状态"
          prop="stateDepreciation"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '折旧年限')!==-1"
          label="折旧年限"
          prop="depreciationLife"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '自定义编号')!==-1"
          label="自定义编号"
          prop="customNumber"
          min-width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '备注')!==-1"
          label="备注"
          prop="remark"
          min-width="200"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '其中：取暖面积（m2）')!==-1"
          label="其中：取暖面积（m2）"
          prop="hheatingArea"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '其中：危房面积（m2）')!==-1"
          label="其中：危房面积（m2）"
          prop="hdangerousArea"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '车辆持证人')!==-1"
          label="车辆持证人"
          prop="holder"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ filter(scope.row,'holder') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.findIndex(item => item=== '车辆识别号')!==-1"
          label="车辆识别号"
          prop="vehicleIC"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '发动机号')!==-1"
          label="发动机号"
          prop="vengineNo"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '编制情况')!==-1"
          label="编制情况"
          prop="vwovenSituation"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ filter(scope.row,'vwovenSituation') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.findIndex(item => item=== '权属年限')!==-1"
          label="权属年限"
          prop="tenurePeriod"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '发证日期')!==-1"
          label="发证日期"
          prop="releaseDate"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '建筑结构')!==-1"
          label="建筑结构"
          prop="hbuildingStructure"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '竣工日期')!==-1"
          label="竣工日期"
          prop="scompletionDate"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '已使用年限（月）')!==-1"
          label="已使用年限（月）"
          prop="serviceLife"
          min-width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '设备用途')!==-1"
          label="设备用途"
          prop="euse"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '投入使用日期')!==-1"
          label="投入使用日期"
          prop="useDate"
          min-width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '采购组织形式')!==-1"
          label="采购组织形式"
          prop="organizationalFOP"
          min-width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '生产厂家')!==-1"
          label="生产厂家"
          prop="emanufacturer"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '经销商')!==-1"
          label="经销商"
          prop="dealer"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '合同编号')!==-1"
          label="合同编号"
          prop="contractNo"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '发票号')!==-1"
          label="发票号"
          prop="invoiceNo"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="checkList.findIndex(item => item=== '备用字段')!==-1"
          label="备用字段"
          prop="standby"
          min-width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          :width="(button_roles.update ? 75 : 0) + (button_roles.delete ? 75 : 0) + (button_roles.desc ? 75 : 0)"
        >
          <template slot="header">
            操作
            <el-popover
              placement="bottom"
              :width="eWidth-330"
              trigger="click"
            >
              <div class="box-card box-checkbox">
                <el-checkbox-group v-model="checkList" size="mini" @change="checkboxChange">
                  <el-checkbox
                    v-for="(item,index) in titleList"
                    :key="index"
                    :label="item"
                    :title="item"
                    class="topic-checkbox"
                    border
                  />
                </el-checkbox-group>
              </div>
              <el-button
                slot="reference"
                icon="el-icon-s-tools"
                type="warning"
                size="mini"
                round
              />
            </el-popover>
          </template>
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              @click="handleEdit(scope.row,'info')"
            >
              详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              @click="handleEdit(scope.row,'edit')"
            >
              编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        background
        @change="paginationChange"
      />
    </div>
  </el-card>
</template>

<script>
import { getCard,delAssetsCard } from '@/api/light-means/card'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import AddButton from './components/tool-add'
import ExportButton from './components/tool-export'
import { getAllOrgList } from '@/api/general-services/enterpriseInfo/external'
import ImportButton from './components/tool-import'
import TemplateButton from './components/tool-template'
import moment from 'moment'
export default {
  components: {
    pagination,
    AddButton,
    ExportButton,
    ImportButton,
    TemplateButton
  },
  data() {
    return {
      loading:false, // 加载动画
      currentPage:1,// 当前页码
      pageSize:20,// 每页大小
      total:0,// 数据总数
      data:[], // 数据集
      orgList:[],
      financialEntry:[],
      makeDate:[],
      useDate:[],
      ismore:false,
      eWidth:document.body.clientWidth,
      search:{
        name:'',
        type:'',
        useDeptIds:[],
        deptIds:[],
        usingState:'',
        startCost:undefined,
        endCost:undefined,
        valueType:'',
        userThe:'',
        startDateOfFinancialEntry:'',
        endDateOfFinancialEntry:'',
        makeWay:'',
        startMakeDate:'',
        endMakeDate:'',
        eUse:'',
        typeIds:'',
        startUseDate:'',
        endUseDate:''
      },
      titleList:[
        '资产编号','资产大类','资产分类','资产名称','财务入账日期','会计凭证号','取得日期','价值类型','数量','单价','价值','财政性资金','非财政性资金','取得方式','使用状况'
        ,'使用部门','管理部门','存放地点','使用人','面积',
        '制单人','制单时间', // 没有这两个字段
        '规格型号','产权形式','产权分类','折旧状态',
        // '折旧方法','累计折旧','净值', // 没有保存
        '折旧年限','自定义编号','备注',
        '其中：取暖面积（m2）','其中：危房面积（m2）',
        '车辆持证人','车辆识别号','发动机号','编制情况','权属年限','发证日期',
        '建筑结构','竣工日期','已使用年限（月）','设备用途','投入使用日期','采购组织形式',
        '生产厂家','经销商','合同编号','发票号','备用字段'
      ],
      checkList:[
        '资产编号','资产大类','资产分类','资产名称','财务入账日期','会计凭证号','取得日期','价值类型','数量','单价','价值','财政性资金','非财政性资金','取得方式','使用状况'
        ,'使用部门','管理部门','存放地点','使用人','面积',
        '制单人','制单时间', // 没有这两个字段
        '规格型号','产权形式','产权分类','折旧状态',
        // '折旧方法','累计折旧','净值', // 没有保存
        '折旧年限','自定义编号','备注',
        '其中：取暖面积（m2）','其中：危房面积（m2）',
        '车辆持证人','车辆识别号','发动机号','编制情况','权属年限','发证日期',
        '建筑结构','竣工日期','已使用年限（月）','设备用途','投入使用日期','采购组织形式',
        '生产厂家','经销商','合同编号','发票号','备用字段'
      ],
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
    ])
  },
  created() {
    this.fetchOrgs()
    if (this.user_info.orgid!=='1375'){
      this.search.deptIds = [this.user_info.orgid]
    }
    this.fetchData()
  },
  methods: {
    checkboxChange(e){
      this.checkList = e || []
    },
    // 查询列表数据
    fetchData() {
      const useDeptIds = JSON.parse(JSON.stringify(this.search.useDeptIds))
      const queryData = JSON.parse(JSON.stringify(this.search))
      queryData.pageNum = this.currentPage
      queryData.pageSize = this.pageSize
      queryData.deptIds = queryData.deptIds ? queryData.deptIds.join(',') : ''
      queryData.useDeptIds = useDeptIds ? useDeptIds.join(',') : ''
      queryData.typeIds = queryData.typeIds ? queryData.typeIds.join(',') : ''
      queryData.startDateOfFinancialEntry = this.financialEntry && this.financialEntry[0] ? moment(this.financialEntry[0]).format('YYYY-MM-DD') : ''
      queryData.endDateOfFinancialEntry = this.financialEntry && this.financialEntry[1] ? moment(this.financialEntry[1]).format('YYYY-MM-DD') : ''

      queryData.startMakeDate = this.makeDate && this.makeDate[0] ? moment(this.makeDate[0]).format('YYYY-MM-DD') : ''
      queryData.endMakeDate = this.makeDate && this.makeDate[1] ? moment(this.makeDate[1]).format('YYYY-MM-DD') : ''

      queryData.startUseDate = this.useDate && this.useDate[0] ? moment(this.useDate[0]).format('YYYY-MM-DD') : ''
      queryData.endUseDate = this.useDate && this.useDate[1] ? moment(this.useDate[1]).format('YYYY-MM-DD') : ''
      getCard(queryData).then(res=>{
        if (res.code==='0'){
          this.data = res.data.records || []
          this.total = res.data.total || 0
        }
      })
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.financialEntry = []
      this.makeDate = []
      this.useDate = []
      this.currentPage = 1
      this.search.type = ''
      this.fetchData()
    },
    fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getAllOrgList().then(res => {
        this.orgList = res.data || []
      })
    },
    filter(item,key){
      if (!key || !item || item[key]==='' || item[key]===null || item[key]===undefined){
        return ''
      }
      let name = ''
      switch (key) {
      case 'type':
        name = this.getType(item[key])
        break
      case 'propertyRF':
        name = this.getPropertyRF(item[key])
        break
      case 'holder':
        name = Number(item[key]) === 1 ? '本单位' : '非单位'
        break
      case 'lnatureOUR':
        name = this.getLNatureOUR(item[key])
        break
      case 'lOwnershipNature':
        if (Number(item['type'])===101){
          name = Number(item[key]) === 1 ? '国有' : '集体'
        } else {
          name = item[key]
        }
        break
      case 'vehicleEmissions':
        name = this.getVehicleEmissions(item[key])
        break
      case 'vehicleLicense':
        name = Number(item[key]) === 1 ? '有' : '无'
        break
      case 'vIsMark':
        name = Number(item[key]) === 1 ? '是' : '否'
        break
      case 'vehicleuse':
        name = this.getVehicleuse(item[key])
        break
      default:
        name = item[key]
        break
      }
      return name
    },
    getVehicleuse(vehicleuse){
      let name = ''
      switch (Number(vehicleuse)) {
      case 1:
        name = '副部（省）级级以上领导用车'
        break
      case 2:
        name = '机要通讯用车'
        break
      case 3:
        name = '应急保障用车'
        break
      case 4:
        name = '执法执勤用车'
        break
      case 5:
        name = '特种专业技术用车'
        break
      case 6:
        name = '离退休干部用车'
        break
      default:
        name = '其他用车'
        break
      }
      return name
    },
    getVehicleEmissions(vehicleEmissions){
      let name = ''
      switch (Number(vehicleEmissions)) {
      case 1:
        name = '1.6（含）以下'
        break
      case 2:
        name = '1.6-1.8（含）以下'
        break
      case 3:
        name = '2.0-2.5（含）以下'
        break
      case 4:
        name = '2.5（含）以下'
        break
      default:
        name = '新能源、柴油车'
        break
      }
      return name
    },
    getLNatureOUR(lnatureOUR){
      let name = ''
      switch (Number(lnatureOUR)) {
      case 1:
        name = '出让'
        break
      case 2:
        name = '划拨'
        break
      case 3:
        name = '租赁'
        break
      default:
        name = '其他'
        break
      }
      return name
    },
    getPropertyRF(propertyRF){
      let name = ''
      switch (Number(propertyRF)) {
      case 1:
        name = '有产权'
        break
      case 2:
        name = '无产权'
        break
      default:
        name = '产权待界定'
        break
      }
      return name
    },
    getType(type){
      let name = ''
      switch (Number(type)) {
      case 1:
        name = '房屋'
        break
      case 2:
        name = '设备'
        break
      case 3:
        name = '文物'
        break
      case 4:
        name = '图书'
        break
      case 5:
        name = '家具'
        break
      case 6:
        name = '动植物'
        break
      case 7:
        name = '物资'
        break
      case 101:
        name = '构筑物'
        break
      case 102:
        name = '土地'
        break
      default:
        name = '车辆'
        break
      }
      return name
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 搜索按钮点击
    onSubmit() {
      this.currentPage = 1
      this.fetchData()
    },
    // 编辑
    handleEdit(item,oper){
      this.$router.push({ path: '/lightMeans/card/details', query: { id: item.id ,oper: oper}})
    },
    // 删除
    handleDelete(item){
      delAssetsCard({id:item.id}).then(res=>{
        if (res.code==='0'){
          this.fetchData()
        }
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
.box-checkbox {
    ::v-deep .el-checkbox.is-bordered + .el-checkbox.is-bordered {
        margin-left: 5px;
    }

    .topic-checkbox {
        margin: 5px;

        ::v-deep .el-checkbox__input {
            float: left;
            line-height: 25px;
        }

        ::v-deep .el-checkbox__label {
            display: inline-block;
            float: left;
            overflow: hidden;
            width: 100px;
            line-height: 25px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}

#zckps {
    /deep/ .el-input-number {
        input {
            text-align: left;
        }
    }

    .el-select__tags-text {
        max-width: 130px;
    }

    .el-select {
        .el-select__input {
            margin-left: 5px;
        }
    }
}
</style>
<style lang="scss">

.popper-tools {
    overflow-y: auto;
    height: 300px;
}
</style>
