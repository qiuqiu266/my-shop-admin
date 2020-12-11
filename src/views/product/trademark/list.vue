<template>
  <div>
    <el-button type="primary" icon="el-icon-plus">默认按钮</el-button>
    <el-table :data="trademarkList" border style="width: 100%; margin: 20px 0">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column label="品牌LOGO">
        <template slot-scope="scope">
          <img class="trademark-img" :src="scope.row.logoUrl" alt="logo" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="warning" icon="el-icon-edit">修改</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- :page-size.sync="limit"  加 .async 可以让limit更新变成同步更新 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="trademark-pagination"
      :page-sizes="[3, 6, 9]"
      :page-size.sync="limit"
      :page-current="page"
      layout=" prev, pager, next, jumper, sizes,total"
      :total="total"
    >
    </el-pagination> -->
    <!-- $event 在DOM事件中代表 event
         <button @click="handle(123,$event)"></button>
         在自定义事件中 代表 第一个参数
         <button @aaa="handle($event)"></button>
     -->
    <el-pagination
      @size-change="getPageList(page, $event)"
      @current-change="getPageList($event, limit)"
      class="trademark-pagination"
      :page-sizes="[3, 6, 9]"
      :page-size.sync="limit"
      :page-current="page"
      layout=" prev, pager, next, jumper, sizes,total"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TrademarkList",
  data() {
    return {
      // tableData: [
      //   {
      //     id: 1,
      //     name: "iphone",
      //     logo:
      //       "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg",
      //   },
      // ],
      trademarkList: [],
      total: 0,
      page: 1, // 默认当前页码
      limit: 3, // 默认选择的每页显示3条
    };
  },
  // 方法
  methods: {
    // // 选择每页显示几条
    // handleSizeChange(limit) {
    //   // console.log('limit',limit);
    //   this.getPageList(this.page, limit);
    // },
    // // 点击当前页码
    // handleCurrentChange(page) {
    //   // console.log("page", page);
    //   this.getPageList(page, this.limit);
    // },

    // 请求分页列表数据的方法
    async getPageList(page, limit) {
      try {
        const result = await this.$API.trademark.getPageList(page, limit);
        // console.log("result",result);
        if (result.code === 200) {
          this.$message.success("获取品牌分页列表成功");
          // 请求成功
          this.trademarkList = result.data.records; // 数据数组
          this.total = result.data.total; // 总数
          this.limit = result.data.size; // 每页显示条数
          this.page = result.data.current; // 当前的页码
        } else {
          this.$message.error("获取品牌分页列表失败");
        }
      } catch (e) {
        console.log(e);
        this.$message.error("获取品牌分页列表失败");
      }
    },
  },
  mounted() {
    //  console.log(this);
    this.getPageList(this.page, this.limit);
  },
};
</script>
<style lang="sass" >
.trademark-img
  width: 150px
.trademark-pagination
  text-align: right
.el-pagination__sizes
  margin-left: 250px
</style>
