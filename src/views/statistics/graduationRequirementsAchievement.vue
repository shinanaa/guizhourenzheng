<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree :data="treeList" :props="defaultProps" ref="tree" show-checkbox></el-tree>
    </div>
    <div class="container" style="padding: 20px 0;">
      <!--图表-->
      <el-card class="box-card" style="margin: 0 30px;">
        <div slot="header" class="clearfix">
          <span><svg t="1568603580143" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6492" width="18" height="18"><path d="M894.614588 73.968941H752.941176v59.994353c0 36.502588-29.876706 66.379294-66.379294 66.379294a66.56 66.56 0 0 1-66.379294-66.379294v-59.994353H354.785882v59.994353c0 36.502588-29.876706 66.379294-66.379294 66.379294a66.56 66.56 0 0 1-66.379294-66.379294v-59.994353H80.353882a18.070588 18.070588 0 0 0-18.010353 18.070588v854.738824a18.070588 18.070588 0 0 0 18.010353 17.950118h814.260706a18.070588 18.070588 0 0 0 18.010353-18.010353V91.979294a18.070588 18.070588 0 0 0-18.070588-18.010353zM147.395765 874.616471V279.491765h680.176941v595.124706H147.395765z m136.131764-703.548236h8.553412a29.816471 29.816471 0 0 0 29.756235-29.81647V30.72a29.816471 29.816471 0 0 0-29.756235-29.756235h-8.493176a29.816471 29.816471 0 0 0-29.756236 29.756235v110.531765c0 16.384 13.372235 29.756235 29.756236 29.756235z m398.938353 0h8.493177a29.876706 29.876706 0 0 0 29.81647-29.81647V30.72a29.876706 29.876706 0 0 0-29.81647-29.756235h-8.432941a29.816471 29.816471 0 0 0-29.816471 29.756235v110.531765c0 16.384 13.432471 29.756235 29.756235 29.756235zM240.820706 455.378824h96.37647v96.37647h-96.37647v-96.37647z m191.728941 0h96.376471v96.37647h-96.376471v-96.37647z m191.789177 0h96.37647v96.37647h-96.37647v-96.37647zM240.820706 626.447059h96.37647v96.37647h-96.37647v-96.37647z m191.728941 0h96.376471v96.37647h-96.376471v-96.37647z m191.789177 0h96.37647v96.37647h-96.37647v-96.37647z" p-id="6493" fill="#515151"></path></svg>{{currentRow.college}}</span>
          <span>
              <svg t="1568602460234" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4511" width="18" height="18"><path d="M512 1010.346667h-6.826667l-477.866666-109.226667c-17.066667-3.413333-27.306667-17.066667-27.306667-34.133333V170.666667c0-10.24 3.413333-20.48 13.653333-27.306667 6.826667-6.826667 17.066667-6.826667 27.306667-6.826667L512 245.76 983.04 136.533333c10.24-3.413333 20.48 0 27.306667 6.826667 10.24 6.826667 13.653333 17.066667 13.653333 27.306667v696.32c0 17.066667-10.24 30.72-27.306667 34.133333l-477.866666 109.226667H512z m-443.733333-170.666667l443.733333 102.4 443.733333-102.4V215.04L518.826667 314.026667h-13.653334L68.266667 215.04v624.64z" fill="#2E2E2E" p-id="4512"></path><path d="M512 157.013333h-6.826667L160.426667 78.506667c-17.066667-3.413333-30.72-23.893333-23.893334-40.96S160.426667 6.826667 177.493333 10.24L512 88.746667 870.4 6.826667c17.066667-3.413333 37.546667 6.826667 40.96 27.306666 6.826667 17.066667-6.826667 34.133333-23.893333 37.546667L518.826667 157.013333H512zM477.866667 303.786667h68.266666V989.866667h-68.266666z" fill="#2E2E2E" p-id="4513"></path></svg>{{currentRow.major}}</span>
          <span><svg t="1568602494594" class="icon" viewBox="0 0 1151 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5369" width="18" height="18"><path d="M1118.767545 940.132509a32.29362 32.29362 0 0 1-32.485464-31.973881 355.869299 355.869299 0 0 0-76.737315-227.845878 326.13359 326.13359 0 0 0-228.421408-112.292272 31.973881 31.973881 0 0 1-9.784008-2.877649 31.973881 31.973881 0 0 1-9.72006-6.394776l-0.703425-0.57553a31.973881 31.973881 0 0 1-5.499508-8.185314 19.887754 19.887754 0 0 1-1.406851-2.55791 29.352023 29.352023 0 0 1-1.534746-7.481889 33.572575 33.572575 0 0 1-0.831321-4.412395 8.249261 8.249261 0 0 1 0-1.215008 6.394776 6.394776 0 0 1 0-1.087112 35.427061 35.427061 0 0 1 1.087112-3.70897 33.124941 33.124941 0 0 1 2.430015-7.99347c0.383687-0.703425 0.895269-1.278955 1.342903-1.982381a33.060993 33.060993 0 0 1 6.394776-7.99347h0.511582a30.950717 30.950717 0 0 1 10.487434-5.691351 31.334404 31.334404 0 0 1 9.784007-1.982381h0.703426a156.991757 156.991757 0 0 0 106.920659-48.472404 204.185206 204.185206 0 0 0 9.14453-280.346991 157.119653 157.119653 0 0 0-116.704667-54.867181 31.973881 31.973881 0 1 1 0-63.947762 211.603147 211.603147 0 0 1 91.18951 20.719075 235.647505 235.647505 0 0 1 73.987561 55.634553 267.941126 267.941126 0 0 1-11.830336 368.7228 243.704924 243.704924 0 0 1-37.345494 29.9915 366.548576 366.548576 0 0 1 159.869407 108.711197 384.70974 384.70974 0 0 1 68.61595 124.762085 454.668593 454.668593 0 0 1 22.637508 143.882466 32.357568 32.357568 0 0 1-32.101777 31.462299zM601.941727 549.347732c12.789553 4.156605 25.579105 6.394776 37.793127 11.894283a459.272832 459.272832 0 0 1 146.312481 100.270092 469.31263 469.31263 0 0 1 134.290302 329.906508 32.485463 32.485463 0 0 1-64.970927 0 404.085912 404.085912 0 0 0-116.065189-285.079126 390.081352 390.081352 0 0 0-558.263968 0 403.830121 403.830121 0 0 0-116.065189 285.079126 32.485463 32.485463 0 0 1-64.970927 0 470.080003 470.080003 0 0 1 36.066538-181.483751A465.283921 465.283921 0 0 1 134.483582 661.512107a459.01704 459.01704 0 0 1 146.248533-100.270092c12.27797-5.243717 25.259366-7.737679 37.857075-11.894283a289.363626 289.363626 0 0 1-63.947762-47.513188 296.781567 296.781567 0 0 1 0-415.02098 287.125454 287.125454 0 0 1 410.608584 0 296.781567 296.781567 0 0 1 0 415.02098 290.514686 290.514686 0 0 1-63.308285 47.193449zM460.36138 64.687638a229.636416 229.636416 0 1 0 224.904281 229.636416A227.590087 227.590087 0 0 0 460.617171 64.367899z" p-id="5370" fill="#515151"></path></svg>451</span>
        </div>
        <div class="myChart" id="myChart" style="height: 360px;"></div>
      </el-card>
      <table-tools @chooseSchool="isChoose = !isChoose"
                   @searchData="searchData"
                   @downloadExcel="download"
                   :select-college-and-major="true"
                   :download-report="true"
      ></table-tools>
      <div class="content">
        <el-table
          :data="tableList"
          highlight-current-row
          @row-click="seeTrend"
          border>
          <el-table-column
            v-for="(header, index) in headers" :key="index"
            :label="header.label"
            :prop="header.prop">
            <template slot-scope="scope">
              <span v-if="header.prop.indexOf('require') < 0">{{scope.row[header.prop]}}</span>
              <el-button v-if="header.prop.indexOf('require') >= 0" type="text" @click.stop="showDetails(scope.row, index)">{{scope.row[header.prop]}}</el-button>
            </template>
          </el-table-column>
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
  import { filterDataIds, downloadExcel } from '@/utils/common'
  import Echarts from 'echarts'
  const category = ['毕业要求一', '毕业要求二', '毕业要求三', '毕业要求四', '毕业要求五', '毕业要求六', '毕业要求七', '毕业要求八']
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
        detailTableList: [],
        currentRow: []
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
      download() {
        downloadExcel('#graTable')
      },
      showDetails(row, index) {
        var showInfo = {
          college: row.college,
          major: row.major,
          require: this.headers[index].prop,
          schoolYear: row.schoolYear
        }
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
      },
      seeTrend(row) {
        this.getRequireData(row)
        this.getStandardsData(row.major)
        this.drawLine()
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName, params) {
        this.$http.getRequest(urlName, params).then(res => {
          if (res.code === 1) {
            this.headers = res.headers
            this.tableList = res.resultList
            this.total = res.resultList.length
            this.currentRow = res.resultList[0]
            this.standards = res.standardList
            this.getStandardsData(this.currentRow.major)
            this.getRequireData()
            this.drawLine()
            this.loading = false
          } else {
            this.emptyText = '暂无数据'
          }
        })
      },
      // 获取实际情况折线图数据
      getRequireData(datas) {
        this.require = []
        if (datas) {
          this.currentRow = datas
          for (const i in datas) {
            if (i.indexOf('require') >= 0) {
              this.require.push(datas[i])
            }
          }
        } else {
          this.currentRow = this.tableList[0]
          for (const i in this.tableList[0]) {
            if (i.indexOf('require') >= 0) {
              this.require.push(this.tableList[0][i])
            }
          }
        }
      },
      // 获取合格标准直线图数据
      getStandardsData(major) {
        this.standards.map((item) => {
          if (item.major === major) {
            this.standard = item.standard
          }
        })
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = Echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '毕业要求达成度' },
          tooltip: {},
          legend: {
            data: ['合格标准', '实际情况']
          },
          xAxis: {
            type: 'category',
            data: category
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '合格标准',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#1890ff',
                lineStyle: {
                  color: '#1890ff'
                }
              }
            },
            data: this.standard
          }, {
            name: '实际情况',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#facc14',
                lineStyle: {
                  color: '#facc14'
                }
              }
            },
            data: this.require
          }]
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
  .box-card{
    span{margin-right: 20px;display: inline-block;
      svg{vertical-align: text-bottom;margin-right: 3px;}
    }
  }
</style>
