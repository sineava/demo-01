<template>
  <el-form
    ref="wharf"
    :model="wharf"
    :rules="rules"
    label-width="0"
    class="base-wharf"
  >
    <div class="icon-title">
      <span class="span" />码头基本信息
      <span v-if="type!=='add' && button_roles.update" style="margin-left: 20px;"><el-button type="success" size="mini" @click="editSwitch">{{ type==='detail' ? '编辑' : '取消编辑' }}</el-button></span>
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="wharf-title"
      contentClassName="wharf-text"
      border
    >
      <el-descriptions-item :span="3">
        <template slot="label"><i v-if="isEdit" class="required" />码头名称:</template>
        <el-form-item v-if="isEdit" prop="wharfName">
          <el-input v-model.trim="wharf.wharfName" placeholder="请输入码头名称" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ wharf.wharfName }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />所在区域:</template>
        <el-form-item v-if="isEdit" prop="coastlineId">
          <el-cascader
            ref="cascader"
            v-model="wharf.coastlineId"
            :options="portAreaList"
            :props="{ expandTrigger: 'click', value: 'id', label: 'name' }"
            clearable
            style="width: 100%;"
            placeholder="请选择所在区域"
          />
        </el-form-item>
        <span v-else>{{ getCoastlineName(wharf.coastlineId) }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />所在航道:</template>
        <el-form-item v-if="isEdit" prop="channel">
          <el-select
            v-model="wharf.channel"
            clearable
            placeholder="请选择所在航道"
            style="width: 100%;"
          >
            <el-option
              v-for="item in channel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{ getChannel(wharf.channel) }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />投产年份:</template>
        <el-form-item v-if="isEdit" prop="productionYear">
          <el-date-picker
            v-model="wharf.productionYear"
            type="year"
            placeholder="请选择投产年份"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ wharf.productionYear }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />岸线长度（米）:</template>
        <el-form-item v-if="isEdit" prop="shorelineLength">
          <el-input-number
            v-model="wharf.shorelineLength"
            :precision="2"
            :min="0"
            :max="99999999.99"
            :controls="false"
            style="width: 100%;"
            placeholder="请输入岸线长度（米）"
          />
        </el-form-item>
        <span v-else>{{ wharf.shorelineLength }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />设计靠泊能力（吨）:</template>
        <el-form-item v-if="isEdit" prop="berthingCapacity">
          <el-input-number
            v-model="wharf.berthingCapacity"
            :precision="2"
            :min="0"
            :max="99999999.99"
            :controls="false"
            style="width: 100%;"
            placeholder="请输入设计靠泊能力（吨）"
          />
        </el-form-item>
        <span v-else>{{ wharf.berthingCapacity }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />通过能力（万吨）:</template>
        <el-form-item v-if="isEdit" prop="carryingCapacity">
          <el-input-number
            v-model="wharf.carryingCapacity"
            :precision="2"
            :min="0"
            :max="99999999.99"
            :controls="false"
            style="width: 100%;"
            placeholder="请输入通过能力（万吨）"
          />
        </el-form-item>
        <span v-else>{{ wharf.carryingCapacity }}</span>
      </el-descriptions-item>

      <el-descriptions-item :span="3">
        <template slot="label">利用状况:</template>
        <el-form-item v-if="isEdit" prop="utilizationStatus">
          <el-input
            v-model.trim="wharf.utilizationStatus"
            placeholder="请输入利用状况"
            type="textarea"
            rows="6"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        <span v-else>{{ wharf.utilizationStatus }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">规划用途:</template>
        <el-form-item v-if="isEdit" prop="planningPurposes">
          <el-input
            v-model.trim="wharf.planningPurposes"
            type="textarea"
            maxlength="200"
            rows="6"
            show-word-limit
            placeholder="请输入规划用途"
          />
        </el-form-item>
        <span v-else>{{ wharf.planningPurposes }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-form>
</template>

<script>
import { shoreLine } from '@/utils/public-fields'
export default {
  mixins: [shoreLine],
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    portAreaVoList:{
      type:Array,
      default: () => []
    },
    button_roles:{
      type: Object,
      default: {}
    },
    type:{
      type:String,
      default:'edit'
    }
  },
  data() {
    return {
      wharf: {
        coastlineId:'',
        channel:''
      },
      portAreaList:[],
      rules: {
        channel:[
          { required: true, message: '请选择航道', trigger: 'change' }
        ],
        wharfName: [
          { required: true, message: '请输入码头名称', trigger: 'blur' }
        ],
        coastlineId: [
          { required: true, message: '请选择所在区域', trigger: 'blur' }
        ],
        productionYear: [
          { required: true, message: '请输入投产年份', trigger: 'blur' }
        ],
        shorelineLength: [
          { required: true, message: '请输入岸线长度（米）', trigger: 'blur' }
        ],
        berthingCapacity: [
          { required: true, message: '请输入设计靠泊能力（吨）', trigger: 'blur' }
        ],
        carryingCapacity: [
          { required: true, message: '请输入通过能力（万吨）', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initIicense(newV)
      },
      deep:true
    },
    portAreaVoList:{
      handler(){
        this.setPortAreaVoList()
      },
      deep:true
    }
  },
  mounted() {
    this.initIicense(this.data)
    this.setPortAreaVoList()
  },
  methods: {
    setPortAreaVoList(){
      let portAreaList = []
      if(this.portAreaVoList.length>0){
        this.portAreaVoList[0].children.forEach(item=>{
          portAreaList.push({
            id:Number(item.id),
            name:item.name,
            children:item.children
          })
        })
      }
      this.portAreaList = portAreaList
    },
    editSwitch(){
      this.$emit('editSwitch',this.type === 'edit' ? 'detail' : 'edit' )
    },
    // 获取区域名称
    getCoastlineName(ids){
      if (!ids || ids.length===0){
        return ''
      }
      let id = ids[ids.length-1]
      let name = ''
      this.portAreaList.forEach(item => {
        if (item.children){
          item.children.forEach(val=>{
            if (val.id===id){
              name = `${item.name} / ${val.name}`
              return true
            }
          })
        }
      })
      return name
    },
    getChannel(channel){
      let name = ''
      this.channel.forEach(item=>{
        if (item.value === channel){
          name = item.label
        }
      })
      return name
    },
    initIicense(data){
      this.wharf = {
        id: data?.id,
        wharfName:data?.wharfName,
        coastlineId:data.portAreaId && data.coastlineId ? [data.portAreaId,data.coastlineId] : '',
        channel:data?.channel || '',
        productionYear:data.productionYear ? `${data.productionYear}-01-01` : '',
        shorelineLength:data?.shorelineLength,
        berthingCapacity:data?.berthingCapacity,
        carryingCapacity:data?.carryingCapacity,
        utilizationStatus:data?.utilizationStatus,
        planningPurposes:data?.planningPurposes
      }
    },
    // 输入框变更
    inputChange(){
      this.initIicense(this.wharf)
      this.$emit('changeIicense',this.wharf)
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['wharf'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.wharf))
        } else {
          res = false
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.base-wharf {
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

        /deep/ .wharf-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .wharf-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .wharf-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .wharf-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
