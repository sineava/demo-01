<template>
  <div>
    <el-card class="body-card berth">
      <div
        slot="header"
      >
        <span>码头</span>
        <span style="float: right;">
          <el-button
            v-if="button_roles.create"
            type="success"
            size="mini"
            icon="el-icon-circle-plus"
            @click="addWharf"
          />
          <el-button
            v-if="button_roles.delete && wharfInfo.id"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="delWharf"
          />
        </span>
      </div>
      <div class="wharf">
        <el-menu
          v-loading="orgLoading"
          class="el-menu-vertical-gk menu"
          default-active="0"
          @select="handleSelect"
        >
          <template>
            <div class="input">
              <el-input
                v-model="searchText"
                prefix-icon="el-icon-search"
                placeholder="请输入机构名称"
                @input="areaSearch"
              />
            </div>
          </template>
          <div class="overflow" :style="`height: ${500}px;`">
            <el-menu-item index="0" title="全部码头">
              <span slot="title">全部码头</span>
            </el-menu-item>
            <el-menu-item
              v-for="(item,index) in orgs"
              :key="index"
              :index="item.id.toString()"
              :class="isActive && isActive===vo.id ? 'isactive': ''"
              :title="item.wharfName"
            >
              <span slot="title">{{ item.wharfName }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </el-card>

    <el-card class="body-card berth info">
      <div
        slot="header"
      >
        <span>码头信息</span>
      </div>
      <div class="wharf-info">
        <h4>{{ wharfInfo.wharfName || '请选择' }}</h4>
        <p>航道：{{ wharfInfo.channel ? ['长江','嘉陵江','乌江','涪江','渠江','大宁河','小江','梅溪河','綦江'][Number(wharfInfo.channel)-1] : '' }}</p>
        <p>区域：{{ wharfInfo.portAreaName || '' }} / {{ wharfInfo.coastlineName || '' }}</p>
        <p>投产年份：{{ wharfInfo.productionYear || '' }}</p>
        <el-button v-if="wharfInfo.id && button_roles.desc" type="text" @click="editWharf">查看码头详情</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getWharf } from '@/api/port-services/coastline/berth'
 import { deleteWharf } from '@/api/port-services/coastline/wharf'
export default {
  props: {
    retrunUrl: {
      type: String,
      default: ''
    },
    enterpriseId:{
      type:[Number,String],
      default:''
    },
    auth:{
      type:String,
      default:''
    },
    button_roles:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      orgs:[],
      isActive: '',
      searchText:'',
      orgLoading:true,
      clientHeight:document.body.clientHeight,
      wharfInfo:{}
    }
  },
  mounted() {
    this.fetchOrgs()
  },
  methods: {
    /** 港区搜索 */
    areaSearch(e){
      const lists = []
      if (e){
        this.orgsList.forEach(elem => {
          if (elem.wharfName.search(e) !== -1){
            lists.push(elem)
          }
        })
        this.orgs = lists
      } else {
        this.orgs = this.orgsList
      }
    },
    delWharf(){
       this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteWharf({ id:this.wharfInfo.id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchOrgs()
            this.isActive = ''
            this.wharfInfo = {}
            this.$emit('clickWharfMenu','')
          }
        })
      }).catch()
    },
    /**
     * 选择左侧菜单
     */
    handleSelect(key) {
      if (Number(key)===0){
        this.wharfInfo = {}
        this.$emit('clickWharfMenu','')
      } else {
        this.orgs.forEach(element => {
          if (Number(element.id)===Number(key)){
            this.wharfInfo = element
            this.$emit('clickWharfMenu',element.id)
            return true
          }
        })
      }
    },
    async fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getWharf({enterpriseId:this.enterpriseId}).then(res => {
        this.orgs = res.data || []
        this.orgsList = this.orgs
        this.orgLoading = false
      })
    },
    addWharf(){
      this.$router.push({ path: `/plan/deepwaterEdit?type=add&url=${encodeURIComponent(this.retrunUrl)}`})
    },
    editWharf(){
      this.$router.push({ path: `/plan/deepwaterEdit?type=detail&id=${this.wharfInfo.id}&channel=${this.wharfInfo.channel}&url=${encodeURIComponent(this.retrunUrl)}`})
    }
  }
}
</script>
<style lang="scss" scoped>
.berth {
    margin: 0;
    box-shadow: none;

    /deep/ .el-card__body {
        padding: 0;
    }

    /deep/ .el-card__header {
        padding: 0 10px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
    }

    .wharf {
        padding: 5px;

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

        &::-webkit-scrollbar {
            display: none;
        }

        /deep/ .el-menu {
            border-right: none;
        }
    }

    .menu {
        .input {
            margin: 0 0 10px 0;
        }

        /deep/ .el-menu-item {
            border-bottom: 1px solid #e6e6e6;
            padding-left: 10px !important;
            height: 50px;
            line-height: 50px;
        }

        .el-submenu .el-menu-item {
            min-width: auto;
        }

        /deep/ .is-active {
            color: #ffffff !important;
            background: #409eff;
        }
    }
}

.info {
    margin: 10px 0 0 0;

    .wharf-info {
        padding: 5px 10px;
        height: 185px;
        font-size: 13px;

        h4 {
            overflow: hidden;
            margin: 0;
            padding: 0;
            height: 40px;
            line-height: 40px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        p {
            overflow: hidden;
            margin: 0;
            padding: 0;
            height: 30px;
            line-height: 30px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        /deep/ .el-button {
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 30px;
        }
    }
}
</style>

