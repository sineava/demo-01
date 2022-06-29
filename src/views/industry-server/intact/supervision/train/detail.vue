<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="教育培训详情" />
      </span>
    </div>
    <div class="manager-detail">
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="培训科目：">
          {{ ruleForm.trainSubject }}
        </el-descriptions-item>
        <el-descriptions-item label="培训方式：">
          {{ ruleForm.trainModes }}
        </el-descriptions-item>
        <el-descriptions-item label="开始培训时间：">
          {{ ruleForm.planningTime }}
        </el-descriptions-item>
        <el-descriptions-item label="培训学时：">
          {{ ruleForm.hours }}
        </el-descriptions-item>
        <el-descriptions-item label="组织人：">
          {{ ruleForm.organizerPerson }}
        </el-descriptions-item>
        <el-descriptions-item label="填报人：">
          {{ ruleForm.reporterPerson }}
        </el-descriptions-item>
        <el-descriptions-item label="填报时间：">
          {{ ruleForm.reportedTime }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：">
          {{ ruleForm.reporterPhone }}
        </el-descriptions-item>
        <el-descriptions-item label="培训对象：">
          {{ ruleForm.trainObject }}
        </el-descriptions-item>
        <el-descriptions-item label="培训人数：">
          {{ ruleForm.peopleNumber }}
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
          label="培训内容:"
          prop="trainContent"
          style="width: 100%;"
        >
          <el-input
            v-model.trim="ruleForm.trainContent"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
          />
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
        <el-form-item
          label="情况图片:"
          prop="caption"
        >
          <Images
            v-for="({url}, index) in ruleForm.caption"
            :key="index"
            :ref="`images${index}`"
            height="100px"
            fit="contain"
            :url="url"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <div class="icon-title">
            <span class="span" />文件附件
          </div>
        </el-form-item>
      </el-form>
    </div>
    <FileTable
      show-download
      :table-data="fileList"
    />
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
import { queryDetail } from '@/api/general-services/educateTrain/management-training'
import Images from '@/components/images'
export default {
  components: {
    FileTable,
    Images
  },
  data() {
    return {
      ruleForm: {
        caption: [],
        departmentId: 0,
        departmentName: '',
        filePath: [],
        hours: undefined,
        id: null,
        organizerPerson: '',
        peopleNumber: '',
        planningTime: '',
        remark: '',
        reportedTime: '',
        reporterPerson: '',
        reporterPhone: '',
        trainContent: '',
        trainModes: '',
        trainObject: '',
        trainSubject: ''
      },
      imgList: [],
      fileList: []
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    if (id) this.fetchDetail(id)
  },
  methods: {
    async fetchDetail(id) {
      queryDetail({ id }).then(res => {
        if (res.code === '0') {
          this.ruleForm = {
            ...res.data,
            enclosure: res.data.enclosure ? JSON.parse(res.data.enclosure) : [],
            caption: res.data.caption ? JSON.parse(res.data.caption) : []
          }
          this.fileList = res.data.enclosure ? JSON.parse(res.data.enclosure) : []
          this.imgList = res.data.caption ? JSON.parse(res.data.caption) : []
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
