<template>
  <div>
    <el-form
      ref="searchForm"
      :model="searchForm"
      :inline="true"
      size="medium"
    >
      <el-form-item
        label="枢纽大坝:"
        prop="damId"
      >
        <el-select
          v-model="searchForm.damId"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in dams"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间:">
        <el-date-picker
          v-model="screenTime"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          @click="submitForm('searchForm')"
        >
          查询
        </el-button>
        <el-button
          size="small"
          icon="el-icon-refresh-left"
          @click="resetForm('searchForm')"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
    >
      <el-table-column label="船舶唯一编码" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.shipNumber }}
        </template>
      </el-table-column>
      <el-table-column label="船舶分类" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.lockTypeName }}
        </template>
      </el-table-column>
      <el-table-column label="船舶核载吨" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.nuclearLoadTons }}
        </template>
      </el-table-column>
      <el-table-column label="始发港" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.startPortName }}
        </template>
      </el-table-column>
      <el-table-column label="目的港" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.endPortName }}
        </template>
      </el-table-column>
      <el-table-column label="枢纽大坝" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.damName }}
        </template>
      </el-table-column>
      <el-table-column label="申报人" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.informant }}
        </template>
      </el-table-column>
      <el-table-column label="过坝长度" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.damLength }}
        </template>
      </el-table-column>
      <el-table-column label="过坝宽度" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.damWidth }}
        </template>
      </el-table-column>
      <el-table-column label="过坝吃水" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.absorbWater }}
        </template>
      </el-table-column>
      <el-table-column label="过坝净空高" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.shipTall }}
        </template>
      </el-table-column>
      <el-table-column label="实际过坝时间" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.occurrenceTime }}
        </template>
      </el-table-column>
      <el-table-column label="过闸编队号" :show-overflow-tooltip="true">
        <template v-slot="scope">
          {{ scope.row.fleetNumber }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { momentDate } from '@/utils/index'
import { queryList } from '@/api/channel-services/ship/ship-type-statistical'
export default {
  props: {
    dams: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchForm: {
        type: 2, // 下行
        damId: '',
        screenStartTime: '',
        screenEndTime: ''
      },
      screenTime: [],
      list: [],
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 查询数据
    async fetchData() {
      this.loading = true
      const [screenStartTime, screenEndTime] = this.screenTime || []
      queryList({
        ...this.searchForm,
        screenStartTime: momentDate(screenStartTime, 'YYYY-MM-DD'),
        screenEndTime: momentDate(screenEndTime, 'YYYY-MM-DD')
      }).then(res => {
        this.list = res.data ? res.data : []
        this.loading = false
      })
    },
    // 查询
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false
        this.fetchData()
      })
    },
    // 重置查询条件
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.screenTime = []
      this.loading = false
      this.list = []
      this.fetchData()
    }
  }
}
</script>
