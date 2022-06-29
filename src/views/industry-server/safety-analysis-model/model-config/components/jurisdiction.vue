<template>
  <div class="container" style="display: flex;">
    <el-card class="left-wrapper" style="min-width: 300px; height: auto; min-height: 80vh;">
      <div slot="header" class="clearfix">
        辖区
        <div class="btns-wrapper" style="float: right;">
          <el-button type="primary" size="mini" @click="addArea">
            添加辖区
          </el-button>
        </div>
      </div>
      <div
        v-for="(item, index) in areaList"
        :key="index"
        :class="['list-view', item.id === activeId ? 'active' : '']"
        @click="nodeClick({ id: item.id })"
      >
        {{ item.areaName }}
      </div>
    </el-card>
    <el-card v-if="show" class="right-wrapper" style="flex: 1; margin-left: 10px;">
      <div slot="header" class="clearfix">
        {{ type === 'add' ? '添加辖区' : type === 'edit' ? '编辑辖区' : '辖区详情' }}
        <div v-if="type !== 'add'" class="btn-wrapper" style="float: right;">
          <el-button type="primary" size="mini" @click="handleStatus">
            {{ type === 'edit' ? '详情' : '编辑' }}
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete">
            删除
          </el-button>
        </div>
      </div>
      <div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="type === 'detail' ? {} : rules"
          :disabled="type === 'detail'"
          label-width="180px"
          size="medium"
          class="table-column one"
        >
          <el-form-item label-width="0" style="width: 100%;">
            <div class="icon-title">
              <span class="span" />基本信息
            </div>
          </el-form-item>
          <el-form-item label="辖区名称" prop="areaName">
            <el-input
              v-model="ruleForm.areaName"
              style="width: 50%;"
              maxlength="20"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="填报单位" prop="orgId">
            <el-select
              v-model="ruleForm.orgId"
              clearable
              placeholder="请选择"
              style="width: 50%;"
            >
              <el-option
                v-for="item in orgList"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number
              v-model="ruleForm.sort"
              style="width: 50%;"
              :min="1"
              :max="999999"
            />
          </el-form-item>
          <el-form-item
            label="地理区划:"
          >
            <div class="tags-wrapper">
              <el-tag
                v-for="({administrativeDivisionName}, index) in ruleForm.divisions"
                :key="index"
                type="success"
                size="mini"
                :closable="!(type === 'detail')"
                @close="removeZone(index)"
              >
                {{ administrativeDivisionName }}
              </el-tag>
              <el-button
                v-if="type !== 'detail'"
                type="primary"
                plain
                size="mini"
                class="el-icon-plus"
                @click="addZone"
              >
                添加
              </el-button>
            </div>
          </el-form-item>
        </el-form>
        <Charts
          v-if="ruleForm.divisions.length"
          :map="registerMap"
          :option="mapOption"
          style="height: 700px;"
        />
      </div>
      <div class="backstage-edit-btn">
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="medium"
          @click="submitForm"
        >
          保存
        </el-button>
        <el-button
          size="medium"
        >
          返回
        </el-button>
      </div>
    </el-card>
    <el-card v-else class="right-wrapper" style="margin: 0 10px; width: 100%;">
      <el-empty description="暂无操作" />
    </el-card>
    <el-dialog
      title="添加标签"
      width="500"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="zoneForm"
        :model="zoneForm"
        :rules="zoneRule"
        label-width="100px"
        size="medium"
        class="table-column one"
      >
        <el-form-item
          label="地理区划:"
          prop="code"
        >
          <el-select
            v-model="zoneForm.code"
            clearable
            style="width: 100%;"
          >
            <el-option
              v-for="item in zoneList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveZone">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { chongqing } from '@/utils/address'
import Charts from '@/components/Charts/index.vue'
import chongqingMap from "@/utils/chongqingMap.json"
import { getList, deleteData, addData, updateData, getOrgList, getData } from '@/api/analysis-model/risk-area'
import { getData as getZone } from '@/api/analysis-model/administrative-division'
export default {
  components: {
    Charts
  },
  inject: ['configType'],
  data() {
    return {
      areaList: [],
      zoneList: [],
      orgList: [],
      activeId: 0,
      show: false, // 控制面板visible
      type: '',
      dialogVisible: false,
      mapOption: {},
      ruleForm: {
        areaName: '',
        id: null,
        orgId: undefined,
        orgName: '',
        sort: undefined,
        divisions: []
      },
      zoneForm: {
        code: ''
      },
      rules: {
        areaName: [
          { required: true, message: '请输入辖区名称', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择填报单位', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序值', trigger: 'blur' }
        ]
      },
      zoneRule: {},
      currentDivision: {}
    }
  },
  computed: {
    cityList() {
      return chongqing
    },
    registerMap() {
      return chongqingMap
    }
  },
  watch: {
    'ruleForm.divisions'() {
      this.mapOption = {
        visualMap: {
          min: 800,
          max: 50000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          show:false,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [
          {
            type: 'map',
            mapType: 'Chongqing', // 自定义扩展图表类型
            roam: true,
            zoom: 1.3,
            label: {
              show: true,
              fontSize: 8
            },
            silent: true,
            data: this.ruleForm.divisions.map(x => ({ name: x.administrativeDivisionName, value: 10086 }))
          }
        ]
      }
    }
  },
  created() {
    this.fetchArea()
    this.fetchZone()
    this.fetchOrgs()
  },
  methods: {
    // 查询辖区列表
    async fetchArea() {
      this.areaList = (await getList(this.configType)).data || []
      if (this.areaList.length>0){
        this.nodeClick(this.areaList[0])
      }
    },
    // 查询区划列表
    async fetchZone() {
      this.zoneList = (await getZone(this.configType)).data || []
    },
    // 查询组织机构列表
    async fetchOrgs() {
      this.orgList = (await getOrgList()).data.filter(x => x.orgCategory !== '4').sort((a,b) => Number(a.orgCategory) - Number(b.orgCategory)) || []
    },
    // 添加辖区
    addArea() {
      this.show = !this.show
      if (this.show) {
        this.type = 'add'
        this.ruleForm = {
          areaName: '',
          id: null,
          orgId: undefined,
          orgName: '',
          sort: undefined,
          divisions: []
        }
      }
    },
    handleStatus() {
      this.type = this.type === 'edit' ? 'detail' : 'edit'
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteData(this.ruleForm.id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchArea()
            this.fetchZone()
            this.fetchOrgs()
          }
        })
      })
    },
    // 移除区划
    removeZone(index) {
      this.ruleForm.divisions.splice(index, 1)
    },
    // 显示区划弹框
    addZone() {
      this.dialogVisible = true
      this.zoneForm = {}
      // 对已存在的区划进行禁用
      this.zoneList = this.zoneList.map(x => ({
        ...x,
        disabled: this.ruleForm.divisions.map(y => y.administrativeDivisionCode).includes(x.code)
      }))
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return false
        this.saveData()
      })
    },
    async saveData() {
      if (!this.ruleForm.divisions.length) {
        this.$message.warning('请选择地理区划')
        return
      }
      const riskAreaDto = {
        ...this.ruleForm,
        type: this.configType,
        orgName: this.orgList.find(x => x.orgId === this.ruleForm.orgId).orgName
      }
      const res = riskAreaDto.id ? await updateData(riskAreaDto) : await addData(riskAreaDto)
      if (res.code === '0') {
        this.show = false
        this.type = ''
        this.fetchArea()
      }
    },
    // 保存区划
    saveZone() {
      this.$refs.zoneForm.validate(valid => {
        if (!valid) return false
        const { code } = this.zoneForm
        this.ruleForm.divisions.push({ administrativeDivisionCode: code, administrativeDivisionName: this.zoneList.find(x => x.code === code).name })
        this.dialogVisible = false
      })
    },
    nodeClick({ id }) {
      this.type = 'detail'
      this.activeId = id
      getData(id).then(res => {
        if (res.code === '0') {
          if (res.data){
            this.show = true
            this.ruleForm = res.data
          } else {
            this.show = false
          }
        } else {
          this.show = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.left-wrapper /deep/ .el-card__body {
    padding: 0;
}

/deep/ .el-tag.el-tag--success {
    display: inline-block;
    margin-right: 10px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
}

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
    cursor: pointer;

    &.active {
        color: #ffffff;
        background-color: #007aff;
    }
}
</style>
