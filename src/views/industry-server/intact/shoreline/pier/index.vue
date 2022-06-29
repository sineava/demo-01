<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>生产码头列表</span>
    </div>
    <el-row :gutter="20">
      <div class="app-container">
        <el-col :span="4">
          <div
            v-if="areaList.length"
            class="menu"
          >
            <el-menu
              class="el-menu-vertical-demo menu"
              :collapse="false"
              :default-openeds="['1']"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template v-slot:title>
                  <span>{{ areaList[0].portName }}</span>
                </template>
                <el-submenu
                  v-for="vo in areaList[0].portAreaVoList"
                  :key="vo.id"
                  :index="`${vo.id}`"
                >
                  <template v-slot:title>
                    <span>{{ vo.portAreaName }}</span>
                  </template>
                  <template v-if="vo.businessDistrictVoList.length">
                    <el-menu-item
                      v-for="ao in vo.businessDistrictVoList"
                      :key="ao.id"
                      :class="searchForm.coastlineId===ao.id ? 'isAction' : ''"
                      :index="`${ao.id}`"
                      @click="handleClick(ao.id,ao.name)"
                    >
                      {{ ao.name }}
                    </el-menu-item>
                  </template>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="20">
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
            <el-form-item
              label="投产年份"
              prop="productionYear"
              class="aaa"
            >
              <el-date-picker
                v-model="searchForm.productionYear"
                type="year"
                value-format="yyyy"
                style="width: 100%;"
                placeholder="请选择投产年份"
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
            max-height="690"
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
            <el-table-column label="码头名称" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.wharfName }}
              </template>
            </el-table-column>
            <el-table-column label="所在区域" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <span>{{ scope.row.coastlineName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所在航道" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.channel && channel.find(item => (item.value === scope.row.channel)).label }}
              </template>
            </el-table-column>
            <el-table-column label="投产年份" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.productionYear }}
              </template>
            </el-table-column>
            <el-table-column label="岸线长度（米）" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.shorelineLength }}
              </template>
            </el-table-column>
            <el-table-column label="泊位数（个）" :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.berthNum }}
              </template>
            </el-table-column>
            <el-table-column label="设计靠泊能力（吨） " :show-overflow-tooltip="true">
              <template v-slot="scope">
                {{ scope.row.berthingCapacity }}
              </template>
            </el-table-column>
            <el-table-column label="泊位信息" width="120" :show-overflow-tooltip="true">
              <template v-slot="scope">
                <el-button
                  size="mini"
                  plain
                  @click="handleMoored(scope.row)"
                >
                  <em class="el-icon-info" /> 泊位详情
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template v-slot="scope">
                <el-button
                  size="mini"
                  plain
                  @click="handleEdit('detail', scope.row)"
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
        </el-col>
      </div>
    </el-row>
    <loading ref="load" />
  </el-card>
</template>
<script>
import { shoreLine } from '@/utils/public-fields'
import { getArea, getInPageList } from '@/api/port-services/coastline/wharf'
import pagination from '@/components/Pagination'
import loading from '@/components/loading'
export default {
  components: {
    pagination,
    loading
  },
  mixins: [shoreLine],
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      row: '',
      areaList: [],
      searchForm: {
        wharfName: '',
        coastlineId:'',
        coastlineName: '',
        channel: '',
        productionYear: ''
      }
    }
  },
  created() {
    this.fetchPortArea()
    this.fetchData()
  },
  methods: {
    handleClose(key, keyPath) {
      if (this.searchForm.coastlineId){
        this.searchForm.coastlineId = ''
        this.searchForm.coastlineName = ''
        this.currentPage = 1
        this.fetchData()
      }
    },
    // 查询区域列表
    async fetchPortArea() {
      getArea().then(res => {
        this.areaList = res.data ? res.data : []
      })
    },
    // 查询列表数据
    fetchData() {
      this.listLoading = true
      const { productionYear } = this.searchForm
      getInPageList({
        ...this.searchForm,
        productionYear: productionYear ? Number(productionYear) : null,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    submitForm() {
      this.fetchData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(type, item) {
      this.$router.push({ path: '/intact/shoreline/pier/edit', query: { type, id: item ? item.id : null, channel: item ? item.channel : '' }})
    },
    // 菜单点击
    handleClick(id, name) {
      if (id!==this.searchForm.coastlineId){
        this.searchForm.coastlineId = id
        this.searchForm.coastlineName = name
        this.currentPage = 1
        this.fetchData()
      }
    },
    // 泊位详情
    handleMoored(item) {
      this.$router.push({ path: '/intact/shoreline/pier/moor', query: { wharfId: item.id, wharfName: item.wharfName, coastlineName: item.coastlineName }})
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
