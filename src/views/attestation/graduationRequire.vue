<template>
    <div class="graduationRequire" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="container">
        <div class="tools">
          <div class="tools-search">
            <el-button type="info" class="choose" @click="chooseSchool">选择院系及专业</el-button>
            <div class="search-fill">
              <el-input placeholder="请输入..."></el-input>
              <el-button type="primary" icon="el-icon-search">查询</el-button>
            </div>
          </div>
          <div class="tools-btn">
            <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true">创建</el-button>
            <el-button type="warning" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </div>
        </div>
        <div class="content">
          <el-table
            :data="chongzhi.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            highlight-current-row
            border
            style="width: 100%">
            <template v-for="header in headers">
              <el-table-column
                :prop="header.prop"
                :label="header.label">
              </el-table-column>
            </template>
          </el-table>
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
                <el-select v-model="form.region" placeholder="请选择学院">
                  <el-option label="文学院" value="shanghai"></el-option>
                  <el-option label="历史与政治" value="beijing"></el-option>
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
  /* eslint-disable indent,quotes,semi,spaced-comment */

  import ElButton from "element-ui/packages/button/src/button";
  import ElInput from 'element-ui/packages/input/src/input';
  export default {
    data: function() {
      return {
        headers: [{
          prop: 'amount',
          label: "要求序号"
        }, {
          prop: 'sourceName',
          label: "学院"
        }, {
          prop: 'rechargeMoney',
          label: "专业"
        }, {
          prop: 'source',
          label: "学年"
        }, {
          prop: 'withdrawMoney',
          label: "专业毕业要求"
        }, {
          prop: 'amount',
          label: "毕业培养目标1"
        }, {
          prop: 'sourceName',
          label: "毕业培养目标2"
        }, {
          prop: 'rechargeMoney',
          label: "毕业培养目标3"
        }, {
          prop: 'source',
          label: "毕业培养目标4"
        }, {
          prop: 'withdrawMoney',
          label: "指标点数量"
        }, {
          prop: 'sourceName',
          label: "操作"
        }
        ],
        chongzhi: [],
        currentPage: 1,
        total: 0,
        pagesize: 10,
        dialogFormVisible: false,
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
        treeList: [{
          label: '文学院',
          children: [{
            label: '汉语言文学',
            children: [{
              label: '2018学年'
            }, {
              label: '2019学年'
            }]
          }, {
            label: '汉语国际教育',
            children: [{
              label: '2018学年'
            }, {
              label: '2019学年'
            }]
          }]
        }, {
          label: '历史与政治学院',
          children: [{
            label: '思想政治教育',
            children: [{
              label: '2018学年'
            }]
          }, {
            label: '历史学',
            children: [{
              label: '2019学年'
            }]
          }]
        }, {
          label: '教育科学学院',
          children: [{
            label: '教育学',
            children: [{
              label: '2019学年'
            }]
          }, {
            label: '小学教育',
            children: [{
              label: '2019学年'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      /*分页 val（每页显示数据）*/
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
      },
      /*分页 当前显示的页码*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      /* 学院选择树*/
      handleNodeClick(data) {
        console.log(data);
      },
      chooseSchool() {
        this.isChoose = true;
      }
    },
    components: { ElButton, ElInput },
    created() {
      var that = this;
      this.$http.getRequest('getSourceCount').then(res => {
        if (res.code === 1) {
          console.log(res)
          that.title = res.recordTime;
          that.chongzhi = res.resultList;
          that.total = res.resultList.length;
        } else {
          that.title = '暂无数据啊'
        }
      })
    },
    name: 'graduation-require'
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .graduationRequire{position: relative;width:100%;height:100%;
    .choose-school{ width: 200px;height:100%;overflow: auto;border-right:2px solid #999;position: absolute;bottom:0;top:0;left:0;padding: 20px 0;transition:width 0.28s;background: #F8F8F8;
      .el-tree{background: #F8F8F8;}
    }
    .container{position: relative;min-width: 100%;margin-left: 200px;
      .tools{
        display: flex;justify-content: space-between;height:90px;align-items: center;padding: 0 30px;
        .tools-search{display: flex;}
        .choose{margin-right: 50px;}
        .search-fill{
          display: flex;
        }
        .search-fill .el-input{margin-right: 10px;}
      }
      .content{padding: 0 30px;
        .el-pagination{
          padding: 30px 15px;text-align: right;}
      }
    }
  }
  .graduationRequire.hiddenChoose{
    .container{margin-left: 0px;}
    .choose-school{width: 0px;}
  }




</style>
