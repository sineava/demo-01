<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="medium"
    >
      <div class="icon-title">
        <span class="span" />基础信息
      </div>
      <el-form-item
        label="栏目名称:"
        prop="columnName"
      >
        <el-input
          v-model="ruleForm.columnName"
          placeholder="请输入栏目名称"
          @input="columnNameEXist"
        />
      </el-form-item>
      <el-form-item
        label="英文名称:"
        prop="englishName"
      >
        <el-input v-model.trim="ruleForm.englishName" placeholder="请输入英文名称" />
      </el-form-item>
      <el-form-item
        label="排序:"
        prop="columnSort"
      >
        <el-input-number
          v-model="ruleForm.columnSort"
          :min="1"
          :max="1000"
        />
      </el-form-item>
      <el-form-item
        label="栏目描述:"
        prop="columnDescribe"
      >
        <el-input
          v-model="ruleForm.columnDescribe"
          class="textarea"
          type="textarea"
          show-word-limit
          rows="3"
          maxlength="50"
          placeholder="请输入栏目描述"
        />
      </el-form-item>

      <el-form-item
        label="栏目图标:"
        prop="columnIcon"
      >
        <picture-upload
          ref="picture"
          :width="100"
          :height="100"
          @handleAvatarSuccess="handleAvatarSuccess"
        />
      </el-form-item>
      <div class="icon-title" style="float: left; margin-top: 20px;">
        <span class="span" />功能信息 <span style="margin-left: 30px;"><el-button
          type="primary"
          size="mini"
          @click="addFeature"
        >添加功能</el-button></span>
      </div>
      <template>
        <el-table
          :data="tableData"
          border
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          style="width: 100%;"
        >
          <el-table-column
            prop="directoryName"
            label="功能名称"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="menuDescribe"
            label="功能描述"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="menuName"
            label="所选系统功能项"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column
            prop="city"
            label="排序"
          /> -->
          <el-table-column
            label="状态"
            :show-overflow-tooltip="true"
            width="80"
          >
            <template v-slot="scope">
              <el-tag :type="scope.row.isEnable ? 'success' : 'warning'">
                {{ scope.row.isEnable ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="150"
          />
          <el-table-column
            label="操作"
            width="140"
          >
            <template v-slot="scope">
              <el-button
                type="text"
                size="small"
                @click="handleClickEdit(scope.row,scope.$index)"
              >
                编辑
              </el-button>
              <el-button
                v-if="scope.row.isEnable===1"
                type="text"
                size="small"
                @click="handleClick(scope.row,scope.$index,0)"
              >
                禁用
              </el-button>
              <el-button
                v-if="scope.row.isEnable===0"
                type="text"
                size="small"
                @click="handleClick(scope.row,scope.$index,1)"
              >
                启用
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="handleDel(scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-form>
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium "
        :loading="loading"
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
    <addPage
      ref="addAndEdit"
      :tab-type="tabType"
      @overSave="overSave"
    />
  </div>
</template>
<script>
import { en } from '@/utils/validate'
import { mapState } from 'vuex'
import PictureUpload from '@/components/PictureUpload/index'
import { addColumn, getColumnDetail, updateColumn, columnNameEXist } from '@/api/system-portal/column'
import addPage from './add'
export default {
  components: {
    PictureUpload,
    addPage
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    tabType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      addDialogVisible: false,
      ruleForm: {
        columnDescribe: '',
        columnIcon: '',
        columnName: '',
        columnSort: '',
        englishName: '',
        sysColumnMenuDtoList: []
      },
      tableData: [],
      rules: {
        columnName: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 30, message: '请输入2~30个字符栏目名称', trigger: 'blur' }
        ],
        englishName: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 30, message: '请输入2~30个字符英文名称', trigger: 'blur' },
          { validator: en, trigger: 'blur' }
        ],
        columnSort: [
          { required: true, message: '请输入排序序号', trigger: 'blur' }
        ]
      },
      data: [],
      checkTreeList: [],
      checkedKeys: [],
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.user_info[0],
      tokenStr: state => state.user.token_str
    })
  },
  async mounted() {
    if (this.id) {
      const info = await getColumnDetail(this.id)
      this.ruleForm = {
        columnDescribe: info.data.columnDescribe,
        columnIcon: info.data.columnIcon,
        columnName: info.data.columnName,
        columnSort: info.data.columnSort,
        englishName: info.data.englishName,
        sysColumnMenuDtoList: []
      }
      this.tableData = info.data && info.data.sysColumnMenuVoList ? info.data.sysColumnMenuVoList : []
      this.$refs.picture.setImgUrl(this.ruleForm.columnIcon)
      this.checkedKeys = []
      this.checkTreeList = []
      info.data.sysColumnMenuVoList.forEach(item => {
        this.checkedKeys.push(item.menuId)
        this.checkTreeList.push(item)
      })
    }
  },
  methods: {
    /**
     * 添加功能
     */
    addFeature() {
      if (!this.ruleForm.columnName) {
        this.$message.error('请先输入栏目名称')
      } else {
        this.$refs.addAndEdit.open(this.tabType, this.tableData, this.ruleForm.columnName, '', -1)
      }
    },
    /**
     * 完成保存操作
     */
    overSave(formObj, index) {
      if (index === -1) { // 添加
        this.tableData.push(formObj)
      } else { // 编辑
        this.tableData[index] = formObj
      }
      /*
       * if (index > -1) {
       *   this.tableData[index] = formObj
       * } else {
       *   this.tableData = []
       *   this.tableData.push(formObj)
       * }
       */
    },
    /**
     * 修改
     */
    handleClickEdit(row, index) {
      if (!this.ruleForm.columnName) {
        this.$message.error('请先输入栏目名称')
      } else {
        this.$refs.addAndEdit.open(this.tabType, this.tableData, this.ruleForm.columnName, row, index)
      }
    },
    /**
     * 停用或启用
     */
    handleClick(_, index, isEnable) {
      this.tableData[index].isEnable = isEnable
    },
    /**
     * 删除某一项
     */
    handleDel(index) {
      this.tableData.splice(index, 1)
    },
    /**
     * 查询栏目名称是否存在
     */
    columnNameEXist(val) {
      columnNameEXist({ columnName: val }).then(res => {
        if (res.data) {
          this.$message.error('栏目名称已存在！')
          return false
        }
      })
    },
    /**
     * 上传头像成功
     */
    handleAvatarSuccess(res) {
      this.ruleForm.columnIcon = res.data
    },
    returnBack() {
      this.$emit('preservationEnd', this.tabType)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.tableData.length <= 0) {
            this.$message.warning('请添加功能')
            return false
          }
          const data = {
            ...this.ruleForm,
            columnType: this.tabType,
            id: null
          }
          const tData = this.tableData.map(x => ({
            ...x,
            menuId: typeof x.menuId === 'number' ? x.menuId : x.menuId[x.menuId.length - 1]
          }))
          tData.forEach((key, index) => {
            delete tData[index].updateTime
          })
          data.sysColumnMenuDtoList = tData
          if (this.id) {
            data.id = this.id
          }
          this.loading = true
          const res = this.id ? await updateColumn(data) : await addColumn(data)
          this.loading = false
          if (res.code === '0') {
            this.returnBack()
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
    .title {
        display: flex;
        margin: 10px 0 30px 0;
        font-size: 14px;
        font-weight: bold;
        align-items: center;

        .span {
            display: inline-block;
            margin-right: 7px;
            width: 6px;
            height: 18px;
            background-color: #409eff;
        }
    }
}
</style>
