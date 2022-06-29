<template>
  <el-upload
    class="excel-read-upload"
    action=""
    :on-change="handleChange"
    :show-file-list="false"
    :auto-upload="false"
  >
    <el-button
      v-if="but.isButton"
      :type="but.type"
      :size="but.size"
      :icon="but.icon"
      :circle="but.circle"
      :plain="but.plain"
      :round="but.round"
      :loading="but.loading"
      :disabled="but.disabled"
    >
      {{ but.text }}
    </el-button>
    <span v-else class="text">{{ but.text }}</span>
  </el-upload>
</template>

<script>
export default {
  props: {
    button: {
      type: Object,
      default: () => {},
    },
    extend: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      but: {},
    };
  },
  created() {
    this.but = this.button || {};
  },
  methods: {
    // 核心部分代码(handleChange 和 importfile)
    handleChange(file, fileList) {
      this.fileContent = file.raw;
      const fileName = file.name;
      const fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (this.fileContent) {
        if (fileType === "xlsx" || fileType === "xls") {
          this.importfile(this.fileContent);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },
    importfile(obj) {
      const reader = new FileReader();
      const _this = this;
      reader.readAsArrayBuffer(obj);
      reader.onload = function () {
        const buffer = reader.result;
        const bytes = new Uint8Array(buffer);
        const length = bytes.byteLength;
        let binary = "";
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const XLSX = require("xlsx");
        const wb = XLSX.read(binary, {
          type: "binary",
          // cellDates: true
        })
        /* 获取文件的第一个工作表（WorkSheet） */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const outdata = XLSX.utils.sheet_to_json(ws, { header: 1 });
        _this.$emit("readData", outdata, _this.extend);
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.text {
  cursor: pointer;
}
</style>
