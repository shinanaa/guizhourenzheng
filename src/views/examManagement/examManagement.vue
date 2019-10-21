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
      <!--操作工具栏-->
      <table-tools
        @createdContent="createdContent"
        @chooseSchool="isChoose = !isChoose"
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
            <el-form-item label="考试名称" :label-width="formLabelWidth" prop="examName">
              <el-input type="text" v-model="form.examName" placeholder="请填写考试名称"></el-input>
            </el-form-item>
            <el-form-item label="考试年级" :label-width="formLabelWidth" prop="examGrade">
              <el-select v-model="form.examGrade" placeholder="请选择考试年级">
                <el-option label="2018~2019学年" value="2019"></el-option>
                <el-option label="2017~2018学年" value="2018"></el-option>
                <el-option label="2016~2017学年" value="2017"></el-option>
                <el-option label="2015~2016学年" value="2016"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课程名称" :label-width="formLabelWidth" prop="examCourse">
              <el-select v-model="form.examCourse" placeholder="请选择课程名称">
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2019" value="2019"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考试类型" :label-width="formLabelWidth" prop="examType">
              <el-select v-model="form.examType" placeholder="请选择考试类型">
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2019" value="2019"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否生效" :label-width="formLabelWidth" prop="examEffect">
              <el-radio-group v-model="form.examEffect">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注说明" :label-width="formLabelWidth" prop="examRemarks">
              <el-input type="textarea" v-model="form.examRemarks"></el-input>
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
  name: 'exam-management',
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
        examName: '',
        examGrade: '',
        examCourse: '',
        examType: '',
        examEffect: '',
        examRemarks: ''
      },
      rules: {
        examName: [
          { required: true, message: '请填写考试名称', trigger: 'blur' }
        ],
        examGrade: [
          { required: true, message: '请选择考试年级', trigger: 'change' }
        ],
        examCourse: [
          { required: true, message: '请选择所属学年', trigger: 'change' }
        ],
        examType: [
          { required: true, message: '请选择考试类型', trigger: 'change' }
        ],
        examEffect: [
          { required: true, message: '请选择是否生效', trigger: 'change' }
        ],
        examRemarks: [
          { required: true, message: '请填写备注说明', trigger: 'blur' }
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
      require: [0.8, 0.7, 0.7, 0.6, 0.7, 0.8, 0.9, 0.9],
      currentRow: null
    }
  },
  created() {
    this.getTableData('getExamManage')
    // 获取院系树的数据
    this.$http.getRequest('getChooseData').then(res => {
      if (res.status === 1) {
        this.treeList = res.schoolData
      }
    })
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
      this.currentRow = val
    },
    // 点击工具栏删除
    deleteContent() {
      if (this.currentRow) {
        operateForm('deleteDialog', this.currentRow.order)
        this.getTableData('getExamManage')
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
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          if (this.isAdd) {
            operateForm('addDialog', this.form)
          } else {
            operateForm('editDialog', this.form)
          }
          this.getTableData('getExamManage')
          this.resetForm()
        } else {
          return false
        }
      })
    },
    // 弹窗点击取消重置form表单
    resetForm() {
      this.dialogFormVisible = false
      this.$refs.dialogForm.resetFields() // 取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
      this.form = {}
    },
    // 弹框选择院校
    selectCollege(data) {
      this.majorList = this.treeList[data].children
    },
    // 过滤是否生效
    filterEffect(data) {
      data.map((item) => {
        item.examEffect ? item.examEffect = '是' : item.examEffect = '否'
      })
      return data
    },
    // 方法封装 获取页面全部数据
    getTableData(urlName) {
      this.$http.getRequest(urlName).then(res => {
        if (res.code === 1) {
          this.headers = res.headers
          this.tableList = this.filterEffect(res.resultList)
          console.log(123)
          console.log(this.tableList)
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
</style>
