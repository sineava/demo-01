<template>
  <Config title="水上交通安全风险研判" :configs="[...Object.keys(button_roles)]" />
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
      configType: 2
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  }
}
</script>
