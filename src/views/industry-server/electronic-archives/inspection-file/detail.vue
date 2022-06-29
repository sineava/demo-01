<template>
  <RecordInfo v-if="id" :id="id" :isBack="true" />
</template>

<script>
import RecordInfo from '../components/RecordInfo.vue'
export default {
  components: {
    RecordInfo
  },
  data() {
    return {
      id: 0
    };
  },
  mounted() {
     this.id = Number(this.$route.query.id)
  }
};
</script>
