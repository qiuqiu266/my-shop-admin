<template>
  <div>
    <el-card style="margin-top: 20px">
      <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
      <el-table
        style="margin-top: 20px; width: 100%"
        :data="spuList"
        v-loading="loading"
        border
      >
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="spuName" label="SPU名称"> </el-table-column>
        <el-table-column prop="description" label="SPU描述">
          <template>
            <el-tag style="margin-right: 5px"></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="getPageList(page, $event)"
        @current-change="getPageList($event, limit)"
        class="pagination"
        :page-sizes="[3, 6, 9]"
        :page-size.sync="limit"
        :page-current="page"
        layout=" prev, pager, next, jumper, sizes,total"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { category } from "@/api";
export default {
  name: "SpuShowList",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      category: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      spuList: [],
      loading: false,
    };
  },
  methods: {
    // 获取SPU分页列表
    async getPageList(page, limit) {
      this.loading = true;
      const { category3Id } = this.category;
      // 发送请求
      const result = await this.$API.spu.getSpuList({
        page,
        limit,
        category3Id,
      });
      if (result.code === 200) {
        //  console.log(result.data);
        this.$message.success("获取SPU分类列表成功");
        // console.log(result.data);
        this.spuList = result.data.records;
        this.total = result.data.total;
      } else {
        this.$message.error(result.message);
      }
      this.loading = false;
    },
    // 获取spuList 数据
    hangdleCategoryChange(category) {
      // 触发事件 会将分类id传递过来
      this.category = category;
      // 调用方法
      this.getPageList(this.page, this.limit);
    },
    // 当选中一级 二级分类时触发，改变时，清空数据
    clearList() {
      this.spuList = [];
      this.page = 1;
      this.limit = 3;
      this.total = 0;
      this.category.category3Id = "";
    },
  },
  mounted() {
    // 绑定全局事件
    this.$bus.$on("change", this.hangdleCategoryChange);
    this.$bus.$on("clearList", this.clearList);
  },
  // 解绑事件
  beforeDestroy() {
    this.$bus.$off("change", this.hangdleCategoryChange);
    this.$bus.$off("clearList", this.clearList);
  },
};
</script>

<style lang="less" scoped>
</style>
