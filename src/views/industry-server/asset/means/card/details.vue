<template>
  <el-card id="means-card-details" class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="title" />
      </span>
      <span v-if="oper==='add'" class="detail-header-button">
        <el-button
          size="mini"
          icon="el-icon-setting"
          type="success"
          @click="commonSettings"
        >常用分类设置</el-button>
      </span>
    </div>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col v-if="oper==='add'" :span="5">
          <AssetsType ref="AssetsType" :clientHeight="clientHeight" @changeAssetsType="changeAssetsType" />
        </el-col>
        <el-col :span="oper==='add' ? 19 : 24">
          <el-tabs v-model="activeName">
            <el-tab-pane label="资产卡片" name="card">
              <div class="card-content" :style="`height: ${clientHeight-300}px;`">
                <CardInfo
                  :id="id"
                  ref="info"
                  :oper="oper"
                  :assetsTypeData="assetsTypeData"
                  :assetsType="assetsType"
                  @returnBack="returnBack"
                  @submitForm="submitForm"
                  @updata="updata"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="(oper==='edit' || oper==='info') && (info && info.stateDepreciation!=='不提折旧')" label="折旧信息" name="zj">
              <div class="card-content" :style="`height: ${clientHeight-300}px;`">
                <Depreciation ref="depreciation" :depreciation="depreciation" />
              </div>
            </el-tab-pane>
            <el-tab-pane v-if="oper==='info'" label="业务信息" name="yw">
              <div class="card-content" :style="`height: ${clientHeight-300}px;`">
                <el-table
                  :data="data"
                  element-loading-text="Loading"
                  stripe
                  fit
                  highlight-current-row
                  class="table-border"
                >
                  <el-table-column
                    label="资产编号"
                    align="center"
                    prop="onlyCode"
                    :show-overflow-tooltip="true"
                  />
                  <el-table-column
                    label="业务发生日期"
                    align="center"
                    prop="createTime"
                    :show-overflow-tooltip="true"
                  />
                  <el-table-column
                    label="版本号"
                    align="center"
                    prop="versionNumber"
                    :show-overflow-tooltip="true"
                  />
                  <el-table-column
                    label="操作类型"
                    align="center"
                  >
                    <template v-slot="scope">
                      {{ ['创建','字段更改','流程变更','销毁'][scope.row.type] }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    :width="95"
                  >
                    <template v-slot="scope">
                      <el-button
                        size="mini"
                        @click="handleInfo(scope.row)"
                      >
                        <em class="el-icon-info" /> 详情
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
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <CommonSettings ref="CommonSettings" @refresh="refresh" />
  </el-card>
</template>

<script>
import AssetsType from './components/assets-type'

import CardInfo from './info'// 卡片基础信息
import Depreciation from './depreciation'// 卡片折旧信息

import CommonSettings from './components/common-settings' // 常用分类
import { addAssetsCard,putAssetsCard,getoldCard } from '@/api/means/card'
import pagination from '@/components/Pagination'
export default {
  components: {
    AssetsType,
    CommonSettings,
    pagination,
    CardInfo,
    Depreciation
  },
  data() {
    return {
      dialogVisible: false,
      title:'资产卡片',
      filterText: '',
      treeData: [],
      currentPage:1,// 当前页码
      pageSize:20,// 每页大小
      total:0,// 数据总数
      activeName:'card',
      loading:false,
      info:{},
      clientHeight:document.body.clientHeight,
      assetsType: 0,
      assetsTypeData: {},
      financeData:{},
      id:0,
      yid:0,
      oper: '',
      data:[],
      depreciation:{
        type:1,
        cost:0,
        depreciationLife:0,
        zjPrice:0,
        zjMonth:0,
        dateOfFinancialEntry:''
      }
    }
  },
  async mounted() {
    const { id, oper } = this.$route.query
    this.oper = oper || 'add'
    this.id = Number(id)
  },
  methods: {
    refresh(){
      this.$refs.AssetsType.queryCommonUse()
    },
    // 更新数据
    updata(assetsType,assetsTypeData,depreciation,info,financeData){
      this.assetsTypeData = assetsTypeData
      this.depreciation = depreciation
      this.info = info
      this.financeData = financeData
      this.assetsType = assetsType
    },
    // 保存卡片信息
    async submitForm(postData) {
      this.$refs.info.loading = true
      const res = this.id ? await putAssetsCard(postData) : await addAssetsCard(postData)
      this.$refs.info.loading = false
      if (res.code==='0'){
        this.returnBack()
      }
    },
    // 左侧分类切换
    changeAssetsType(data){
      data.label = `${data.code} - ${data.name}`
      this.assetsType = data.type
      this.assetsTypeData = data
      this.info = {}
    },
    // 常用分类设置
    commonSettings(){
      this.$refs.CommonSettings.dialogVisible = true
    },
    // 返回
    returnBack() {
      if (this.oper==='yw'){
        this.oper = 'info'
        this.id = this.yid
        this.activeName = 'yw'
        this.queryAsetsCard()
      } else {
        this.$router.push({ path: '/asset/means/card' })
      }
    },
    // 查询业务列表
    queryToldCard(){
      getoldCard({
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        id:this.id
      }).then(res=>{
        if (res.code==='0'){
          this.data = res.data.records || []
          this.total = res.data.total || 0
        }
      })
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.queryToldCard()
    },
    handleInfo(item){
      this.oper = 'yw'
      this.yid = this.id
      this.id = item.id
      this.activeName = 'card'
      this.queryAsetsCard()
    }
  }
}
</script>

<style lang="scss" scoped>
#means-card-details {
    /deep/ .el-card__body {
        padding: 0;
    }

    /deep/ .el-divider--horizontal {
        margin: 10px 0;
    }

    /deep/ .app-container {
        padding: 10px;
    }

    .title {
        border-bottom: 2px solid #e4e7ed;
        line-height: 37px;
        color: #409eff;
    }

    .card-content {
        overflow-x: hidden;
        overflow-y: auto;
        margin-top: 5px;
        padding: 10px;
    }
}
</style>
