<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑港口岸线规划表' : type === 'add' ? '新增港口岸线规划表' : '港口岸线规划详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="160px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
        <el-form-item
          label="岸线规划名称:"
          prop="coastlineName"
        >
          <el-input v-model.trim="ruleForm.coastlineName" />
        </el-form-item>
        <el-form-item
          label="所在区域:"
          prop="portAreaId"
        >
          <el-select
            v-model="ruleForm.portAreaId"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in portAreaVoList"
              :key="item.id"
              :label="item.portAreaName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="岸线起迄点（千米）:"
          prop="coastLinePoint"
        >
          <el-input v-model.trim="ruleForm.coastLinePoint" />
        </el-form-item>
        <el-form-item
          label="所在航道:"
          prop="channel"
        >
          <el-select
            v-model="ruleForm.channel"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in channel"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="岸别:"
          prop="type"
        >
          <el-select
            v-model="ruleForm.type"
            clearable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              :value="1"
              label="左"
            />
            <el-option
              :value="2"
              label="右"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="规划港口岸线长度（米）合计:"
          prop="totalLength"
        >
          <el-input-number
            v-model="ruleForm.totalLength"
            :precision="2"
            :min="0"
            :max="99999999.99"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="规划港口岸线长度（米）已开发利用:"
          prop="usingLength"
        >
          <el-input-number
            v-model="ruleForm.usingLength"
            :precision="2"
            :min="0"
            :max="99999999.99"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="规划港口岸线长度（米）规划利用:"
          prop="planningLength"
        >
          <el-input-number
            v-model="ruleForm.planningLength"
            :precision="2"
            :min="0"
            :max="99999999.99"
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
          label="备注:"
          prop="remarks"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.remarks"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
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
            :disabled="type === 'detail'"
            @update="updateTableData"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        @click="handlePost"
      >
        保存
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { shoreLine } from '@/utils/public-fields'
import MapLine from '@/components/features/MapLine'
import { getPortArea, addLine, getDetail, updateCoastLine } from '@/api/port-services/coastline/coastline-planning'
export default {
  components: {
    MapLine
  },
  mixins: [shoreLine],
  data() {
    return {
      type: '',
      ruleForm: {
        channel: '',
        coastLinePoint: undefined,
        coastalPlanningCoordinatesDtoList: [],
        coastlineName: '',
        id: null,
        planningLength: undefined,
        planningPurposes: '',
        portAreaId: '',
        portId: '',
        remarks: '',
        totalLength: undefined,
        type: '',
        usingLength: undefined,
        utilizationStatus: ''
      },
      portAreaVoList: [],
      rules: {
        coastlineName: [
          { required: true, message: '请输入岸线规划名称', trigger: 'blur' }
        ],
        portAreaId: [
          { required: true, message: '请选择所在区域', trigger: 'blur' }
        ],
        coastLinePoint: [
          { required: true, message: '请输入岸线起迄点', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择所在航道', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择岸别', trigger: 'blur' }
        ],
        totalLength: [
          { required: true, message: '请输入规划港口岸线长度（米）合计', trigger: 'blur' }
        ],
        usingLength: [
          { required: true, message: '请输入规划港口岸线长度（米）已开发利用', trigger: 'blur' }
        ],
        planningLength: [
          { required: true, message: '请输入规划港口岸线长度（米）规划利用', trigger: 'blur' }
        ],
        utilizationStatus: [
          { required: true, message: '请输入利用状况', trigger: 'blur' }
        ],
        planningPurposes: [
          { required: true, message: '请输入规划用途', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  created() {
    this.fetchPort()
    const { id, type } = this.$route.query
    this.type = type
    if (id) { // 编辑/详情
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询港区信息
    async fetchPort() {
      getPortArea().then(res => {
        if (res.data) {
          this.ruleForm.portId = res.data[0].id
          this.portAreaVoList = res.data ? res.data[0].portAreaVoList : []
        }
      })
    },
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          coastalPlanningCoordinatesDtoList: res.data.coastalPlanningCoordinatesVoList
        }
        this.tableData = [...this.ruleForm.coastalPlanningCoordinatesDtoList]
        delete this.ruleForm.coastalPlanningCoordinatesVoList
        this.$refs.Tianditu.drawMap(this.tableData)
      })
    },
    // 提交
    handlePost() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存
    async saveData() {
      const coastlinePlanningDto = {
        ...this.ruleForm,
        coastalPlanningCoordinatesDtoList: [...this.tableData]
      }
      const res = this.ruleForm.id ? await updateCoastLine(coastlinePlanningDto) : await addLine(coastlinePlanningDto)
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    // 更新tableData
    updateTableData(data) {
      this.tableData = data.map(({ lng, lat }, index) => ({ longitude: lng, latitude: lat, pointer: index }))
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
