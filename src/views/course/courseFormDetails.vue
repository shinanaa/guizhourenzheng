<template>
  <div class="rightContent">
    <div class="container">
      <div class="content">
        <el-table
          v-loading="loading"
          :data="courseDetailsTable"
          :span-method="mergeSpan"
          border
          style="width: 100%;">
          <el-table-column label="总评成绩组成">
            <el-table-column
              prop="type"
              label="类别">
            </el-table-column>
            <el-table-column
              prop="allForm"
              label="组成内容">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="allRatio"
            label="总成绩占比">
          </el-table-column>
          <el-table-column
            prop="peaceRatio"
            label="平时成绩占比">
          </el-table-column>
          <el-table-column
            prop="score"
            label="分数/次">
          </el-table-column>
          <el-table-column
            prop="timeNumber"
            label="次数">
          </el-table-column>
          <el-table-column
            prop="totalScore"
            label="总分">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'course-form-details',
    data() {
      return {
        courseDetailsTable: [],
        loading: false,
        msg: {}
      }
    },
    created() {
      this.msg = this.$router.query
      console.log(11111111111)
      console.log(this.msg)
      // var that = this
      // this.$http.getRequest('getCourseDetails', this.msg).then(res => {
      //   if (res.code === 1) {
      //     that.courseDetailsTable = res.resultList
      //     that.loading = false
      //     that.rowspan()
      //   } else {
      //     that.emptyText = '暂无数据'
      //   }
      // })
    },
    methods: {
      rowspan() {
        this.courseDetailsTable.forEach((item, index) => {
          if (index === 0) {
            this.spanArr.push(1)
            this.position = 0
          } else {
            if (this.courseDetailsTable[index].type === this.courseDetailsTable[index - 1].type) {
              this.spanArr[this.position] += 1
              this.spanArr.push(0)
            } else {
              this.spanArr.push(1)
              this.position = index
            }
          }
        })
      },
      // 课程详情合并表格
      mergeSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 2) {
          const _row = this.spanArr[rowIndex]
          console.log(_row)
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
  .container{margin-left: 0 !important;}
</style>
