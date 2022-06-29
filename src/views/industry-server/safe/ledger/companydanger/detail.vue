<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="企业隐患信息记录详情页" />
      </span>
    </div>
    <div class="info-detail detail">
      <div class="icon-title">
        <span class="span" />检查记录
      </div>
      <el-form
        ref="ruleForm"
        label-width="100px"
        size="medium"
        :disabled="isDisabled ? true : false"
      >
        <div style="margin: 10px 10px 30px 10px;">
          <el-table
            :data="tableData"
            border
            :show-header="false"
            style="width: 100%;"
          >
            <el-table-column
              prop="ak"
              label=""
              align="center"
              width="100"
              class-name="bg-grey"
            />
            <el-table-column
              label=""
              type:html
            >
              <template v-slot="scope">
                {{ scope.row.av }}
              </template>
            </el-table-column>
            <el-table-column
              prop="bk"
              label=""
              align="center"
              class-name="bg-grey"
              width="110"
            />
            <el-table-column
              prop="bv"
              label=""
            />
            <el-table-column
              prop="ck"
              label=""
              class-name="bg-grey"
              align="center"
              width="110"
            />
            <el-table-column
              prop="cv"
              label=""
            />
          </el-table>
        </div>
        <el-form-item label="检查情况">
          <el-input
            v-model.trim="data.inspectSituation"
            rows="5"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="隐患描述">
          <el-input
            v-model.trim="data.dangerDesc"
            rows="5"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="整改要求">
          <el-input
            v-model.trim="data.rectificationRequirement"
            rows="5"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="图片">
          <span
            v-for="(o, index) in imgs"
            :key="o"
            :offset="index > 0 ? 2 : 0"
          >
            <Images
              :ref="`images${index}`"
              height="100px"
              width="100px"
              fit="fill"
              :url="o"
            />
          </span>
        </el-form-item>
        <div class="icon-title">
          <span class="span" />整改记录
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否需要整改">
              <el-radio
                v-model="data.isStatus"
                :label="0"
              >
                否
              </el-radio>
              <el-radio
                v-model="data.isStatus"
                :label="1"
              >
                是
              </el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="整改时间">
              <el-input v-model.trim="data.improvedDate" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="整改责任人">
          <el-input v-model.trim="data.directorName" />
        </el-form-item>
        <el-form-item label="整改落实资金">
          <el-input v-model.trim="data.fund" />
        </el-form-item>
        <el-form-item label="整改措施">
          <el-input
            v-model.trim="data.improvementMeasure"
            rows="5"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="整改要求">
          <el-input
            v-model.trim="data.rectificationRequirement"
            rows="5"
            type="textarea"
          />
        </el-form-item>
        <div class="icon-title">
          <span class="span" />整改信息记录
        </div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="是否整改">
              <el-radio
                v-model="data.isReview"
                :label="0"
              >
                否
              </el-radio>
              <el-radio
                v-model="data.isReview"
                :label="1"
              >
                是
              </el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="整改时间">
              <el-input v-model.trim="data.improvedDate" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="整改责任人">
          <el-input v-model.trim="data.directorName" />
        </el-form-item>
        <el-form-item label="整改落实资金">
          <el-input v-model.trim="data.fund" />
        </el-form-item>
        <el-form-item label="整改措施">
          <el-input
            v-model.trim="data.improvementMeasure"
            rows="5"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="整改情况">
          <el-input
            v-model.trim="data.improvementMeasure"
            rows="5"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="应急保证措施">
          <el-input
            v-model.trim="data.emergencyMeasure"
            rows="5"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="整改图片">
          <span
            v-for="(o, index) in improvementPicture"
            :key="o"
            :offset="index > 0 ? 2 : 0"
          >
            <Images
              :ref="`zimages${index}`"
              height="100px"
              fit="fill"
              width="100px"
              :url="o"
            />
          </span>
        </el-form-item>
      </el-form>
      <div class="backstage-edit-btn">
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { findByCategoryList } from '@/api/general-services/safety-supervision-and-inspection/safetyCategory'
import { getDetails } from '@/api/general-services/enterprise-self-ledger/companydanger'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      tableData: [],
      isDisabled: true,
      imgs: [],
      improvementPicture: [],
      data: {
        inspectSituation: '',
        improvementMeasure: '',
        improvedDate: '',
        isStatus: '',
        isReview: '',
        fund: '',
        directorName: '',
        emergencyMeasure: '',
        rectificationRequirement: ''
      }
    }
  },
  async mounted() {
    const res = await findByCategoryList({ type: 1 })
    this.categoryList = res.data
    if (this.$route.query.disabled) {
      this.isDisabled = true
    }
    if (this.$route.query.id) {
      this.initEdit(this.$route.query.id)
    }
  },
  methods: {
    initEdit(id) {
      getDetails(id).then(res => {
        this.data = res.data
        this.imgs = res.data && res.data.checkPicture ? JSON.parse(res.data.checkPicture) : []
        this.improvementPicture = res.data && res.data.improvementPicture || [] ? JSON.parse(res.data.checkPicture) : []
        this.tableData = [
          { ak: '自查项名称', av: res.data.examineName, bk: '自查项类型', bv: res.data.categoryName, ck: '开展时间', cv: res.data.launchTime },
          { ak: '隐患危险级别', av: res.data.riskLevel ? (res.data.riskLevel === 1 ? '一般' : '重大') : '', bk: '是否需要整改 ', bv: res.data.isRectification === 1 ? '是' : '否', ck: '整改时限', cv: res.data.timeRequirement },
          { ak: '整改截止时间', av: res.data.deadlineDate }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table /deep/ .bg-grey {
    background: #f2f2f2 !important;
}

.el-table /deep/ .cell {
    white-space: pre-line;
}
</style>
