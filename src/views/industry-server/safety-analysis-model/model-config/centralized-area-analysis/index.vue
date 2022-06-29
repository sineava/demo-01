<template>
  <Config title="港口危险货物集中区域风险分析" :configs="[...Object.keys(button_roles)]" />
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
      configType: 3
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  }
}
</script>
