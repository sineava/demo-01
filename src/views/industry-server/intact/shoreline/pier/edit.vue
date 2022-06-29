<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type === 'edit' ? '编辑生产码头' : type === 'add' ? '新增生产码头' : '生产码头详情' }}</span>
    </div>
    <div class="basic-detail base-ruleForm">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="160px"
        size="medium"
        class="table-column three"
        disabled
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />码头基本信息
          </div>
        </el-form-item>
        <el-form-item
          label="码头名称:"
          prop="wharfName"
        >
          <el-input v-model.trim="ruleForm.wharfName" />
        </el-form-item>
        <el-form-item
          label="所在区域:"
          prop="coastlineId"
        >
          <el-cascader
            ref="cascader"
            v-model="ruleForm.coastlineId"
            :options="portAreaVoList"
            :show-all-levels="false"
            :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'name', value: 'id', children: 'businessDistrictVoList' }"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="所在航道:" prop="channel">
          <el-select
            v-model="ruleForm.channel"
            clearable
            placeholder="请选择所在航道"
            style="width: 100%;"
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
          label="投产年份:"
          prop="productionYear"
        >
          <el-date-picker
            v-model="ruleForm.productionYear"
            type="year"
            placeholder="投产年份"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="岸线长度（米）:"
          prop="shorelineLength"
        >
          <el-input-number
            v-model="ruleForm.shorelineLength"
            :precision="2"
            :min="0"
            :max="99999999.99"
            :controls="false"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="设计靠泊能力（吨）:"
          prop="berthingCapacity"
        >
          <el-input-number
            v-model="ruleForm.berthingCapacity"
            :precision="2"
            :min="0"
            :max="99999999.99"
            :controls="false"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="通过能力（万吨）:"
          prop="carryingCapacity"
        >
          <el-input-number
            v-model="ruleForm.carryingCapacity"
            :precision="2"
            :min="0"
            :max="99999999.99"
            :controls="false"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="利用状况:"
          prop="utilizationStatus"
        >
          <el-input v-model.trim="ruleForm.utilizationStatus" />
        </el-form-item>
        <el-form-item
          label="规划用途:"
          prop="planningPurposes"
        >
          <el-input v-model.trim="ruleForm.planningPurposes" />
        </el-form-item>
        <el-form-item
          label="经纬度信息:"
          style="width: 100%;"
        >
          <el-table
            :data="tableData"
            :header-cell-style="{ backgroundColor: '#F2F2F2' }"
            border
          >
            <el-table-column
              prop="pointer"
              label="点位序号"
              align="center"
              width="110"
            />
            <el-table-column
              prop="longitude"
              label="经度"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.longitude && transformDMS(scope.row.longitude, 'lng') }}
              </template>
            </el-table-column>
            <el-table-column
              prop="latitude"
              label="纬度"
              align="center"
            >
              <template v-slot="scope">
                {{ scope.row.latitude && transformDMS(scope.row.latitude, 'lat') }}
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item
          label="添加矢量图形:"
          style="width: 100%;"
        >
          <MapLine
            ref="Tianditu"
            :points="tableData"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="$router.back(-1)"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { shoreLine } from '@/utils/public-fields'
import MapLine from '@/components/features/MapLine'
import { getArea, getDetail } from '@/api/port-services/coastline/wharf'
export default {
  components: {
    MapLine
  },
  mixins: [shoreLine],
  data() {
    return {
      type: '',
      ruleForm: {},
      portAreaVoList: [],
      tableData: []
    }
  },
  created() {
    this.fetchPort()
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchDetail(id)
  },
  methods: {
    // 查询港区信息
    async fetchPort() {
      getArea().then(res => {
        if (res.data) {
          this.ruleForm.portId = res.data[0].id
          this.portAreaVoList = res.data ? res.data[0].portAreaVoList.map(item => ({
            ...item,
            name: item.portAreaName,
            businessDistrictVoList: item.businessDistrictVoList.map(x => ({ ...x }))
          })) : []
        }
      })
    },
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          wharfCoordinatesDtoList: res.data.wharfCoordinatesVoList
        }
        this.tableData = [...this.ruleForm.wharfCoordinatesDtoList]
        delete this.ruleForm.wharfCoordinatesVoList
        this.$refs.Tianditu.drawMap(this.tableData)
      })
    },
    /**
     * 经纬度转换(度转度分秒)
     * @direction lon || lat
     */
    transformDMS(degree, direction) {
      let D = plusZeroAtHead(Math.floor(degree))
      let M = plusZeroAtHead(Math.floor((degree - D) * 60))
      let S = plusZeroAtHead(Math.floor(((degree - D) * 60 - M) * 60))
      let result = D + '°' + M + '′' + S + '″'

      // 如果是个位数， 则在首位加 0
      function plusZeroAtHead(num) {
        if (num > -10 && num < 0) {
          num = '-0' + Math.abs(num)
        }
        if (num > 0 && num < 10) {
          return '0' + num
        }
        return num
      }

      if (direction === 'lng') {
        D > 0 ? result += 'E' : result += 'W'
        return result
      }
      if (direction === 'lat') {
        D > 0 ? result += 'N' : result += 'S'
        return result
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.base-ruleForm {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }
}
</style>
