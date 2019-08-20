<template>
  <!--课程组成-->
<div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
  <div class="choose-school">
    <el-tree :data="treeList" :props="defaultProps" ref="tree" show-checkbox></el-tree>
  </div>
  <div class="container">
    <table-tools @dialogFormVisible="dialogFormVisible = true"
                 @chooseSchool="isChoose = true"
                 @searchData="searchData"
                 :btn-not-visible="true"
                 :search-input-not-visible="true"
    ></table-tools>
    <div class="content">
      <el-table
        v-loading="loading"
        :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="width: 100%;">
        <template v-for="header in headers">
          <el-table-column
            :prop="header.prop"
            :label="header.label"
            :width="header.width">
          </el-table-column>
        </template>
        <el-table-column v-if="tableList.length" label="操作" width="225">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="courseAllocation(scope.row)">课程配置</el-button>
            <el-button type="text" size="small" @click="peaceForm(scope.row)">课程平时组成</el-button>
            <el-button type="text" size="small" @click="editContent(scope.row, index)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!--创建/编辑-->
      <el-dialog title="课程配置" :visible.sync="dialogFormVisible" :before-close="resetForm" >
        <el-form :model="form"  ref="dialogForm">
          <el-form-item label="课程：" :label-width="formLabelWidth" prop="target1">
            <p>思想道德修养与法律基础</p>
          </el-form-item>
          <el-form-item label="期末考试占比：" :label-width="formLabelWidth" prop="schoolYear">
            <el-select v-model="form.final">
              <el-option v-for="(num, index) in 9" :label="num/10" :value="num/9" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平时成绩占比：" :label-width="formLabelWidth" prop="target1">
            <el-select v-model="form.peacetime">
              <el-option v-for="(num, index) in 9" :label="num/10" :value="num/9" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="sureDialog">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="课程平时组成" :visible.sync="peacetimeForm" :before-close="resetForm" >
        <el-form :model="form"  ref="dialogForm">
          <el-form-item label="课程：" :label-width="formLabelWidth" prop="target1">
            <p>思想道德修养与法律基础</p>
          </el-form-item>
          <el-form-item label="平时成绩组成：" :label-width="formLabelWidth" prop="target1">
            <el-checkbox-group v-model="form.form">
              <el-checkbox label="期中考试" name="type"></el-checkbox>
              <el-checkbox label="实验" name="type"></el-checkbox>
              <el-checkbox label="课堂讨论" name="type"></el-checkbox>
              <el-checkbox label="活动" name="type"></el-checkbox>
              <el-checkbox label="实践" name="type"></el-checkbox>
              <el-checkbox label="作业" name="type"></el-checkbox>
              <el-checkbox label="出勤" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div class="peaceForm" v-for="(peaceItem, index) in form.form" :key="index">
            <div class="line-left-right">
              <span>{{peaceItem}}</span>
            </div>
            <el-form-item label="占比：" :label-width="formLabelWidth" prop="schoolYear">
              <el-select v-model="form.final">
                <el-option v-for="(num, index) in 9" :label="num/10" :value="num/9" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="peaceItem !== '期中考试' && peaceItem !== '出勤'" label="分值：" :label-width="formLabelWidth" prop="target1">
              <el-input type="num"></el-input>
            </el-form-item>
            <el-form-item v-if="peaceItem !== '期中考试' && peaceItem !== '出勤'" label="次数：" :label-width="formLabelWidth" prop="target1">
              <el-input type="num"></el-input>
            </el-form-item>
          </div>
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
  import { filterDataIds } from '@/utils/common'
  export default {
    name: 'granding',
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
        pageSize: 10,
        currentPage: 1,
        total: 0,
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        peacetimeForm: false,
        formLabelWidth: '145px',
        form: {
          final: null,
          peacetime: null,
          form: []
        }
      }
    },
    components: { TableTools },
    created() {
      this.getTableData('getCoursesForm')
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
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
      // 点击工具栏查询
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
      // 课程配置
      courseAllocation(row) {
        this.dialogFormVisible = true
        console.log(row)
      },
      peaceForm(row) {
        this.peacetimeForm = true
        console.log(row)
      },
      // 弹框点击确定按钮
      sureDialog() {
        if (this.elForm1) {
          this.submitForm(this.form1, 'getCoursesTarget')
          this.resetForm(this.form1)
        }
        if (this.elForm2) {
          this.submitForm(this.form2, 'getCoursesModule')
          this.resetForm(this.form2)
        }
        if (this.elForm3) {
          this.submitForm(this.form3, 'getCoursesContent')
          this.resetForm(this.form3)
        }
        if (this.elForm4) {
          this.submitForm(this.form4, 'getCoursesCheck')
          this.resetForm(this.form4)
        }
        if (this.elForm5) {
          this.submitForm(this.form5, 'getCoursesStandard')
          this.resetForm(this.form5)
        }
      },
      // 弹窗点击取消重置form表单
      resetForm(form) {
        this.dialogFormVisible = false
        this.peacetimeForm = false
        this.$refs.dialogForm.clearValidate() // clearValidate取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
        form = {}
        console.log('reset')
        console.log(form)
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName, params) {
        var that = this
        this.$http.getRequest(urlName, params).then(res => {
          if (res.code === 1) {
            that.headers = res.headers
            that.tableList = res.resultList
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
  .el-form-item{
    p{margin: 0}
  }
  .line-left-right{
    margin: 35px 0px;
    line-height: 1px;
    text-align: center;
    height: 2px;
    background: rgb(198, 226, 255);
    span {
      padding: 0 40px;
      background: #ffffff;
      color: #409EFF;
    }
  }
</style>
