<template>
  <div id="home-main" @click="showType = ''">
    <div v-if="!isEdit">
      <div class="search-container">
        <el-form
          inline
          size="medium"
          class="gateway-search"
        >
          <el-form-item style="width: 220px;">
            <el-select
              v-model="currentType"
              class="search-type"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="keyword"
              class="search-keyword"
              placeholder="请输入搜索关键字"
              @keyup.enter.native="handleSearch"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="search-btn"
              type="primary"
              @click="handleSearch"
            >
              搜索
            </el-button>
          </el-form-item>
          <div class="search-date">
            <div class="date-item" @click.stop="showType = showType === 'date' ? '' : 'date'"><img class="date-icon" src="../../../assets/new-index/date.png">日历</div>
            <img class="hr" src="../../../assets/new-index/hr.png">
            <div class="date-item" @click.stop="showType = showType === 'weather' ? '' : 'weather'"><img class="date-icon" src="../../../assets/new-index/tianqi.png">天气</div>
          </div>
        </el-form>
      </div>
      <div v-if="!isSearch" class="gateway-container">
        <div class="card-drag">
          <el-card
            v-for="color in colors"
            :key="color.text"
            v-dragging="{ item: color, list: colors, group: 'color' }"
            class="body-card gateway-card"
            :height="getHeight(color.text)>2?430:250"
          >
            <div slot="header" class="clearfix">
              <span>{{ color.text }}</span>
              <a v-if="color.text === '水文信息'" class="head-all">{{waterObj.timeInfo || '-'}}</a>
              <a v-if="color.text === '快捷菜单'" class="head-all" @click="editShow">编辑<img src="../../../assets/new-system/bianji.png"></a>
              <a v-if="color.text === '公告通知'" class="head-all" @click="toNotice('notice')">更多<img src="../../../assets/new-system/more.png"></a>
            </div>
            <!-- 消息通知 -->
            <div v-if="color.text === '消息通知'" class="card-height">
              <div class="notice">
                <div class="notice-tab">
                  <el-badge
                    v-if="Number(user_info.usercategory)===1"
                    :value="taskList.dispatchAgentNum || ''"
                    class="item"
                    @click.native="clickOutLink('dispatch-agent-link')"
                  >
                    <img src="../../../assets/new-system/fawen.png"> 发文待办
                  </el-badge>
                  <el-badge
                    v-if="Number(user_info.usercategory)!==1"
                    value=""
                    class="item"
                    @click.native="toNotice('notice')"
                  >
                    <img src="../../../assets/new-system/fawen.png"> 重要公告
                  </el-badge>
                  <el-badge
                    v-if="Number(user_info.usercategory)===1"
                    :value="taskList.receivingAgentNum || ''"
                    class="item"
                    @click.native="clickOutLink('receipt-agent-link')"
                  >
                    <img src="../../../assets/new-system/shouwen.png">收文待办
                  </el-badge>
                  <el-badge
                    :value="taskList.examineMessageNum || ''"
                    class="item"
                    @click.native="toNotice('approve')"
                  >
                    <img src="../../../assets/new-system/shenp.png">待批申请
                  </el-badge>
                  <el-badge
                    v-if="Number(user_info.usercategory)===1"
                    :value="taskList.meetingNum || ''"
                    class="item"
                    @click.native="clickOutLink('meeting-notice-link')"
                  >
                    <img src="../../../assets/new-system/huiyi.png"> 会议通知
                  </el-badge>
                  <el-badge
                    :value="taskList.adviseNum || ''"
                    class="item"
                    @click.native="toNotice('message')"
                  >
                    <img src="../../../assets/new-system/info.png">信息
                  </el-badge>
                </div>
              </div>
              <div v-if="showType === 'date'" class="calendar">
                <div class="calendar-main">
                  <div class="main-left">
                    <el-select v-model="calendar.year" placeholder="请选择年">
                      <el-option
                        v-for="item in yearList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <el-select v-model="calendar.month" placeholder="请选择月">
                      <el-option
                        v-for="item in monthList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <div class="lunar">
                      {{ calendar.calendarValue }}
                      <div>{{ calendar.timeText }}</div>
                    </div>
                  </div>
                  <div class="main-wrap">
                    <el-calendar v-model="calendar.calendarValue" />
                  </div>
                </div>
              </div>
            </div>
            <!-- 水文信息 -->
            <div v-if="color.text === '水文信息'" class="card-height">
              <el-table
                :data="waterObj.data"
                border
                stripe
                class="table-border water-info"
                :height="getHeight('水文信息')>2?430:190"
              >
                <el-table-column
                  label="水文站"
                  align="center"
                >
                  <template v-slot="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="水位"
                  align="center"
                >
                  <template v-slot="scope">
                    <span>{{ scope.row.waterLevel || '0.0' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="较昨日"
                  align="center"
                >
                  <template v-slot="scope">
                    <span :class="[scope.row.compare === '落' ? 'water-green' : 'water-red']">{{ scope.row.compare }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="幅度（米）"
                  align="center"
                >
                  <template v-slot="scope">
                    <span :class="[scope.row.amplitude < 0 ? 'water-green' : 'water-red']">{{ scope.row.amplitude }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="showType === 'weather'" class="weather">
                <div v-if="weatherObj.daily" class="weather-wrap">
                  <div v-for="(item, index) in weatherObj.daily" :key="index" class="weather-item">
                    <div>{{ getWeekday(new Date(item.fxDate).getDay()) }}</div>
                    <div>{{ item.fxDate }}</div>
                    <img :src="`${require(`@/assets/bw-128/${item.iconDay}.png`)}`">
                    <div>{{ item.tempMin }}~{{ item.tempMax }}℃</div>
                    <div>{{ item.textDay }}</div>
                    <div class="weather-btn">优</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 快捷菜单 -->
            <div
              v-if="color.text === '快捷菜单'"
              class="menu-container"
            >
              <div
                v-for="(item, index) in menuList"
                :key="index"
                class="menu-view"
                style="cursor: pointer;"
                @click="clickMenu(item)"
              >
                <img style="margin-bottom: 10px; width: 52px; height: 52px;" :src="require(`@/assets/column/icon (${item.icon}).png`)">
                <div class="menu-text">{{ item.name }}</div>
              </div>
            </div>

            <el-table
              v-if="color.text === '公告通知'"
              :data="noticeList"
              fit
              :show-header="false"
              :height="getHeight('公告通知')>2?430:190"
            >
              <el-table-column width="400">
                <template v-slot="scope">
                  <div
                    style="cursor: pointer;"
                    @click="toNotice('notice', scope.row.id)"
                  >
                    <span :style="{'color':scope.$index%2===0 ? '#F36161' : '#CACED2' }">•</span>
                    {{ scope.row.messageTitle }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template v-slot="scope">
                  <span class="table-time">
                    <img src="../../../assets/system/system (6).png">
                    {{ scope.row.createTime }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
        <!-- 栏目列表 -->
        <el-card
          v-for="(pItem, pIndex) in columnList"
          :key="pIndex"
          class="body-card card-container"
          style="min-height: auto;"
        >
          <div class="card-menu">
            <Images
              ref="images"
              height="100%"
              width="100%"
              fit="contain"
              class="menu-img"
              :url="pItem.columnIcon"
            />
            <div class="menu-shadow">
              {{ pItem.columnName }}
              <div style="margin-top: 20px; font-size: 10px;">
                {{ pItem.englishName }}
              </div>
            </div>
          </div>
          <div class="child-menu">
            <div
              v-for="(item, index) in pItem.sysColumnMenuVoList"
              :key="index"
              style="cursor: pointer;"
              @click="clickColumnMenu(item)"
            >
              <div v-if="index < pItem.menuLength" class="child-view">
                <div class="view-bold">
                  {{ item.directoryName }}
                </div>
                <div class="view-desc">{{ item.menuDescribe }}</div>
              </div>
            </div>
          </div>
          <div v-if="pItem.menuLength >= 6" class="menu-play" @click="menuColumn(pIndex)">
            {{ pItem.menuLength===6?'展开':'收缩' }}
          </div>
        </el-card>
      </div>
      <SearchList
        v-if="isSearch"
        ref="search"
        :keyword="keyword"
        :noticeType="currentType"
      />
    </div>
    <EditGateway v-if="isEdit" :checkList="menuList" @editHide="editHide" />
    <basic-bottom color="#FFFFFF" />
  </div>
</template>

<script>
import { selectLastList } from '@/api/emergency-services/hydrological'
import { findMenu } from '@/api/system-portal/shortcutMenu'
import { setPersonalization, getPersonalization, getColumnList, getMessageNum, getNoticeList,getDispatchAgentLink,getReceiptAgentLink,getNoticeLink } from '@/api/system-portal/index'
import { getWeather } from '@/api/emergency-services/weather'
import EditGateway from './edit'
import SearchList from '../search/index'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { getLunar } from 'chinese-lunar-calendar'
import BasicBottom from '@/components/BasicBottom'
import Images from '@/components/images'
export default {
  name: 'Gateway',
  components: {
    EditGateway,
    SearchList,
    BasicBottom,
    Images
  },
  data() {
    return {
      list: [],
      menuList: [],
      colors: [{text: '消息通知'},{text: '水文信息'},{text: '快捷菜单'},{text: '公告通知'}],
      keyword: '',
      currentType: null,
      searchType: [
        { value: 7, label: '业务功能' },
        { value: 6, label: '信息通知' },
        { value: 1, label: '公告通知' }
      ],
      columnList: [],
      noticeList: [],
      taskList: {}, // 通知数据
      waterObj: {}, // 水文信息
      calendar: {
        year: moment(new Date()).format('YYYY')+'年',
        month: moment(new Date()).format('MM')+'月',
        day:moment(new Date()).format('DD'),
        calendarValue: moment(new Date()).format('YYYY-MM-DD'),
        timeText: '',
        time: null
      },
      yearList: [],
      monthList: [],
      weatherObj: {},
      isEdit: false,
      isSearch: false,
      showType: ''
    }
  },
  computed: {
    ...mapGetters([
      'user_info',
    ])
  },
  watch: {
    'calendar.calendarValue'(val) {
      this.calendar.calendarValue = moment(val).format('YYYY-MM-DD')
      if (this.calendar.time) {
        clearTimeout(this.calendar.time)
      }
      this.calendar.time = setTimeout(() => {
        this.getChineseDate()
      }, 500)
    },
    'calendar.year'() {
      this.calendar.calendarValue = this.calendar.year +'-'+ this.calendar.month
    },
    'calendar.month'() {
      this.calendar.calendarValue = this.calendar.year +'-'+ this.calendar.month
    },
    colors() { // 自定义设置
      setPersonalization({ setContent: JSON.stringify(this.colors) })
    }
  },
  async mounted() {
    this.getChineseDate() // 查农历
    this.yearList = []
    for (let index = 1950;index<2050;index++) {
      this.yearList.push({label: `${index}年`, value: index})
    }
    this.monthList = []
    for (let index = 1;index<=12;index++) {
      this.monthList.push({label: `${index}月`, value: index})
    }
    this.selectLastList()
    // 天气
    const tq = (await getWeather({location:'106.550464,29.563761'}))
    this.weatherObj = tq ? tq.data : {}
    this.init()
  },
  methods: {
    getHeight(text){
      let i = 0
      this.colors.forEach((item,index)=>{
        if (item.text===text){
          i = index
          return false
        }
      })
      return i+1
    },
    async clickOutLink(link){
      let res
      switch (link){
      case 'meeting-notice-link':// OA 会议通知
        res = await getNoticeLink({})
        break
      case 'dispatch-agent-link':// OA 发文代办
        res = await getDispatchAgentLink({})
        break
      case 'receipt-agent-link':// OA 收文代
        res = await getReceiptAgentLink({})
        break
      }
      if (res.data){
        window.open(res.data,'_blank')
      }
    },
    refresh() {
      this.isEdit = false
      this.isSearch = false
      this.keyword = ''
      this.findByList()
    },
    // 初始化数据
    init() {
      this.findByList()
      this.getPersonalization()
      this.getColumnList()
      this.getNotice()
      this.getTask()
    },
    handleSearch() {
      if (this.keyword){
        this.isSearch = true
        this.$nextTick(e=>{
          this.$refs.search.clickSearch()
        })
      } else {
        this.isSearch = false
      }
    },
    async getChineseDate() {
      const dateTime = getLunar(moment(this.calendar.calendarValue).format('YYYY'), moment(this.calendar.calendarValue).format('MM'), moment(this.calendar.calendarValue).format('DD'))
      this.calendar.timeText = `${dateTime.lunarYear} ${dateTime.dateStr}`
      // const timeText = (await getChineseDate({dateStr:this.calendar.calendarValue})).data
      //  */
    },
    getWeekday(week) {
      const weekList = [
        {key:0,val:'周日'},
        {key:1,val:'周一'},
        {key:2,val:'周二'},
        {key:3,val:'周三'},
        {key:4,val:'周四'},
        {key:5,val:'周五'},
        {key:6,val:'周六'}
      ]
      return weekList.filter(item => item.key === week)[0].val
    },
    /**
     * 查询水文信息
     */
    async selectLastList() {
      selectLastList().then(res => {
        this.waterObj = res?.data || { data:[] }
      })
    },
    /**
     * 点击快捷菜单
     */
    clickMenu(item) {
      if (item.url) {
        this.$router.push({ path: item.url })
      }
    },
    /**
     * 点击底部菜单
     */
    clickColumnMenu(item) {
      if (item.url) {
        this.$router.push({ path: item.url })
      }
    },
    /**
     * 查询快捷菜单
     */
    async findByList() {
      const res = await findMenu()
      this.menuList = res.data
    },
    /**
     * 查询个性化
     */
    getPersonalization() {
      getPersonalization().then(res => {
        if (res.data) {
          this.colors = JSON.parse(res.data.setContent)
        }
      })
    },
    /**
     * 查询栏目列表
     */
    getColumnList() {
      getColumnList().then(res => {
        res.data.forEach(item => {
          item.menuLength = item.sysColumnMenuVoList.length >= 6 ? 6 : item.sysColumnMenuVoList.length
        })
        this.columnList = res.data
      })
    },
    // 栏目展开收缩
    menuColumn(index) {
      let obj = this.columnList[index]
      obj.menuLength = obj.menuLength===6?obj.sysColumnMenuVoList.length:6
      this.$set(this.columnList, index, obj)
    },
    /**
     * 查询公告
     */
    async getNotice() {
      getNoticeList().then(res => {
        this.noticeList = res.data || []
      })
    },
    /**
     * 查询通知任务
     */
    async getTask() {
      getMessageNum().then(res => {
        this.taskList = res.data || {}
      })
    },
    // 信息通知
    toNotice(type, payload) {
      this.$router.push({ path: '/system/notice', query: { tabType:type, payload }})
    },
    // 编辑快捷菜单
    editShow() {
      document.body.scrollIntoView()
      this.isEdit = true
    },
    editHide() {
      document.body.scrollIntoView()
      this.isEdit = false
      this.findByList()
    }
  }
}
</script>
<style lang="scss" scoped>
#home-main {
    position: relative;
    top: 170px;
    /deep/ ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    /deep/ ::-webkit-scrollbar-thumb {/* 滚动条里面小方块 */
      border-radius: 3px;
      background: rgba(14, 65, 126, 0.2);
      box-shadow: inset 0 0 6px rgba(14, 65, 126, 0.2);
    }

    /deep/ ::-webkit-scrollbar-track {/* 滚动条里面轨道 */
      border-radius: 0;
      background: #ffffff;
      box-shadow: inset 0 0 6px #ffffff;
    }
}



.search-container {
    input {
        background-color: #f1f2f6 !important;
    }
}
</style>
<style lang="scss" scoped>
@import './index.scss';
// .gateway-search {
//   box-shadow: 0 0 8px rgba(0,0,0,.1);
//   border-radius: 6px;
// }
</style>
