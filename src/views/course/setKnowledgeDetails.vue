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
            <el-form-item v-for="(item,index) in knowledges" :label="item.label + '：'"  :label-width="formLabelWidth" :prop="item.prop" :key="index">
              <el-input type="textarea" v-model="item.knowledge"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="addKnowledeg" style="float: left;">添加知识点</el-button>
            <el-button type="danger" @click="delKnowledeg" style="float: left;">删除知识点</el-button>
            <el-button @click="courseFormDetails = false">取 消</el-button>
            <el-button type="primary" @click="sureDialog">确 定</el-button>
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
      knowledges: [],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.msg = this.$route.query.course
    var that = this
    this.$http.getRequest('getKnowledgeDetails', this.msg).then(res => {
      if (res.code === 1) {
        console.log(res)
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
      }
    }
  },
  methods: {
    editDetails(row) {
      this.knowledges = []
      // 获取知识点列表的label
      this.headers.map((item) => {
        if (item.prop.indexOf('knowledge') >= 0) {
          this.knowledges.push(item)
        }
      })
      // 获取知识点
      this.courseDetailsTable.map((item) => {
        if (item.chapter === row.chapter) {
          for (let i = 0; i < this.knowledges.length; i++) {
            this.knowledges[i].knowledge = item[`knowledge` + (i + 1)]
          }
        }
      })
      this.form = row
      this.knowledgeDetails = true
    },
    // 添加知识点
    addKnowledeg() {
      console.log(this.knowledges)
      const newKnowledeg = {
        label: `知识点${this.knowledges.length + 1}`
      }
      this.knowledges.push(newKnowledeg)
    },
    // 删除知识点
    delKnowledeg() {
      this.knowledges.pop()
    },
    // 提交设置的知识点详情
    sureDialog() {
      const info = {}
      info.chapter = this.form.chapter
      info.chapterName = this.form.chapterName
      for (let i = 0; i < this.knowledges.length; i++) {
        info['knowledge' + (i + 1)] = this.knowledges[i].knowledge
      }
      console.log(info)
      this.operateForm('editKnowledge', info)
    },
    // 方法封装 操作（添加/编辑/删除）表单
    operateForm(url, params) {
      this.$http.postRequest(url, params).then(res => {
        if (res.status === 0) {
          this.knowledgeDetails = false
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
  .container{margin-left: 0 !important;
    .detailsText{
      color: #666;background: #FFFFFF;
      padding: 3px 10px;margin: 20px 0px;font-size: 14px;}
    .el-form-item{
      p{margin: 0}
    }
  }
</style>
