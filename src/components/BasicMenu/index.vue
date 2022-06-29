<template>
  <div class="menu">
    <div class="menu-main">
      <div :class="['menu-item', index===1?'active':'']" @click="menuClick({},1)">
        <img class="icon" :src="require(`@/assets/new-index/icon_01${index===1?'s':''}.png`)"> 首页
      </div>
      <div :class="['menu-item', index===2?'active':'']" @click="menuClick({},2)">
        <img class="icon" :src="require(`@/assets/new-index/icon_02${index===2?'s':''}.png`)"> {{ roles[0] === 'admin' ? '行业管理' : '企业管理' }}
      </div>
      <div
        v-for="(item, cindex) in roleList"
        :key="cindex"
        :class="['menu-item', index===item.funcId?'active':'']"
        @click="menuClick(item, item.funcId)"
      >
        <img class="icon" :src="require(`@/assets/new-index/${item.icon || 'icon_03'}${index===item.funcId ? 's' : ''}.png`)">
        {{ item.funcName }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { getGatewayRole,getOaLink } from '@/api/system-portal/index'
import { numSort } from '@/utils/index'
import {replaceOuterUrl,replaceReportUrl} from '@/utils/evn'

export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      roleList: [],
      timer: null,
      oldIndex: 0,
      roleMenu:[
        'put_notice',// 发布公告
        'inside_notice',// 内部公告
        'port_notice',//   港口公告
        'wt_notice',//    水路运输公告
        'channel_notice',//  航道公告
        'emeng_notice',//  应急公告
        'inspec_notice',// 船检公告
        'sea_notice',// 海事公告
        'synthesize_notice',// 综合类公告
        'put_message',// 发布消息
      ]
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'firstPath'
    ])
  },
  mounted() {
    this.oldIndex = this.index
    // 开个定时器去等待user数据
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (getToken('user_id')) { // 用户信息已有
      this.getMenu()
      return false
    }
    this.timer = setInterval(() => { // 无信息去等待
      if (getToken('user_id')) {
        clearInterval(this.timer)
        this.getMenu()
      }
    }, 1000)
  },
  methods: {
    // 查询菜单
    async getMenu() {
      if (this.$store.state.user.systemRole&&this.$store.state.user.systemRole.length > 0) {
        this.roleList = this.$store.state.user.systemRole
      } else {
        const { user_account, user_info, token_str } = this.$store.state.user
        const menu = (await getGatewayRole({ userAccount: user_account, systemId: user_info[0].systemid, tokenStr: token_str }))
        const roleList = menu ?menu.data:[]
        this.roleList = roleList.sort(numSort('orderNum'))// 排序
        this.$store.dispatch('user/setSystemRole', this.roleList)
      }
    },
    // 点击
    async menuClick(item, index) {
      if (item.funcUrl && item.funcUrl==='oa_inside'){
        const res = await getOaLink({})
        if (res.data){
          window.open(res.data,'_blank')
        }
      } else {
        const { user_account, user_info, token_str } = this.$store.state.user
        if (index === 1) { // 首页
          if (this.oldIndex === index) { // 当前页面点击通知刷新
            this.$emit('refresh')
          } else {
            this.$router.push({ path: `/?userAccount=${user_account ||getToken('user_account')}&tokenStr=${token_str || getToken('token_str')}&systemCode=${user_info ? user_info[0].systemcode : getToken('system_code')}` })
          }
        } else if (index === 2) { // 进入后台
          this.$router.push({ path: this.firstPath })
        } else { // 信息通知
          const isHttp=item.funcUrl.indexOf("http")
          if (isHttp > -1) {
            if (item.funcUrl.indexOf('/webroot/decision/view/form')>-1){
              window.open(`${replaceReportUrl(item.funcUrl)}`,'_blank')
            } else {
              window.open(`${replaceOuterUrl(item.funcUrl)}?userAccount=${user_account ||getToken('user_account')}&tokenStr=${token_str || getToken('token_str')}&systemCode=${user_info ? user_info[0].systemcode : getToken('system_code')}&user_id=${user_info ? user_info[0].userid : getToken('user_id')}`,'_blank')
            }
          } else {
            this.$router.push({ path: item.funcUrl })
          }
          this.oldIndex = index
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {
    position: fixed;
    top: 68px;
    z-index: 9;
    width: 100%;
    height: 100px;
    background: #006ac4;

    .help {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

    .menu-main {
        display: flex;
        margin: 0 auto;
        border-radius: 4px;
        padding-right: 12px;
        width: 1200px;
        height: 100px;
        background: linear-gradient(0deg, #0067bd, #006ecc);
        align-items: center;

        .menu-item {
            display: flex;
            margin-right: 12px;
            border-radius: 6px;
            max-width: 120px;
            height: 84px;
            font-size: 16px;
            color: #bddbff;
            background: #1073c6;
            cursor: pointer;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .icon {
                margin-bottom: 10px;
                height: 30px;
            }

            &.active {
                border: 1px solid #73b0f7;
                color: #ffffff;
                background: #71aaed;
                box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
            }
        }
    }
}
</style>
