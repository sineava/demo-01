<template>
  <div>
    <el-card v-if="type === 'add'" class="body-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="detail-back">
          <el-page-header @back="returnBack" content="新增公务船舶" />
        </span>
      </div>
      <div class="icon-title">
        <span class="span" />  船舶查询添加（<span style="color:#409EFF"> 请选择输入船名、船舶识别号进行查询添加</span>）
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
          <el-select slot="prepend" v-model="select" placeholder="请选择">
            <!-- <el-option label="船名" value="1"></el-option> -->
            <el-option label="船舶识别号" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" type="primary" :loading="tLoad" @click="search()">搜索</el-button>
        </el-input>
      </div>
    </el-card>
    <el-card class="body-card" shadow="hover">
      <div slot="header">
        <!-- 船舶信息 -->
        <div class="detail-back" style="width:100%;">
          <span v-if="type === 'add'">
            公务船舶
          </span>
          <el-page-header v-else @back="returnBack" :content="type === 'edit' ? '编辑公务船舶' : '公务船舶详情'" />
          <el-button v-if="type === 'edit'" size="small" type="success" @click="search(form.shipIdentifyNo)" style="float:right;bottom: 80px;transform: translateY(-30px);">更新船舶信息</el-button>
        </div>
      </div>
      <div class="icon-title">
        <span class="span" />  公务船舶信息
      </div>
      <el-descriptions colon :column="2" border :contentStyle="{width: '40%'}" :labelStyle="{width:'10%'}">
        <el-descriptions-item :span="2">
          <template slot="label">船舶名称</template>
          {{ form.shipName }}
          <el-button v-if="type !== 'add'" type="primary" size="small" style="float:right" @click="toDetail">查询船舶详情</el-button>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>单位</template>
          <el-cascader
            v-if="type !== 'detail'"
            ref="cascader"
            v-model="form.enterpriseId"
            style="width: 100%"
            :options="orgs"
            :props="{ checkStrictly: true, label: 'org_NAME', value: 'org_CODE' }"
            clearable
          />
          <span v-else>{{ form.enterpriseName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">船舶类型</template>
          {{ form.shipType }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">船舶识别号</template>
          {{ form.shipIdentifyNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>总长（M）</template>
          <el-input-number
            v-if="type !== 'detail'"
            v-model="form.shipLength"
            placeholder="请输入总长（M）"
            :precision="2"
            controls-position="right"
            :min="0"
            :max="999999.99"
            style="width:100%"
          />
          <span v-else>{{ form.shipLength }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>总吨（T）</template>
          <el-input-number
            v-if="type !== 'detail'"
            v-model.trim="form.shipTons"
            placeholder="请输入总吨（T）"
            controls-position="right"
            :min="0"
            :max="999999.99"
            style="width:100%"
          />
          <span v-else>{{ form.shipTons }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>主机功率（KW）</template>
          <el-input-number
            v-if="type !== 'detail'"
            v-model.trim="form.shipPower"
            placeholder="请输入主机功率（KW）"
            controls-position="right"
            :min="0"
            :max="999999.99"
            style="width:100%"
          />
          <span v-else>{{ form.shipPower }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>船舶材质</template>
          <el-select
            v-if="type !== 'detail'"
            v-model="form.shipMaterial"
            clearable
            placeholder="请选择船舶材质"
            style="width: 100%;"
          >
            <el-option
              v-for="item, i in ['钢制', '玻璃钢', '钢玻', '钢铝', '其他']"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
          <span v-else>{{ form.shipMaterial }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>出厂日期</template>
          <el-date-picker
            v-if="type !== 'detail'"
            v-model="form.manufactureDate"
            type="date"
            style="width: 100%;"
            placeholder="请选择出厂日期"
          />
          <span v-else>{{ form.manufactureDate }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>船舶用途</template>
          <el-select
            v-if="type !== 'detail'"
            v-model="form.shipPurpose"
            clearable
            placeholder="请选择船舶用途"
            style="width: 100%;"
          >
            <el-option
              v-for="item, i in ['日常巡航', '应急救援', '航道维护', '工程作业', '综合使用', '其他']"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
          <span v-else>{{ form.shipPurpose }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>资金来源</template>
          <el-select
            v-if="type !== 'detail'"
            v-model="form.capitalSource"
            clearable
            placeholder="请选择资金来源"
            style="width: 100%;"
          >
            <el-option
              v-for="item, i in ['应急资金', '航道资金', '区县自筹资金', '其他港航经费']"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
          <span v-else>{{ form.capitalSource }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><span style="color:red;margin-right: 4px">*</span>船舶使用状态</template>
          <el-select
            v-if="type !== 'detail'"
            v-model="form.usingState"
            clearable
            placeholder="请选择船舶使用状态"
            style="width: 100%;"
          >
            <el-option
              v-for="item, i in ['自用', '出租', '出借', '待报废', '划拨(拟划拨)']"
              :key="i"
              :label="item"
              :value="item"
            />
          </el-select>
          <span v-else>{{ form.usingState }}</span>
        </el-descriptions-item>
        <!-- 占位 -->
        <el-descriptions-item></el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label">备注</template>
          <el-input
            v-if="type !== 'detail'"
            v-model="form.remark"
            type="textarea"
            :rows="6"
            maxlength="1000"
            placeholder="请输入备注"
          />
          <span v-else>{{ form.remark }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title" style="margin: 20px 0">
        <span class="span" />  公务船舶证照信息
      </div>
      <el-descriptions colon :column="2" border :contentStyle="{width: '40%'}" :labelStyle="{width:'10%'}">
        <el-descriptions-item>
          <template slot="label">有无所有权证书</template>
          {{ ['否', '是'][form.isLicense] }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">所有权证书编号</template>
          {{ form.licenseNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">国籍证书编号</template>
          {{ form.nationalityCertificateNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">国籍证书到期日</template>
          {{ form.nationalityCertificateExpireTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">船检完成日期</template>
          {{ form.uploadInspectionTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">下次检验日期</template>
          {{ form.expiryDateOfSurveyCertificate }}
        </el-descriptions-item>
      </el-descriptions>
      <div v-if="type !== 'detail'" class="backstage-edit-btn">
        <el-button
          :loading="bLoad"
          type="primary"
          size="medium"
          @click="submit"
        >
          提交
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import moment from 'moment'
import { getInfoByIdentifier } from '@/api/water-transportation-services/information/ship-info-update'
import { mapGetters } from 'vuex'
import { getInfo, addInfo, updateInfo } from '@/api/ship-inspection/official-business-ship'
import { getOrgList } from '@/api/general-services/enterpriseInfo/external'
export default {
  data() {
    return {
      type: '',
      form: {},
      keyword: '',
      select: '2',
      tLoad: false,
      bLoad: false,
      orgs: []
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.detail(id)
    this.fetchOrgs(2)
  },
  methods: {
    async detail(id) {
      const { orgcategory, orgname } = this.user_info
      if (orgcategory==='1') this.fetchOrgs(2)
      if (!id) {
        if (orgcategory==='2') this.form.enterpriseName = orgname
      } else {
        const data = (await getInfo({ id }))?.data || {}
        this.form = {
          ...data,
          enterpriseId: data.enterpriseId ? [data.enterpriseId.toString()] : null
        }
      }
    },
    async fetchOrgs(type) {
      this.orgs = (await getOrgList({ type })).data || []
    },
    async search(identify) {
      if (!identify && !this.keyword) return
      this.tLoad = true
      const res = (await getInfoByIdentifier({ shipIdentifyNo: identify || this.keyword }))?.data || {}
      this.tLoad = false
      this.form = {
        ...this.form,
        ...res,
        shipId: res?.id,
        shipLength: res?.totalLength,
        shipTons: res?.shipTotalTons,
        shipPower: res?.hostPower,
        shipMaterial: res?.hullMaterial,
        manufactureDate: res?.completionDate,
        capitalSource: res?.fundsSource,
        usingState: res?.shipStatus,
        remark: res?.remarks,
        isLicense: res?.isOwner,
        licenseNo: res?.certPrintNo,
        nationalityCertificateNo: res?.gjCertPrintNo,
        nationalityCertificateExpireTime: res?.expireDate ? moment(res?.expireDate).format('yyyy-MM-DD') : '',
        uploadInspectionTime: res?.shipSurveyCompleteDate,
        expiryDateOfSurveyCertificate: res?.nextInspectionDate
      }
    },
    async submit() {
      const flag = ['enterpriseId', 'shipLength', 'shipTons', 'shipPower', 'manufactureDate', 'shipMaterial', 'shipPurpose', 'capitalSource', 'usingState'].some(k => !this.form[k])
      if (flag) {
        Message({
          message: '存在未填项,请检查后再提交',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.bLoad = true
      const enterpriseId = this.form.enterpriseId
      const label = this.$refs['cascader'].getCheckedNodes()?.[0]?.pathLabels
      const data = {
        ...this.form,
        manufactureDate: this.form?.manufactureDate ? moment(this.form.manufactureDate).format('YYYY-MM-DD') : null,
        enterpriseName: label[label.length - 1],
        enterpriseId: (enterpriseId && typeof enterpriseId === 'object') ? enterpriseId[enterpriseId.length - 1] : (enterpriseId || '')
      }
      const res = this.type === 'add' ? await addInfo(data) : await updateInfo(data)
      this.bLoad = false
      if (res.code === '0') {
        this.returnBack()
      } else {
        this.$message.error(res.message)
      }
    },
    toDetail() {
      this.$router.push({ path: '/electronic-archives/basic-info/detail', query: { id: this.form?.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.input-with-select /deep/ .el-input {
  width: 130px;
}
</style>