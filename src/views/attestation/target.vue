<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree
        :data="treeList"
        :props="defaultProps"
        ref="tree"
        show-checkbox
      ></el-tree>
    </div>
    <div class="container">
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
          :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          highlight-current-row
          @current-change="handleCurrentRow"
          border
          style="width: 100%;">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :label="header.label"
            >
            </el-table-column>
          </template>
          <div slot="empty">
            <p>{{emptyText}}</p>
          </div>
        </el-table>
        <!--分页-->
        <el-pagination
          v-if="total > 10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!--创建/编辑-->
        <el-dialog :title="form.title" :visible.sync="dialogFormVisible" :before-close="resetForm" >
          <el-form :model="form" :rules="rules" ref="dialogForm">
            <el-form-item label="院系信息" :label-width="formLabelWidth" prop="collegeInfo">
              <el-cascader
                v-model="form.collegeInfo"
                :options="treeList"></el-cascader>
            </el-form-item>
            <el-form-item label="培养目标一" :label-width="formLabelWidth" prop="target1">
              <el-input type="text" v-model="form.target1"></el-input>
            </el-form-item>
            <el-form-item label="培养目标二" :label-width="formLabelWidth" prop="target2">
              <el-input type="text" v-model="form.target2"></el-input>
            </el-form-item>
            <el-form-item label="培养目标三" :label-width="formLabelWidth" prop="target3">
              <el-input type="text" v-model="form.target3"></el-input>
            </el-form-item>
            <el-form-item label="培养目标四" :label-width="formLabelWidth" prop="target4">
              <el-input type="text" v-model="form.target4"></el-input>
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
import { filterDataIds, valueToLabel, labelToValue } from '@/utils/common'
export default {
  name: 'target',
  data() {
    return {
      loading: true,
      emptyText: '',
      headers: [], // 表头
      tableList: [], // 表格内容
      currentPage: 1, // 分页 当前显示页
      total: 0, // 分页 总条数
      pageSize: 10, // 分页 表格列表每页显示条数
      dialogFormVisible: false, // 是否现在创建/编辑弹窗
      form: {
        collegeInfo: [],
        target1: '',
        target2: '',
        target3: '',
        target4: ''
      },
      rules: {
        collegeInfo: [
          { required: true, message: '请选择院系相关信息', trigger: 'change' }
        ],
        target1: [
          { required: true, message: '培养目标不能为空', trigger: 'blur' }
        ],
        target2: [
          { required: true, message: '培养目标不能为空', trigger: 'blur' }
        ],
        target3: [
          { required: true, message: '培养目标不能为空', trigger: 'blur' }
        ],
        target4: [
          { required: true, message: '培养目标不能为空', trigger: 'blur' }
        ]
      },
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isChoose: false,
      formLabelWidth: '120px',
      currentRow: null,
      newCollegeInfo: [],
      newCollegeValue: []
    }
  },
  components: { TableTools },
  created() {
    this.getTableData('getTrainTarget')
    this.$http.getRequest('getChooseData').then(res => {
      if (res.status === 1) {
        console.log(res)
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
    /* 点击工具栏创建 */
    createdContent() {
      this.dialogFormVisible = true
      this.form = {}
      this.form.title = '新增培养目标'
    },
    /* 点击工具栏编辑 */
    editContent() {
      if (this.currentRow) {
        this.dialogFormVisible = true
        console.log(this.currentRow)
        const { college, major, schoolYear, ...currentToFrom } = this.currentRow
        labelToValue(this.treeList, college, major, schoolYear, this.newCollegeValue)
        currentToFrom.collegeInfo = this.newCollegeValue
        this.form = currentToFrom
        this.form.title = '修改培养目标'
      } else {
        this.$message({
          showClose: true,
          message: '请先选择要修改的数据',
          type: 'warning'
        })
      }
    },
    // 获取表格当前行数据
    handleCurrentRow(val) {
      this.currentRow = val
    },
    // 点击工具栏删除
    deleteContent() {
      if (this.currentRow) {
        this.operateForm('deleteDialog', this.currentRow.order)
        this.getTableData('getTrainTarget')
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
      }
      if (param || newIds.length) {
        const searchRequest = {}
        searchRequest.inputText = param
        searchRequest.courses = newIds
        this.$http.getRequest('getSearchData', param).then(res => {
          if (res.code === 1) {
            this.tableList = res.resultList
            this.total = res.resultList.length
            this.emptyText = '无相关内容，请您调整查询内容'
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择要查询的院系专业',
          type: 'error'
        })
      }
    },
    // 弹框点击确定按钮
    sureDialog() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          // 过滤数据
          const { collegeInfo, ...params } = this.form
          valueToLabel(this.treeList, collegeInfo, this.newCollegeInfo)
          params.newCollegeInfo = this.newCollegeInfo
          if (this.form.title === '新增培养目标') {
            this.operateForm('addDialog', params)
          } else if (this.form.title === '修改培养目标') {
            this.operateForm('editDialog', params)
          }
          this.getTableData('getTrainTarget')
          this.resetForm()
        } else {
          return false
        }
      })
    },
    // 弹窗点击取消重置form表单
    resetForm() {
      this.dialogFormVisible = false
      this.$refs.dialogForm.resetFields() // clearValidate取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
      this.form = {}
    },
    // 方法封装 获取页面全部数据
    getTableData(urlName) {
      var that = this
      this.$http.getRequest(urlName).then(res => {
        if (res.code === 1) {
          that.headers = res.headers
          that.tableList = res.resultList
          that.total = res.resultList.length
          that.loading = false
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
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
</style>
