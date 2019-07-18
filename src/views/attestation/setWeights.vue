<template>
    <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="container">
        <table-tools @dialogFormVisible="dialogFormVisible = true" @chooseSchool="chooseSchool"></table-tools>
        <div class="content">
          <!--表格-->
          <el-table
            :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            highlight-current-row
            :row-class-name="tableRowClassName"
            border
            style="width: 100%">
            <template v-for="header in headers">
              <el-table-column
                :prop="header.prop"
                :label="header.label">
              </el-table-column>
            </template>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text">设置权重</el-button>
              </template>
            </el-table-column>
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
              <el-form-item label="毕业要求一" :label-width="formLabelWidth">
                <el-input type="input" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求二" :label-width="formLabelWidth">
                <el-input type="input" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求三" :label-width="formLabelWidth">
                <el-input type="input" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求四" :label-width="formLabelWidth">
                <el-input type="input" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求五" :label-width="formLabelWidth">
                <el-input type="input" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求六" :label-width="formLabelWidth">
                <el-input type="input" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求七" :label-width="formLabelWidth">
                <el-input type="input" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求八" :label-width="formLabelWidth">
                <el-input type="input" v-model="form.desc"></el-input>
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
        headers: [{ // 表格头内容
          prop: 'amount',
          label: '学年'
        }, {
          prop: 'sourceName',
          label: '专业'
        }, {
          prop: 'rechargeMoney',
          label: '要求'
        }, {
          prop: 'withdrawMoney',
          label: '操作'
        }
        ],
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
      this.getTableData('getSetWeights')
      // 获取院系树的数据
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
      /* 分页 val（每页显示数据）*/
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagesize = val
      },
      /* 分页 当前显示的页码*/
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
      },
      /* 学院选择树*/
      handleNodeClick(data) {
        console.log('点击了树')
        this.isChoose = false
      },
      chooseSchool() {
        this.isChoose = true
      },
      tableRowClassName({ row, rowIndex }) {
        console.log(row)
        console.log(rowIndex)
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName) {
        var that = this
        this.$http.getRequest(urlName).then(res => {
          if (res.code === 1) {
            console.log(res)
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
    name: 'set-weights'
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
</style>
