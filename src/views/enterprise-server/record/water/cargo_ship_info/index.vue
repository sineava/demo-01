<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>新增普通货船运力备案</span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="经营人/所有人名称:"
          prop="keyWord"
        >
          <el-input
            v-model.trim="searchForm.keyWord"
            placeholder="请输入经营人/所有人名称"
          />
        </el-form-item>
        <el-form-item
          label="备案时间:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="fetchData"
          >
            查询
          </el-button>
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            @click="resetForm('searchForm')"
          >
            重置
          </el-button>
        </el-form-item>
        <el-button
          v-if="button_roles.create"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          新增普通货船运力备案
        </el-button>
      </el-form>
      <el-table
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <div />
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="所在地市港口管理部门"
          prop="deptName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="经营人"
          prop="enterpriseName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="所有人"
          prop="allPeople"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="备案船舶艘数"
          prop="shipNum"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="船舶来源"
          prop="shipSource"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ ['新建船舶','购置外国籍','光租外国籍船舶','中国籍国际航行船舶转入国内运输','省内普通货物货船运输转省级运输'][scope.row.shipSource-1] }}
          </template>
        </el-table-column>
        <el-table-column
          label="受理编号"
          prop="onlyCode"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="审批状态"
          prop="filingDate"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <el-tag :type="['','warning','success','success'][scope.row.isStatus-1]">{{ ['审核中','退回','受理通过','审核通过'][scope.row.isStatus-1] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="提交时间"
          prop="createTime"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          v-if="button_roles.receipt || button_roles.desc || button_roles.delete || button_roles.update"
          label="操作"
          align="center"
          :width="120"
        >
          <template v-slot="scope">
            <el-dropdown>
              <el-button size="mini" type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="button_roles.desc" @click.native="handleDetail(scope.row,'info')">详情</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.update" :disabled="scope.row.isStatus>2 ? true : false" @click.native="handleDetail(scope.row,'edit')">编辑</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.delete" @click.native="handleDelete(scope.$index, scope.row)">删除</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.receipt" :disabled="(scope.row.isStatus===3 &&scope.row.isExamine===0) || (scope.row.isStatus===4 &&scope.row.isExamine===1) ? false : true" @click.native="download(scope.row)">下载回执</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import pagination from '@/components/Pagination'
import { getFilingPageList, getFilingInfo,delFilingData } from '@/api/water-transportation-services/keep-on-record/ordinary-freighter-transport-filing'
import { mapGetters } from 'vuex'
import { exportWord } from '@/components/word'
import { Loading } from 'element-ui'
export default {
  components: {
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      type:1,
      searchForm: {
        keyWord: '',
        type:1
      },
      screenTime: [],
      orgcategory: ''
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    this.orgcategory = this.$store.getters.user_info.orgcategory
    this.fetchData()
  },
  methods: {
    changeType(e){
      this.searchForm.type = e
      this.currentPage = 1
      this.total = 0
      this.fetchData()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      if (this.screenTime&&this.screenTime.length > 0) {
        data.screenStartTime = this.screenTime[0] + ' 00:00:00'
        data.screenEndTime = this.screenTime[1] + ' 23:59:59'
      }
      getFilingPageList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.fetchData()
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 添加
     */
    handleAdd() {
      this.$router.push({ path: '/record/water/waterway/cargoShipInfoDetail', query: { oper: 'add' }})
    },
    /**
     * 详情
     */
    handleDetail(item, isEdit) {
      let oper = isEdit
      this.$router.push({ path: '/record/water/waterway/cargoShipInfoDetail', query: { id: item.id, oper: oper }})
    },
    // 删除
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        delFilingData(row.id).then(res=>{
          if (res.code==='0'){
            this.$message.success('删除成功')
            this.fetchData()
          }
        })
      }).catch()
    },
    async download(item){
      const loadingInstance = Loading.service({ fullscreen: true })
      const info = await getFilingInfo(item.id)
      info.data.shipVoList.map((item,index)=>{
        item.index = index+1
        return item
      })
      const wordData ={
        allPeople:info.data.allPeople || '',
        businessLicenseNo:info.data.businessLicenseNo || '',
        managementPeople:info.data.managementPeople || '',
        licenseCode:info.data.licenseCode || '',
        allowedBusiness:info.data.allowedBusiness || '',
        shipNum:info.data.shipNum || '',
        loadsGrossTon:info.data.loadsGrossTon || '',
        loadsDeadWeightTon:info.data.loadsDeadWeightTon || '',
        loadsSpace:info.data.loadsSpace || '',
        powerNum:info.data.powerNum || '',
        powerKw:info.data.powerKw || '',
        bulkCarrier:info.data.bulkCarrier || '',
        dumpingSandBoat:info.data.dumpingSandBoat || '',
        containerShip:info.data.containerShip || '',
        multiPurposeShip:info.data.multiPurposeShip || '',
        otherGeneralCargoShip:info.data.otherGeneralCargoShip || '',
        shipSourceName:info.data.shipSourceName || '',
        shipVoList:info.data.shipVoList || [],
        reviewedBy:info.data.reviewedBy || '',
        reviewedDate:info.data.reviewedDate || '',
        reviewedByCenter:info.data.reviewedByCenter || '',
        reviewedDateCenter:info.data.reviewedDateCenter || '',
      }
      info.data.shipSourceName = ['新建船舶','购置外国籍','光租外国籍船舶','中国籍国际航行船舶转入国内运输','省内普通货物货船运输转省级运输'][info.data.shipSource-1]
      exportWord('./excels/重庆市新建普通货运船舶备案表.docx',wordData,
        `普通货船运力备案表`)
      loadingInstance.close()
    }
  }
}
</script>
