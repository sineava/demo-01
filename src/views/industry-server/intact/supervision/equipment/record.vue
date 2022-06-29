<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>监管装备详情</span>
    </div>
    <div class="basic-detail">
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        fit
        border
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          prop="name"
          label="编号"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="size"
          label="装备名称"
          align="center"
        >
          {{ name }}
        </el-table-column>
        <el-table-column
          prop="size"
          label="损坏方式"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.type === 0 ? '人为' : '自然' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="man"
          label="报修人"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.fillPerson }}
          </template>
        </el-table-column>
        <el-table-column
          prop="man"
          label="送修人"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.sendPerson }}
          </template>
        </el-table-column>
        <el-table-column
          prop="man"
          label="维修金额"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.money }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="送修时间"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.sendTime.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="填报时间"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.row.fillTime.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="filePath"
          label="维修票据"
          align="center"
          width="310"
        >
          <template v-slot="scope">
            <div style="display: flex; flex-wrap: wrap;">
              <Images
                v-for="(item, index) in JSON.parse(scope.row.filePath)"
                :key="index"
                ref="images"
                width="85px"
                style="margin: 0 10px 10px 0;"
                fit="cover"
                :url="item"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          @click="$router.back(-1)"
        >
          返回
        </el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import { selectMaintenanceRecords } from '@/api/general-services/supervisory-capability/equipment'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      name: '',
      fileList: [],
      ruleForm: {},
      tableData: [],
      loading: false
    }
  },
  created() {
    const { id, name } = this.$route.query
    this.fetchData(id)
    this.name = name // 装备名称
    this.ruleForm.equipmentId = id // 装备编号
  },
  methods: {
    async fetchData(id) {
      this.loading = true
      selectMaintenanceRecords({ id }).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    }
  }
}
</script>
