<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="应急队伍详情" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="应急队伍名称：">
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="管理部门：">
          {{ ruleForm.enterpriseName }}
        </el-descriptions-item>
        <el-descriptions-item label="所属应急机构：">
          {{ ruleForm.organizationName }}
        </el-descriptions-item>
        <el-descriptions-item label="级别：">
          {{ ruleForm.level }}
        </el-descriptions-item>
        <el-descriptions-item label="负责人：">
          {{ ruleForm.principal }}
        </el-descriptions-item>
        <el-descriptions-item label="负责人电话：">
          {{ ruleForm.principalPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人：">
          {{ ruleForm.contact }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人电话：">
          {{ ruleForm.contactPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="总人数：">
          <span>{{ ruleForm.personList && ruleForm.personList.length }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        size="medium"
        class="table-column three"
        disabled
      >
        <el-form-item
          label="应急队伍人员:"
          style="width: 100%;"
        >
          <PersonGroupTable
            :persons="ruleForm.personList"
            :options="options"
            :show-option="false"
            :show-add="false"
          />
        </el-form-item>
        <el-form-item
          label="地理位置信息:"
          prop="address"
          style="width: 100%;"
        >
          <Maptable
            ref="berthMap"
            :is-edit="false"
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
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
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
import { getDetail } from '@/api/emergency-services/team'
import Maptable from '@/components/Maptable/index'
export default {
  components: {
    PersonGroupTable,
    Maptable
  },
  data() {
    return {
      type: '',
      ruleForm: {},
      portAreaVoList: [],
      agency: [],
      addressOpt: [],
      loading: false, // 地址搜索加载
      options: [ // 人员列表表头选项
        { id: 1, value: 'name', label: '姓名' ,maxlength:20},
        { id: 2, value: 'departmentName', label: '职务',maxlength:100 },
        { id: 3, value: 'phone', label: '手机',maxlength:11 }
      ]
    }
  },
  created() {
    const { id, type } = this.$route.query
    // this.fetchPortArea()
    this.type = type
    if (id) this.fetchDetail(id)
    this.fetchAgency()
  },
  methods: {
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      // this.geoAddress(val[0])
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
          this.mapForm = {
            address:res.data.address,
            longitude:res.data.longitude,
            latitude:res.data.latitude
          }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
