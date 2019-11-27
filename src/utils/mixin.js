export const treeMixin = {
  data() {
    return {
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.$http.getRequest('getChooseData').then(res => {
      if (res.status === 1) {
        this.treeList = res.schoolData
      }
    })
  }
}

export const tablePageMixin = {
  data() {
    return {
      loading: true,
      emptyText: '暂无数据',
      headers: [],
      tableList: [],
      dialogFormVisible: false,
      isAdd: false,
      isChoose: false,
      formLabelWidth: '120px'
    }
  },
  computed: {
    pagingTabelData() {
      return this.tableList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  methods: {
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
    },
    /* 点击工具栏创建 */
    createdContent() {
      this.dialogFormVisible = true
      this.isAdd = true
    }
  }
}

export const pagingMixin = {
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    /* 分页 val（每页显示数据）*/
    handleSizeChange(val) {
      this.pageSize = val
    },
    /* 分页 当前显示的页码*/
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
