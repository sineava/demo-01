<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span v-if="ruleForm.type === 2" class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑航道养护月报上传规范' : type === 'add' ? '新增航道养护月报上传规范' : '航道养护月报上传规范详情'" />
      </span>
      <span v-if="ruleForm.type === 3" class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑年度航道养护情况上传规范' : type === 'add' ? '新增年度航道养护情况上传规范' : '年度航道养护情况上传规范详情'" />
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
        label-width="180px"
        size="medium"
        class="table-column three"
        :disabled="type === 'detail'"
      >
        <el-form-item
          v-if="ruleForm.type === 2"
          label="月份"
          prop="month"
        >
          <el-date-picker
            v-model="ruleForm.month"
            :type="ruleForm.type === 2 ? 'month' : 'year'"
            :placeholder="ruleForm.type === 2 ? '请选择月份' : '请选择年份'"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          v-else
          label="年份"
          prop="year"
        >
          <el-date-picker
            v-model="ruleForm.year"
            :type="ruleForm.type === 2 ? 'month' : 'year'"
            :placeholder="ruleForm.type === 2 ? '请选择月份' : '请选择年份'"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="上报时段:"
          prop="datetime"
        >
          <el-date-picker
            v-model="ruleForm.datetime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item
          v-loading="loading"
          label="选择需上传的机构/单位:"
          style="width: 100%;"
        >
          <el-checkbox v-model="checkAll" label="全选" @change="checkChange" />
          <div
            class="wrapper"
          >
            <div
              v-for="(item, index) in orgs"
              :key="index"
              style="position: relative;"
            >
              <el-checkbox
                v-model="orgs[index].checked"
                style="position: absolute; left: 10px;"
              />
              <span class="name">{{ item.enterpriseName }}</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="remark"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.remark"
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
        v-if="type !== 'detail'"
        type="primary"
        size="medium "
        :loading="btnLoading"
        @click="submitForm('ruleForm')"
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
import { momentDate } from '@/utils/index'
import { getOrgList } from '@/api/general-services/enterpriseInfo/external'
import { saveInfo, updateInfo, queryInfo } from '@/api/channel-services/channel/channel-report'
export default {
  data() {
    return {
      type: '',
      orgs: [],
      selected: {},
      loading: false,
      ruleForm: {
        id: null,
        infoDtoList: [],
        remark: '',
        datetime: '',
        timeInfo: '',
        month: '', // 月份
        year: '', // 年份
        type: '' // *2 月报 3 年报
      },
      rules: {
        year: [
          { required: true, message: '请选择年份', trigger: 'blur' }
        ],
        month: [
          { required: true, message: '请选择月份', trigger: 'blur' }
        ],
        datetime: [
          { required: true, message: '请选择上报时段', trigger: 'blur' }
        ]
      },
      checkAll: false,
      btnLoading: false
    }
  },
  created() {
    const { id, type, infoType } = this.$route.query
    this.type = type
    this.ruleForm.type = Number(infoType)
    this.fetchOrgs(id)
  },
  methods: {
    // 查询机构信息
    async fetchOrgs(id = null) {
      this.loading = true
      // *type:2 -> 区县机构
      const arrTwo = (await getOrgList({ type: 2 })).data || []
      // *type:3 -> 直属机构
      const arrThere = (await getOrgList({ type: 3 })).data || []
      const arr = [...arrTwo, ...arrThere]
      this.orgs = arr.map(x => ({ enterpriseId: Number(x.org_CODE), enterpriseName: x.org_NAME, checked: false }))
      this.loading = false
      if (id) this.fetchDetail(id) // !异步问题
    },
    // 查询详情
    async fetchDetail(id) {
      queryInfo({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          datetime: [res.data.reportingStart || '', res.data.reportingEnd || ''],
          infoDtoList: res.data.organizationInfoVoList,
          month: res.data.timeInfo,
          year: res.data.timeInfo
        }
        this.orgs = this.orgs.map(x => ({
          ...x,
          checked: res.data.organizationInfoVoList.some(y => y.enterpriseId === x.enterpriseId)
        }))
        delete this.ruleForm.organizationInfoVoList
      })
    },
    // 全选
    checkChange(obj) {
      this.orgs = this.orgs.map(x => ({
        ...x,
        checked:obj
      }))
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false
        this.saveData()
      })
    },
    // 保存数据
    async saveData() {
      this.ruleForm.infoDtoList = this.orgs.filter(x => x.checked === true).map(x => ({ enterpriseId: x.enterpriseId, enterpriseName: x.enterpriseName }))
      if (!this.ruleForm.infoDtoList.length) {
        this.$message.warning('请选择需上传的机构/单位')
        return
      }
      const [reportingStart, reportingEnd] = this.ruleForm.datetime || []
      const dto = {
        ...this.ruleForm,
        reportingStart: momentDate(reportingStart, 'YYYY-MM-DD HH:mm:ss'),
        reportingEnd: momentDate(reportingEnd, 'YYYY-MM-DD HH:mm:ss'),
        timeInfo: momentDate(this.ruleForm.type === 2 ? this.ruleForm.month : this.ruleForm.year, this.ruleForm.type === 2 ? 'YYYY-MM' : 'YYYY')
      }
      delete dto.datetime
      delete dto.month
      delete dto.year
      this.btnLoading = true
      const res = this.ruleForm.id ? await updateInfo(dto) : await saveInfo(dto)
      this.btnLoading = false
      if (res.code === '0') {
        this.$message.success('保存成功')
        setTimeout(() => {
          this.returnBack()
        }, 100);
      }
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/digital/channel/claim', query: { type: this.ruleForm.type }})
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-wrap: wrap;

    div {
        display: flex;
        overflow: hidden;
        margin-right: -1px;
        margin-bottom: -1px;
        border: 1px solid rgba(242, 242, 242, 1);
        width: 25%;
        min-width: 220px;
        height: 55px;
        line-height: 55px;
        white-space: nowrap;
        text-overflow: ellipsis;

        .name {
            display: inline-block;
            margin-left: 30px;
        }
    }
}
</style>
