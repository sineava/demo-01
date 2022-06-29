<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="应急演练情况详情" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />演练计划信息
      </div>
      <el-form
        ref="detailForm"
        :model="detailForm"
        label-width="180px"
        size="medium"
        class="table-column three"
      >
        <template>
          <el-form-item label="单位名称:">
            <el-input
              v-model="ruleForm.enterpriseName"
              disabled
            />
          </el-form-item>
          <el-form-item label="年度计划:">
            <el-radio-group
              v-model="ruleForm.planType"
              disabled
            >
              <el-radio :label="1">
                应急演练
              </el-radio>
              <el-radio :label="2">
                综合演练
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="演习名称:">
            <el-input
              v-model="ruleForm.name"
              disabled
            />
          </el-form-item>
          <el-form-item label="演习组织机构:">
            <el-input
              v-model="ruleForm.planOriginator"
              disabled
            />
          </el-form-item>
          <el-form-item label="演习类型:">
            <el-input
              v-model="ruleForm.actingType"
              disabled
            />
          </el-form-item>
          <el-form-item label="演习类型细类:">
            <el-input
              v-model="ruleForm.actingTypeDetailed"
              disabled
            />
          </el-form-item>
          <el-form-item label="计划开始演练时间:">
            <el-date-picker
              v-model="ruleForm.planStartTime"
              type="datetime"
              style="width: 100%;"
              disabled
            />
          </el-form-item>
          <el-form-item label="演习地点:">
            <el-input
              v-model="ruleForm.planAddress"
              disabled
            />
          </el-form-item>
          <el-form-item label="演习天数:">
            <el-input
              v-model="ruleForm.planDays"
              disabled
            />
          </el-form-item>
          <el-form-item label="演练流程及内容简要描述:">
            <el-input
              v-model="ruleForm.planDescribe"
              disabled
            />
          </el-form-item>
          <el-form-item label="填报人:">
            <el-input
              v-model="ruleForm.planInformant"
              disabled
            />
          </el-form-item>
          <el-form-item label="填报人联系电话:">
            <el-input
              v-model="ruleForm.planInformantPhone"
              disabled
            />
          </el-form-item>
          <el-form-item label="填报时间:">
            <el-date-picker
              v-model="ruleForm.planFillInTime"
              type="datetime"
              style="width: 100%;"
              disabled
            />
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              v-model="ruleForm.planRemark"
              disabled
            />
          </el-form-item>
        </template>
      </el-form>
      <div class="icon-title">
        <span class="span" />演练情况信息
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="180px"
        size="medium"
        class="table-column three"
      >
        <!-- 选择计划自动填充 -->
        <el-form-item label="单位名称:">
          <el-input
            v-model.trim="ruleForm.enterpriseName"
            disabled
          />
        </el-form-item>
        <el-form-item label="演习名称:">
          <el-input
            v-model.trim="ruleForm.name"
            disabled
          />
        </el-form-item>
        <el-form-item label="演习类型:">
          <el-input
            v-model.trim="ruleForm.actingType"
            disabled
          />
        </el-form-item>
        <el-form-item label="演习类型细类:">
          <el-input
            v-model.trim="ruleForm.actingTypeDetailed"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="演习开始时间:"
          prop="actualStartTime"
        >
          <el-date-picker
            v-model="ruleForm.actualStartTime"
            type="datetime"
            placeholder="选择时间"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="演习天数:"
          prop="actualDays"
        >
          <el-input-number
            v-model="ruleForm.actualDays"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="演习地点:"
          prop="actualAddress"
        >
          <el-input
            v-model.trim="ruleForm.actualAddress"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="演习组织机构:"
          prop="actualOriginator"
        >
          <el-input
            v-model.trim="ruleForm.actualOriginator"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="参演机构:"
          prop="actualOrganization"
        >
          <el-input
            v-model.trim="ruleForm.actualOrganization"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="参演人员:"
          prop="actualPersons"
        >
          <el-input
            v-model.trim="ruleForm.actualPersons"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="演练流程及内容描述:"
          prop="actualDescribe"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.actualDescribe"
            type="textarea"
            rows="6"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="演练方案:"
          prop="actualProject"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.actualProject"
            type="textarea"
            rows="6"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="填报人:"
          prop="actualInformant"
        >
          <el-input
            v-model.trim="ruleForm.actualInformant"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="填报人联系电话:"
          prop="actualInformantPhone"
        >
          <el-input
            v-model.trim="ruleForm.actualInformantPhone"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="填报时间:"
          prop="actualFillInTime"
        >
          <el-date-picker
            v-model="ruleForm.actualFillInTime"
            type="datetime"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="演习情况图片:"
          prop="actualPicture"
        >
          <Images
            v-for="(img, index) in ruleForm.actualPicture"
            :key="index"
            :ref="`images${index}`"
            height="100px"
            fit="contain"
            :url="img.url"
          />
        </el-form-item>
        <el-form-item
          label="附件"
          style="width: 100%;"
        >
          <FileTable
            :show-download="true"
            :table-data="ruleForm.detailsFilePath"
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
import FileTable from '@/components/features/FileTable'
import { queryDetail } from '@/api/emergency-services/exercise-case'
import Images from '@/components/images'
export default {
  components: {
    FileTable,
    Images
  },
  data() {
    return {
      planName: '',
      options: [],
      detailForm: {}, // 详情表单(不可编辑)
      ruleForm: { // 演练情况信息(可编辑)
        actingType: '',
        actingTypeDetailed: '',
        actualAddress: '',
        actualDays: '',
        actualDescribe: '',
        actualFillInTime: '',
        actualInformant: '',
        actualInformantPhone: '',
        actualOrganization: '',
        actualOriginator: '',
        actualPersons: '',
        actualPicture: [],
        actualProject: '',
        actualStartTime: '',
        detailsFilePath: [],
        enterpriseId: '',
        enterpriseName: '',
        name: '',
        planType: ''
      }
    }
  },
  created() {
    const id = this.$route.query.id
    this.fetchDetail(id)
  },
  methods: {
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        if (res.data) {
          this.ruleForm = {
            ...res.data,
            actualPicture: JSON.parse(res.data.actualPicture) || [],
            detailsFilePath: JSON.parse(res.data.detailsFilePath) || [],
            planFilePath: JSON.parse(res.data.planFilePath) || []
          }
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/emergency/situation' })
    }
  }
}
</script>
