<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree :data="treeList" :props="defaultProps" ref="tree" show-checkbox></el-tree>
    </div>
    <div class="container">
      <table-tools @dialogFormVisible="dialogFormVisible = true"
                   @chooseSchool="isChoose = true"
                   @searchData="searchData"
                   @downloadExcel="download"
                   :select-college-and-major="true"
                   :search-require="true"
                   :download-report="true"
      ></table-tools>
      <div class="content">
        <el-table
          v-loading="loading"
          :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          id="ratTable"
          :span-method="mergeCell"
          style="width: 100%;">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :width="header.width"
              :label="header.label">
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import TableTools from '@/components/Guizhou/tableTools'
  import { filterDataIds, downloadExcel } from '@/utils/common'
  export default {
    name: 'achievement-table',
    data() {
      return {
        isChoose: false,
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        loading: false,
        tableList: [],
        headers: [],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        dialogFormVisible: false,
        spanArr: [],
        position: 0
      }
    },
    components: { TableTools },
    created() {
      this.getTableData('getAchievementTable')
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
      /* 分页 val（每页显示数据）*/
      handleSizeChange(val) {
        this.pageSize = val
      },
      /* 分页 当前显示的页码*/
      handleCurrentChange(val) {
        this.currentPage = val
      },
      rowspan() {
        this.tableList.forEach((item, index) => {
          if (index === 0) {
            this.spanArr.push(1) // index=0 [1]
            this.position = 0
          } else {
            if (this.tableList[index].indicator === this.tableList[index - 1].indicator) {
              this.spanArr[this.position] += 1 // spanArr[0] = spanArr[0] + 1
              this.spanArr.push(0)
            } else {
              this.spanArr.push(1)
              this.position = index
            }
          }
        })
      },
      // 合并同一指标点的指标点达成度
      mergeCell({ row, column, rowIndex, columnIndex }) {
        if (column.property === 'indicatorAchievement') {
          console.log('rowIndex' + rowIndex)
          const _row = this.spanArr[rowIndex]
          console.log('row' + _row)
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      //  查询
      searchData(param) {
        this.loading = true
        const oldIds = this.$refs.tree.getCheckedNodes() // 获取所有的选中状态的数据
        const newIds = filterDataIds(oldIds) // 将重合的子项过滤
        if (newIds.length) {
          this.isChoose = false
        }
        if (param || newIds.length) {
          const searchRequest = {}
          searchRequest.inputText = param
          searchRequest.courses = newIds
          this.getTableData('getRequireCourses')
        } else {
          this.$message({
            showClose: true,
            message: '查询内容不可为空',
            type: 'error'
          })
        }
      },
      download() {
        downloadExcel('#ratTable')
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName, params) {
        var that = this
        this.$http.getRequest(urlName, params).then(res => {
          if (res.code === 1) {
            console.log(res)
            that.headers = res.headers
            that.tableList = res.resultList
            that.total = res.resultList.length
            that.loading = false
            that.rowspan()
          } else {
            that.emptyText = '暂无数据'
          }
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
</style>
