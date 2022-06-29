<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>危险货物集中区域风险研判分析</span>
      <div style="display: inline-block; float: right;">
        <el-radio-group v-model="selected" size="small" @change="changeType">
          <el-radio-button :label="1">风险研判</el-radio-button>
          <el-radio-button :label="2">研判分析</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="body-container">
      <div class="city-list">
        <div class="title">
          安全形式区域
        </div>
        <div
          v-for="(item, index) in zoneList"
          :key="index"
          :class="['list-view', item.id === active ? 'active' : '']"
          @click="showDetail(item.id, item.isCounty === 0)"
        >
          {{ item.areaName }}
        </div>
      </div>
      <div v-if="show" class="content">
        <div style="display: flex;">
          <el-card style="flex: 1;">
            <div slot="header" class="clearfix">
              {{ info.riskAreaName }}
            </div>
            <el-row :gutter="20" style="line-height: 30px;">
              <el-col :span="8">
                 当前风险等级：
                <!-- <el-tag style="color: #ffffff;" :color="color[['高风险','较高风险','一般风险','较低风险','低风险'].indexOf(info.gradeName)]">{{ info.gradeName }}</el-tag> -->
                <el-tag :style="`${getLevelNameToColor(1,info.gradeName) ? 'color: #ffffff;' : ''}`" :color="getLevelNameToColor(1,info.gradeName)">{{ info.gradeName }}</el-tag>
              </el-col>
              <el-col :span="8">
                风险值：{{ info.riskValue || '' }}
              </el-col>
              <el-col :span="8">
                评估时间：{{ `${info.appraisalYear || ''}年 ${info.appraisalQuarter ? ['第一季度','第二季度','第三季度','第四季度'][info.appraisalQuarter - 1] : ''}` }}
              </el-col>
            </el-row>
            <div style="line-height: 32px;">
              <div>分析指标：</div>
              <Charts style="height: 360px;" :option="barOption" />
            </div>
          </el-card>
          <el-card style="margin-left: 10px; width: 550px;">
            <div slot="header" class="clearfix">
              <span>重庆市风险形势</span>
            </div>
            <Charts :map="registerMap" :option="mapOption" />
          </el-card>
        </div>
        <el-card style="margin: 10px 0;">
          <div slot="header" class="clearfix">
            <span>风险趋势</span>
          </div>
          <Charts style="height: 300px;" :option="lineOption" />
        </el-card>
        <div style="margin-top: 20px;">
          <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            size="small"
          >
            <el-form-item
              label="年份:"
              prop="appraisalYear"
            >
              <el-date-picker
                v-model="searchForm.appraisalYear"
                value-format="yyyy"
                type="year"
                style="width: 100%;"
                placeholder="请选择年份"
              />
            </el-form-item>
            <el-form-item
              label="季度:"
              prop="appraisalQuarter"
              placeholder="请选择季度"
            >
              <el-select
                v-model="searchForm.appraisalQuarter"
                clearable
                placeholder="请选择"
              >
                <el-option label="第一季度" :value="1" />
                <el-option label="第二季度" :value="2" />
                <el-option label="第三季度" :value="3" />
                <el-option label="第四季度" :value="4" />
              </el-select>
            </el-form-item>
            <el-form-item
              label="风险等级:"
              prop="level"
              placeholder="请选择风险等级"
            >
              <el-select
                v-model="searchForm.level"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in levels"
                  :key="item.riskGrade"
                  :label="item.gradeName"
                  :value="item.riskGrade"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="评估时间:"
              placeholder="请选择评估时间"
            >
              <el-date-picker
                v-model="screenTime"
                type="daterange"
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
                @click="resetForm"
              >
                重置
              </el-button>
            </el-form-item>
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
            <el-table-column
              label="序号"
              width="65"
            >
              <template v-slot="scope">
                {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              label="年份"
              prop="appraisalYear"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="季度"
              :show-overflow-tooltip="true"
            >
              <template v-slot="scope">
                {{ scope.row.appraisalQuarter && ['第一季度','第二季度','第三季度','第四季度'][scope.row.appraisalQuarter - 1] }}
              </template>
            </el-table-column>
            <el-table-column
              label="等级"
              prop="gradeName"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="风险值"
              prop="riskValue"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="评估时间"
              prop="updateTime"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              v-if="button_roles.update || button_roles.delete || button_roles.desc"
              label="操作"
              :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
            >
              <template v-slot="scope">
                <el-button
                  v-if="button_roles.desc"
                  size="mini"
                  plain
                  @click="handleDetail(scope.row,true)"
                >
                  <em class="el-icon-info" /> 详情
                </el-button>
                <el-button
                  v-if="button_roles.update"
                  size="mini"
                  type="primary"
                  @click="handleDetail(scope.row)"
                >
                  <em class="el-icon-info" /> 编辑
                </el-button>
                <el-button
                  v-if="button_roles.delete"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
                >
                  <em class="el-icon-info" /> 删除
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
      </div>
      <div v-else style="width: 100%;">
        <el-card style="margin: 0 10px; width: 100%;">
          <el-empty description="尚未评估" />
        </el-card>
      </div>
    </div>
  </el-card>
</template>
<script>
import { momentDate } from '@/utils/index'
import { Bar, MapChart } from '@/utils/charts-basic-options'
import { currentData, riskData, trendData, getList, del } from '@/api/analysis-model/centralized-area'
import { getZoneList } from '@/api/analysis-model/risk-area'
import { getList as getLevel } from '@/api/analysis-model/risk-threshold'
import Charts from '@/components/Charts/index.vue'
import chongqingMap from "@/utils/chongqingMap.json"
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { getLevelNameToColor } from '@/utils/config'
export default {
  components: {
    Charts,
    pagination
  },
  data() {
    return {
      active: '',
      id: null,
      show: false,
      timeList: [],
      selected:2,
      searchForm: {
        appraisalYear: '',
        appraisalQuarter: '',
        riskThresholdId: ''
      },
      screenTime: [],
      list:[],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      zoneList: [],
      info: {},
      barOption: {},
      mapOption: {},
      lineOption: {},
      levels: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ]),
    registerMap() {
      return chongqingMap
    }
  },
  created() {
    this.fetchZoneList()
    this.fetchLevel()
  },
  methods: {
    getLevelNameToColor,
    changeType(e){
      this.$router.push({ path: '/safety-analysis-model/concentrated-area/judge'})
    },
    // 查询风险等级列表
    async fetchLevel() {
      this.levels = (await getLevel(3)).data
    },
    async fetchZoneList() {
      // 辖区水上交通安全形式分析
      this.zoneList = (await getZoneList(3)).data || []
      if (this.zoneList.length>0){
        this.showDetail(this.zoneList[0].id, this.zoneList[0].isCounty === 0)
      }
    },
    // 重置查询条件
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.screenTime = []
      this.fetchData()
    },
    async fetchData() {
      const [beginTime, endTime] = this.screenTime || []
      // 选择了季度必须选择年
      if (this.searchForm.appraisalQuarter) {
        if (!this.searchForm.appraisalYear) {
          this.$message.warning('请选择年份再查询')
          return
        }
      }
      this.listLoading = true
      const res = await getList({
        ...this.searchForm,
        appraisalYear: `${momentDate(this.searchForm.appraisalYear, 'YYYY')}`,
        riskAreaId: this.id,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        beginTime: momentDate(beginTime),
        endTime: momentDate(endTime)
      })
      this.list = res.data.records || []
      this.total =res.data.total
      this.listLoading = false
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 删除
     */
    handleDelete(item){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        del(item.id).then(res=>{
          if (res.code==='0'){
            this.$message.success('删除成功')
            this.showDetail(this.active, this.totals)
          }
        })
      }).catch(err => err)
    },
    /**
     * 详情/编辑
     */
    handleDetail(item,isDetail) {
      this.$router.push({ path: '/safety-analysis-model/concentrated-area/judge', query: { id: item.id ,isDetail:isDetail}})
    },
    /**
     * 获取全部风险评估信息
     */
    async getAllRiskData(){
      const resData = (await riskData()).data || []
      const arr = []
      resData.forEach(x=>{
        const value = x.controlLevelColour
        if (x.status===1 && x.riskAreas && x.riskAreas.length>0){
          x.riskAreas.forEach(y => {
            arr.push({ name: y.administrativeDivisionName, value:value })
          })
        }
      })
      return arr
    },
    // 显示详情(total为true(整体),false(各区划))
    showDetail(id, total) {
      this.active = id
      this.id = id
      this.totals = total
      currentData(id).then(async res => {
        if (res.code === '0' && res.data) {
          this.show = true
          this.info = {
            ...res.data
          }
          const option = res.data && res.data.indicatorDataList ? res.data.indicatorDataList : []
          let yData = []
          let xData = []
          option.forEach(item=>{
            yData.push(item.weightedScoring)
            xData.push(item.indicatorName)
          })
          this.barOption = new Bar(xData, yData,{
            top: '10',
            left: '4%',
            right: '4%',
            bottom: '4%',
            containLabel: true
          },xData.length>10 ? 90 : 0).option
          let arr = []
          if (this.totals) {
            arr = await this.getAllRiskData()
            this.mapOption = new MapChart([...arr]).option
          } else {
            if (res.data.riskAreas){
              res.data.riskAreas.forEach(y => {
                arr.push({ name: y.administrativeDivisionName, value:['高风险','较高风险','一般风险','较低风险','低风险'].indexOf(this.info.gradeName) + 1})
              })
            }
          }
          const trend = (await trendData(id)).data
          this.lineOption = new Bar(trend.map(x => `${x.appraisalYear}年 ${['第一季度','第二季度','第三季度','第四季度'][x.appraisalQuarter - 1]}`), trend.map(x => x.riskValue)).option
          // 请求列表数据
          this.fetchData()
        } else {
          this.show = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.body-container {
    display: flex;

    .city-list {
        margin-right: 10px;
        border: 1px solid rgba(215, 215, 215, 1);
        border-radius: 4px;
        width: 220px;
        height: auto;
        min-height: 90vh;
        cursor: pointer;

        .title {
            padding-left: 15px;
            height: 60px;
            font-weight: bold;
            line-height: 60px;
            background-color: #f2f2f2;
        }

        .list-view {
            border-bottom: 1px solid #f2f2f2;
            padding-left: 15px;
            height: 48px;
            line-height: 48px;

            &.active {
                color: #ffffff;
                background-color: #007aff;
            }
        }
    }

    .content {
        flex: 1;
    }
}
</style>
