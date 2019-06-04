<template>
  <div class="tools">
    <div class="tools-search">
      <el-button type="info" class="choose" @click="chooseSchool">选择院系及专业</el-button>
      <div class="search-fill">
        <el-input placeholder="请输入..."></el-input>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </div>
    </div>
    <div class="tools-btn">
      <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible">创建</el-button>
      <el-button type="warning" icon="el-icon-edit">编辑</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      methods: {
        dialogFormVisible() {
          this.$emit('dialogFormVisible')
        },
        chooseSchool() {
          this.$emit('chooseSchool')
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
