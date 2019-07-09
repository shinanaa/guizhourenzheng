<template>
    <div class="graduationRequire" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
            :data="chongzhi.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
          <el-dialog :title="form.title" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="院系" :label-width="formLabelWidth">
                <el-select v-model="form.college" placeholder="请选择学院">
                  <el-option label="文学院" value="文学院"></el-option>
                  <el-option label="历史与政治" value="历史与政治"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业" :label-width="formLabelWidth">
                <el-select v-model="form.major" placeholder="请选择专业">
                  <el-option label="汉语言文学" value="汉语言文学"></el-option>
                  <el-option label="汉语国际教育" value="汉语国际教育"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学年" :label-width="formLabelWidth">
                <el-select v-model="form.schoolYear" placeholder="请选择学年">
                  <el-option label="2018" value="2018"></el-option>
                  <el-option label="2019" value="2019"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业毕业要求" :label-width="formLabelWidth">
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
              <el-form-item label="指标点数量" :label-width="formLabelWidth">
                <el-input type="number" v-model="form.number"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sureDialog">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
</template>

<script>
  import ElButton from 'element-ui/packages/button/src/button'
  import ElInput from 'element-ui/packages/input/src/input'
  import TableTools from '@/components/Guizhou/tableTools'
  export default {
    data() {
      return {
        headers: [], // 表头
        chongzhi: [], // 表格内容
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
        treeList: [
          {
            label: '文学院',
            children: [{
              label: '汉语言文学',
              children: [{
                label: '2018学年'
              }, {
                label: '2019学年'
              }]
            }, {
              label: '汉语国际教育',
              children: [{
                label: '2018学年'
              }, {
                label: '2019学年'
              }]
            }]
          }, {
            label: '历史与政治学院',
            children: [{
              label: '思想政治教育',
              children: [{
                label: '2018学年'
              }]
            }, {
              label: '历史学',
              children: [{
                label: '2019学年'
              }]
            }]
          }, {
            label: '教育科学学院',
            children: [{
              label: '教育学',
              children: [{
                label: '2019学年'
              }]
            }, {
              label: '小学教育',
              children: [{
                label: '2019学年'
              }]
            }]
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        formLabelWidth: '120px',
        currentRow: null
      }
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
      /* 学院选择树*/
      handleNodeClick(data) {
        console.log('点击了树')
        this.isChoose = false
      },
      /* 创建时修改弹窗title */
      createdContent() {
        this.dialogFormVisible = true
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
      handleCurrentRow(val) {
        this.currentRow = val
      },
      sureDialog() {
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
              that.chongzhi = res.resultList
              that.total = res.resultList.length
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '查询内容不可为空',
            type: 'error'
          })
        }
      }
    },
    components: { ElButton, ElInput, TableTools },
    created() {
      var that = this
      this.$http.getRequest('getGraduationRequire').then(res => {
        if (res.code === 1) {
          that.headers = res.headers
          that.chongzhi = res.resultList
          that.total = res.resultList.length
        } else {
          that.title = '暂无数据啊'
        }
      })
    },
    name: 'graduation-require'
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
