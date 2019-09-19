<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in filterDetails" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    /* 过滤章节知识点详情与课程组成详情,在列表上不显示*/
    filterDetails() {
      this.permission_routers.map((item) => {
        if (item.children !== undefined) {
          item.children = item.children.filter((route) => route.name.indexOf('Details') < 0)
        }
      })
      return this.permission_routers
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
