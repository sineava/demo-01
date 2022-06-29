<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶管理企业船舶变更备案详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="info.isStatus === 2 && isDisabled"
          type="primary"
          @click="isDisabled=false"
        >
          重新提交
        </el-button>
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 企业基本资料
    </div>
    <div style="margin-bottom: 20px; color: #666666;">
      船舶管理企业名称 ：{{ enterpriseInfo.enterpriseName }}
    </div>
    <div class="icon-title">
      <span class="span" /> 变更的船舶
    </div>
    <expand-table
      :table-list="shipBeforeChangeInfoDtoList"
      :is-disabled="isDisabled"
    />
    <div
      v-if="!isDisabled"
      class="table-add"
      @click="addDialog(1)"
    >
      <i class="el-icon-plus" />船舶信息
    </div>
    <div
      style="margin-top: 20px;"
      class="icon-title"
    >
      <span class="span" /> 变更后的船舶
    </div>
    <expand-table
      :table-list="shipAfterChangeInfoDtoList"
      :is-disabled="isDisabled"
    />
    <div
      v-if="!isDisabled"
      class="table-add"
      @click="addDialog(2)"
    >
      <i class="el-icon-plus" />船舶信息
    </div>
    <div
      style="margin-top: 20px;"
      class="icon-title"
    >
      <span class="span" />附件
    </div>
    <upload
      v-if="!isDisabled && enclosureInfo.length<6"
      style="width: 100%;"
      file
      :show-file-list="false"
      :limit="9"
      multiple
      @fileSuccess="uploadSuccess"
    />
    <common-table
      v-if="!isDisabled"
      :table-data="enclosureInfo"
      show-download
      show-delete
      @handleDelete="handleDelete"
    />
    <common-table
      v-if="isDisabled"
      :table-data="enclosureInfo"
      show-download
    />
    <div
      v-if="info.isStatus >= 2"
      style="margin-top: 20px;"
    >
      <div class="icon-title">
        <span class="span" /> 审核信息
      </div>
      <div class="list-column-wrap">
        <div class="info-list">
          <div class="label">
            审核状态：
          </div><div class="content">
            {{ info.isStatus===1?'审核中':(info.isStatus===2?'退回':'已审核') }}
          </div>
        </div>
        <div class="info-list">
          <div class="label">
            审核人：
          </div><div class="content">
            {{ info.reviewedBy }}
          </div>
        </div>
        <div class="info-list">
          <div class="label">
            审核时间：
          </div><div class="content">
            {{ info.reviewedDate }}
          </div>
        </div>
        <div
          class="info-list"
          style="width: 100%;"
        >
          <div class="label">
            审核意见：
          </div><div class="content">
            {{ info.reviewedOpinion }}
          </div>
        </div>
      </div>
      <div class="icon-title">
        <span class="span" />审核附件
      </div>
      <common-table
        :table-data="info.reviewedFile"
        show-download
      />
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      title="添加船舶信息"
      width="600px"
    >
      船舶名称：
      <el-select
        v-model="activeIndex"
        filterable
        placeholder="请选择船舶名称"
      >
        <el-option
          v-for="(item, index) in dialogList"
          :key="item.id"
          :label="item.shipName"
          :value="index"
        />
      </el-select>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
    <div class="backstage-edit-btn">
      <el-button
        v-if="!isDisabled"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
      >
        提交
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
import upload from '@/components/upload'
import { addData, getInfo, updateData } from '@/api/water-transportation-services/keep-on-record/ship-manage-en-ship-change-filing'
import { shipManageShipList } from '@/api/water-transportation-services/information/enterprise-ship'
import { momentDate } from '@/utils/index'
import CommonTable from '@/components/features/FileTable.vue'
import ExpandTable from './ExpandTable.vue'
export default {
  components: {
    upload,
    CommonTable,
    ExpandTable
  },
  data() {
    return {
      rules: {
        shipId: [
          { required: true, message: '请选择船舶名称', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      dialogList: [],
      dialogType: 1,
      activeIndex: '',
      shipBeforeChangeInfoDtoList: [], // 变更前table数据
      shipAfterChangeInfoDtoList: [], // 变更后table数据
      enterpriseInfo: {},
      shipList: [], // 变更前船舶列表
      changeShipList: [], // 变更后船舶列表
      info: {},
      loading: false,
      isDisabled: false,
      enclosureInfo: [],
      shipLicenseNo: ''
    }
  },
  async mounted() {
    this.enterpriseInfo = this.$store.getters.enterprise
    // 查询变更前的船舶数据
    this.shipList = (await shipManageShipList({ enterpriseId: this.enterpriseInfo.id, type: 1, shipName: '' })).data
    // 查询变更后的船舶数据
    this.changeShipList = (await shipManageShipList({ enterpriseId: this.enterpriseInfo.id, type: 2, shipName: '' })).data
    // 查询详情
    if (this.$route.query.id) {
      let info = await getInfo(this.$route.query.id)
      try {
        info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
      } catch (e) {
        console.log()
      }
      this.info = info.data
      this.enclosureInfo = info.data.enclosureInfo
      this.shipBeforeChangeInfoDtoList = info.data.shipBeforeChangeInfoDtoList
      this.shipAfterChangeInfoDtoList = info.data.shipAfterChangeInfoDtoList
      this.isDisabled = true
    }
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.enclosureInfo.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(file.raw.lastModifiedDate || file.raw.uid)
      })
    },
    // 移除
    handleDelete(val) {
      this.enclosureInfo.splice(val.index, 1)
    },
    addDialog(type) {
      this.dialogType = type
      this.dialogList = type === 1 ? this.shipList : this.changeShipList
      this.activeIndex = ''
      this.dialogVisible = true
    },
    /**
     * 确认添加
     */
    dialogSubmit() {
      if (this.activeIndex === '') {
        this.$message.error('请选择船舶')
        return false
      }
      if (this.dialogType === 1) { // 变更前
        let i = 0
        this.shipBeforeChangeInfoDtoList.forEach(item => {
          if (item.id === this.dialogList[this.activeIndex].id) {
            this.$message.error('你已添加过这条船，不能重复添加')
            return true
          }
        })
        if (i===0){
          this.shipBeforeChangeInfoDtoList.push(this.dialogList[this.activeIndex])
        }
      } else { // 变更后
        let i = 0
        this.shipAfterChangeInfoDtoList.forEach(item => {
          if (item.id === this.dialogList[this.activeIndex].id) {
            this.$message.error('你已添加过这条船，不能重复添加')
            i++
            return true
          }
        })
        if (i===0){
          this.shipAfterChangeInfoDtoList.push(this.dialogList[this.activeIndex])
        }
      }
      this.dialogVisible = false
    },
    /**
     * 保存
     */
    async submitForm() {
      if (this.shipBeforeChangeInfoDtoList.length === 0) {
        this.$message.warning('请添加变更的船舶信息')
        return
      }
      if (this.shipAfterChangeInfoDtoList.length === 0) {
        this.$message.warning('请添加变更后的船舶信息')
        return
      }
      // 把id改成shipid跟后台要求字段一致（...）
      this.shipAfterChangeInfoDtoList.forEach(item => {
        item.shipId = item.id || item.filingId
        delete item.id
        delete item.filingId
      })
      this.shipBeforeChangeInfoDtoList.forEach(item => {
        item.shipId = item.id || item.filingId
        delete item.id
        delete item.filingId
      })
      let data = {
        id: this.$route.query.id || '',
        enclosureInfo: JSON.stringify(this.enclosureInfo),
        enterpriseId: this.enterpriseInfo.id,
        isStatus: this.info.isStatus || '',
        shipAfterChangeInfoDtoList: this.shipAfterChangeInfoDtoList,
        shipBeforeChangeInfoDtoList: this.shipBeforeChangeInfoDtoList
      }
      this.loading = true
      let res = this.$route.query.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .table-top-column-there {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-form-item {
        width: 30%;

        .el-select {
            width: 100%;
        }

        .is-disabled {
            .el-input__inner, .el-textarea__inner {
                background-color: #ffffff;
            }
        }
    }
}

.table-add {
    border: 1px solid #ebeef5;
    border-top: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #666666;
    cursor: pointer;
}

/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
    }
}
</style>
