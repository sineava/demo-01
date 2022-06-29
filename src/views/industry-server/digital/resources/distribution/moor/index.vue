<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <Wharf ref="Wharf" :button_roles="{create:true,delete:true,desc:true}" :retrun-url="retrunUrl" @clickWharfMenu="clickWharfMenu" />
    </el-col>
    <el-col :span="20">
      <Berth
        ref="Berth"
        :wharfId="wharfId"
        :retrun-url="retrunUrl"
        :tabs="tabs"
        :enterpriseId="enterpriseId"
        :enterpriseName="enterpriseName"
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
    tabs: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      wharfId:'',
      enterpriseId:'',
      enterpriseName:'',
      retrunUrl: '/digital/resources/distribution?tabs=7',
    }
  },
  created() {
  },
  methods: {
    clickWharfMenu(wharfId){
      this.wharfId = wharfId
    },
  }
}
</script>

