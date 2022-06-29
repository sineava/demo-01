<template>
  <Config title="辖区水上交通安全形式分析" :modules="1" :configs="[...Object.keys(button_roles)]" />
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
      configType: 1
    }
  },
  computed: {
    ...mapGetters(['button_roles'])
  }
}
</script>
