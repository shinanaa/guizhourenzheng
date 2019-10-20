<template>
  <!--课程组成-->
<div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
  <div class="choose-school">
    <el-tree :data="treeList" :props="defaultProps" ref="tree" show-checkbox></el-tree>
  </div>
  <div class="container">
    <table-tools @dialogFormVisible="dialogFormVisible = true"
                 @chooseSchool="isChoose = !isChoose"
                 @searchData="searchData"
                 :select-college-and-major="true"
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
            <el-button type="text" size="small" @click="courseDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
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
      <!--弹窗-->
      <!--课程配置-->
      <el-dialog title="课程配置" :visible.sync="dialogFormVisible" :before-close="resetForm" >
        <el-form :model="formDispose"  ref="dialogForm">
          <el-form-item label="课程：" :label-width="formLabelWidth" prop="target1">
            <p>{{formDispose.course}}</p>
          </el-form-item>
          <el-form-item label="期末考试占比：" :label-width="formLabelWidth" prop="schoolYear">
            <el-select v-model="formDispose.final" @change="courseDispose($event, 'final')">
              <el-option v-for="(num, index) in 9" :label="num/10" :value="num/10" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平时成绩占比：" :label-width="formLabelWidth" prop="target1">
            <el-select v-model="formDispose.peacetime" @change="courseDispose($event, 'peacetime')">
              <el-option v-for="(num, index) in 9" :label="num/10" :value="num/10" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="sureDialog">确 定</el-button>
        </div>
      </el-dialog>
      <!--课程平时组成配置-->
      <el-dialog title="课程平时组成" :visible.sync="peacetimeForm" :before-close="resetForm" >
        <el-form :model="formPeace"  ref="formPeace">
          <el-form-item label="课程：" :label-width="formLabelWidth" prop="target1">
            <p>{{formPeace.course}}</p>
          </el-form-item>
          <el-form-item label="平时成绩组成：" :label-width="formLabelWidth" prop="target1">
            <el-checkbox-group v-model="formPeace.form" @change="setChecked">
              <el-checkbox v-for="(peaceForm, index) in peaceForms" :label="peaceForm.label" name="type" :key="index"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div class="peaceForm" v-for="(peaceItem, index) in formPeace.setForm" :key="index">
            <div class="line-left-right">
              <span>{{peaceItem.label}}</span>
            </div>
            <el-form-item label="占比：" :label-width="formLabelWidth" prop="schoolYear">
              <el-select v-model="peaceItem.final">
                <el-option v-for="(num, index) in 9" :label="num/10" :value="num/10" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="peaceItem.label !== '期中考试' && peaceItem.label !== '出勤'" label="分值：" :label-width="formLabelWidth" prop="target1">
              <el-input type="number" v-model="peaceItem.score"></el-input>
            </el-form-item>
            <el-form-item v-if="peaceItem.label !== '期中考试' && peaceItem.label !== '出勤'" label="次数：" :label-width="formLabelWidth" prop="target1">
              <el-input type="number" v-model="peaceItem.second"></el-input>
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
  import { filterDataIds, operateForm } from '@/utils/common'

  const peaceForm = [{
    value: 'midterm',
    label: '期中考试'
  }, {
    value: 'test',
    label: '实验'
  }, {
    value: 'discuss',
    label: '课堂讨论'
  }, {
    value: 'activity',
    label: '活动'
  }, {
    value: 'practice',
    label: '实践'
  }, {
    value: 'task',
    label: '作业'
  }, {
    value: 'attendance',
    label: '出勤'
  }]
  export default {
    name: 'granding',
    data() {
      return {
        peaceForms: peaceForm,
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
        courseFormDetails: false,
        formLabelWidth: '145px',
        formDispose: {
          course: '',
          final: null,
          peacetime: null
        },
        formPeace: {
          course: '',
          form: [],
          setForm: [] // 选中的平时组成内容
        },
        courseDetailsTable: [],
        spanArr: [],
        position: 0
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
        this.formDispose = row
        console.log(row)
      },
      // 课程配置值联动选择
      courseDispose(data, dom) {
        if (dom === 'final') {
          this.formDispose.peacetime = (10 - data * 10) / 10
          // this.form.peacetime = (1 - data)  当data大于0.6时，差的值会出现多位小数
        } else if (dom === 'peacetime') {
          this.formDispose.final = (10 - data * 10) / 10
        }
      },
      // 课程平时组成
      peaceForm(row) {
        this.resetForm()
        this.peacetimeForm = true
        this.formPeace.course = row.course
      },
      // 获取带有属性的选中的平时组成值
      setChecked(value) {
        this.formPeace.setForm = []
        peaceForm.filter((item) => {
          if (value.indexOf(item.label) >= 0) {
            this.formPeace.setForm.push(JSON.parse(JSON.stringify(item)))
          }
        })
      },
      // 课程详情获取数据
      courseDetails(row) {
        console.log(row)
        this.$router.push({
          path: '/course/grading/details',
          query: {
            course: row.course,
            class: row.class
          }
        })
      },
      // 弹框点击确定按钮
      sureDialog() {
        if (this.dialogFormVisible) {
          operateForm('setCourseDispose', this.formDispose)
          this.dialogFormVisible = false
        }
        if (this.peacetimeForm) {
          operateForm('setCourseDispose', this.formPeace)
          this.peacetimeForm = false
        }
      },
      // 弹窗点击取消重置form表单
      resetForm() {
        this.dialogFormVisible = false
        this.peacetimeForm = false
        this.courseFormDetails = false
        // this.$refs.dialogForm.resetFields() // clearValidate取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
        this.formPeace.setForm = []
        this.formPeace.form = []
        console.log('reset')
        console.log(this.formPeace)
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
