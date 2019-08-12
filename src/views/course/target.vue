<template>
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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程目标" name="first">
            <el-table
              v-loading="loading"
              :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border
              style="width: 100%;">
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
          </el-tab-pane>
          <el-tab-pane label="课程模块" name="second">
            <el-table
              v-loading="loading"
              :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border
              style="width: 100%;">
              <template v-for="header in headers">
                <el-table-column
                  :prop="header.prop"
                  :label="header.label"
                  :width="header.width">
                </el-table-column>
              </template>
              <el-table-column v-if="tableList.length" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button type="warning" size="small" @click="editContent(scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteContent(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="课程内容" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="考核要点" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="评分标准" name="fifth">
            <h2>123</h2>
          </el-tab-pane>
        </el-tabs>
        <!--编辑-->
        <el-dialog title="编辑指标点对应的课程" :visible.sync="dialogFormVisible" :before-close="resetForm">
          <el-form ref="dialogForm">
            <el-form-item label="课程：" :label-width="formLabelWidth">
              <p>思想道德与法律基础</p>
            </el-form-item>
            <el-form-item label="课程目标观测点：" :label-width="formLabelWidth">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="课程权重：" :label-width="formLabelWidth">
              <el-select v-model="form.weight" placeholder="请选择">
                <el-option
                  v-for="item in 9"
                  :key="item"
                  :label="item/10"
                  :value="item/10">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="与指标点支撑关系：" :label-width="formLabelWidth">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="一践行三学会：" :label-width="formLabelWidth">
              <el-input type="text"></el-input>
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
  import { filterDataIds } from '@/utils/common'
  export default {
    name: 'target',
    data() {
      return {
        isChoose: false,
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        activeName: 'first',
        loading: false,
        headers: [],
        tableList: [],
        pagesize: 10,
        currentPage: 1,
        total: 0,
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        formLabelWidth: '145px',
        form: {
          weight: 0.1
        }
      }
    },
    components: { TableTools },
    created() {
      switch (this.activeName) {
        case 'first':
          this.getTableData('getCoursesTarget')
          break
      }
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
      handleClick(tab) {
        console.log(tab.paneName)
        switch (tab.paneName) {
          case 'first':
            this.getTableData('getCoursesTarget')
            break
          case 'second':
            this.getTableData('getCoursesModule')
            break
          case 'third':
            this.getTableData('getCoursesModule')
            break
          case 'fourth':
            this.getTableData('getCoursesModule')
            break
          case 'fifth':
            this.getTableData('getCoursesModule')
            break
        }
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
      /* 点击工具栏编辑 */
      editContent(row) {
        this.dialogFormVisible = true
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
      // 弹框点击确定按钮
      sureDialog() {
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
  .el-form-item{
    p{margin: 0}
  }
</style>
