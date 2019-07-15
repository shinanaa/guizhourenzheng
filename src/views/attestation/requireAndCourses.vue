<template>
  <div class="requireAndCourses" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick" show-checkbox></el-tree>
    </div>
    <div class="container">
      <table-tools @dialogFormVisible="dialogFormVisible = true" @chooseSchool="chooseSchool"></table-tools>
      <div class="content">
        <!--表格-->
        <el-table
          :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          highlight-current-row
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
        <el-dialog title="新增毕业要求" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="院系" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="难度">
                <el-option label="H" value="H"></el-option>
                <el-option label="M" value="M"></el-option>
                <el-option label="L" value="L"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择专业">
                <el-option label="汉语言文学" value="shanghai"></el-option>
                <el-option label="汉语国际教育" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业毕业要求" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="毕业培养目标1" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="毕业培养目标2" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="毕业培养目标3" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="毕业培养目标4" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="指标点数量" :label-width="formLabelWidth">
              <el-input type="number" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        formLabelWidth: '120px'
      }
    },
    created() {
      this.getRequireCourses()
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
      // 方法封装 获取页面全部数据
      getRequireCourses() {
        var that = this
        this.$http.getRequest('getRequireCourses').then(res => {
          if (res.code === 1) {
            that.headers = res.headers
            that.tableList = res.resultList
            that.total = res.resultList.length
          } else {
            that.emptyText = '暂无数据'
          }
        })
      }
    },
    components: { TableTools },
    name: 'require-and-courses'
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .requireAndCourses{position: relative;width:100%;height:100%;
  .choose-school{ width: 200px;height:100%;overflow: auto;border-right:2px solid #999;position: absolute;bottom:0;top:0;left:0;padding: 20px 0;transition:width 0.28s;background: #F8F8F8;
  .el-tree{background: #F8F8F8;}
  }
  .container{position: relative;margin-left: 200px;
  .content{padding: 0 30px;
  .el-pagination{
    padding: 30px 15px;text-align: right;}
  }
  }
  }
  .requireAndCourses.hiddenChoose{
  .container{margin-left: 0px;}
  .choose-school{width: 0px;}
  }
</style>
