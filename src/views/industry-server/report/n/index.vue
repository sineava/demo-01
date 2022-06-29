<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口码头单位一览表</span>
    </div>
    <el-row :gutter="20">
      <el-col
        v-if="user_info.orgcategory==='1'"
        :span="4"
        class="left"
        :style="`height: ${ clientHeight - 260}px;`"
      >
        <el-menu
          class="el-menu-vertical-gk"
          default-active="0"
          @select="handleSelect"
        >
          <el-menu-item index="0" title="重庆市港航海事事务中心">
            <span slot="title">{{ user_info.orgname }}</span>
          </el-menu-item>
          <el-menu-item
            v-for="(item,index) in orgs"
            :key="index"
            :index="item.orgCode.toString()"
            :title="item.orgName"
          >
            <span slot="title">{{ item.orgName }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="user_info.orgcategory==='1' ? 20 : 24" class="left" :style="`height: ${ clientHeight - 260}px;`">
        <el-tabs type="border-card"  @tab-click="handleClick">
          <el-tab-pane v-if="button_roles.preview">
            <span slot="label"><i class="el-icon-date" /> 报表预览</span>
            <iframe
              v-if="previewUrl"
              frameborder="0"
              scrolling="auto"
              :style="`height: ${ clientHeight - 340}px;width:100%;`"
              :src="`${reportUrl}${previewUrl}&org_name=${organizationName}&t=${sj}`"
            />
            <el-empty v-else :description="loadin ? '加载中...':'报表预览链接不存在'" />
          </el-tab-pane>
          <el-tab-pane v-if="button_roles.fillin">
            <span slot="label"><i class="el-icon-date" /> 报表填报</span>
            <iframe
              v-if="fillUrl"
              frameborder="0"
              scrolling="auto"
              :style="`height: ${ clientHeight - 340}px;width:100%;`"
              :src="`${reportUrl}${fillUrl}&org_name=${organizationName}`"
            />
            <el-empty v-else :description="loadin ? '加载中...':'报表填报链接不存在'" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getReport } from '@/api/report/index'
import { getOrgList } from '@/api/general-services/enterpriseInfo/external'
import { mapGetters } from 'vuex'
import {getReportUrl} from '@/utils/evn'
export default {
  components: {},
  data() {
    return {
      orgs:[],
      loadin:false,
      clientHeight:document.body.clientHeight,
      orgLoading:true,
      organizationName:'',
      fillUrl:'',
      previewUrl:'',
      sj:''
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
    ]),
    reportUrl: () => getReportUrl()
  },
  async mounted() {
    this.user_info.orgcategory==='1' ? this.organizationName = '' : this.organizationName = this.user_info.orgname
    this.fetchData()
    if (this.user_info.orgcategory==='1' ){
      this.fetchOrgs()
    }
  },
  methods: {
    handleClick() {
      this.sj = new Date()
    },
    async fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getOrgList({ type: 2 }).then(res => {
        this.orgs = res.data ? res.data.map(x => ({ orgCode: Number(x.org_CODE), orgName: x.org_NAME })) : []
        this.orgLoading = false
      })
    },
    /**
     * 选择左侧菜单
     */
    handleSelect(key, keyPath) {
      if (Number(key)===0){
        this.organizationName = ''
      } else {
        this.orgs.forEach(element => {
          if (Number(element.orgCode)===Number(key)){
            this.organizationName = element.orgName
            return true
          }
        })
      }
      this.fetchData()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.loadin = true
      getReport({}).then(res => {
        res.data.forEach(item=>{
          if (item.type==='n'){
            this.fillUrl = item.fillUrl
            this.previewUrl = item.previewUrl
            return true
          }
        })
        this.loadin = false
      })
    },
  }
}
</script>
<style  lang="scss" scoped>
.left::-webkit-scrollbar {
    display: none;
}

.left {
    overflow-y: auto;

    .el-menu-item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>
