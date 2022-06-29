<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="企业隐患整改信息记录" />
      </span>
    </div>
    <div class="basic-detail">
      <div class="icon-title">
        <span class="span" />隐患情况
      </div>
      <el-descriptions
        class="descriptions"
        :column="2"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="自查项名称">
          {{ ruleForm.itemName }}
        </el-descriptions-item>
        <el-descriptions-item label="自查项类型">
          {{ ruleForm.categoryName }}
        </el-descriptions-item>
        <el-descriptions-item label="开展时间">
          {{ ruleForm.launchTime }}
        </el-descriptions-item>
        <el-descriptions-item label="是否存在问题">
          <el-tag :type="ruleForm.isProblem===1?'danger':(ruleForm.isProblem===2?'warning':'success')">
            {{ ruleForm.isProblem===1?'存在问题':ruleForm.isProblem===2?'存在隐患':'检查正常' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="危险等级">
          {{ getLabel('riskLevel',ruleForm.riskLevel) }}
        </el-descriptions-item>
        <el-descriptions-item label="是否需要整改">
          <el-tag :type="ruleForm.isRectification===1?'danger':'success'">{{ ruleForm.isRectification===1?'是':'否' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="整改时限">
          {{ ruleForm.timeRequirement }}
        </el-descriptions-item>
        <el-descriptions-item label="整改截止时间">
          {{ ruleForm.deadlineDate }}
        </el-descriptions-item>
        <el-descriptions-item label="检查情况" :span="2">
          {{ ruleForm.inspectSituation }}
        </el-descriptions-item>
        <el-descriptions-item label="隐患描述" :span="2">
          {{ ruleForm.dangerDesc }}
        </el-descriptions-item>
        <el-descriptions-item label="整改要求" :span="2">
          {{ ruleForm.rectificationRequirement }}
        </el-descriptions-item>
        <el-descriptions-item label="图片" :span="2">
          <div v-for="(pic, index) in ruleForm.checkPicture" :key="index" style="display: inline-block; margin: 5px;">
            <Images
              :ref="`images${index}`"
              height="100px"
              fit="cover"
              :url="pic"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />整改记录
      </div>
      <el-descriptions
        class="descriptions"
        :column="2"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="是否整改">
          <el-tag :type="ruleForm.isStatus===1?'success':'danger'">{{ ruleForm.isRectification===1?'是':'否' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="整改时间">
          {{ ruleForm.improvedDate }}
        </el-descriptions-item>
        <el-descriptions-item label="整改责任人">
          {{ ruleForm.directorName }}
        </el-descriptions-item>
        <el-descriptions-item label="整改落实资金">
          {{ ruleForm.fund }}
        </el-descriptions-item>
        <el-descriptions-item label="整改措施" :span="2">
          {{ ruleForm.improvementMeasure }}
        </el-descriptions-item>
        <el-descriptions-item label="应急保证措施" :span="2">
          {{ ruleForm.emergencyMeasure }}
        </el-descriptions-item>
        <el-descriptions-item label="整改图片" :span="2">
          <div v-for="(pic, index) in imgList" :key="index" style="display: inline-block; margin: 5px;">
            <Images
              :ref="`zimages${index}`"
              height="100px"
              fit="contain"
              :url="pic.url"
            />
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<script>
import { getDetail } from '@/api/general-services/enterprise-self-inspection/rectification-situation'
import Images from '@/components/images'
export default {
  components: {
    Images
  },
  data() {
    return {
      ruleForm: {},
      riskLevel: [ // 危险等级
        { value: 1, label: '一般' },
        { value: 2, label: '重大' }
      ],
      timeRequirement: [ // 整改时限
        { value: '立即整改', label: '立即整改' },
        { value: '限期整改', label: '限期整改' },
        { value: '停业整改', label: '停业整改' },
        { value: '挂牌督办', label: '挂牌督办' }
      ],
      type: [
        { value: 1, label: '企业' },
        { value: 2, label: '机构' }
      ],
      isStatus: [ // 是否整改
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      isRectification: [ // 是否需要整改
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      isProblem: [ // 是否存在问题
        { value: 0, label: '检查正常' },
        { value: 1, label: '存在问题' },
        { value: 2, label: '存在隐患' }
      ],
      cycle: [ // 自查项周期
        { value: 1, label: '周' },
        { value: 2, label: '月' },
        { value: 3, label: '季' },
        { value: 4, label: '年' }
      ],
      imgList: []
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.fetchDetail(id)
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data,
          checkPicture: res.data.checkPicture ? JSON.parse(res.data.checkPicture) : [],
          improvementPicture: res.data.improvementPicture ? JSON.parse(res.data.improvementPicture) : []
        }
        this.imgList = this.ruleForm.improvementPicture
      })
    },
    getLabel(name,value){
      let label = ''
      for (let i=0;i<this[name].length;i++){
        if (this[name][i].value===value){
          label = this[name][i].label
        }
      }
      return label
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/safe/self/rectify' })
    }
  }
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 40%;
        line-height: 30px;
    }
}
</style>
