<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <div class="icon-title">
      <span class="span" /> 基础信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="ruleForm-title"
      contentClassName="ruleForm-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />应急物资名称:</template>
        <el-form-item v-if="isEdit" prop="name">
          <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入应急物资名称" />
        </el-form-item>
        <span v-else>{{ruleForm.name}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">所属管理部门:</template>
        {{ ruleForm.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />应急物资储备点:</template>
        <el-form-item v-if="isEdit" prop="storageId">
          <el-select
            v-model="ruleForm.storageId"
            clearable
            @change="changeStorage"
            placeholder="请选择应急物资储备点"
            style="width: 100%;"
          >
            <el-option
                v-for="item in storage"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{setlectIdToName(storage,ruleForm.storageId,'id','name')}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />应急物资类型:</template>
        <el-form-item v-if="isEdit" prop="type">
          <el-select
            v-model="ruleForm.type"
            clearable
            placeholder="请选择应急物资类型"
            style="width: 80%;"
            >
            <el-option
                v-for="item in materialType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
            </el-select>
            <el-button
                type="primary"
                style="margin-left: 10px;"
                size="small"
                @click="dialogTableVisible = !dialogTableVisible"
            >
                编辑
            </el-button>
        </el-form-item>
        <span v-else>{{setlectIdToName(materialType,ruleForm.type,'id','name')}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />规格型号:</template>
        <el-form-item v-if="isEdit" prop="specifications">
          <el-input v-model.trim="ruleForm.specifications" maxlength="50" placeholder="请输入规格型号" />
        </el-form-item>
        <span v-else>{{ruleForm.specifications}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />计量单位:</template>
        <el-form-item v-if="isEdit" prop="measuringUnit">
          <el-input v-model.trim="ruleForm.measuringUnit" maxlength="20" placeholder="请输入计量单位" />
        </el-form-item>
        <span v-else>{{ruleForm.measuringUnit}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />数量:</template>
        <el-form-item v-if="isEdit" prop="numbers">
          <el-input-number
            v-model="ruleForm.numbers"
            :precision="2"
            :min="0"
            placeholder="请输入数量"
            :controls="false"
            :max="99999999.99"
            style="width: 100%;"
           />
        </el-form-item>
        <span v-else>{{ruleForm.numbers}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />金额:</template>
        <el-form-item v-if="isEdit" prop="money">
          <el-input-number
            v-model="ruleForm.money"
            :precision="2"
            :min="0"
            :max="99999999.99"
            placeholder="请输入金额"
            :controls="false"
            style="width: 100%;"
            />
        </el-form-item>
        <span v-else>{{ruleForm.money}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />应急物资状态:</template>
        <el-form-item v-if="isEdit" prop="state">
          <el-radio-group v-model="ruleForm.state">
            <el-radio
                v-for="(item, index) in field_state"
                :key="index"
                :label="item.value"
            >
                {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <span v-else>{{setlectIdToName(field_state,ruleForm.state,'value','label')}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />入库时间:</template>
        <el-form-item v-if="isEdit" prop="putStorageTime">
          <el-date-picker
            v-model="ruleForm.putStorageTime"
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            placeholder="选择入库时间"
          />
        </el-form-item>
        <span v-else>{{ruleForm.putStorageTime}}</span>
      </el-descriptions-item>
    </el-descriptions>

    <template v-if="ruleForm.storageId">
        <ReservePoint ref="ReservePoint" :isEdit="false" :data="reservePointData"/>
    </template>

    <!-- 应急物资类型管理 -->
    <el-dialog
      title="应急物资类型管理"
      :close-on-click-modal="false"
      :visible.sync="dialogTableVisible"
      @close="closeDialog"
    >
      <el-table
        :data="materialType"
        border
        height="400"
        size="mini"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column
          label="物资类型名称"
        >
          <template v-slot="scope">
            <el-input
              v-if="scope.row.isEdit === true"
              v-model="scope.row.name"
              size="mini"
              placeholder="请输入物资类型名称"
            />
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="100"
        >
          <template v-slot="scope">
            <el-button type="text" size="small" @click="delClick(scope.row,scope.$index)">删除</el-button>
            <el-button
              v-if="scope.row.isEdit === true"
              type="text"
              size="small"
              @click="saveClick(scope.row,scope.$index)"
            >
              保存
            </el-button>
            <el-button
              v-else
              type="text"
              size="small"
              @click="editClick(scope.row,scope.$index)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" size="mini" class="dialog-footer">
        <el-button size="mini" icon="el-icon-close" @click="dialogTableVisible = !dialogTableVisible">取 消</el-button>
        <el-button
          size="mini"
          type="success"
          icon="el-icon-circle-plus"
          :disabled="disabled"
          @click="addClick"
        >新 增</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
import { selectList } from '@/api/emergency-services/material-storage'
import { emergencyGoods } from '@/utils/public-fields'
import { getMaterialType,savaMaterialType,putMaterialType,deleteMaterialType } from '@/api/emergency-services/material'
import { queryDetail } from '@/api/emergency-services/material-storage'
import ReservePoint from './reserve-point'
export default {
  components: {
    ReservePoint
  },
  mixins: [emergencyGoods],
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    isHy: {
      type: Boolean ,
      default: false
    },
  },
  data() {
    return {
      ruleForm: {},
      storage:[], //储备点
      materialType:[], //类型
      disabled:false, // 是否可以添加
      reservePointData:{}, //储备点信息
      dialogTableVisible:false,
      rules: {
        name: [
          { required: true, message: '请输入应急物资名称', trigger: 'blur' }
        ],
        storageId: [
          { required: true, message: '请选择物资储备点', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择物资类型', trigger: 'blur' }
        ],
        specifications: [
          { required: true, message: '请输入规格型号', trigger: 'blur' }
        ],
        measuringUnit: [
          { required: true, message: '请输入计量单位', trigger: 'blur' }
        ],
        numbers: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择应急物资状态', trigger: 'blur' }
        ],
        putStorageTime:[
          { required: true, message: '请选择入库时间', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initruleForm(newV)
      },
      deep:true
    }
  },
   async mounted() {
    await this.fetchStorage('')
    await this.initMaterialType()
    this.initruleForm(this.data)
  },
  methods: {
    //下拉项ID转名称
    setlectIdToName(data,id,value,label){
      let name = ''
      for(let i=0;i<data.length;i++){
          if(data[i][value] === id){
              name = data[i][label]
              return name
          }
      }
      return name
    },
    // 储备点详情(必须同步)
    fetchDetail(id) {
      if(!id){
        return false
      }
      queryDetail({ id }).then(res => {
        this.reservePointData = {
          ...res.data
        }
      })
    },
    changeStorage(e){
        this.fetchDetail(e)
    },
    // 查询物资储备点信息(同步)
    async fetchStorage(val) {
      let res = await selectList({ name: val })
      this.storage = res.data ? res.data : []
    },
    async initMaterialType(){
      let res = await getMaterialType()
      this.materialType = res.data || []
      this.disabled = false
    },
    closeDialog(){
      this.initMaterialType()
    },
    addClick(){
      this.disabled = true
      this.materialType.push(
        {id:0,name:'',remark:'',isEdit:true}
      )
    },
    // 删除物资类型
    async delClick(row,index){
      if (row.id){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let res = await deleteMaterialType(row.id)
        loading.close()
        if (res.code==='0'){
          this.$message.success('删除成功')
          this.materialType.splice(index,1)
        }
      } else {
        this.materialType.splice(index,1)
        this.disabled = false
      }
    },
    // 编辑物资类型
    editClick(row,index){
      row.isEdit = true
      this.$set(this.materialType,index,row)
    },
    // 保存物资类型
    async saveClick(row,index){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let res = row.id > 0 ? await putMaterialType({id:row.id,name:row.name}): await savaMaterialType({name:row.name})
      loading.close()
      if (res.code === '0'){
        if (row.id){
          row.isEdit = false
          this.$set(this.materialType,index,row)
          this.$message.success(row.id > 0 ? '修改成功' : '添加成功')
        } else {
          this.initMaterialType()
        }
      }
    },
    // 初始化
    async initruleForm(data){
      this.ruleForm = {
        id:data?.id,
        enterpriseName:data?.enterpriseName,
        enterpriseId:data?.enterpriseId,
        name:data?.name,
        storageId:data?.storageId,
        type:data?.type,
        specifications:data?.specifications,
        measuringUnit:data?.measuringUnit,
        numbers:data?.numbers,
        money:data?.money,
        state:data?.state,
        putStorageTime:data?.putStorageTime
      }
      this.fetchDetail(data?.storageId)
    },

    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const valid = await this.$refs['ruleForm'].validate()
      if (valid) {
        res = this.ruleForm
      } else {
        res = false
      }
      return new Promise(resolve => resolve(res))
    }
  }
}
</script>

<style lang="scss" scoped>
.base-ruleForm {
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

        /deep/ .ruleForm-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
