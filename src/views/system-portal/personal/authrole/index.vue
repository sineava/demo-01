<template>
  <div>
    <list
      v-if="oper==='list'"
      ref="list"
      @switchOper="switchOper"
    />
    <add
      v-if="oper==='add'"
      ref="add"
      :payload="payload"
      @switchOper="switchOper"
    />
  </div>
</template>
<script>
import list from './list'
import add from './add'
export default {
  components: {
    list,
    add
  },
  data() {
    return {
      oper: 'list',
      payload: {}
    }
  },
  methods: {
    switchOper({ payload }) {
      this.oper = payload.tab
      this.payload = payload
    }
  }

}
</script>
