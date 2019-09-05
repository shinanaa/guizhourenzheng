<template>
  <div class="rightContent">
    <div class="container">
      <div class="content">
        <div class="detailsText">
          <p>{{this.msg.major}} > {{this.msg.course}}</p>
        </div>
        <el-table
          v-loading="loading"
          :data="courseDetailsTable"
          border
          style="width: 100%;">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :label="header.label"
              :width="header.width">
            </el-table-column>
          </template>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click="editDetails(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="知识点详情" :visible.sync="knowledgeDetails">
          <el-form :model="form" ref="dialogForm">
            <el-form-item label="章节：" :label-width="formLabelWidth">
              <p>{{form.chapter}}</p>
            </el-form-item>
            <el-form-item label="章节名：" :label-width="formLabelWidth">
              <p>{{form.chapterName}}</p>
            </el-form-item>
            <el-form-item label="知识点1："  :label-width="formLabelWidth" prop="knowledge">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="知识点2："  :label-width="formLabelWidth" prop="knowledge">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="知识点3："  :label-width="formLabelWidth" prop="knowledge">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="知识点4："  :label-width="formLabelWidth" prop="knowledge">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="courseFormDetails = false">取 消</el-button>
            <el-button type="primary" @click="courseFormDetails = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'set-knowledge-details',
  data() {
    return {
      msg: {},
      loading: false,
      courseDetailsTable: [],
      headers: [],
      knowledgeDetails: false,
      form: {
        chapter: '',
        chapterName: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.msg = this.$route.query.course
    var that = this
    this.$http.getRequest('getKnowledgeDetails', this.msg).then(res => {
      if (res.code === 1) {
        that.headers = res.headers
        that.courseDetailsTable = res.resultList
        that.loading = false
      } else {
        that.emptyText = '暂无数据'
      }
    })
  },
  watch: {
    '$route': {
      handler: function() {
        this.msg = this.$route.query.course
        // var that = this
        // this.$http.getRequest('getCourseDetails', this.msg).then(res => {
        //   if (res.code === 1) {
        //     that.courseDetailsTable = res.resultList
        //     that.loading = false
        //     that.rowspan()
        //   } else {
        //     that.emptyText = '暂无数据'
        //   }
        // })
      }
    }
  },
  methods: {
    editDetails(row) {
      console.log(row)
      this.form.chapter = row.chapter
      this.form.chapterName = row.chapterName
      this.knowledgeDetails = true
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
  .container{margin-left: 0 !important;
    .detailsText{
      color: #666;background: #FFFFFF;
      padding: 3px 10px;margin: 20px 0px;font-size: 14px;}
    .el-form-item{
      p{margin: 0}
    }
  }
</style>
