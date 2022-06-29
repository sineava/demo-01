<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <Wharf
        ref="Wharf"
        :enterprise-id="enterpriseId"
        :retrun-url="retrunUrl"
        :auth="type"
        :button_roles="{create:true,delete:true,desc:true}"
        @clickWharfMenu="clickWharfMenu"
      />
    </el-col>
    <el-col :span="20">
      <Berth
        ref="Berth"
        :wharfId="wharfId"
        :tabs="tabs"
        :enterprise-id="enterpriseId"
        :retrun-url="retrunUrl"
        :auth="type"
      />
    </el-col>
  </el-row>
</template>

<script>
import Berth from '@/views/components/berth'
import Wharf from '@/views/components/berth/wharf'
export default {
  components: {
    Berth,
    Wharf
  },
  props: {
    tabs:{
      type: String,
      default: '泊位信息'
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      enterpriseId:'',
      wharfId:'',
      retrunUrl:'',
      type:'',
      activeName: '港口经营许可证信息'
    }
  },
  created() {
    const { id, name, departmentName,type } = this.$route.query
    this.type = type
    this.retrunUrl = `/portenterprise/basicDetail?id=${id}&name=${name}&${departmentName}&tabs=泊位信息`
    this.enterpriseId = this.$route.query.id
  },
  methods: {
    clickWharfMenu(wharfId){
      this.wharfId = wharfId
    },
    /**
     * 详情
     */
    handleDetail(_, item) {
      this.$emit('join', { name: '泊位详情', data: { id: item.id }})
    },
  }
}
</script>

