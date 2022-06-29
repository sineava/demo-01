<template>
  <div class="body-card">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="手动添加检查项" name="add">
        <div
          v-if="isadd"
        >
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            label-width="140px"
            size="medium"
            class="two-column-input-table"
            :rules="rules"
            :disabled="isDisabled ? true : false"
          >
            <el-form-item
              label="检查项目:"
              prop="name"
            >
              <el-input v-model.trim="ruleForm.name" placeholder="请输入检查项目" maxlength="30" />
            </el-form-item>
            <el-form-item
              label="检查项目类别:"
              prop="categoryId"
            >
              <el-select
                v-model="ruleForm.categoryId"
                clearable
                placeholder="请选择检查项目类别"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="检查项目需要:"
              prop="needed"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.needed"
                type="textarea"
                rows="7"
                maxlength="200"
                placeholder="请输入检查项目需要"
                show-word-limit
              />
            </el-form-item>
            <el-form-item
              label="检查方法:"
              prop="mode"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.mode"
                type="textarea"
                rows="7"
                maxlength="200"
                placeholder="请输入检查方法"
                show-word-limit
              />
            </el-form-item>
            <el-form-item
              label="检查依据:"
              prop="basis"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.basis"
                type="textarea"
                rows="7"
                maxlength="200"
                placeholder="请输入检查依据"
                show-word-limit
              />
            </el-form-item>
            <el-form-item
              label="检查内容:"
              prop="content"
              style="width: 100%;"
            >
              <el-input
                v-model="ruleForm.content"
                type="textarea"
                rows="7"
                maxlength="200"
                placeholder="请输入检查内容"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="关联法律法规:">
              <div v-if="ruleForm.legislationId && legislation.fileName"><span style="font-weight: bolder; color: #409eff;">已关联：</span>{{ legislation.fileName }}</div>
            </el-form-item>
            <laws-and-regulations @getLegislation="getLegislation" />
          </el-form>
        </div>
        <div v-if="isadd" class="backstage-edit-btn">
          <el-button
            size="medium"
            @click="returnBack"
          >
            返回
          </el-button>
          <el-button
            v-if="!isDisabled"
            type="primary"
            size="medium"
            :loading="loading"
            @click="submitForm('ruleForm')"
          >
            保存
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已有检查项" name="list">
        <div v-if="!isadd" class="app-container">
          <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            size="small"
          >
            <el-form-item
              label="关键字:"
              prop="name"
            >
              <el-input
                v-model="searchForm.name"
                placeholder="请输入关键字"
              />
            </el-form-item>
            <el-form-item
              label="检查项分类:"
              prop="categoryId"
            >
              <el-select
                v-model="searchForm.categoryId"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="fetchData"
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
              <el-button
                size="small"
                icon="el-icon-refresh-left"
                @click="add"
              >
                新增
              </el-button>
            </el-form-item>
          </el-form>
          <el-table
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
            <div />
            <el-table-column
              label="编号"
              width="65"
            >
              <template v-slot="scope">
                <span>{{ (pageSize * (currentPage - 1) ) + scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="名称"
              prop="name"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="检查项分类"
              prop="categoryName"
              :show-overflow-tooltip="true"
            />
            <!-- <el-table-column label="危险等级">
          <template v-slot="scope">
            <span>{{ scope.row.riskLevel === 1 ? '一般' : '重大' }}</span>
          </template>
        </el-table-column> -->
            <el-table-column
              label="检查方法"
              :show-overflow-tooltip="true"
              prop="mode"
            />
            <el-table-column
              label="相关依据"
              :show-overflow-tooltip="true"
              prop="basis"
            />
            <el-table-column
              label="检查内容"
              :show-overflow-tooltip="true"
              prop="content"
            />
            <el-table-column
              label="提交人"
              prop="createBy"
            />
            <el-table-column
              label="提交时间"
              prop="createTime"
            />
            <el-table-column
              label="操作"
              width="100px"
            >
              <template v-slot="scope">
                <el-button
                  size="mini"
                  plain
                  @click="handleAdd(scope.row)"
                >
                  <em class="el-icon-edit" /> 添加
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { pageList, nameExist, addItem, updateItem } from '@/api/general-services/safety-supervision-and-inspection/safetyItem'
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import pagination from '@/components/Pagination'
import LawsAndRegulations from './LawsAndRegulations'
import moment from 'moment'
export default {
  components: {
    pagination,
    LawsAndRegulations
  },
  data() {
    const nameExistFun = async(rule, value, callback) => {
      const res = await nameExist(value)
      if (res.data && this.detailName !== value) {
        callback(new Error('检查项目名称重复'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      dialogVisiblelaws:false,
      legislation: {},
      activeName: 'list',
      detailName: '',
      ruleForm: {
        id: '',
        name: '',
        riskLevel: '',
        categoryId: '',
        needed: '',
        mode: '',
        basis: '',
        content: '',
        legislationId: ''
      },
      categoryList: [],
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入检查项目', trigger: 'blur' },
          { trigger: 'blur', validator: nameExistFun }
        ],
        categoryId: [
          { required: true, message: '请选择检查项目类别', trigger: 'change' }
        ],
        /*
         * riskLevel: [
         *   { required: true, message: '请选择危险等级', trigger: 'change' }
         * ],
         */
        /*
         * needed: [
         *   { required: true, message: '请输入检查项目需要内容', trigger: 'blur' }
         * ],
         */
        /*
         * mode: [
         *   { required: true, message: '请输入检查方法', trigger: 'blur' }
         * ],
         * basis: [
         *   { required: true, message: '请输入检查依据', trigger: 'blur' }
         * ],
         */
        content: [
          { required: true, message: '请输入检查内容', trigger: 'blur' }
        ]
      },
      isDisabled: false,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      isadd:false,
      searchForm: {
        name: '',
        categoryId: '',
        riskLevel: ''
      },
    }
  },
  async mounted() {
    const res = await findByCategoryList({ type: 1 })
    this.categoryList = res.data
    this.fetchData()
  },
  methods: {
    handleClick(tab, event) {
      this.isadd = tab.name==='add' ? true : false
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = { ...this.searchForm }
      data.pageNum = this.currentPage
      data.pageSize = this.pageSize
      pageList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
      })
    },
    add(){
      this.isadd = true
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    handleAdd(item) {
      this.$emit('getCheckItems', item)
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveSubmit()
        } else {
          return false
        }
      })
    },
    async saveSubmit() {
      const data = { ...this.ruleForm }
      this.loading = true
      data.riskLevel = 2
      const res = this.ruleForm.id ? await updateItem(data) : await addItem(data)
      this.loading = false
      if (res.code === '0') {
        this.fetchData()
        let categoryName = ''
        this.categoryList.forEach(element => {
          if (this.ruleForm.categoryId===element.id){
            categoryName = element.name
            return false
          }
        })
        const item = {
          basis: this.ruleForm.basis,
          categoryId: this.categoryId,
          categoryName: categoryName,
          content: this.ruleForm.content,
          createBy: "",
          createTime: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
          id: res.data,
          legislationId: null,
          legislationName: null,
          mode: this.ruleForm.mode,
          name: this.ruleForm.name,
          needed: this.ruleForm.needed,
        }
        this.returnBack()
        this.$emit('getCheckItems', item)
      }
    },
    getLegislation(item) {
      this.ruleForm.legislationId = item.id
      this.legislation = item
      this.dialogVisiblelaws = false
    },
    // 返回
    returnBack() {
      this.isadd = false
      this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>

