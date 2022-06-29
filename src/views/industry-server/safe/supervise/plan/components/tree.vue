<template>
  <el-tree
    v-if="treeData.length > 0"
    ref="tree"
    :data="treeData"
    show-checkbox
    node-key="id"
    :default-checked-keys="defaultRange"
    :props="defaultProps"
  />
</template>
<script>
export default {
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {}
    },
    defaultRange: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getCheckedNodes() {
      const checkList = this.$refs.tree.getCheckedNodes()
      const list = []
      checkList.forEach(element => {
        list.push(element.id)
      })
      return list
    }
  }
}
</script>
