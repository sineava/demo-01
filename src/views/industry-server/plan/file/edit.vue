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
        label-position="top"
      >
        <el-form-item
          label="岸线规划名称:"
          prop="coastlineName"
        >
          <el-input v-model.trim="ruleForm.coastlineName" placeholder="请输入岸线规划名称" maxlength="100" />
        </el-form-item>
        <el-form-item
          label="所在区域:"
          prop="portAreaId"
        >
          <el-cascader
            v-model="ruleForm.portAreaId"
            :options="portAreaVoList"
            :props="{ expandTrigger: 'hover' }"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="岸线起迄点（千米）:"
          prop="coastLinePoint"
        >
          <el-input v-model.trim="ruleForm.coastLinePoint" placeholder="请输入岸线起迄点" maxlength="500" />
        </el-form-item>
        <el-form-item
          label="所在航道:"
          prop="channel"
        >
          <el-select
            v-model="ruleForm.channel"
            clearable
            placeholder="请选择所在航道"
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
            placeholder="请选择岸别"
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
            placeholder="请输入规划港口岸线长度（米）合计"
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
            placeholder="请输入规划港口岸线长度（米）已开发利用"
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
            placeholder="请输入规划港口岸线长度（米）规划利用"
          />
        </el-form-item>
        <el-form-item
          label="利用状况:"
          prop="utilizationStatus"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.utilizationStatus"
            placeholder="请输入利用状况"
            type="textarea"
            rows="6"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="规划用途:"
          prop="planningPurposes"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.planningPurposes"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入规划用途"
            show-word-limit
          />
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
            placeholder="请输入备注"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="添加矢量图形（请在地图上进行标注选择）:"
          style="width: 100%;"
        >
          <Maptable
            ref="businessBaseMap"
            :is-edit="type === 'edit' ? true : type === 'add' ? true : false"
            @change="confirmMap"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        :loading="loading"
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
import { getPortArea, addLine, getDetail, updateCoastLine } from '@/api/port-services/coastline/coastline-planning'
import Maptable from '@/components/Maptable/index'
export default {
  components: {
    Maptable
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
      portAreaId:'',
      portAreaVoList: [],
      loading: false,
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
    const { id, type } = this.$route.query
    this.type = type
    if (id) { // 编辑/详情
      this.fetchDetail(id)
    } else {
      this.fetchPort()
    }
  },
  methods: {
    // 查询港区信息
    async fetchPort() {
      getPortArea().then(res => {
        if (res.data) {
          const voList = []
          res.data.forEach(element => {
            const items = []
            element.portAreaVoList.forEach(item=>{
              if (item.id===this.portAreaId){
                this.ruleForm.portAreaId = [element.id,item.id]
              }
              items.push({value:item.id,label:item.portAreaName})
            })
            if (items.length>0){
              voList.push({value:element.id,label:element.portName,children:items})
            }
          })
          this.portAreaVoList = voList
        }
      })
    },
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.tableData = val
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
        this.portAreaId = res.data.portAreaId
        this.fetchPort()
        this.$nextTick(() => {
          this.$refs.businessBaseMap.init(this.tableData)
        })
        // this.$refs.Tianditu.drawMap(this.tableData)
      })
    },
    // 提交
    handlePost() {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 保存
    async saveData() {
      if (!this.tableData.length) {
        this.$message.warning('请添加矢量图形')
        return
      }
      this.tableData.forEach((item,index)=>{
        this.tableData[index].pointer = index+1
      })
      if (typeof(this.ruleForm.portAreaId)==='object'){
        this.ruleForm.portId = this.ruleForm.portAreaId[0]
      } else {
        this.ruleForm.portId = this.ruleForm.portAreaId
      }
      const coastlinePlanningDto = {
        ...this.ruleForm,
        coastalPlanningCoordinatesDtoList: [...this.tableData],
        portAreaId: typeof(this.ruleForm.portAreaId)==='object' ? this.ruleForm.portAreaId[1] : this.ruleForm.portAreaId
      }
      this.loading = true
      const res = this.ruleForm.id ? await updateCoastLine(coastlinePlanningDto) : await addLine(coastlinePlanningDto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/plan/file' })
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
<style lang="scss" scoped>
.el-form--label-top .el-form-item {
    padding: 10px 10px 10px 0;
}
</style>
