<template>
  <el-card id="top-screen" :style="`height:${height}`">
    <el-form
      ref="searchData"
      label-position="top"
      class="search-form"
      size="small"
    >
      <el-form-item
        v-for="(item,index) in searchData"
        :key="index"
        :label="`${item.label}：`"
        :prop="item.form!=='daterange' ? item.prop : item.prop[0]"
      >
        <span class="left-condition">
          <el-select v-if="item.form==='input'" v-model="item.condition" placeholder="请选择">
            <el-option
              v-for="(opt,key) in getConditionOpt(item.conditionOpt || ['like','eq','ne'])"
              :key="key"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <el-select v-if="item.form==='select'" v-model="item.condition" placeholder="请选择">
            <el-option
              v-for="(opt,key) in getConditionOpt(item.conditionOpt || ['eq','ne'])"
              :key="key"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <el-select v-if="item.form==='date'" v-model="item.condition" placeholder="请选择">
            <el-option
              v-for="(opt,key) in getConditionOpt(item.conditionOpt || ['eq','ne','ge','le','lt','gt'])"
              :key="key"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <el-select v-if="item.form==='daterange'" v-model="item.condition" placeholder="请选择">
            <el-option
              v-for="(opt,key) in getConditionOpt(item.conditionOpt || ['eq'])"
              :key="key"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <el-select v-if="item.form==='number'" v-model="item.condition" placeholder="请选择">
            <el-option
              v-for="(opt,key) in getConditionOpt(item.conditionOpt || ['eq','ne','ge','le','lt','gt'])"
              :key="key"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </span>
        <span class="right-condition">
          <el-input
            v-if="item.form==='input'"
            v-model.trim="item.data"
            clearable
            :placeholder="`请输入${item.label}`"
            class="input-with-select"
          />
          <el-date-picker
            v-if="item.form==='date'"
            v-model="item.data"
            :type="item.type"
            clearable
            :format="item.format"
            :value-format="item.format || 'yyyy-MM-dd'"
            style="width: 100%;"
            :placeholder="`请选择${item.label}`"
          />
          <el-date-picker
            v-if="item.form==='daterange'"
            v-model="item.data"
            type="daterange"
            range-separator="至"
            style="width: 100%;"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-select
            v-if="item.form==='select'"
            v-model="item.data"
            :multiple="item.multiple?true:false"
            clearable
            collapse-tags
            :placeholder="`请选择${item.label}`"
            style="width: 100%;"
          >
            <el-option
              v-for="(item,index) in item.option"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input-number
            v-if="item.form==='number'"
            v-model="item.data"
            :min="item.min"
            :max="item.max"
            :precision="item.precision"
            style="width: 100%;"
            :placeholder="`请输入${item.label}`"
            :controls="false"
          />
        </span>
      </el-form-item>
    </el-form>
    <div class="btns-wrappper">
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="fetchData"
      >
        筛选
      </el-button>
      <el-button
        v-if="buttonRoles.export"
        type="warning"
        size="mini"
        icon="el-icon-folder"
        @click="excelExport"
      >
        导出
      </el-button>
    </div>
  </el-card>
</template>

<script>
import htmlToExcel from '@/utils/htmlToExcel'
import { momentDate } from '@/utils/index'
import {getConditionOpt} from '@/utils/config'
export default {
  props: {
    height:{
      type:String,
      default:'100%'
    },
    searchData:{
      type: Array,
      default: () => []
    },
    buttonRoles:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getConditionOpt,
    assembleQueryData(){
      let queryData = {}
      this.searchData.forEach(element => {
        if (element.form==='daterange'){
          if (element.data && element.data.length>0){
            queryData[element.prop[0]] = JSON.stringify({type:'ge',value:momentDate(element.data[0],element.format[0].replace(/-dd/g, '-DD'))})
            queryData[element.prop[1]] = JSON.stringify({type:'le',value:momentDate(element.data[1],element.format[1].replace(/-dd/g, '-DD'))})
          }
        } else {
          if (element.data!==null && element.data!=='' && element.data!==undefined){
            queryData[element.prop] = JSON.stringify({type:element.condition,value:element.form==='date' ? momentDate(element.data,element.format) : String(element.data)})
          }
        }
      })
      return queryData
    },
    fetchData(){
      let data = this.assembleQueryData()
      this.$emit('fetchData',data)
    },
    excelExport(){
      // 获取未分页数据
      this.$emit('getExportData', this.assembleQueryData(),({ data, title }) => {
        htmlToExcel.getJsonExcel(data, title)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#top-screen {
    overflow-y: auto;

    .el-form--label-top {
        /deep/ .el-form-item__label {
            padding: 0;
        }
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .left-condition {
        float: left;
        width: 20%;

        /deep/ .el-input__inner {
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            padding-right: 6px;
            padding-left: 6px;
        }
    }

    /deep/ .el-form-item {
        margin-bottom: 10px;
    }

    .right-condition {
        float: right;
        width: 80%;

        /deep/ .el-input__inner {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            padding-right: 0;
        }
    }

    .search-form {
        margin-bottom: 30px;
    }

    .btns-wrappper {
        position: absolute;
        bottom: 0;
        padding-bottom: 10px;
    }
}
</style>
