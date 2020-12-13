<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="category.category1Id"
          placeholder="请选择"
          @change="handleSelectChange1"
          :disabled="disabled"
        >
          <el-option
            v-for="c1 in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="category.category2Id"
          placeholder="请选择"
          @change="handleSelectChange2"
          :disabled="disabled"
        >
          <el-option
            v-for="c2 in category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="category.category3Id"
          placeholder="请选择"
          @change="handleSelectChange3"
          :disabled="disabled"
        >
          <el-option
            v-for="c3 in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  name: "Category",
  props: ["disabled"],
  data() {
    return {
      category: {
        // 分类数据id
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      // 分类列表数据数组
      category1List: [],
      category2List: [],
      category3List: [],
    };
  },
  methods: {
    async handleSelectChange1(category1Id) {
      // console.log(value);
      // 当选择一级分类中换一个品牌的时候 需要将二级 三级分类id清空
      this.category2List = [];
      this.category3List = [];
      this.category.category2Id = "";
      this.category.category3Id = "";
      // 发送请求
      const result = await this.$API.attrs.getCategory2(category1Id);
      // console.log(result);

      if (result.code === 200) {
        // 请求成功 获取二级分类数据
        this.category2List = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
    async handleSelectChange2(category2Id) {
      // 当选择二级分类换一个品牌的时候 需要将 三级分类id清空
      this.category3List = [];
      this.category.category3Id = "";
      // 发送请求
      const result = await this.$API.attrs.getCategory3(category2Id);
      // console.log(result);
      if (result.code === 200) {
        // 请求成功 获取三级分类数据
        this.category3List = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
    async handleSelectChange3(category3Id) {
      // 获取一级二级列表
      const category = {
        ...this.category,
        category3Id,
      };
      // 发送请求 触发父级自定义事件 将属性列表传递给父级组件
      this.$emit("change", category);
      // const result = await this.$API.attrs.attrInfoList(category);
      // // console.log(result.data);
      // if (result.code === 200) {
      // // 请求成功 触发父级自定义事件 将属性列表传递给父级组件
      // this.$emit("change", result.data, category);
      // } else {
      //   this.$message.error(result.message);
      // }
    },
  },
  async mounted() {
    // 发送请求获取一级属性列表
    const result = await this.$API.attrs.getCategory1();
    // console.log(result);
    if (result.code === 200) {
      // 请求成功
      this.category1List = result.data;
    } else {
      // 请求失败返回失败原因
      this.$message.error(result.message);
    }
  },
};
</script>

<style lang="less" scoped>
</style>
