<template>
  <Config title="行业安全发展水平分析" :configs="[...Object.keys(button_roles)]" />
</template>

<script>
import { mapGetters } from 'vuex'
import Config from '../components/index'
export default {
  components: {
    Config
  },
  provide() {
    return {
      configType: 4
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  }
}
</script>
