/**
 * time picker mixins
 */
const timePicker = {
  data() {
    return {
      startPicker: {
        disabledDate: time => {
          if (this.searchForm.screenEndTime) {
            return time.getTime() > this.searchForm.screenEndTime.getTime()
          }
          if (this.searchForm.endTime) {
            return time.getTime() > this.searchForm.endTime.getTime()
          }
        }
      },
      endPicker: {
        disabledDate: time => {
          if (this.searchForm.screenStartTime) {
            return time.getTime() < this.searchForm.screenStartTime.getTime()
          }
          if (this.searchForm.startTime) {
            return time.getTime() < this.searchForm.startTime.getTime()
          }
        }
      }
    }
  }
}

export {
  timePicker
}
