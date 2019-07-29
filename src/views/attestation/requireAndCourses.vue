<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick" show-checkbox></el-tree>
    </div>
    <div class="container">
      <table-tools @dialogFormVisible="dialogFormVisible = true"
                   @chooseSchool="chooseSchool"
                   :btn-not-visible="true"
                   :requires="requires"
                   :search-input-not-visible="true"
      ></table-tools>
      <div class="content">
        <!--表格-->
        <el-table
          :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%;text-align: center;">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :label="header.label">
            </el-table-column>
          </template>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editContent(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
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
        <el-dialog title="编辑指标点对应的课程" :visible.sync="dialogFormVisible" :before-close="resetForm">
          <el-form ref="dialogForm">
            <el-form-item class="formCenter" label-position="center" v-for="(item,index) in currentCourses" :label="item.label" :label-width="formLabelWidth" :key="index" ref="formItem">
              <el-select placeholder="难度" v-model="item.value" @change="chooseCourses(item.value)">
                <el-option label="取消" value=""></el-option>
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
        requires: [], // 毕业要求选项
        currentCourses: [], // 当前专业的所有课程
        headers: [],
        tableList: [], // 表格内容
        currentPage: 1,
        total: 0,
        pagesize: 10, // 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
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
      /* 点击工具栏编辑 */
      editContent(row) {
        console.log(row)
        this.dialogFormVisible = true
        // this.form = this.currentRow
        // for (let i = 0; i < this.treeList.length; i++) {
        //   if (this.treeList[i].label === this.form.college) {
        //     this.majorList = this.treeList[i].children
        //     break
        //   }
        // }
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
      // 弹框点击确定按钮
      sureDialog() {
        console.log(this.currentCourses)
        this.operateForm('editDialog', this.currentCourses)
        this.resetForm()
        this.getTableData('getRequireCourses')
      },
      // 弹窗点击取消重置form表单
      resetForm() {
        this.dialogFormVisible = false
        this.$refs.dialogForm.clearValidate() // 取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
        this.form = {}
        this.majorList = []
      },
      chooseCourses(values) {
        console.log(values)
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName) {
        var that = this
        this.$http.getRequest(urlName).then(res => {
          if (res.code === 1) {
            that.headers = res.headers
            that.tableList = res.resultList
            that.total = res.resultList.length
            that.requires = res.requires
            that.currentCourses = res.headers.slice(1)
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
  .el-form{text-align: center;}
</style>
<style rel="stylesheet/scss" lang="scss">
  .formCenter{
    .el-form-item__label{text-align: center;}
  }
  .selected{
    .el-form-item__label{background: #f2f2f2;}
  }
</style>
