<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{ type }}</span>
      <span style="float: right;">
        <el-radio-group v-model="type" size="small" @change="typeChange">
          <el-radio-button label="天气信息" />
          <el-radio-button label="预警信息" />
        </el-radio-group>
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="searchForm"
        :model="searchForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          v-if="type==='天气信息'"
          label="区域:"
          prop="cityId"
        >
          <el-select
            v-model="searchForm.cityId"
            placeholder="请选择区域"
            style="width: 100%;"
            clearable
          >
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="type==='预警信息'"
          label="预警标题:"
          prop="title"
        >
          <el-input v-model.trim="searchForm.title" placeholder="请输入预警标题" />
        </el-form-item>
        <el-form-item
          label="日期:"
          prop="timeList"
        >
          <el-date-picker
            v-model="searchForm.timeList"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="search"
          >
            查询
          </el-button>
          <el-button
            size="small"
            icon="el-icon-refresh-left"
            @click="resetForm('searchForm')"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <div style="display: flex;">
        <el-button
          v-if="type === '预警信息'"
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
        >
          发布预警信息
        </el-button>
      </div>
      <el-table
        v-if="type === '天气信息'"
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期">
          <template v-slot="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区域">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日出时间">
          <template v-slot="scope">
            <span>{{ scope.row.sunrise }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日落时间">
          <template v-slot="scope">
            <span>{{ scope.row.sunset }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最高温度（℃）">
          <template v-slot="scope">
            <span>{{ scope.row.tempMax }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低温度（℃）">
          <template v-slot="scope">
            <span>{{ scope.row.tempMin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总降水量（mm）">
          <template v-slot="scope">
            <span>{{ scope.row.precipitation }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 140 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleDetail(scope.row)"
            >
              <em class="el-icon-info" /> 当天天气详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="type === '预警信息'"
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预警标题">
          <template v-slot="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预警资料">
          <template v-slot="scope">
            <span>{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template v-slot="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :width="270"
        >
          <template v-slot="scope">
            <el-button
              v-if="(scope.row.suffix==='pdf' || scope.row.suffix==='images')"
              size="mini"
              plain
              @click="preview(scope.row)"
            >
              <em class="el-icon-info" /> 预览
            </el-button>
            <el-button
              v-else
              size="mini"
              @click="handleDownload(scope.row)"
            >
              <em class="el-icon-download" /> 下载
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              <em class="el-icon-delete" /> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        background
        @change="paginationChange"
      />
    </div>
    <el-dialog
      title="发布预警信息"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      width="500px"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="预警标题" prop="title">
          <el-input v-model.trim="ruleForm.title" placeholder="请输入预警标题" />
        </el-form-item>
        <el-form-item
          label="预警资料"
          prop="filePath"
        >
          <upload
            v-if="fileList.length === 0"
            file
            :show-file-list="false"
            :file-list="fileList"
            :limit="1"
            multiple
            fileAccept=".pdf"
            @fileSuccess="uploadFileSuccess"
          />
          <el-tag v-else closable @close="fileClose">{{ fileList[0].fileName }}</el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForms('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <PDF ref="PDF" :dochref="dochref" />
    <el-image
      v-if="imgDialogVisible"
      ref="myImg"
      class="my-img"
      style="display: none;"
      :src="dialogImageUrl"
      :preview-src-list="[dialogImageUrl]"
    />
  </el-card>
</template>

<script>
import { getList, getCityList,getEarlytList,saveEarlytList,putEarlytList,deleteEarlytList } from '@/api/meteorological/index'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import upload from '@/components/upload'
import {momentDate,fileUrlAssemble,downloadCodeImg} from '@/utils/index'
import PDF from '@/components/pdf'
export default {
  components: {
    pagination,
    upload,
    PDF
  },
  data() {
    return {
      list: [],
      listLoading: true,
      imgDialogVisible:false,
      currentPage: 1,
      type:'天气信息',
      pageSize: 20,
      dochref:'',
      total: 0,
      dialogVisible:false,
      ruleForm:{
        id:'',
        title:'',
        filePath:''
      },
      rules:{
        title:[
          { required: true, message: '请输入预警标题', trigger: 'blur' }
        ],
        filePath:[
          { required: true, message: '请上传预警资料', trigger: 'blur' }
        ]
      },
      fileList:[],
      searchForm: {
        cityId: '',
        title:'',
        timeList: []
      },
      cityList: []
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async mounted() {
    this.cityList = (await getCityList()).data
    this.fetchData()
  },
  methods: {
    typeChange(e){
      this.searchForm = {
        cityId: '',
        title:'',
        timeList: []
      }
      this.currentPage = 1
      this.fetchData()
    },
    submitForms(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = this.ruleForm.id ? await putEarlytList(this.ruleForm) : await saveEarlytList(this.ruleForm)
          if (res.code==='0'){
            this.$message.success(this.ruleForm.id ? '修改成功':'添加成功')
            this.dialogVisible = false
            this.fetchData()
          }
        } else {
          return false
        }
      })
    },
    uploadFileSuccess(file){
      this.fileList = [{
        fileName:file.name,
        fileSize:parseInt(file.size/1024),
        filePath:file.response.data,
        createTime:momentDate(new Date()),
      }]
      this.ruleForm.filePath = JSON.stringify(this.fileList)
    },
    fileClose(){
      this.fileList = []
      this.ruleForm.filePath = ''
    },
    async preview(item){
      const urls = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
      let url = await fileUrlAssemble(urls)
      if (item.suffix==='pdf'){
        this.dochref = url
        this.$refs.PDF.open()
      } else if (item.suffix==='images'){
        this.dialogImageUrl = url
        this.imgDialogVisible = true
        this.$nextTick(()=>{
          this.$refs.myImg.showViewer = true
        })
      }
    },
    handleAdd(){
      this.fileList = []
      this.ruleForm={
        id:'',
        title:'',
        filePath:''
      }
      this.dialogVisible = true
    },
    /**
     * 新建/编辑/详情
     */
    async handleEdit(item) {
      this.fileList = []
      this.ruleForm={
        id:'',
        title:'',
        filePath:''
      }
      this.ruleForm = item
      let url = await fileUrlAssemble(item.fileList[0].filePath)
      this.fileList =  [{fileName: item.fileList[0].fileName, filePath:url,fileSize:item.fileList[0].fileSize,createTime:item.fileList[0].createTime}]
      this.ruleForm.filePath = JSON.stringify(this.fileList)
      this.dialogVisible = true
    },
    /**
     * 删除
     */
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteEarlytList(item.id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.list = []
      this.total = 0
      this.listLoading = true
      const [ startTime, endTime ] = this.searchForm.timeList || []
      let query = {
        screenStartTime:startTime ? startTime +' 00:00:00' :'',
        screenEndTime:endTime ? endTime +' 23:59:59' : '',
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      if (this.type==='天气信息'){
        query.cityId = this.searchForm.cityId
        getList(query).then(res => {
          this.list = res.data ? res.data.records : []
          this.total = res.data ? res.data.total : 0
          this.listLoading = false
        })
      } else {
        query.title = this.searchForm.title
        getEarlytList(query).then(res => {
          this.list = res.data ? res.data.records : []
          if (this.list){
            this.list.map(item=>{
              let file = item.filePath ? JSON.parse(item.filePath) : [{}]
              item.filePath = file[0].filePath
              item.fileList = file
              item.fileName = file[0].fileName
              item.fileSize = file[0].fileSize
              const url = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
              let fileExtension = url ? url.split('.').pop().toLowerCase() : ''
              if (fileExtension==='pdf'){
                item.suffix = 'pdf'
              } else if (fileExtension==='png' || fileExtension==='jpeg' || fileExtension==='jpg'){
                item.suffix = 'images'
              } else {
                item.suffix = 'other'
              }
              return item
            })
          }
          this.total = res.data ? res.data.total : 0
          this.listLoading = false
        })
      }

    },
    handleDownload(item) {
      const url = item.filePath ? item.filePath : (item.path ? item.path : (item.url ? item.url : ''))
      downloadCodeImg(url,item.fileName)
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 重置查询条件
     */
    resetForm() {
      this.searchForm = {
        cityId: '',
        title:'',
        timeList: []
      }
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },

    /**
     * 详情
     */
    handleDetail(item) {
      this.$router.push({ path: '/emergency/data/meteorological/detail', query: { id: item ? item.id : null}})
    }
  }
}
</script>
