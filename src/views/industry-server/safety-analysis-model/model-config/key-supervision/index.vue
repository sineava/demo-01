<template>
  <Config title="重点监管企业风险分析" :configs="[...Object.keys(button_roles)]" />
</template>

<script>
import Config from '../components/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    Config
  },
  provide() {
    return {
      configType: 5
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  }
}
</script>
