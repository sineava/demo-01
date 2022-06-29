<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑应急队伍' : type === 'add' ? '新增应急队伍' : '应急队伍详情'" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
        <el-form-item
          label="应急队伍名称:"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入应急队伍名称" />
        </el-form-item>
        <el-form-item
          label="所属应急机构:"
          prop="organizationId"
        >
          <el-select
            v-model="ruleForm.organizationId"
            filterable
            placeholder="请选择所属应急机构"
            style="width: 100%;"
            clearable
          >
            <el-option
              v-for="item in agency"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="级别:"
          prop="level"
        >
          <el-input v-model.trim="ruleForm.level" maxlength="20" placeholder="请输入级别" />
        </el-form-item>
        <el-form-item
          label="负责人:"
          prop="principal"
        >
          <el-input v-model.trim="ruleForm.principal" maxlength="20" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item
          label="负责人电话:"
          prop="principalPhone"
        >
          <el-input v-model.trim="ruleForm.principalPhone" maxlength="11" placeholder="请输入负责人电话" />
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="contact"
        >
          <el-input v-model.trim="ruleForm.contact" maxlength="20" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item
          label="联系人电话:"
          prop="contactPhone"
        >
          <el-input v-model.trim="ruleForm.contactPhone" maxlength="11" placeholder="请输入联系人电话" />
        </el-form-item>
        <el-form-item
          label="详细地址:"
          prop="address"
        >
          <el-input v-model.trim="ruleForm.address" maxlength="150" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="总人数:">
          <!-- 自动计算人算 -->
          <span>{{ ruleForm.personList.length }}</span>
        </el-form-item>
        <el-form-item
          label="应急队伍人员:"
          style="position: relative; width: 100%;"
          prop="personList"
        >
          <PersonGroupTable
            title="添加应急队伍人员"
            :persons="ruleForm.personList"
            :options="options"
            :show-option="type !== 'detail'"
            :show-add="type !== 'detail'"
            @handleAddPerson="handleAddPerson"
            @removePerson="removePerson"
            @editPerson="editPerson"
            @savePerson="savePerson"
          />
        </el-form-item>
        <el-form-item
          label="地理位置信息:"
          prop="address"
          style="width: 100%;"
        >
          <Maptable
            ref="berthMap"
            :is-edit="type !== 'detail'"
            :is-table="false"
            :is-manual="false"
            :tool="['spot']"
            @change="confirmMap"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />专长描述
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.featDescription"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入专长描述"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />主要装备描述
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.equipmentDescribed"
            type="textarea"
            rows="6"
            placeholder="请输入主要装备描述"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        :loading="saveloading"
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
import { getPortArea } from '@/api/port-services/coastline/coastline-planning'
import PersonGroupTable from '@/components/features/PersonGroupTable'
import { selectList } from '@/api/emergency-services/organization'
import { saveInfo, getDetail, updateInfo } from '@/api/emergency-services/team'
import { telephone } from '@/utils/validate'
import Maptable from '@/components/Maptable/index'
export default {
  components: {
    PersonGroupTable,
    Maptable
  },
  data() {
    return {
      type: '',
      saveloading:false,
      ruleForm: {
        contact: '',
        contactPhone: '',
        equipmentDescribed: '',
        featDescription: '',
        harbourDistrictId: '',
        headcount: '',
        id: null,
        level: '',
        name: '',
        organizationId: '',
        personList: [], // 人员列表
        principal: '',
        principalPhone: ''
      },
      portAreaVoList: [],
      agency: [],
      addressOpt: [],
      geographyInfos:[],
      loading: false, // 地址搜索加载
      options: [ // 人员列表表头选项
        { id: 1, value: 'name', label: '姓名',maxlength:20 },
        { id: 2, value: 'departmentName', label: '职务',maxlength:100 },
        { id: 3, value: 'phone', label: '手机',maxlength:11 }
      ],
      rules: {
        address:[
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        harbourDistrictId: [
          { required: true, message: '请选择所属港区', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入应急队伍名称', trigger: 'blur' }
        ],
        organizationId: [
          { required: true, message: '请选择应急机构', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        principalPhone: [
          { required: true, message: '请输入负责人电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        contactPhone: [
          { validator: telephone, trigger: 'blur' }
        ],
        personList: [
          { required: true, message: '请添加应急队伍人员', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.fetchPortArea()
    this.type = type
    if (id) { // 编辑
      this.fetchDetail(id)
    }
    this.fetchAgency()
  },
  methods: {
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    // 查询港区信息
    async fetchPortArea() {
      getPortArea().then(res => {
        if (res.data) {
          this.portAreaVoList = res.data ? res.data[0].portAreaVoList : []
        }
      })
    },
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          personList: res.data.personList ? res.data.personList.map(person => ({ ...person, saved: true })) : []
        }
        if (res.data.longitude && res.data.latitude){
          this.geographyInfos = [{
            longitude:res.data.longitude,
            latitude:res.data.latitude
          }]
        }
        this.$nextTick(() => {
          this.$refs.berthMap.init(this.geographyInfos)
        })
      })
    },
    // 查询应急机构
    async fetchAgency() {
      selectList({ name: '' }).then(res => {
        this.agency = res.data ? res.data : []
      })
    },
    // 提交
    handlePost() {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    getHarbourDistrictName(harbourDistrictId){
      let portAreaName = ''
      for (let i=0;i<this.portAreaVoList.length;i++){
        if (harbourDistrictId === this.portAreaVoList[i].id){
          portAreaName =this.portAreaVoList[i].portAreaName
          return portAreaName
        }
      }
      return portAreaName
    },
    // 保存数据
    async saveData() {
      // 提交保存的数据
      const personList = this.ruleForm.personList.filter(person => person.saved).map(({ id, name, phone, departmentName }) => ({ id, name, phone, departmentName }))
      if (personList.length === 0) {
        this.$message.warning('请添加应急队伍人员')
        return false
      }
      if (!this.geographyInfos || this.geographyInfos.length===0){
        this.$message.error('请标记地理位置信息')
        return false
      }
      const dto = {
        ...this.ruleForm,
        longitude:this.geographyInfos[0].longitude,
        latitude:this.geographyInfos[0].latitude,
        headcount: this.ruleForm.personList.length,
        personList,
        harbourDistrictId: this.ruleForm.harbourDistrictId,
        harbourDistrictName: this.getHarbourDistrictName(this.ruleForm.harbourDistrictId)
      }
      delete dto.organizationName

      this.saveloading = true
      const res = this.ruleForm.id ? await updateInfo(dto) : await saveInfo(dto)
      this.saveloading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/team' })
    },
    // 添加机构人员
    handleAddPerson() {
      this.ruleForm.personList.push({
        departmentName: '',
        id: 0,
        name: '',
        phone: '',
        saved: false
      })
    },
    // 编辑机构人员
    editPerson({ index }) {
      this.ruleForm.personList[index].saved = false
    },
    // 保存机构人员
    savePerson({ index }) {
      this.ruleForm.personList[index].saved = true
    },
    // 删除机构人员
    removePerson({ index }) {
      this.ruleForm.personList.splice(index, 1)
    }
  }
}
</script>
