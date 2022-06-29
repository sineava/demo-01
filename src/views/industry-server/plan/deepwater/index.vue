<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>生产码头列表</span>
    </div>
    <el-row :gutter="20">
      <el-col
        v-if="areaList.length"
        :span="4"
        class="left"
        :style="`height: ${ clientHeight - 260}px;`"
      >
        <el-menu
          ref="menus"
          class="el-menu-vertical-demo menu"
          :collapse="false"
          :unique-opened="true"
          :default-openeds="openeds"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu
            v-for="(item, index) in areaList"
            :key="index"
            :index="'m_'+(index+1)"
          >
            <template v-slot:title>
              <i class="el-icon-location" />
              <span>{{ item.portName }}</span>
            </template>
            <el-submenu
              v-for="vo in item.portAreaVoList"
              :key="vo.id"
              :index="`${vo.id}`"
            >
              <template v-slot:title>
                <i class="el-icon-menu" />
                <span>{{ vo.portAreaName }}</span>
              </template>
              <template v-if="vo.businessDistrictVoList.length">
                <el-menu-item
                  v-for="ao in vo.businessDistrictVoList"
                  :key="ao.id"
                  :index="`${ao.id}`"
                >
                  {{ ao.name }}
                </el-menu-item>
              </template>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="areaList.length ? 20 : 24" class="left" :style="`height: ${ clientHeight - 260}px;`">
        <div class="app-container">
          <div class="container">
            <el-form
              ref="searchForm"
              class="form"
              :model="searchForm"
              :inline="true"
              size="small"
              label-width="80px"
            >
              <el-form-item
                label="码头名称:"
                prop="wharfName"
              >
                <el-input
                  v-model.trim="searchForm.wharfName"
                  placeholder="请输入码头名称"
                />
              </el-form-item>
              <el-form-item
                label="所在航道:"
                prop="channel"
              >
                <el-select
                  v-model="searchForm.channel"
                  clearable
                  placeholder="请选择所在航道"
                >
                  <el-option
                    v-for="item in channel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="submitForm('searchForm')"
                >
                  查询
                </el-button>
                <el-button
                  icon="el-icon-refresh-left"
                  @click="resetForm('searchForm')"
                >
                  重置
                </el-button>
              </el-form-item>
            </el-form>
            <div>
              <el-button
                v-if="button_roles.create"
                style="float: left; margin-right: 10px;"
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="handleEdit('add')"
              >
                新增生产码头
              </el-button>
              <DownUpload
                filename="码头信息导入模板.xlsx"
                :button_roles="button_roles"
                @uploadExcel="uploadExcel"
                @getExportData="getExportData"
              />
            </div>
            <el-table
              v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              stripe
              fit
              highlight-current-row
              class="table-border"
            >
              <el-table-column
                label="编号"
                width="55"
                align="center"
              >
                <template v-slot="scope">
                  {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="码头名称" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.wharfName }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="所在区域" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  <span>{{ scope.row.coastlineName }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="所在航道" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.channel && channel.filter(item => (item.value === scope.row.channel))[0].label }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="投产年份" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.productionYear }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="岸线长度（米）" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.shorelineLength }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="泊位数（个）" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.berthNum }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="设计靠泊能力（吨） " :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.berthingCapacity }}
                </template>
              </el-table-column>
              <!-- <el-table-column
                v-if="button_roles.berthinfo"
                align="center"
                label="泊位信息"
                width="120"
              >
                <template v-slot="scope">
                  <el-button
                    size="mini"
                    plain
                    @click="handleMoored(scope.row)"
                  >
                    <em class="el-icon-info" /> 泊位详情
                  </el-button>
                </template>
              </el-table-column> -->
              <el-table-column
                v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
                label="操作"
                align="center"
                :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
              >
                <template v-slot="scope">
                  <el-button
                    v-if="button_roles.desc"
                    size="mini"
                    plain
                    @click="handleEdit('detail', scope.row)"
                  >
                    <em class="el-icon-info" /> 详情
                  </el-button>
                  <el-button
                    v-if="button_roles.update"
                    size="mini"
                    type="primary"
                    plain
                    @click="handleEdit('edit', scope.row)"
                  >
                    <em class="el-icon-edit-outline" /> 编辑
                  </el-button>
                  <el-button
                    v-if="button_roles.delete"
                    size="mini"
                    type="danger"
                    plain
                    @click="handleDelete(scope.row)"
                  >
                    <em class="el-icon-delete" /> 删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <pagination
          :total="total"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          background
          @change="paginationChange"
        />
        <loading ref="load" />
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import DownUpload from '@/components/features/DownUpload'
import { shoreLine } from '@/utils/public-fields'
import { getArea, getPageList, deleteWharf, exportWharfInfo, bulkImport } from '@/api/port-services/coastline/wharf'
import pagination from '@/components/Pagination'
import loading from '@/components/loading'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    loading,
    DownUpload
  },
  mixins: [shoreLine],
  data() {
    return {
      current: 2,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      openeds:['m_1'],
      clientHeight:document.body.clientHeight,
      row: '',
      areaList: [], // 区域列表
      searchForm: {
        portAreaId: '',
        coastlineId: '',
        wharfName: '',
        channel: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchPortArea()
    this.fetchData()
  },
  methods: {
    handleSelect(key){
      this.searchForm.portAreaId = key[key.length-2]
      this.searchForm.coastlineId = key[key.length-1]
      this.currentPage = 1
      this.fetchData()
    },
    handleOpen(key){
      this.searchForm.portAreaId = key[key.length-1]
      this.searchForm.coastlineId = ''
      this.currentPage = 1
      this.fetchData()
    },
    handleClose(key,keyPath){
      if (key==='m_1'){
        this.$refs.menus.open(keyPath)
        this.searchForm.portAreaId = ''
        this.searchForm.coastlineId = ''
      } else {
        this.searchForm.portAreaId = ''
        this.searchForm.coastlineId = ''
      }
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询区域列表
     */
    async fetchPortArea() {
      getArea().then(res => {
        this.areaList = res.data ? res.data : []
      })
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    /**
     * 导入表格
     */
    async uploadExcel(formData, end) {
      const res = await bulkImport(formData)
      if (res.code === '0') {
        this.fetchData()
        this.$message.success('导入成功')
      }
      end() // 结束loading
    },
    /**
     * 获取导出数据
     */
    getExportData(cb) {
      const queryInfo = { ...this.searchForm }
      exportWharfInfo(queryInfo).then(res => {
        this.table = res.data ? res.data : []
        const header = {
          wharfName: '码头名称',
          coastlineName: '所在作业区域',
          channel: '所在航道',
          productionYear: '投产年份',
          shorelineLength: '岸线长度（米）',
          berthingCapacity: '设计靠泊能力（吨）',
          carryingCapacity: '通过能力（万吨）',
          utilizationStatus: '利用状况',
          planningPurposes: '规划用途'
        }
        const arr = [...this.table.map(x => ({
          wharfName: x.wharfName,
          coastlineName: x.coastlineName,
          channel: x.channel ? this.channel.find(y => (y.value === x.channel)).label : '',
          productionYear: x.productionYear,
          shorelineLength: x.shorelineLength,
          berthingCapacity: x.berthingCapacity,
          carryingCapacity: x.carryingCapacity,
          utilizationStatus: x.utilizationStatus,
          planningPurposes: x.planningPurposes
        }))]
        arr.unshift(header)
        cb({ data: [...arr], title: '码头信息' })
      })
    },
    /**
     * 查询
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.currentPage = 1
          this.fetchData()
        } else {

          return false
        }
      })
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.searchForm.portAreaId = ''
      this.searchForm.coastlineId = ''
      this.$refs.menus.activeIndex = null
      this.currentPage = 1
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
     * 新增/编辑/详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/plan/deepwaterEdit', query: { type, id: item?.id, channel: item?.channel }})
    },
    /**
     * 删除
     */
    handleDelete({ id }) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteWharf({ id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    // 泊位详情
    handleMoored(item) {
      this.$router.push({ path: '/plan/deepwaterMoor', query: { wharfId: item.id, wharfName: item.wharfName, coastlineName: item.coastlineName }})
    }
  }
}
</script>

<style  lang="scss" scoped>
.left::-webkit-scrollbar {
    display: none;
}

.left {
    overflow-y: auto;

    .el-menu-item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.el-menu {
    border-top: solid 1px #e6e6e6;
    border-left: solid 1px #e6e6e6;
}

.menu {
    .el-menu-item.is-active {
        color: #ffffff;
        background: #409eff;
    }

    .el-submenu .el-menu-item {
        min-width: auto;
    }

    /deep/ .el-submenu__title {
        border-bottom: 1px solid #e6e6e6;
    }
}
</style>
