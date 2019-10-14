<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree ref="tree" :data="treeList" :props="defaultProps" show-checkbox></el-tree>
    </div>
    <div class="container">
      <table-tools @dialogFormVisible="dialogFormVisible = true"
                   @chooseSchool="isChoose = true"
                   @searchData="searchData"
                   :select-college-and-major="true"></table-tools>
      <div class="content">
        <!--表格-->
        <el-table
          :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          @current-change="handleCurrentRow"
          border
          style="width: 100%">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :label="header.label"
              :width="header.width">
            </el-table-column>
          </template>
          <el-table-column v-if="tableList.length" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click="editContent(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
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
        <el-dialog title="编辑指标点对应知识点" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="dialogForm">
            <el-form-item label="课程：" :label-width="formLabelWidth">
              <p>{{form.course}}</p>
            </el-form-item>
            <el-form-item label="指标点：" :label-width="formLabelWidth">
              <p>{{form.indicator}}</p>
            </el-form-item>
            <el-form-item label="知识点："  :label-width="formLabelWidth" prop="knowledge">
              <el-select v-model="form.knowledge" multiple placeholder="请选择">
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
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
  export default {
    name: 'indicator',
    data: function() {
      return {
        options: [{
          value: 'chapter1',
          label: '第一章',
          options: [{
            value: 'c1n1',
            label: '第一章知识点一'
          }, {
            value: 'c1n2',
            label: '第一章知识点二'
          }]
        }, {
          value: 'chapter2',
          label: '第二章',
          options: [{
            value: 'c2n1',
            label: '第二章知识点一'
          }, {
            value: 'c2n2',
            label: '第二章知识点二'
          }, {
            value: 'c2n3',
            label: '第二章知识点三'
          }, {
            value: 'c2n4',
            label: '第二章知识点四'
          }]
        }, {
          value: 'chapter3',
          label: '第三章',
          options: [{
            value: 'c3n1',
            label: '第三章知识点一'
          }, {
            value: 'c3n2',
            label: '第三章知识点二'
          }]
        }],
        value: '',
        headers: [],
        tableList: [], // 表格内容
        currentPage: 1,
        total: 0,
        pagesize: 10, // 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        form: {
          course: '',
          indicator: '',
          knowledge: []
        },
        rules: {
          knowledge: [
            { required: true, message: '知识点不能为空', trigger: 'change' }
          ]
        },
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        formLabelWidth: '120px'
      }
    },
    components: { TableTools },
    created() {
      this.getTableData('getIndicator')
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
      /* 分页 val（每页显示数据）*/
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagesize = val
      },
      /* 分页 当前显示的页码*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
      },
      /* 点击工具栏创建 */
      createdContent() {
        this.dialogFormVisible = true
        this.form = {}
        this.form.title = '新增毕业要求'
      },
      // 获取表格当前行数据
      handleCurrentRow(val) {
        this.currentRow = val
      },
      /* 点击工具栏编辑 */
      editContent(row) {
        this.dialogFormVisible = true
        this.form.course = row.course
        this.form.indicator = row.indicator
        if (Array.isArray(row.knowledge)) {
          this.form.knowledge = row.knowledge
        } else {
          this.form.knowledge = row.knowledge.split(',')
        }
      },
      // 点击工具栏查询
      searchData(param) {
        const oldIds = this.$refs.tree.getCheckedNodes() // 获取所有的选中状态的数据
        const newIds = filterDataIds(oldIds) // 将重合的子项过滤
        if (newIds.length) {
          this.isChoose = false
        }
        if (param || newIds.length) {
          const searchRequest = {}
          searchRequest.inputText = param
          searchRequest.courses = newIds
          console.log(searchRequest)
          var that = this
          this.$http.getRequest('getSearchData', searchRequest).then(res => {
            if (res.code === 1) {
              that.tableList = res.resultList
              that.total = res.resultList.length
              that.emptyText = '无相关内容，请您调整查询内容'
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '请选择院系或输入查询内容',
            type: 'error'
          })
        }
      },
      // 弹框点击确定按钮
      sureDialog() {
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            const info = JSON.parse(JSON.stringify(this.form))
            operateForm('editDialog', info)
            this.resetForm()
            this.getTableData('getIndicator')
          } else {
            return false
          }
        })
      },
      // 弹窗点击取消重置form表单
      resetForm() {
        this.dialogFormVisible = false
        this.$refs.dialogForm.resetFields() // clearValidate取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
      },
      // 过滤知识点
      filterKnowledge(data) {
        data.filter((item) => {
          this.options.map((chapter) => {
            chapter.options.map((knowValue) => {
              for (let i = 0; i < item.knowledge.length; i++) {
                if (item.knowledge[i] === knowValue.value) {
                  item.knowledge[i] = knowValue.label
                }
              }
            })
          })
          if (item.knowledge.length > 1) {
            item.knowledge = item.knowledge.join(', ')
          }
        })
        return data
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName) {
        this.$http.getRequest(urlName).then(res => {
          if (res.code === 1) {
            this.headers = res.headers
            this.tableList = this.filterKnowledge(res.resultList)
            this.total = res.resultList.length
            this.loading = false
          } else {
            this.emptyText = '暂无数据'
          }
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
  .el-form-item{
    p{margin: 0}
  }
</style>

