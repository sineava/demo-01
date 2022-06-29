<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="应急机构详情" />
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
        <el-descriptions-item label="应急机构名称：">
          {{ ruleForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="所属管理部门：">
          {{ ruleForm.enterpriseName }}
        </el-descriptions-item>
        <el-descriptions-item label="机构联系人：">
          {{ ruleForm.contact }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：">
          {{ ruleForm.phone }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="140px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />应急职责
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.emergencyDuty"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
            disabled
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />机构人员
          </div>
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <PersonGroupTable
            title="添加机构人员"
            :persons="ruleForm.personList"
            :options="options"
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
import PersonGroupTable from '@/components/features/PersonGroupTable'
import { queryDetail } from '@/api/emergency-services/organization'
import { mapGetters } from 'vuex'
export default {
  components: {
    PersonGroupTable
  },
  data() {
    return {
      type: '',
      ruleForm: {
        contact: '',
        emergencyDuty: '',
        id: null,
        name: '',
        personList: [],
        phone: ''
      },
      options: [ // 人员列表表头选项
        { id: 1, value: 'name', label: '人员姓名',maxlength:20 },
        { id: 2, value: 'phone', label: '联系电话',maxlength:11 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchDetail(id)
  },
  methods: {
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          personList: res.data.personList.map(person => ({ ...person, saved: true }))
        }
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
