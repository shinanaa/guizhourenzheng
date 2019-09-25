<template>
  <div class="tools">
    <div class="tools-search">
      <el-button type="info" class="choose" @click="chooseSchool" v-if="selectCollegeAndMajor">选择院系及专业</el-button>
      <div class="search-fill">
        <el-input v-if="searchCondition" placeholder="请输入..." v-model="search"></el-input>
        <el-select v-if="searchRequire" v-model="requireType" placeholder="请选择毕业要求">
          <el-option
            v-for="item in requires"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-if="searchCourse" v-model="courseSelected" placeholder="请选择课程">
          <el-option
            v-for="item in searchCourseData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="searchData" v-if="selectCollegeAndMajor">查询</el-button>
      </div>
    </div>
    <div class="tools-btn">
      <el-button type="success" icon="el-icon-plus" @click="createdContent" v-if="btnCreateShow">创建</el-button>
      <el-button type="warning" icon="el-icon-edit" @click="editContent" v-if="btnEditShow">编辑</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteContent" v-if="btnDelShow">删除</el-button>
      <el-button type="primary" icon="el-icon-download" @click="downloadExcel" v-if="downloadReport">报表下载</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        selectCollegeAndMajor: {
          type: Boolean,
          default: false
        },
        searchCondition: {
          type: Boolean,
          default: false
        },
        searchRequire: {
          type: Boolean,
          default: false
        },
        searchCourse: {
          type: Boolean,
          default: false
        },
        btnCreateShow: {
          type: Boolean,
          default: false
        },
        btnEditShow: {
          type: Boolean,
          default: false
        },
        btnDelShow: {
          type: Boolean,
          default: false
        },
        downloadReport: {
          type: Boolean,
          default: false
        },
        requires: {
          type: Array,
          default: () => []
        },
        searchCourseData: {
          type: Array,
          default: () => {}
        }
      },
      data() {
        return {
          'search': '',
          requireType: '',
          courseSelected: ''
        }
      },
      methods: {
        createdContent() {
          this.$emit('createdContent')
        },
        chooseSchool() {
          this.$emit('chooseSchool')
        },
        editContent() {
          this.$emit('editContent')
        },
        deleteContent() {
          this.$emit('deleteContent')
        },
        searchData() {
          let searchParams = ''
          if (this.search) {
            searchParams = this.search
          }
          if (this.requireType) {
            searchParams = this.requireType
          }
          if (this.courseSelected) {
            searchParams = this.courseSelected
          }
          this.$emit('searchData', searchParams)
        },
        downloadExcel() {
          this.$emit('downloadExcel')
        }
      },
      name: 'table-tools'
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .tools{
    height:90px;padding: 0 30px;line-height: 90px;
  .tools-search{float: left;}
  .tools-btn{float: right;}
  .choose{margin-right: 50px;}
  .search-fill{
    display: inline-block;
    .el-input{margin-right: 10px;
      width: auto;}
  }
  }
</style>
