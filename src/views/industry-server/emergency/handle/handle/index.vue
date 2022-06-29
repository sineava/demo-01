<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>应急处置管理</span>
      <span style="float: right;">
        <el-radio-group v-model="type" size="medium" @change="typeChange">
          <el-radio-button :label="1">待处理</el-radio-button>
          <el-radio-button :label="2">应急记录</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="事故名称:"
          prop="keyword"
        >
          <el-input
            v-model.trim="searchForm.keyword"
            placeholder="请输入事故名称"
          />
        </el-form-item>
        <el-form-item
          label="事故级别:"
          prop="accidentLevel"
        >
          <el-select
            v-model="searchForm.accidentLevel"
            clearable
            placeholder="请选择"
          >
            <el-option label="特别重大" value="1" />
            <el-option label="重大" value="2" />
            <el-option label="较大" value="3" />
            <el-option label="一般" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="发生时间:">
          <el-date-picker
            v-model="screenTime"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="submitForm('searchForm')"
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
      </el-form>
      <!-- <div style="display: flex;">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleEnrolment"
        >
          接警登记
        </el-button>
      </div> -->
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
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="事故名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事故类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.accidentType && accidentType.filter(item => (item.value === scope.row.accidentType))[0].label }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事故级别" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.accidentLevel && accidentLevel.filter(item => (item.value === scope.row.accidentLevel))[0].label }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发生时间"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            <span>{{ scope.row.occurrenceTime && scope.row.occurrenceTime.replace('T', ' ') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="事故发生企业" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.enterpriseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低安全范围" :show-overflow-tooltip="true">
          <template v-slot="scope">
            <span>{{ scope.row.safeRange }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          :show-overflow-tooltip="true"
          min-width="100"
        >
          <template v-slot="scope">
            <span>{{ scope.row.updateTime && scope.row.updateTime.replace('T', ' ') }}</span>
          </template>
        </el-table-column>
        <!-- v-if="button_roles.desc ||button_roles.release ||button_roles.delete" -->
        <el-table-column
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
                <el-dropdown-item v-if="button_roles.release && scope.row.state !== 3" @click.native="handleRenewal(scope.row.postStatus, scope.row)">{{ scope.row.postStatus === 1 ? '发布' : '响应' }}</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.desc" @click.native="handleDetail(scope.$index, scope.row)">详情</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.delete && scope.row.state === 1" @click.native="handleDelete(scope.$index, scope.row)">删除</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.state === 3" @click.native="exportRecord(scope.$index, scope.row)">导出报告</el-dropdown-item>
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
import { disposalRecord } from '@/utils/public-fields'
import { momentDate } from '@/utils/index'
import { getPageList, deleteDisposal, releaseRecord } from '@/api/emergency-services/disposal-record'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import {assemblyData} from './export'
import { exportWord } from '@/components/word'
export default {
  components: {
    pagination
  },
  mixins: [disposalRecord],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      screenTime: [],
      type:1,
      searchForm: {
        keyword: '',
        accidentLevel: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    typeChange(e){
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      getPageList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime),
        screenEndTime: momentDate(screenEndTime,'YYYY-MM-DD 23:59:59'),
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        type:this.type
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.currentPage = 1
        this.fetchData()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 接警登记
     */
    handleEnrolment() {
      this.$router.push({ path: '/emergency/handle/handleEnrolment' })
    },
    /**
     * 续报/响应
     */
    handleRenewal(postStatus, item) {
      if (postStatus === 1) { // 未发布
        releaseRecord({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('内容发布成功!')
            this.fetchData()
          }
        })
      }
      if (postStatus === 2) { // 已发布
        const tabType = item.state === 3 ? 'detail' : 'add'
        this.$router.push({ path: '/emergency/handle/handlePane', query: { id: item ? item.id : null, state: item.state, tabType,isJy:this.type === 1 ? true :false }})
      }
    },
    handleDetail(_, item) {
      this.$router.push({ path: '/emergency/handle/handlePane', query: { id: item ? item.id : null, tabType: 'detail', state: item.state,isJy:this.type === 1 ? true :false }})
    },
    handleDelete(_, item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteDisposal({ id: item.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      })
    },
    async exportRecord(index,item){
      const loading = this.$loading({
        lock: true,
        text: '正在生成报告，请耐心等待...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let data = await assemblyData(item)
      exportWord('./excels/应急救援评估报告.docx',data,`应急救援评估报告`)
      loading.close()
    },
  }
}
</script>

