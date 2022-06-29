<template>
  <div
    class="left"
  >
    <el-menu
      v-loading="orgLoading"
      class="el-menu-vertical-gk menu"
      :default-active="`${isActive}`"
      @select="handleSelect"
    >
      <template>
        <h3>泊位列表</h3>
      </template>
      <!-- <template>
        <div class="input">
          <el-input
            v-model.trim="searchText"
            prefix-icon="el-icon-search"
            placeholder="请输入泊位名称"
            @input="areaSearch"
          />
        </div>
      </template> -->
      <div class="overflow">
        <el-menu-item
          v-for="(item,index) in berth"
          :key="index"
          :index="`${item.id}`"
          :title="item.berthName"
        >
          <span slot="title">{{ item.berthName }}</span>
        </el-menu-item>
        <el-empty v-if="berth.length===0" description="暂无泊位信息"></el-empty>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { getPageList,deleteBerth } from '@/api/port-services/coastline/berth'
export default {
  props:{
    search: {
      type: Object,
      default: {}
    },
    button_roles: {
      type: Object,
      default: {}
    },
    active:{
      type:[Number,String],
      default:''
    }
  },
  data() {
    return {
      berth:[],
      isActive: '',
      searchText:'',
      clientHeight:document.body.clientHeight,
      orgLoading:true,
      searchForm: {
        organizationName: ''
      }
    }
  },
  watch:{
    search:{
      handler(){
        this.fetchData()
      },
      deep:true
    },
    active:{
      handler(){
        this.isActive = this.active
      },
      deep:true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    /** 港区搜索 */
    areaSearch(e){
      const lists = []
      if (e){
        this.berthList.forEach(elem => {
          if (elem.orgName.search(e) !== -1){
            lists.push(elem)
          }
        })
        this.berth = lists
      } else {
        this.berth = this.berthList
      }
    },
    refresh(){
      this.fetchData()
    },
    /**
     * 选择左侧菜单
     */
    handleSelect(key) {
      this.$emit('changeBerth',key)
    },
    async fetchData() {
      this.orgLoading = true
      let data = {
        ...this.search,
        currentPage:1,
        pageSize:500
      }
      // *type:2 -> 区县机构
      getPageList(data).then(res => {
        this.berth = res.data.records || []
        this.berthList = this.berth
        this.isActive = this.active || (this.berth.length>0 ? this.berth[0].id : '')
        this.$emit('changeBerth',this.isActive)
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
        min-height: 600px;
    }

    .overflow::-webkit-scrollbar {
        display: none;
    }
}

.menu {
    border: solid 1px #e6e6e6;
    border-radius: 5px;

    h3 {
        margin: 0;
        padding: 0 5px;
        font-size: 14px;
        line-height: 40px;
        background: #f2f2f2;
    }

    div {
        padding: 5px;
    }

    .input {
        margin: 5px 0;
    }

    .el-menu-item {
        border-bottom: 1px solid #e6e6e6;
        height: 40px;
        line-height: 40px;
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

