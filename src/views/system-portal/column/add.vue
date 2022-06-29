<template>
  <el-dialog
    :visible="addDialogVisible"
    title="添加功能"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :before-close="returnBack"
    width="900px"
  >
    <div class="app-container" style="padding: 0;">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="130px"
        size="medium"
      >
        <div class="icon-title">
          <span class="span" />基础信息
        </div>
        <el-form-item
          label="功能名称:"
          prop="directoryName"
        >
          <el-input
            v-model.trim="ruleForm.directoryName"
            maxlength="30"
            placeholder="请输入功能名称"
          />
        </el-form-item>
        <el-form-item
          label="功能icon:"
        >
          <img v-if="activeIcon>0" style="margin-right: 20px; width: 40px; height: 40px;" :src="require(`@/assets/column/icon (${activeIcon}).png`)">
          <el-button class="add-btn"><i class="el-icon-circle-plus-outline add-icon" @click="show = !show" /></el-button>
          <el-popover
            ref="popover"
            :value.sync="show"
            placement="right"
            width="660"
          >
            <div style="display: flex; flex-wrap: wrap;">
              <img
                v-for="(item, index) in imgList"
                :key="index"
                :src="require(`@/assets/column/icon (${index+1}).png`)"
                style="margin: 0 0 20px 20px; width: 40px; height: 40px; cursor: pointer;"
                @click="handleSelect(index)"
              >
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item
          label="所属栏目:"
          prop="columnName"
        >
          <el-input
            v-model.trim="columnName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="选择系统功能项:"
          prop="menuId"
        >
          <el-cascader
            v-model="ruleForm.menuId"
            popper-class="cascader"
            :options="options"
            :props="{ checkStrictly: true ,value: 'funcId' ,label: 'funcName', children:'nextObj'}"
            clearable
            placeholder="请选择选择系统功能项"
          />
        </el-form-item>
        <el-form-item
          label="排序:"
          prop="menuSort"
        >
          <el-input-number
            v-model="ruleForm.menuSort"
            style="width: 400px;"
            :min="1"
            :max="1000"
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="ruleForm.isEnable"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item
          label="功能描述:"
          prop="menuDescribe"
        >
          <el-input
            v-model.trim="ruleForm.menuDescribe"
            class="textarea"
            type="textarea"
            show-word-limit
            maxlength="100"
            :autosize="{ minRows: 5, maxRows: 5}"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        style="text-align: center;"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="medium "
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
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
import { queryFuncNwMenu, queryFuncWwMenu } from '@/api/user'
import { momentDate } from '@/utils/index'
export default {
  data() {
    return {
      addDialogVisible: false,
      columnName: '',
      index: 0,
      tabType: '',
      show: false,
      ruleForm: {
        directoryName: '', // 功能名称
        icon: '', // ICON图标
        isEnable: 0, // 是否启用（0 未启用 1启用 默认0）
        menuId: '', // 菜单ID
        menuDescribe: '', // 描述
        menuName: '', // 名称(所选功能名称)
        parentId: 0, // 父级编号
        updateTime: '', // 更新时间
        menuSort: undefined,
        url: '' // 路由地址
      },
      tableData: [],
      options: [],
      data: [],
      activeIcon: -1,
      rules: {
        directoryName: [
          { required: true, message: '请输入功能名称', trigger: 'blur' },
          { min: 2, max: 30, message: '请输入2~30个字符功能名称', trigger: 'blur' }
        ],
        menuId: [
          { required: true, message: '请输入选择系统功能项', trigger: 'change' }
        ],
        menuDescribe: [
          { required: true, message: '请输入功能描述', trigger: 'blur' }
        ],
        menuSort: [
          { required: true, message: '请输入显示顺序', trigger: 'blur' }
        ]
      },
      checkTreeList: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      imgList: []
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.user_info[0],
      tokenStr: state => state.user.token_str
    })
  },
  async mounted() {
    this.imgList = []
    for (let i=0; i<40; i++) {
      this.imgList.push('')
    }
  },
  methods: {
    /**
     * 打开弹窗
     */
    open(tabType, tableData, columnName, ruleForm, index) {
      this.tableData = tableData
      this.columnName = columnName
      this.addDialogVisible = true
      this.index = index
      this.tabType = tabType
      this.init()
      this.ruleForm = {}
      this.activeIcon = 0
      if (ruleForm) {
        this.ruleForm = ruleForm
        this.activeIcon = this.ruleForm.icon || 0
      }
    },
    async init() {
      const queryInfo = {
        tokenStr: this.tokenStr,
        systemId: this.userInfo.systemid
      }
      const res = this.tabType === '1' ? await queryFuncNwMenu(queryInfo) : await queryFuncWwMenu(queryInfo)
      if (res.data) {
        const dataList = []
        res.data.forEach((v1, k1) => {
          res.data[k1].disabled = this.isExistence(v1.funcId)
          res.data[k1].parentId = 0
          dataList.push(this.assembleDataList(res.data[k1]))
          if (v1.nextObj && v1.nextObj.length > 0) {
            v1.nextObj.forEach((v2, k2) => {
              res.data[k1].nextObj[k2].disabled = this.isExistence(v2.funcId)
              res.data[k1].nextObj[k2].parentId = v1.funcId
              dataList.push(this.assembleDataList(res.data[k1].nextObj[k2]))
              if (v2.nextObj && v2.nextObj.length > 0) {
                v2.nextObj.forEach((v3, k3) => {
                  res.data[k1].nextObj[k2].nextObj[k3].disabled = this.isExistence(v3.funcId)
                  res.data[k1].nextObj[k2].nextObj[k3].parentId = v2.funcId
                  dataList.push(this.assembleDataList(res.data[k1].nextObj[k2].nextObj[k3]))
                })
              } else {
                delete res.data[k1].nextObj[k2].nextObj
              }
            })
          } else {
            delete res.data[k1].nextObj
          }
        })
        this.data = dataList
      }
      this.options = []
      res.data.forEach(item => {
        this.options.push(item)
      })
    },
    /**
     * 组装列表所需数据
     */
    assembleDataList(obj) {
      return {
        menuId: obj.funcId, // 菜单ID
        menuName: obj.funcName, // 名称(所选功能名称)
        parentId: obj.parentId, // 父级编号
        updateTime: momentDate(new Date()), // 更新时间
        icon: obj.icon, // ICON
        url: obj.funcUrl // 路由地址})
      }
    },
    handleSelect(index) {
      this.activeIcon = index + 1
      this.show = false
      this.$refs.popover.doClose()
    },
    isExistence(val) {
      if (!this.tableData || this.tableData.length === 0) {
        return false
      }
      if (val === this.ruleForm.menuId) return false
      let exit = false
      this.tableData.forEach(v => {
        if (v.menuId === val) {
          exit = true
          return false
        }
      })
      return exit
    },
    /**
     * 关闭弹窗
     */
    returnBack() {
      this.addDialogVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let menu = {
            menuId: '', // 菜单ID
            menuName: '', // 名称(所选功能名称)
            parentId: '', // 父级编号
            updateTime: momentDate(new Date()), // 更新时间
            icon: this.activeIcon, // ICON
            url: '' // 路由地址})
          }
          const menuId = typeof (this.ruleForm.menuId) === 'object' ? this.ruleForm.menuId[this.ruleForm.menuId.length - 1] : this.ruleForm.menuId
          this.data.forEach(v => {
            if (v.menuId === menuId) {
              menu = v
            }
          })
          this.ruleForm = { ...this.ruleForm, ...menu }
          if (this.activeIcon > 0) {
            this.ruleForm.icon = this.activeIcon
          } else {
            this.$message.error('请添加功能icon')
            return false
          }
          this.$emit('overSave', this.ruleForm, this.index)
          this.returnBack()
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.cascader {
    .el-radio__input.is-disabled .el-radio__inner, .el-radio__input.is-disabled.is-checked .el-radio__inner {
        border-color: #949494 !important;
        background-color: #949494 !important;
    }
}
</style>
<style lang="scss" scoped>
.app-container {
    .title {
        display: flex;
        margin: 10px 0 20px 0;
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

    .add-icon {
        font-size: 40px;
        cursor: pointer;
    }

    .add-btn {
        margin: 0;
        border: 0;
        padding: 0;
    }
}
</style>
