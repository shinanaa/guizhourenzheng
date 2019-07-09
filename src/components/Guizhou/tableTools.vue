<template>
  <div class="tools">
    <div class="tools-search">
      <el-button type="info" class="choose" @click="chooseSchool">选择院系及专业</el-button>
      <div class="search-fill">
        <el-input placeholder="请输入..." v-model="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
      </div>
    </div>
    <div class="tools-btn">
      <el-button type="success" icon="el-icon-plus" @click="createdContent">创建</el-button>
      <el-button type="warning" icon="el-icon-edit" @click="editContent">编辑</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteContent">删除</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          'search': ''
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
          this.$emit('searchData', this.search)
        }
      },
      name: 'table-tools'
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .tools{
    display: flex;justify-content: space-between;height:90px;align-items: center;padding: 0 30px;
  .tools-search{display: flex;}
  .choose{margin-right: 50px;}
  .search-fill{
    display: flex;
    .el-input{margin-right: 10px;}
  }
  }
</style>
