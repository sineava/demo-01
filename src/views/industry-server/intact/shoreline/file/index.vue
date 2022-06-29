<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口规划文件查询</span>
    </div>

    <el-row :gutter="20">
      <div class="app-container">
        <el-col :span="4">
          <el-menu
            v-if="areaList.length"
            ref="menus"
            :class="`el-menu-vertical-demo menu ${searchForm.portAreaId === '' ? 'isAction' : ''}`"
            :collapse="false"
            :default-openeds="['1']"
            :default-active="$route.path"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template v-slot:title>
                <span>{{ areaList[0].portName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="vo in areaList[0].portAreaVoList"
                  :key="vo.id"
                  :class="searchForm.portAreaId===vo.id ? 'isAction' : ''"
                  @click.native="handleClick(vo.id,vo.portAreaName)"
                >
                  {{ vo.portAreaName }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <el-form
            ref="searchForm"
            class="form"
            :model="searchForm"
            :inline="true"
            size="small"
          >
            <el-form-item
              label="岸线名称:"
              prop="coastlineName"
            >
              <el-input
                v-model="searchForm.coastlineName"
                clearable
                placeholder="请输入岸线名称"
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
            <el-form-item
              label="所在港区名称:"
              prop="portAreaName"
            >
              <el-input
                v-model.trim="searchForm.portAreaName"
                placeholder="请输入所在港区名称"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="岸别:"
              prop="type"
            >
              <el-select
                v-model="searchForm.type"
                clearable
                placeholder="请选择岸别"
              >
                <el-option
                  label="左"
                  :value="1"
                />
                <el-option
                  label="右"
                  :value="2"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="利用状况:"
              prop="utilizationStatus"
            >
              <el-input
                v-model.trim="searchForm.utilizationStatus"
                placeholder="请输入利用状况"
              />
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
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            stripe
            fit
            highlight-current-row
            max-height="660"
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
            <el-table-column label="岸线名称" prop="coastlineName" :show-overflow-tooltip="true" />
            <el-table-column label="所在港口名称" prop="portName" :show-overflow-tooltip="true" />
            <el-table-column label="所在港区名称" prop="portAreaName" :show-overflow-tooltip="true" />
            <el-table-column label="所在航道" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.channel && channel.filter(item => (item.value === scope.row.channel))[0].label }}
              </template>
            </el-table-column>
            <el-table-column label="岸别" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.type === 1 ? '左' : '右' }}
              </template>
            </el-table-column>
            <el-table-column
              label="规划港口岸线长度（米）"
              align="center"
              :show-overflow-tooltip="true"
            >
              <el-table-column label="合计" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.totalLength }}
                </template>
              </el-table-column>
              <el-table-column label="已开发利用 " :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.usingLength && scope.row.usingLength + '米' }}
                </template>
              </el-table-column>
              <el-table-column label="规划利用" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.planningLength && scope.row.planningLength + '米' }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="利用状况" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.utilizationStatus && scope.row.utilizationStatus.length > 20 ? scope.row.utilizationStatus.slice(0, 20) + '...' : scope.row.utilizationStatus }}
              </template>
            </el-table-column>
            <el-table-column label="规划用途" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.planningPurposes && scope.row.planningPurposes.length > 20 ? scope.row.planningPurposes.slice(0, 20) + '...' : scope.row.planningPurposes }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100"
            >
              <template v-slot="scope">
                <el-button
                  size="mini"
                  plain
                  @click="handleEdit('detail', scope.row)"
                >
                  <em class="el-icon-info" />详情
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
        </el-col>
      </div>
    </el-row>
  </el-card>
</template>
<script>
import { shoreLine } from '@/utils/public-fields'
import { getPortArea, getInPageList } from '@/api/port-services/coastline/coastline-planning'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination
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
      row: '',
      areaList: [], // 区域列表
      searchForm: {
        coastlineName: '',
        portAreaId:'',
        portName: '',
        portAreaName: '',
        channel: '',
        type: '',
        utilizationStatus: ''
      }
    }
  },
  created() {
    this.fetchPortArea()
    this.fetchData()
  },
  methods: {
    handleClose(key, keyPath) {
      this.$refs.menus.open(keyPath)
      this.searchForm.portAreaId = ''
      this.searchForm.portAreaName = ''
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 查询区域列表
     */
    async fetchPortArea() {
      getPortArea().then(res => {
        this.areaList = res.data ? res.data : []
      })
    },
    fetchData() {
      this.listLoading = true
      getInPageList({
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm() {
      this.currentPage = 1
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(type, item) {
      this.$router.push({ path: '/intact/shoreline/file/edit', query: { type, id: item ? item.id : null }})
    },
    handleClick(val,name) {
      this.searchForm.portAreaId = val
      this.searchForm.portAreaName = name
      this.currentPage = 1
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
    display: flex;

    .menu {
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
        height: 800px;
    }

    .isAction {
        /deep/ .el-submenu__title:hover {
            color: #ffffff;
            background: #409eff;
        }

        color: #ffffff;
        background: #409eff;

        /deep/ .el-submenu__title {
            span,i {
                color: #ffffff;
            }
        }
    }
}
</style>
