<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="隐患信息记录详情页" />
      </span>
    </div>
    <div class="info-detail detail">
      <div class="icon-title">
        <span class="span" />检查记录
      </div>
      <el-row :gutter="20">
        <el-col :span="24" style="margin: 0 0 20px 0;">
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
        </el-col>
        <el-form
          ref="ruleForm"
          label-width="100px"
          size="medium"
          :disabled="isDisabled ? true : false"
        >
          <el-col :span="24">
            <el-form-item label="检查情况">
              <el-input
                v-model="data.inspectSituation"
                rows="5"
                type="textarea"
                placeholder="请输入检查情况"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="检查图片">
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
          </el-col>
          <div class="icon-title">
            <span class="span" />整改要求记录
          </div>
          <el-col :span="12">
            <el-form-item label="是否整改">
              <el-tag :type="data.isStatus ? 'success' : 'danger'">{{ data.isStatus ? '是' : '否' }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="整改时限">
              <el-input v-model.trim="data.timeRequirement" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="整改要求">
              <el-input
                v-model="data.rectificationRequirement"
                rows="5"
                type="textarea"
              />
            </el-form-item>
          </el-col>
          <div v-if="data.isStatus">
            <div class="icon-title">
              <span class="span" />整改信息记录
            </div>
            <el-col :span="12">
              <el-form-item label="是否需复查">
                <el-tag :type="data.isReview ? 'success' : ''">{{ data.isReview ? '是' : '否' }}</el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改时间">
                <el-input v-model.trim="data.improvedDate" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改落实资金">
                <el-input v-model.trim="data.fund" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改责任人">
                <el-input v-model.trim="data.directorName" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="整改情况">
                <el-input
                  v-model="data.improvementMeasure"
                  rows="5"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="应急保证措施">
                <el-input
                  v-model="data.emergencyMeasure"
                  rows="5"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="整改图片">
                <span
                  v-for="(o, index) in improvementPicture"
                  :key="o"
                  :offset="index > 0 ? 2 : 0"
                >
                  <Images
                    :ref="`images${index}`"
                    height="100px"
                    fit="contain"
                    :url="o"
                  />
                </span>
              </el-form-item>
            </el-col>
          </div>
        </el-form>
      </el-row>
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
import { getDetails } from '@/api/general-services/enterprise-self-ledger/dangerrecord'
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
        let violations = ''
        if (res.data && res.data.safetyTargetItemViolationVoList) {
          res.data.safetyTargetItemViolationVoList.forEach((element, index) => {
            if (index > 0) {
              violations = violations + '\n' + element.name
            } else {
              violations = element.name
            }
          })
        }
        this.data = res.data
        this.imgs = res.data && res.data.checkPicture ? JSON.parse(res.data.checkPicture) : []
        this.improvementPicture = res.data && res.data.improvementPicture ? JSON.parse(res.data.checkPicture) : []
        this.tableData = [
          { ak: '检查项目', av: res.data.itemName, bk: '检查项分类', bv: res.data.categoryName, ck: '危险等级', cv: !res.data.riskLevel ? '': res.data.riskLevel === 1 ? '一般' : '严重' },
          { ak: '违规行为', av: violations, bk: '整改时限', bv: res.data.timeRequirement, ck: '整改截止时间', cv: res.data.deadlineDate }
        ]
      })
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
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
