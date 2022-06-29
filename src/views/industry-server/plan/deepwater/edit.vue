<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'edit' ? '编辑码头' : type === 'add' ? '新增码头' : '码头详情'" />
      </span>
      <span class="detail-header-button">
        <el-radio-group v-model="modulePage" size="small">
          <el-radio-button label="基本信息" />
          <el-radio-button v-if="type !== 'add'" label="泊位信息" />
        </el-radio-group>
      </span>
    </div>
    <div v-if="modulePage === '泊位信息'"  class="basic-detail">
      <el-row :gutter="10">
        <el-col :span="5">
          <berthAssembly
            ref="berthAssembly"
            :search="search"
            :active="query.id"
            :button_roles="{}"
            @changeBerth="changeBerth"
          />
        </el-col>
        <el-col :span="19">
          <div class="right">
            <div class="clearfix">
              <span>{{ query.type === 'add' ? '新增泊位信息' : query.type === 'detail' ? '泊位详情' : '编辑泊位信息' }}</span>
              <span v-if="type!=='detail'" style="float: right;">
                <el-button size="mini" @click="addBerth" type="success">新增泊位</el-button>
                <!-- <el-button size="mini" v-if="query.type==='add'" @click="query.type = 'detail'" type="success">取消新增</el-button> -->
                <el-button size="mini" v-if="query.id" @click="query.type = query.type==='detail' ? 'edit' : 'detail' " type="primary">{{query.type === 'detail' ? '编辑泊位' : '取消编辑'}}</el-button>
              </span>
            </div>
            <div class="content">
              <el-empty v-if="query.type==='detail' && !query.id" description="暂无泊位信息"></el-empty>
              <BerthInfo v-else ref="BerthInfo" :query="query" @save="showSave" />
            </div>
            <div class="backstage-edit-btn">
              <el-button
                v-if="isSave && query.type !=='detail'"
                type="primary"
                size="medium"
                :loading="loading"
                @click="berthSave"
              >
                保存
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="modulePage === '基本信息'" class="basic-detail">
      <Wharf
        ref="Wharf"
        :data="ruleForm"
        :isEdit="type === 'edit' || type === 'add'"
        :type="type"
        :button_roles="button_roles"
        :portAreaVoList="portAreaVoList"
        @editSwitch="editSwitch"
      />
      <template v-if="type !== 'add'">
        <div class="icon-title">
          <span class="span" /><i v-if="type === 'edit' || type === 'add'" class="required" />泊位信息
        </div>
        <BerthTable
          ref="BerthTable"
          :search="search"
          :button_roles="type !== 'detail' ? {desc:true,delete:true} : {desc:true}"
          :isPage="false"
          :size="500"
          :maxHeight="400"
          @handleDetails="handleDetails"
        />
      </template>

      <div class="icon-title" style="margin-top: 20px;">
        <span class="span" /><i style="margin:0 10px 0 0;" v-if="type === 'edit' || type === 'add'" class="required" />码头位置信息
      </div>
      <Maptable
        ref="berthMap"
        :is-edit="type==='detail' ? false : true"
        :is-table="true"
        @change="confirmMap"
      />
      <div class="backstage-edit-btn">
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="medium"
          :loading="loading"
          @click="saveData"
        >
          保存
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { shoreLine } from '@/utils/public-fields'
import { momentDate,getRouterButtonRole } from '@/utils/index'
import { getArea, addWharf, updateWhatarf, getDetail } from '@/api/port-services/coastline/wharf'
import { addBerth,updateBerth } from '@/api/port-services/coastline/berth'
import { Handle } from '@/utils/handle-shore-line'
import Maptable from '@/components/Maptable/index'
import Wharf from '@/views/components/wharf'
import BerthTable from '@/views/components/wharf/berth'
import berthAssembly from './components/index'
import BerthInfo from '@/views/components/berth/info'
export default {
  components: {
    Maptable,
    Wharf,
    BerthTable,
    berthAssembly,
    BerthInfo
  },
  mixins: [shoreLine],
  data() {
    return {
      type: '',
      button_roles:{},
      ruleForm: {},
      returnUrl:'',
      portAreaVoList: [],
      loading: false,
      tableData: [],
      geographyInfos:[],
      clientHeight:document.body.clientHeight,
      search:{},
      modulePage:'基本信息',
      isSave:false,
      query:{
        type:'detail', //操作类型
        id:'', //泊位ID
        wharfId: '', //码头ID
        wharfName: '', //码头名称
        coastlineName: '',// 岸线名称
        portAreaId:'', //港区ID
        coastlineId: '', //作业区
      }
    }
  },
  created() {
    this.button_roles = getRouterButtonRole('/plan/deepwater',true)
    this.fetchPort()
    const { id, type, url } = this.$route.query
    this.type = type
    this.returnUrl = url ? decodeURIComponent(url) : ''
    if (id) { // 编辑/详情
      this.fetchDetail(id)
      this.search = {
        wharfId:id
      }
    } else {
      this.$nextTick(() => {
        this.$refs.berthMap.init([])
      })
    }
  },
  methods: {
    showSave(issave){
      this.isSave = issave
    },
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      if (val){
        val.map((item,index)=>{
          item.pointer = index+1
          return item
        })
      }
      this.geographyInfos = val
    },
    // 编辑切换
    editSwitch(type){
      this.type = type
      document.documentElement.scrollTop = 0;
    },
    /**
     * 点击选择泊位
     */
    changeBerth(item){
      this.query.id = item
      this.query.type = 'detail'
      document.documentElement.scrollTop = 0;
    },
    // 查询港区信息
    async fetchPort() {
      getArea().then(res => {
        if (res.data) {
          this.portAreaVoList = new Handle(res.data).sameProps
        }
      })
    },
    //点击泊位详情
    handleDetails(item){
      document.documentElement.scrollTop = 0;
      this.modulePage = '泊位信息'
      this.query.id = item.id
    },
    //添加泊位
    addBerth(){
      this.query.type = 'add'
      this.query.id = ''
    },
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.query.wharfId = res.data.id
        this.query.wharfName = res.data.wharfName
        this.query.portAreaId = res.data.portAreaId
        this.query.coastlineId = res.data.coastlineId
        this.ruleForm = {
          ...res.data,
          wharfCoordinatesDtoList: res.data.wharfCoordinatesVoList
        }
        this.tableData = [...this.ruleForm.wharfCoordinatesDtoList]
        delete this.ruleForm.wharfCoordinatesVoList

        this.geographyInfos = this.tableData || []
        this.$nextTick(() => {
          this.$refs.berthMap.init(this.geographyInfos)
        })
      })
    },
    // 提交
    async berthSave() {
      let data = await this.$refs.BerthInfo.submitForm()
      if(!data){
        return false
      }
      this.loading = true
      if (data.id){
        updateBerth(data).then(res => {
          this.loading = false
          if (res.code==='0'){
            this.query.type = 'detail'
            this.$message.success('修改成功')
          }
        })
      } else {
        data.infoFrom = false
        addBerth(data).then(res => {
          this.loading = false
          if (res.code==='0'){
            this.query.type = 'detail'
            this.$refs.berthAssembly.refresh()
            this.$message.success('添加成功')
          }
        })
      }
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
    // 保存码头信息
    async saveData() {
      let data = await this.$refs.Wharf.submitForm()
      if (data === false){
        return false
      }
      if (this.geographyInfos.length<1){
        this.$message.error('请标记码头位置信息')
        return false
      }
      const coastlineId = data.coastlineId
      const wharfInfoDto = {
        ...data,
        coastlineId: typeof coastlineId === 'object' ? coastlineId[coastlineId.length - 1] : coastlineId,
        wharfCoordinatesDtoList: [...this.geographyInfos],
        productionYear: Number(momentDate(data.productionYear, 'YYYY'))
      }
      this.loading = true
      const res = data.id ? await updateWhatarf(wharfInfoDto) : await addWharf(wharfInfoDto)
      this.loading = false
      if (res.code === '0') {
        if(!data.id){
          this.$message.warning('码头添加成功，请继续添加泊位信息')
          this.fetchDetail(res.data)
          this.type = 'edit'
          this.search.wharfId = res.data
          this.query.type = 'add'
          document.documentElement.scrollTop = 0;
          this.modulePage = '泊位信息'
          this.$router.push({ path: `/plan/deepwaterEdit?type=edit&id=${res.data}&channel=${data.channel}`})
        }else{
          this.$message.success('修改成功')
        }
      }
    },
    // 返回
    back() {
      this.$router.push({ path: this.returnUrl || '/plan/deepwater' })
    },
    /**
     * 经纬度转换(度转度分秒)
     * @direction lon || lat
     */
    transformDMS(degree, direction) {
      let D = plusZeroAtHead(Math.floor(degree))
      let M = plusZeroAtHead(Math.floor((degree - D) * 60))
      let S = plusZeroAtHead(Math.floor(((degree - D) * 60 - M) * 60))
      let result = D + '°' + M + '′' + S + '″'

      // 如果是个位数， 则在首位加 0
      function plusZeroAtHead(num) {
        if (num > -10 && num < 0) {
          num = '-0' + Math.abs(num)
        }
        if (num > 0 && num < 10) {
          return '0' + num
        }
        return num
      }

      if (direction === 'lng') {
        D > 0 ? result += 'E' : result += 'W'
        return result
      }
      if (direction === 'lat') {
        D > 0 ? result += 'N' : result += 'S'
        return result
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-detail {
  .required::after {
      color: rgb(255, 0, 0);
      content: "* ";
  }
  .right{
    .clearfix{
      height: 40px;
      line-height: 40px;
      height: 40px;
      line-height: 40px;
      background: #f2f2f2;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      padding: 0 5px;
      font-size: 14px;
      font-weight: 600;
    }
    .content{
      overflow-y: auto;
    }
  }
}
</style>
