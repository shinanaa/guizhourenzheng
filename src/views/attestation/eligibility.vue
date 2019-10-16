<template>
    <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree
          :data="treeList"
          :props="defaultProps"
          ref="tree"
          show-checkbox></el-tree>
      </div>
      <div class="container" style="padding-top: 20px;">
        <!--图表-->
        <el-card class="box-card" style="margin: 0 30px;">
          <div slot="header" class="clearfix">
            <span><svg t="1568603580143" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6492" width="18" height="18"><path d="M894.614588 73.968941H752.941176v59.994353c0 36.502588-29.876706 66.379294-66.379294 66.379294a66.56 66.56 0 0 1-66.379294-66.379294v-59.994353H354.785882v59.994353c0 36.502588-29.876706 66.379294-66.379294 66.379294a66.56 66.56 0 0 1-66.379294-66.379294v-59.994353H80.353882a18.070588 18.070588 0 0 0-18.010353 18.070588v854.738824a18.070588 18.070588 0 0 0 18.010353 17.950118h814.260706a18.070588 18.070588 0 0 0 18.010353-18.010353V91.979294a18.070588 18.070588 0 0 0-18.070588-18.010353zM147.395765 874.616471V279.491765h680.176941v595.124706H147.395765z m136.131764-703.548236h8.553412a29.816471 29.816471 0 0 0 29.756235-29.81647V30.72a29.816471 29.816471 0 0 0-29.756235-29.756235h-8.493176a29.816471 29.816471 0 0 0-29.756236 29.756235v110.531765c0 16.384 13.372235 29.756235 29.756236 29.756235z m398.938353 0h8.493177a29.876706 29.876706 0 0 0 29.81647-29.81647V30.72a29.876706 29.876706 0 0 0-29.81647-29.756235h-8.432941a29.816471 29.816471 0 0 0-29.816471 29.756235v110.531765c0 16.384 13.432471 29.756235 29.756235 29.756235zM240.820706 455.378824h96.37647v96.37647h-96.37647v-96.37647z m191.728941 0h96.376471v96.37647h-96.376471v-96.37647z m191.789177 0h96.37647v96.37647h-96.37647v-96.37647zM240.820706 626.447059h96.37647v96.37647h-96.37647v-96.37647z m191.728941 0h96.376471v96.37647h-96.376471v-96.37647z m191.789177 0h96.37647v96.37647h-96.37647v-96.37647z" p-id="6493" fill="#515151"></path></svg>{{currentRow.schoolYear}}</span>
            <span>
              <svg t="1568602460234" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4511" width="18" height="18"><path d="M512 1010.346667h-6.826667l-477.866666-109.226667c-17.066667-3.413333-27.306667-17.066667-27.306667-34.133333V170.666667c0-10.24 3.413333-20.48 13.653333-27.306667 6.826667-6.826667 17.066667-6.826667 27.306667-6.826667L512 245.76 983.04 136.533333c10.24-3.413333 20.48 0 27.306667 6.826667 10.24 6.826667 13.653333 17.066667 13.653333 27.306667v696.32c0 17.066667-10.24 30.72-27.306667 34.133333l-477.866666 109.226667H512z m-443.733333-170.666667l443.733333 102.4 443.733333-102.4V215.04L518.826667 314.026667h-13.653334L68.266667 215.04v624.64z" fill="#2E2E2E" p-id="4512"></path><path d="M512 157.013333h-6.826667L160.426667 78.506667c-17.066667-3.413333-30.72-23.893333-23.893334-40.96S160.426667 6.826667 177.493333 10.24L512 88.746667 870.4 6.826667c17.066667-3.413333 37.546667 6.826667 40.96 27.306666 6.826667 17.066667-6.826667 34.133333-23.893333 37.546667L518.826667 157.013333H512zM477.866667 303.786667h68.266666V989.866667h-68.266666z" fill="#2E2E2E" p-id="4513"></path></svg>{{currentRow.major}}</span>
            <span><svg t="1568602494594" class="icon" viewBox="0 0 1151 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5369" width="18" height="18"><path d="M1118.767545 940.132509a32.29362 32.29362 0 0 1-32.485464-31.973881 355.869299 355.869299 0 0 0-76.737315-227.845878 326.13359 326.13359 0 0 0-228.421408-112.292272 31.973881 31.973881 0 0 1-9.784008-2.877649 31.973881 31.973881 0 0 1-9.72006-6.394776l-0.703425-0.57553a31.973881 31.973881 0 0 1-5.499508-8.185314 19.887754 19.887754 0 0 1-1.406851-2.55791 29.352023 29.352023 0 0 1-1.534746-7.481889 33.572575 33.572575 0 0 1-0.831321-4.412395 8.249261 8.249261 0 0 1 0-1.215008 6.394776 6.394776 0 0 1 0-1.087112 35.427061 35.427061 0 0 1 1.087112-3.70897 33.124941 33.124941 0 0 1 2.430015-7.99347c0.383687-0.703425 0.895269-1.278955 1.342903-1.982381a33.060993 33.060993 0 0 1 6.394776-7.99347h0.511582a30.950717 30.950717 0 0 1 10.487434-5.691351 31.334404 31.334404 0 0 1 9.784007-1.982381h0.703426a156.991757 156.991757 0 0 0 106.920659-48.472404 204.185206 204.185206 0 0 0 9.14453-280.346991 157.119653 157.119653 0 0 0-116.704667-54.867181 31.973881 31.973881 0 1 1 0-63.947762 211.603147 211.603147 0 0 1 91.18951 20.719075 235.647505 235.647505 0 0 1 73.987561 55.634553 267.941126 267.941126 0 0 1-11.830336 368.7228 243.704924 243.704924 0 0 1-37.345494 29.9915 366.548576 366.548576 0 0 1 159.869407 108.711197 384.70974 384.70974 0 0 1 68.61595 124.762085 454.668593 454.668593 0 0 1 22.637508 143.882466 32.357568 32.357568 0 0 1-32.101777 31.462299zM601.941727 549.347732c12.789553 4.156605 25.579105 6.394776 37.793127 11.894283a459.272832 459.272832 0 0 1 146.312481 100.270092 469.31263 469.31263 0 0 1 134.290302 329.906508 32.485463 32.485463 0 0 1-64.970927 0 404.085912 404.085912 0 0 0-116.065189-285.079126 390.081352 390.081352 0 0 0-558.263968 0 403.830121 403.830121 0 0 0-116.065189 285.079126 32.485463 32.485463 0 0 1-64.970927 0 470.080003 470.080003 0 0 1 36.066538-181.483751A465.283921 465.283921 0 0 1 134.483582 661.512107a459.01704 459.01704 0 0 1 146.248533-100.270092c12.27797-5.243717 25.259366-7.737679 37.857075-11.894283a289.363626 289.363626 0 0 1-63.947762-47.513188 296.781567 296.781567 0 0 1 0-415.02098 287.125454 287.125454 0 0 1 410.608584 0 296.781567 296.781567 0 0 1 0 415.02098 290.514686 290.514686 0 0 1-63.308285 47.193449zM460.36138 64.687638a229.636416 229.636416 0 1 0 224.904281 229.636416A227.590087 227.590087 0 0 0 460.617171 64.367899z" p-id="5370" fill="#515151"></path></svg>451</span>
          </div>
          <div class="myChart" id="myChart" style="height: 360px;"></div>
        </el-card>
        <!--操作工具栏-->
        <table-tools
          @createdContent="createdContent"
          @chooseSchool="isChoose = true"
          @editContent="editContent"
          @deleteContent="deleteContent"
          @searchData="searchData"
          :select-college-and-major="true"
          :btn-create-show="true"
          :btn-edit-show="true"
          :btn-del-show="true"
        ></table-tools>
        <div class="content">
          <!--表格-->
          <el-table
            v-loading="loading"
            :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            highlight-current-row
            @current-change="handleCurrentRow"
            border
            style="width: 100%">
            <template v-for="header in headers">
              <el-table-column
                :prop="header.prop"
                :label="header.label">
              </el-table-column>
            </template>
          </el-table>
          <!--分页-->
          <el-pagination
            v-if="total > 10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <!--创建-->
          <el-dialog :title="form.title" :visible.sync="dialogFormVisible" :before-close="resetForm" >
            <el-form :model="form" :rules="rules" ref="dialogForm">
              <el-form-item label="院系" :label-width="formLabelWidth" prop="college">
                <el-select v-model="form.college" placeholder="请选择学院" @change="selectCollege">
                  <el-option v-for="(c, index) in treeList" :label="c.label" :value="index" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
                <el-select v-model="form.major" placeholder="请选择专业" no-data-text="请先选择院系">
                  <el-option v-for="(m, index) in majorList" :label="m.label" :value="index" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学年" :label-width="formLabelWidth" prop="schoolYear">
                <el-select v-model="form.schoolYear" placeholder="请选择学年">
                  <el-option label="2018" value="2018"></el-option>
                  <el-option label="2019" value="2019"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="毕业要求一" :label-width="formLabelWidth" prop="require1">
                <el-input type="number" v-model="form.require1" step="0.1" min="0.1" max="0.9"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求二" :label-width="formLabelWidth" prop="require2">
                <el-input type="number" v-model="form.require2"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求三" :label-width="formLabelWidth" prop="require3">
                <el-input type="number" v-model="form.require3"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求四" :label-width="formLabelWidth" prop="require4">
                <el-input type="number" v-model="form.require4"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求五" :label-width="formLabelWidth" prop="require5">
                <el-input type="number" v-model="form.require5"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求六" :label-width="formLabelWidth" prop="require6">
                <el-input type="number" v-model="form.require6"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求七" :label-width="formLabelWidth" prop="require7">
                <el-input type="number" v-model="form.require7"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求八" :label-width="formLabelWidth" prop="require8">
                <el-input type="number" v-model="form.require8"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm">取 消</el-button>
              <el-button type="primary" @click="sureDialog">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
</template>

<script>
  import TableTools from '@/components/Guizhou/tableTools'
  import { filterDataIds, operateForm } from '@/utils/common'
  import echarts from 'echarts'
  export default {
    data: function() {
      return {
        loading: true,
        headers: [],
        tableList: [], // 表格内容
        currentPage: 1,
        total: 0,
        pagesize: 10, // 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        isAdd: false,
        form: {
          college: '',
          major: '',
          schoolYear: '',
          require1: '',
          require2: '',
          require3: '',
          require4: '',
          require5: '',
          require6: '',
          require7: '',
          require8: ''
        },
        rules: {
          college: [
            { required: true, message: '请选择院系名称', trigger: 'change' }
          ],
          major: [
            { required: true, message: '请选择专业名称', trigger: 'change' }
          ],
          schoolYear: [
            { required: true, message: '请选择所属学年', trigger: 'change' }
          ],
          require1: [
            { required: true, message: '毕业要求一不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require2: [
            { required: true, message: '毕业要求二不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require3: [
            { required: true, message: '毕业要求三不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require4: [
            { required: true, message: '毕业要求四不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require5: [
            { required: true, message: '毕业要求五不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require6: [
            { required: true, message: '毕业要求六不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require7: [
            { required: true, message: '毕业要求七不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require8: [
            { required: true, message: '毕业要求八不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ]
        },
        treeList: [],
        majorList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        formLabelWidth: '120px',
        require: [],
        currentRow: {
          schoolYear: '2018',
          major: ''
        }
      }
    },
    created() {
      // 获取院系树的数据
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    mounted() {
      this.getTableData('getEligibility')
    },
    components: { TableTools },
    methods: {
      /* 分页 val（每页显示数据）*/
      handleSizeChange(val) {
        this.pagesize = val
      },
      /* 分页 当前显示的页码*/
      handleCurrentChange(val) {
        this.currentPage = val
      },
      /* 学院选择树*/
      handleNodeClick(data) {
        this.isChoose = false
      },
      /* 点击工具栏创建 */
      createdContent() {
        this.dialogFormVisible = true
        this.isAdd = true
        this.form = {}
        this.form.title = '新增毕业要求'
      },
      /* 点击工具栏编辑 */
      editContent() {
        if (this.currentRow) {
          this.dialogFormVisible = true
          this.isAdd = false
          this.form = this.currentRow
          this.form.title = '修改毕业要求'
          for (let i = 0; i < this.treeList.length; i++) {
            if (this.treeList[i].label === this.form.college) {
              this.majorList = this.treeList[i].children
              break
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: '请先选择要修改的数据',
            type: 'warning'
          })
        }
      },
      // 点击表格行
      handleCurrentRow(val) {
        this.getRequireData(val)
        this.drawLine()
      },
      // 点击工具栏删除
      deleteContent() {
        if (this.currentRow) {
          operateForm('deleteDialog', this.currentRow.order)
          this.getTableData('getEligibility')
        } else {
          this.$message({
            showClose: true,
            message: '请先选择要删除的数据',
            type: 'warning'
          })
        }
      },
      // 点击工具栏查询
      searchData(param) {
        const oldIds = this.$refs.tree.getCheckedNodes() // 获取所有的选中状态的数据
        const newIds = filterDataIds(oldIds) // 将重合的子项过滤
        if (newIds.length) {
          this.isChoose = false
          console.log(newIds)
        }
        if (param || newIds.length) {
          const searchRequest = {}
          searchRequest.inputText = param
          searchRequest.courses = newIds
          var that = this
          this.$http.getRequest('getSearchData', param).then(res => {
            if (res.code === 1) {
              that.tableList = res.resultList
              that.total = res.resultList.length
              that.emptyText = '无相关内容，请您调整查询内容'
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '查询内容不可为空',
            type: 'error'
          })
        }
      },
      // 弹框点击确定按钮
      sureDialog() {
        console.log(this.require)
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            if (this.isAdd) {
              operateForm('addDialog', this.form)
            } else {
              operateForm('editDialog', this.form)
            }
            this.getTableData('getEligibility')
            this.resetForm()
            console.log(this.require)
          } else {
            return false
          }
        })
      },
      // 弹窗点击取消重置form表单
      resetForm() {
        this.dialogFormVisible = false
        this.$refs.dialogForm.clearValidate() // 取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
        this.form = {}
        this.require = []
        this.majorList = []
      },
      // 弹框选择院校
      selectCollege(data) {
        this.majorList = this.treeList[data].children
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName) {
        this.$http.getRequest(urlName).then(res => {
          if (res.code === 1) {
            this.headers = res.headers
            this.tableList = res.resultList
            this.total = res.resultList.length
            this.currentRow = res.resultList[0]
            this.loading = false
            this.getRequireData()
            this.drawLine()
          } else {
            this.emptyText = '暂无数据'
          }
        })
      },
      // 获取折线图数据
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
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '合格标准' },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['毕业要求一', '毕业要求二', '毕业要求三', '毕业要求四', '毕业要求五', '毕业要求六', '毕业要求七', '毕业要求八']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'line',
            itemStyle: {
              normal: {
                color: '#2ec7c9',
                lineStyle: {
                  color: '#1890ff'
                }
              }
            },
            data: this.require
          }]
        })
      }
    },
    name: 'eligibility'
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
