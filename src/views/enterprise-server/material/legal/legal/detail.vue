<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="法律法规详情" />
      </span>
    </div>
    <div class="basic-detail">
      <h1 class="title">{{ ruleForm.fileName }}</h1>

      <div class="utils">
        <span>类型：{{ ruleForm.fileType }}</span>
        <span>颁布机构：{{ ruleForm.enactOrganization }}</span>
        <span>颁布时间：{{ ruleForm.enactTime }}</span>
        <span>颁布文号：{{ ruleForm.enactTitanic }}</span>
      </div>
      <div class="wrapper" v-html="ruleForm.synopsis" />
      <div class="dowload">
        <h3>附件下载</h3>
        <common-table
          :table-data="fileList"
          show-download
        />
      </div>
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
import { momentDate,replaceImg } from '@/utils/index'
import { getLawDetail, addLawRegulation, updateLawRegulation } from '@/api/general-services/public-information/lawsAndRegulations'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    CommonTable
  },
  data() {
    return {
      loading: false,
      fileList: [],
      title: '',
      ruleForm: {
        enactOrganization: '',
        enactTime: '',
        enactTitanic: '',
        fileName: '',
        filePath: [],
        fileType: '',
        id: 0,
        synopsis: ''
      },
      rules: {
        fileName: [
          { required: true, message: '请输入文件名', trigger: 'blur' }
        ],
        fileType: [
          { required: true, message: '请输入文件类型', trigger: 'blur' }
        ],
        enactOrganization: [
          { required: true, message: '请输入颁布机构', trigger: 'blur' }
        ],
        enactTitanic: [
          { required: true, message: '请输入颁布文号', trigger: 'blur' }
        ],
        enactTime: [
          { required: true, message: '请选择颁布时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const detailId = this.$route.query.id
    if (detailId) {
      this.type = 'edit'
      this.getDetail(detailId)
    } else {
      this.type = 'add'
    }
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: true,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: true
    })
  },
  methods: {
    // 查询详情
    async getDetail(detailId) {
      const res = await getLawDetail({ id: detailId })
      if (!res.data) return
      const {
        enactOrganization,
        enactTime,
        enactTitanic,
        fileName,
        filePath,
        fileType,
        id
      } = res.data
      const synopsis = await replaceImg(res.data.synopsis)
      this.ruleForm = {
        enactOrganization,
        enactTime,
        enactTitanic,
        fileName,
        filePath: filePath ? JSON.parse(filePath) : [],
        fileType,
        id,
        synopsis
      }
      this.content = marked(this.ruleForm.synopsis, {breaks: true}).replace(/<pre>/g, "<pre class='hljs'>")
      this.fileList = [...this.ruleForm.filePath]
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },

    // 保存
    async saveData() {
      this.loading = true
      const lawRegulationDto = {
        ...this.ruleForm,
        enactTime: momentDate(this.ruleForm.enactTime),
        filePath: this.fileList.length ? JSON.parse(this.fileList) : ''
      }
      const res = lawRegulationDto.id ? await updateLawRegulation(lawRegulationDto) : await addLawRegulation(lawRegulationDto)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail {
    .title {
        margin: 20px 0;
        padding: 0 30px;
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
        font-size: 20px;
        font-weight: 700;
        font-style: normal;
        line-height: 40px;
        text-align: left;
        color: #666666;
    }

    .utils {
        margin: 20px 0 30px 0;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        padding: 0 30px;
        font-size: 13px;
        line-height: 40px;
        color: #999999;
        background: #f9f9f9;

        span {
            margin-right: 20px;
        }
    }

    .wrapper {
        padding: 0 30px;
        font-size: 13px;
        line-height: 30px;
        white-space: pre-wrap;

        /deep/ img {
            max-width: 100% !important;
        }
    }

    .dowload {
        margin: 30px 30px;
    }

    .el-card__body {
        padding: 0;
    }
}

.body-card {
    /deep/ .el-card__body {
        padding: 0;
    }
}
</style>
