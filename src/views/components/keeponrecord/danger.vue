<template>
  <el-form
    ref="securityData"
    :model="securityData"
    :rules="rules"
    label-width="0"
    class="base-securityData"
  >
    <div class="icon-title">
      <span class="span" /> 审核信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="securityData-title"
      contentClassName="securityData-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">所在地市港口管理部门:</template>
        {{securityData.organizationName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">港口企业名称:</template>
        {{securityData.enterpriseName}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />重大危险源库区名称:</template>
        <el-form-item v-if="isEdit" prop="warehouseAreaName">
          <el-input v-model="securityData.warehouseAreaName" placeholder="请输入重大危险源库区名称" maxlength="30" />
        </el-form-item>
        <span v-else>{{ securityData.warehouseAreaName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人:</template>
        <el-form-item v-if="isEdit" prop="contactsName">
          <el-input v-model="securityData.contactsName" placeholder="请输入联系人" maxlength="50" />
        </el-form-item>
        <span v-else>{{ securityData.contactsName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系方式:</template>
        <el-form-item v-if="isEdit" prop="contactsPhone">
          <el-input
            v-model="securityData.contactsPhone"
            maxlength="20"
            placeholder="请输入联系方式"
          />
        </el-form-item>
        <span v-else>{{ securityData.contactsPhone }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />备案日期:</template>
        <el-form-item v-if="isEdit" prop="filingDate">
          <el-date-picker
            v-model="securityData.filingDate"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择备案日期："
          />
        </el-form-item>
        <span v-else>{{ securityData.filingDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />重大危险源库区所在地址:</template>
        <el-form-item v-if="isEdit" prop="warehouseAreaAddress">
          <el-input v-model="securityData.warehouseAreaAddress" placeholder="请输入重大危险源库区所在地址" maxlength="50" />
        </el-form-item>
        <span v-else>{{ securityData.warehouseAreaAddress }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">投入使用时间:</template>
        <el-form-item v-if="isEdit" prop="useDate">
          <el-date-picker
            v-model="securityData.useDate"
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择备案日期："
          />
        </el-form-item>
        <span v-else>{{ securityData.useDate }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">重大危险源级别:</template>
        <el-form-item v-if="isEdit" prop="level">
          <el-input
            v-model="securityData.level"
            maxlength="20"
            placeholder="请输入重大危险源级别"
          />
        </el-form-item>
        <span v-else>{{ securityData.level }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">R值:</template>
        <el-form-item v-if="isEdit" prop="rvalue">
          <el-input
            v-model="securityData.rvalue"
            maxlength="20"
            placeholder="请输入R值"
          />
        </el-form-item>
        <span v-else>{{ securityData.rvalue }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">是否位于化工（工业）园区内:</template>
        <el-form-item v-if="isEdit" prop="isInPark">
          <el-radio-group v-model="securityData.isInPark" style="width: 100%;">
            <el-radio :label="1">
                是
            </el-radio>
            <el-radio :label="0">
                否
            </el-radio>
            </el-radio-group>
        </el-form-item>
        <span v-else>{{ securityData.isInPark ? '是' : '否' }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">重大危险源与周边重点防护目标最近距离情况（m）:</template>
        <el-form-item v-if="isEdit" prop="peripheralDistance">
          <el-input-number
            v-model="securityData.peripheralDistance"
            style="width: 100%;"
            :precision="2"
            :min="1"
            :controls="false"
            :max="99999999"
            placeholder="请输入重大危险源与周边重点防护目标最近距离情况（m）"
            />
        </el-form-item>
        <span v-else>{{ securityData.peripheralDistance }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">罐区边界外500m范围内人数估算值:</template>
        <el-form-item v-if="isEdit" prop="personNumber">
          <el-input-number
            v-model="securityData.personNumber"
            style="width: 100%;"
            :precision="2"
            :min="1"
            :controls="false"
            :max="99999999"
            placeholder="请输入罐区边界外500m范围内人数估算值"
            />
        </el-form-item>
        <span v-else>{{ securityData.personNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">库区内构成重大危险源物质的种类、数量或者储存方式及其相关设备、设施（分类填写）:</template>
        <el-form-item v-if="isEdit" prop="dangerGoodsDetail">
          <el-input
              v-model="securityData.dangerGoodsDetail"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入库区内构成重大危险源物质的种类、数量或者储存方式及其相关设备、设施（分类填写）"
            />
        </el-form-item>
        <span v-else>{{ securityData.dangerGoodsDetail }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">近三年内港口危险货物事故情况:</template>
        <el-form-item v-if="isEdit" prop="accident">
          <el-input
              v-model="securityData.accident"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入近三年内港口危险货物事故情况"
            />
        </el-form-item>
        <span v-else>{{ securityData.accident }}</span>
      </el-descriptions-item>
    </el-descriptions>

    <template v-if="securityData.filingForm === 3">
      <div class="icon-title">
        <span class="span" />注销申请
      </div>
      <el-descriptions
        class="descriptions-one"
        :column="2"
        :colon="true"
        size="medium"
        labelClassName="securityData-title"
        contentClassName="securityData-text"
        border
      >
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />注销原因:</template>
          <el-form-item v-if="isEdit" prop="cancellationReason">
            <el-input
              v-model="securityData.cancellationReason"
              type="textarea"
              rows="6"
              maxlength="200"
              placeholder="请输入注销原因"
              show-word-limit
            />
          </el-form-item>
          <span v-else>{{ securityData.cancellationReason }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </template>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /><i v-if="isEdit" class="required" style="margin-right: 10px;" />备案登记表 <el-button v-if="isEdit" @click="addTable" style="margin-left: 20px;" icon="el-icon-plus" size="mini" type="success">添加</el-button>
    </div>
    <el-table 
        :data="majorHazardGoodsInventoryVoList"  
        :header-cell-style="{'text-align':'center'}"
        stripe
        fit
        highlight-current-row
        :cell-style="{'text-align':'center'}">
        <el-table-column
            label="编号"
            width="55"
            type="index"
        />
        <el-table-column label="">
            <template slot="header">
                <i v-if="isEdit" class="required" />港口危险货物名称
            </template>
            <template v-slot="scope">
                <el-input v-if="isEdit" v-model="scope.row.goodsName" placeholder="请输入港口危险货物名称" />
                <span v-else>{{scope.row.goodsName}}</span>
            </template>
        </el-table-column>
        <el-table-column label="UN编号">
            <template v-slot="scope">
                <el-input v-if="isEdit" v-model="scope.row.unCode" placeholder="请输入UN编号" />
                <span v-else>{{scope.row.unCode}}</span>
            </template>
        </el-table-column>
        <el-table-column label="临界量（t）">
            <template v-slot="scope">
                <el-input-number
                    v-if="isEdit"
                    v-model="scope.row.criticalValue"
                    style="width: 100%;"
                    :precision="3"
                    :min="1"
                    :controls="false"
                    :max="99999999"
                    placeholder="请输入临界量"
                />
                <span v-else>{{scope.row.criticalValue}}</span>
            </template>
        </el-table-column>
        <el-table-column label="危险性类别">
            <template v-slot="scope">
                <el-input v-if="isEdit" v-model="scope.row.categoryName" placeholder="请输入危险性类别" />
                <span v-else>{{scope.row.categoryName}}</span>
            </template>
        </el-table-column>
        <el-table-column label="储罐组参数">
            <el-table-column label="储罐编号">
                <template v-slot="scope">
                    <el-input v-if="isEdit" v-model="scope.row.tankCode" placeholder="请输入储罐编号" />
                    <span v-else>{{scope.row.tankCode}}</span>
                </template>
            </el-table-column>
            <el-table-column label="罐容量(M3)">
                <template v-slot="scope">
                    <el-input-number
                        v-if="isEdit"
                        v-model="scope.row.tankVolume"
                        style="width: 100%;"
                        :precision="3"
                        :min="1"
                        :controls="false"
                        :max="99999999"
                        placeholder="请输入罐容量"
                    />
                    <span v-else>{{scope.row.tankVolume}}</span>
                </template>
            </el-table-column>
            <el-table-column label="最大存量 （t）">
                <template v-slot="scope">
                    <el-input-number
                        v-if="isEdit"
                        v-model="scope.row.maxStock"
                        style="width: 100%;"
                        :precision="3"
                        :min="1"
                        :controls="false"
                        :max="99999999"
                        placeholder="请输入最大存量"
                    />
                    <span v-else>{{scope.row.maxStock}}</span>
                </template>
            </el-table-column>
            <el-table-column label="储罐形式（浮顶或固定顶）">
                <template v-slot="scope">
                    <el-select v-if="isEdit" v-model="scope.row.tankForm" placeholder="请选择储罐形式">
                        <el-option label="浮顶" :value="1"/>
                        <el-option label="固定顶" :value="2"/>
                    </el-select>
                    <span v-else>{{scope.row.tankForm === 1 ? '浮顶' : '固定顶'}}</span>
                </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="其他">
            <template v-slot="scope">
                <el-input v-if="isEdit" v-model="scope.row.otherInfo" placeholder="请输入其他" />
                <span v-else>{{scope.row.otherInfo}}</span>
            </template>
        </el-table-column>
        <el-table-column v-if="isEdit" width="100" label="操作">
            <template v-slot="scope">
                <el-button @click="delTable(scope.$index)" icon="el-icon-delete" size="mini" type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />附件
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="enclosureInfo"
        @fileSuccess="uploadSuccess($event, 'enclosureInfo')"
        @remove="uploadRemove($event, 'enclosureInfo')"
      />
    <common-table
      :table-data="enclosureInfo"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'enclosureInfo')"
    />
  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
export default {
  components: {
    upload,
    CommonTable
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
  },
  data() {
    return {
      enclosureInfo: [], // 附件
      securityData: {},
      majorHazardGoodsInventoryVoList:[],//清单
      rules: {
        warehouseAreaName: [
          { required: true, message: '请输入重大危险源库区名称', trigger: 'blur' }
        ],
        filingDate: [
          { required: true, message: '请输入备案日期', trigger: 'change' }
        ],
        contactsName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        warehouseAreaAddress: [
          { required: true, message: '请输入重大危险源库区所在地址', trigger: 'blur' }
        ],
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.init(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.init(this.data)
  },
  methods: {
    init(data){
      this.securityData = {
        id:data?.id,
        organizationName:data?.organizationName,
        enterpriseName:data?.enterpriseName,
        contactsName:data?.contactsName,
        contactsPhone:data?.contactsPhone,
        filingDate:data?.filingDate,
        warehouseAreaName:data?.warehouseAreaName,
        warehouseAreaAddress:data?.warehouseAreaAddress,
        useDate:data?.useDate,
        level:data?.level,
        rvalue:data?.rvalue,
        isInPark:data?.isInPark,
        peripheralDistance:data?.peripheralDistance,
        personNumber:data?.personNumber,
        accident:data?.accident,
        dangerGoodsDetail:data?.dangerGoodsDetail,
        cancellationReason:data?.cancellationReason,
        enterpriseId:data?.enterpriseId,
        filingForm:data?.filingForm,
        organizationId:data?.organizationId
      }
      this.majorHazardGoodsInventoryVoList = data && data.majorHazardGoodsInventoryVoList ? data.majorHazardGoodsInventoryVoList : []
      this.enclosureInfo = data && data.enclosureInfo ? JSON.parse(data.enclosureInfo) : []// 附件
    },
    // 文件上传成功钩子
    uploadSuccess(file, listName) {
      this[listName].push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file, listName) {
      this[listName].splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 移除
    handleDelete(val, itemName) {
      this[itemName].splice(val.index, 1)
    },
    addTable(){
        this.majorHazardGoodsInventoryVoList.push({})
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const valid = await this.$refs['securityData'].validate()
      if (valid) {
        res = JSON.parse(JSON.stringify(this.securityData))
        let majorHazardGoodsInventoryDtoList = []
        this.majorHazardGoodsInventoryVoList.forEach(item => {
            if(item.goodsName){
                majorHazardGoodsInventoryDtoList.push({
                    goodsName:item.goodsName,
                    unCode:item.unCode,
                    criticalValue:item.criticalValue,
                    categoryName:item.categoryName,
                    tankCode:item.tankCode,
                    tankVolume:item.tankVolume,
                    maxStock:item.maxStock,
                    tankForm:item.tankForm,
                    otherInfo:item.otherInfo
                })
            }
        });
        if(majorHazardGoodsInventoryDtoList.length===0){
            this.$message.error('请填写备案登记表信息')
            return false
        }
        res.majorHazardGoodsInventoryDtoList = majorHazardGoodsInventoryDtoList
        res.enclosureInfo = JSON.stringify(this.enclosureInfo)
      } else {
        res = false
      }
      return new Promise(resolve => resolve(res))
    }
  }
}
</script>

<style lang="scss" scoped>
.base-securityData {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .securityData-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .securityData-text {
            width: 40%;
            line-height: 30px;
        }
    }
    .descriptions-one{
      margin-bottom: 20px;

        /deep/ .securityData-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .securityData-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
