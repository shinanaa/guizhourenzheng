<template>
    <div class="graduationRequire" :class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree
          :data="treeList"
          :props="defaultProps"
          ref="tree"
          show-checkbox
          accordion
          @node-click="handleCheckChange"></el-tree>
      </div>
      <div class="container">
        <table-tools
          @createdContent="createdContent"
          @chooseSchool="isChoose = true"
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
            style="width: 100%;">
            <template v-for="header in headers">
              <el-table-column
                :prop="header.prop"
                :label="header.label">
              </el-table-column>
            </template>
            <div slot="empty">
                <p>{{title}}</p>
            </div>
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
          <!--创建/编辑-->
          <el-dialog :title="form.title" :visible.sync="dialogFormVisible" :before-close="resetForm" >
            <el-form :model="form" :rules="rules" ref="dialogForm">
              <el-form-item label="院系" :label-width="formLabelWidth" prop="college">
                <el-select v-model="form.college" placeholder="请选择学院" @change="selectCollege">
                  <el-option v-for="(c, index) in treeList" :label="c.label" :value="index" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
                <el-select v-model="form.major" placeholder="请选择专业">
                  <el-option v-for="(m, index) in majorList" :label="m.label" :value="index" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学年" :label-width="formLabelWidth" prop="schoolYear">
                <el-select v-model="form.schoolYear" placeholder="请选择学年">
                  <el-option label="2018" value="2018"></el-option>
                  <el-option label="2019" value="2019"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业毕业要求" :label-width="formLabelWidth" prop="require">
                <el-input type="textarea" v-model="form.require"></el-input>
              </el-form-item>
              <el-form-item label="毕业培养目标1" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.target1"></el-input>
              </el-form-item>
              <el-form-item label="毕业培养目标2" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.target2"></el-input>
              </el-form-item>
              <el-form-item label="毕业培养目标3" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.target3"></el-input>
              </el-form-item>
              <el-form-item label="毕业培养目标4" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.target4"></el-input>
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
  export default {
    name: 'graduation-require',
    data() {
      return {
        title: '暂无数据',
        headers: [], // 表头
        tableList: [], // 表格内容
        currentPage: 1, // 分页 当前显示页
        total: 0, // 分页 总条数
        pagesize: 10, // 分页 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        form: {
          title: '', // 弹窗标题
          order: '',
          college: '',
          major: '',
          number: '',
          require: '',
          schoolYear: '',
          target1: '',
          target2: '',
          target3: '',
          target4: ''
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
          require: [
            { required: true, message: '请输入专业毕业要求', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请输入指标点数量', trigger: 'blur' }
          ]
        },
        school: [],
        treeList: [],
        majorList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        chooseTree: [], // 树形控件搜索
        isChoose: false,
        formLabelWidth: '120px',
        currentRow: null
      }
    },
    components: { TableTools },
    created() {
      var that = this
      this.$http.getRequest('getGraduationRequire').then(res => {
        if (res.code === 1) {
          that.headers = res.headers
          that.tableList = res.resultList
          that.total = res.resultList.length
        } else {
          that.title = '暂无数据'
        }
      })
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
      handleCheckChange(data, checked, indeterminate) {
        if (checked) {
          // console.log(data.id)
          console.log(this.$refs.tree.getCheckedNodes())
        }
      },
      resetForm() {
        this.dialogFormVisible = false
        this.$refs.dialogForm.resetFields()
        this.form = {}
      },
      /* 创建时修改弹窗title */
      createdContent() {
        this.dialogFormVisible = true
        this.form = {}
        this.form.title = '新增毕业要求'
      },
      /* 编辑表格内容 */
      editContent() {
        if (this.currentRow) {
          this.dialogFormVisible = true
          this.form = this.currentRow
          this.form.title = '修改毕业要求'
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
      sureDialog() {
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            if (this.form.title === '新增毕业要求') {
              this.$http.postRequest('addDialog', this.form).then(res => {
                if (res.status === 0) {
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                  })
                }
              })
            } else if (this.form.title === '修改毕业要求') {
              this.$http.postRequest('editDialog', this.form).then(res => {
                if (res.status === 0) {
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                  })
                }
              })
            }
          } else {
            return false
          }
        })
      },
      deleteContent() {
        if (this.currentRow) {
          this.$http.postRequest('deleteDialog', this.currentRow.order).then(res => {
            if (res.status === 0) {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'success'
              })
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '请先选择要删除的数据',
            type: 'warning'
          })
        }
      },
      // 搜索查询
      searchData(param) {
        if (param) {
          var that = this
          this.$http.getRequest('getSearchData', param).then(res => {
            if (res.code === 1) {
              that.tableList = res.resultList
              that.total = res.resultList.length
              that.title = '无相关内容，请您调整查询内容'
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
      handleChange(value) {
        console.log(value)
      },
      selectCollege(data) {
        console.log(data)
        this.majorList = this.treeList[data].children
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .graduationRequire{position: relative;width:100%;height:100%;
    .choose-school{ width: 200px;height:100%;overflow: auto;border-right:2px solid #999;position: absolute;bottom:0;top:0;left:0;padding: 20px 0;background: #F8F8F8;
      .el-tree{background: #F8F8F8;}
    }
    .container{position: relative;margin-left: 200px;
      .content{padding: 0 30px;
        .el-pagination{
          padding: 30px 15px;text-align: right;}
      }
    }
  }
  .graduationRequire.hiddenChoose{
    .container{margin-left: 0px;}
    .choose-school{width: 0px;}
  }

</style>
