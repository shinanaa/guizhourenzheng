<template>
    <div class="rightContent" :class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree
          :data="treeList"
          :props="defaultProps"
          ref="tree"
          show-checkbox></el-tree>
      </div>
      <div class="container">
        <table-tools
          @createdContent="createdContent"
          @chooseSchool="isChoose = true"
          @editContent="editContent"
          @deleteContent="deleteContent"
          @searchData="searchData"
          :select-college-and-major="true"
          :search-condition="true"
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
              <el-form-item label="所属院系专业" :label-width="formLabelWidth" prop="collegeInfo">
                <el-cascader
                  v-model="form.collegeInfo"
                  :options="treeList"
                  @change="changeJiLian"></el-cascader>
              </el-form-item>
              <el-form-item label="专业毕业要求" :label-width="formLabelWidth" prop="require">
                <el-select v-model="form.require" placeholder="请选择要求">
                  <el-option v-for="(require, index) in requireList" :label="require.label" :value="require.value" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动性质" :label-width="formLabelWidth">
                <el-checkbox-group v-model="targets">
                  <el-checkbox v-for="target in targetOptions" :label="target" :key="target"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="指标点数量" :label-width="formLabelWidth" prop="number">
                <el-input type="number" v-model="form.number"></el-input>
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
  import { filterDataIds, valueToLabel, labelToValue, targetsFilter, operateForm } from '@/utils/common'

  export default {
    name: 'graduation-require',
    data() {
      return {
        loading: true,
        emptyText: '暂无数据',
        headers: [], // 表头
        tableList: [], // 表格内容
        currentPage: 1, // 分页 当前显示页
        total: 0, // 分页 总条数
        pageSize: 10, // 分页 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        targetOptions: ['毕业培养目标1', '毕业培养目标2', '毕业培养目标3', '毕业培养目标4'], // 培养目标列表
        targets: [], // 表单中选中的培养目标
        form: {
          collegeInfo: [],
          title: '', // 弹窗标题
          order: '',
          number: '',
          require: '',
          targets: []
        },
        rules: {
          collegeInfo: [
            { required: true, message: '请选择院系相关信息', trigger: 'change' }
          ],
          require: [
            { required: true, message: '请选择专业毕业要求', trigger: 'change' }
          ],
          number: [
            { required: true, message: '请输入指标点数量', trigger: 'blur' }
          ]
        },
        school: [],
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        chooseTree: [], // 树形控件搜索
        isChoose: false,
        formLabelWidth: '120px',
        currentRow: null,
        newCollegeInfo: [],
        newCollegeValue: [],
        requireList: []
      }
    },
    components: { TableTools },
    created() {
      this.getTableData('getGraduationRequire')
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
      changeJiLian(val) {
        console.log(val)
      },
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
        this.form.title = '新增毕业要求'
      },
      /* 点击工具栏编辑 */
      editContent() {
        if (this.currentRow) {
          this.dialogFormVisible = true
          const { college, major, schoolYear, target1, target2, target3, target4, ...currentToFrom } = this.currentRow
          // // 获取当前数据培养目标选中状态
          if (target1 !== false) {
            this.targets.push('毕业培养目标1')
          }
          if (target2 !== false) {
            this.targets.push('毕业培养目标2')
          }
          if (target3 !== false) {
            this.targets.push('毕业培养目标3')
          }
          if (target4 !== false) {
            this.targets.push('毕业培养目标4')
          }
          // // 将当前数据的院系相关值转换为级联选择器可显示的值
          labelToValue(this.treeList, college, major, schoolYear, this.newCollegeValue)
          // // 从当前数据中过滤出不需要的值，并把需要的值给currentToFrom
          currentToFrom.collegeInfo = this.newCollegeValue
          this.form = currentToFrom
          this.form.title = '修改毕业要求'
          try {
            this.$refs.dialogForm.resetFields()
          } catch (err) {
            console.log('出错啦')
          }
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
          operateForm('deleteDialog', this.currentRow.order)
          this.getTableData('getGraduationRequire')
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
          console.log(searchRequest)
          this.$http.getRequest('getSearchData', searchRequest).then(res => {
            if (res.code === 1) {
              this.tableList = res.resultList
              this.total = res.resultList.length
              this.emptyText = '无相关内容，请您调整查询内容'
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
            this.dialogFormVisible = false
            const { collegeInfo, ...params } = this.form
            valueToLabel(this.treeList, collegeInfo, this.newCollegeInfo)
            params.newCollegeInfo = this.newCollegeInfo
            params.targets = this.targets
            if (this.form.title === '新增毕业要求') {
              operateForm('addDialog', params)
            } else if (this.form.title === '修改毕业要求') {
              operateForm('editDialog', params)
            }
            this.getTableData('getGraduationRequire')
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
        this.targets = []
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName) {
        var that = this
        this.$http.getRequest(urlName).then(res => {
          if (res.code === 1) {
            that.headers = res.headers
            that.tableList = targetsFilter(res.resultList)
            this.requireList = res.requires
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
