<template>
  <Config title="效能督查分析" :modules="5" :configs="[...Object.keys(button_roles)]" />
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
      configType: 6
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  }
}
</script>
