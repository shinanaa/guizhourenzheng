<template>
    <div class="graduationRequire">
      <div class="container">
        <div class="tools">
          <div class="tools-search">
            <el-button class="choose">选择院系及专业</el-button>
            <div class="search-fill">
              <el-input placeholder="请输入..."></el-input>
              <el-button>查询</el-button>
            </div>
          </div>
          <div class="tools-btn">
            <el-button>创建</el-button>
            <el-button>编辑</el-button>
            <el-button>删除</el-button>
          </div>
        </div>
        <div class="content">
          <el-table
            :data="chongzhi"
            border
            style="width: 100%">
            <el-table-column
              prop="amount"
              label="要求序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sourceName"
              label="学院"
              width="180">
            </el-table-column>
            <el-table-column
              prop="source"
              label="专业">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
  /* eslint-disable indent,quotes,semi */

  import ElButton from "element-ui/packages/button/src/button";
  import ElInput from 'element-ui/packages/input/src/input';
  export default {
    data() {
      return {
        title: "",
        chongzhi: [],
        tableData: [{
          order: 1,
          college: '文学院',
          major: '汉语言文学教育'
        }, {
          order: 2,
          college: '文学院',
          major: '汉语言文学教育'
        }, {
          order: 3,
          college: '文学院',
          major: '汉语言文学教育'
        }, {
          order: 4,
          college: '文学院',
          major: '汉语言文学教育'
        }]
      }
    },
    created() {
      var that = this;
      this.$http.getRequest('getSourceCount').then(res => {
        if (res.code === 1) {
          console.log(res)
          that.title = res.recordTime;
          that.chongzhi = res.resultList;
        } else {
          that.title = '暂无数据啊'
        }
      })
    },
    components: { ElButton, ElInput },
    name: 'graduation-require'
    }
</script>

<style scoped lang="less">
.tools{
  display: flex;justify-content: space-between;height:70px;align-items: center;padding: 0 30px;}
  .tools-search{display: flex;}
  .choose{margin-right: 25px;}
  .search-fill{
    display: flex;
  }
  .search-fill .el-input{margin-right: 10px;}
  .content{padding: 0 30px;}
</style>
