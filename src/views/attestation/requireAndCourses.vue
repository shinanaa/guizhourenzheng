<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick" show-checkbox></el-tree>
    </div>
    <div class="container">
      <table-tools @dialogFormVisible="dialogFormVisible = true"
                   @chooseSchool="chooseSchool"
                   @createdContent="createdContent"
                   @editContent="editContent"
                   @deleteContent="deleteContent"
                   @searchData="searchData"
      ></table-tools>
      <div class="content">
        <!--表格-->
        <el-table
          :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          highlight-current-row
          @current-change="handleCurrentRow"
          border
          style="width: 100%;text-align: center;">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :label="header.label">
            </el-table-column>
          </template>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!--创建-->
        <el-dialog :title="this.form.title" :visible.sync="dialogFormVisible" :before-close="resetForm">
          <el-form :model="form" :rules="rules" ref="dialogForm">
            <el-form-item label="思想道德修养与法律基础" :label-width="formLabelWidth" prop="kc_sf">
              <el-select v-model="form.kc_sf" placeholder="难度">
                <el-option label="H" value="H"></el-option>
                <el-option label="M" value="M"></el-option>
                <el-option label="L" value="L"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="小学生品德发展与道德教育" :label-width="formLabelWidth" prop="kc_pd">
              <el-select v-model="form.kc_pd" placeholder="难度">
                <el-option label="H" value="H"></el-option>
                <el-option label="M" value="M"></el-option>
                <el-option label="L" value="L"></el-option>
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
  export default {
    data: function() {
      return {
        headers: [],
        tableList: [], // 表格内容
        currentPage: 1,
        total: 0,
        pagesize: 10, // 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        form: {
          title: '',
          kc_sf: '',
          kc_pd: ''
        },
        rules: {
          kc_sf: [
            { required: true, message: '不能为空', trigger: 'change' }
          ],
          kc_pd: [
            { required: true, message: '不能为空', trigger: 'change' }
          ]
        },
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        formLabelWidth: '220px',
        currentRow: null
      }
    },
    created() {
      this.getTableData('getRequireCourses')
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
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
        // this.isChoose = false;
      },
      chooseSchool() {
        this.isChoose = true
      },
      /* 点击工具栏创建 */
      createdContent() {
        this.dialogFormVisible = true
        this.form = {}
        this.form.title = '新增毕业要求'
      },
      /* 点击工具栏编辑 */
      editContent() {
        if (this.currentRow) {
          this.dialogFormVisible = true
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
      // 点击工具栏删除
      deleteContent() {
        if (this.currentRow) {
          this.operateForm('deleteDialog', this.currentRow.order)
          this.getTableData('getRequireCourses')
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
        if (param) {
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
      // 获取表格当前行数据
      handleCurrentRow(val) {
        this.currentRow = val
        console.log(val)
      },
      // 弹框点击确定按钮
      sureDialog() {
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            if (this.form.title === '新增毕业要求') {
              this.operateForm('addDialog', this.form)
            } else if (this.form.title === '修改毕业要求') {
              this.operateForm('editDialog', this.form)
            }
            this.resetForm()
            this.getTableData('getRequireCourses')
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
        this.majorList = []
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName) {
        var that = this
        this.$http.getRequest(urlName).then(res => {
          if (res.code === 1) {
            that.headers = res.headers
            that.tableList = res.resultList
            that.total = res.resultList.length
          } else {
            that.emptyText = '暂无数据'
          }
        })
      },
      // 方法封装 操作（添加/编辑/删除）表单
      operateForm(url, params) {
        this.$http.postRequest(url, params).then(res => {
          if (res.status === 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
          }
        })
      }
    },
    components: { TableTools },
    name: 'require-and-courses'
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
</style>
