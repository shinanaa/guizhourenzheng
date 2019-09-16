<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree :data="treeList" :props="defaultProps" ref="tree" show-checkbox></el-tree>
    </div>
    <div class="container">
      <table-tools @chooseSchool="isChoose = true"
                   @searchData="searchData"
                   @downloadExcel="downloadExcel('#graTable')"
                   :select-college-and-major="true"
                   :download-report="true"
      ></table-tools>
      <div class="content">
        <el-table
          v-loading="loading"
          :data="tableList"
          border
          @cell-click="showDetails"
          id="graTable"
          style="width: 100%;">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :label="header.label">
              <template slot-scope="scope">
                <span v-if="header.prop.indexOf('achievement') < 0">{{scope.row[header.prop]}}</span>
                <el-button v-if="header.prop.indexOf('achievement') >= 0" type="text">{{scope.row[header.prop]}}</el-button>
          </template>
            </el-table-column>
          </template>
        </el-table>
        <!--弹窗-->
        <el-dialog width="80%" title="毕业要求详情" :visible.sync="dialogFormVisible">
          <el-table
            v-loading="loading"
            :data="detailTableList"
            border
            show-summary
            sum-text="评价结果"
            style="width: 100%;">
            <template v-for="header in detailHeaders">
              <el-table-column
                :prop="header.prop"
                :width="header.width"
                :label="header.label">
              </el-table-column>
            </template>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import TableTools from '@/components/Guizhou/tableTools'
  import { filterDataIds } from '@/utils/common'
  import XLSX from 'xlsx'
  import FileSaver from 'file-saver'
  export default {
    name: 'graduation-requirements-achievement',
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
        currentPage: 1,
        dialogFormVisible: false,
        detailHeaders: [],
        detailTableList: []
      }
    },
    components: { TableTools },
    created() {
      this.getTableData('getRequireAchievement')
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
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
      downloadExcel(tableID) {
        const wb = XLSX.utils.table_to_book(document.querySelector(tableID))
        const wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileSaver.saveAs(
            // Blob 对象表示一个不可变、原始数据的类文件对象。
            // Blob 表示的不一定是JavaScript原生格式的数据。
            // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: 'application/octet-stream' }),
            // 设置导出文件名称
            'sheetjs.xlsx'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      showDetails(row, column) {
        if (column.property.indexOf('achievement') >= 0) {
          var showInfo = {
            major: row.major,
            require: row.require,
            achievement: column.property,
            schoolYear: column.label
          }
          console.log(showInfo)
          var that = this
          this.$http.getRequest('getRequireDetails', showInfo).then(res => {
            if (res.code === 1) {
              that.detailHeaders = res.headers
              that.detailTableList = res.resultList
              that.loading = false
              this.dialogFormVisible = true
            } else {
              that.emptyText = '暂无数据'
            }
          })
        } else {
          return false
        }
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
