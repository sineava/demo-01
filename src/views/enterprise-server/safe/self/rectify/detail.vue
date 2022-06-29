<template>
  <div>
    <Info v-if="type === 'detail'" />
    <Add v-else />
  </div>
</template>

<script>
import Add from './components/add.vue'
import Info from './components/info.vue'
export default {
  components: {
    Add,
    Info
  },
  data() {
    return {
      type: ''
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
  },
}
</script>
