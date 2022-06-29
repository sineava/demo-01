<template>
  <div
    class="left"
  >
    <h3 style="font-size: 16px;">所在地市港口管理部门选择</h3>
    <el-menu
      v-loading="orgLoading"
      class="el-menu-vertical-gk menu"
      default-active="0"
      @select="handleSelect"
    >
      <template>
        <div class="input">
          <el-input
            v-model.trim="searchText"
            prefix-icon="el-icon-search"
            placeholder="请输入机构名称"
            @input="areaSearch"
          />
        </div>
      </template>
      <div class="overflow" :style="`height: ${ clientHeight - 340}px;`">
        <el-menu-item index="0" title="全部信息">
          <span slot="title"><i class="el-icon-menu" />全部信息</span>
        </el-menu-item>
        <el-menu-item index="1280" title="重庆市港航海事事务中心">
          <span slot="title">重庆市港航海事事务中心</span>
        </el-menu-item>
        <el-menu-item
          v-for="(item,index) in orgs"
          :key="index"
          :index="item.orgCode.toString()"
          :class="isActive && isActive===vo.id ? 'isactive': ''"
          :title="item.orgName"
        >
          <span slot="title">{{ item.orgName }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { getOrgList } from '@/api/general-services/enterpriseInfo/external'
export default {
  props: {
    type: {
      type: Number | String,
      default: '1,2,3' // 区县
    }
  },
  data() {
    return {
      orgs:[],
      isActive: '',
      searchText:'',
      clientHeight:document.body.clientHeight,
      orgLoading:true,
      searchForm: {
        organizationName: ''
      }
    }
  },
  created() {
    this.fetchOrgs()
  },
  methods: {
    /** 港区搜索 */
    areaSearch(e){
      const lists = []
      if (e){
        this.orgsList.forEach(elem => {
          if (elem.orgName.search(e) !== -1){
            lists.push(elem)
          }
        })
        this.orgs = lists
      } else {
        this.orgs = this.orgsList
      }
    },
    /**
     * 选择左侧菜单
     */
    handleSelect(key, keyPath) {
      if (Number(key)===0){
        this.$emit('clickOrgMenu','','')
      } else if (Number(key)===1280){
        this.$emit('clickOrgMenu','重庆市港航海事事务中心',1280)
      } else {
        this.orgs.forEach(element => {
          if (Number(element.orgCode)===Number(key)){
            this.$emit('clickOrgMenu',element.orgName,element.orgCode)
            return true
          }
        })
      }
    },
    async fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getOrgList({ type: this.type }).then(res => {
        this.orgs = res.data ? res.data.map(x => ({ orgCode: Number(x.org_CODE), orgName: x.org_NAME })) : []
        this.orgsList = this.orgs
        this.orgLoading = false
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
.left::-webkit-scrollbar {
    display: none;
}

.left {
    .el-menu-item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .overflow {
        overflow-y: auto;
    }

    .overflow::-webkit-scrollbar {
        display: none;
    }
}

.menu {
    .input {
        margin: 0 5px 10px 5px;
    }

    .el-menu-item {
        border-bottom: 1px solid #e6e6e6;
    }

    .el-submenu .el-menu-item {
        min-width: auto;
    }

    /deep/ .is-active {
        color: #ffffff !important;
        background: #409eff;
    }
}
</style>

