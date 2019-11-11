export const treeMixin = {
  data() {
    return {
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
  computed: {
    pagingTabelData() {
      return this.tableList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
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
