<template>
  <el-card>
    <el-form label-width="80px" :model="sku" :rules="rules" ref="spuForm">
      <el-form-item label="SPU名称" prop="spuName">
        <span>{{ spu.spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称" prop="skuName">
        <el-input placeholder="请输入SKU名称" v-model="sku.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <!-- <el-input placeholder="请输入价格"></el-input> -->
        <el-input-number
          align="left"
          style="width: 300px"
          placeholder="请输入价格"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <!-- <el-input placeholder="请输入重量"></el-input> -->
        <el-input-number
          style="width: 300px"
          placeholder="SKU重量"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input placeholder="SKU规格描述" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <div
          class="skulist-select-container"
          v-for="attr in attrList"
          :key="attr.id"
        >
          <span>{{ attr.attrName }}</span>
          <el-select placeholder="请输入" v-model="spu.attrId">
            <el-option
              v-for="attrVal in attr.attrValueList"
              :key="attrVal.id"
              :label="attrVal.valueName"
              :value="attrVal.id"
              >{{ attrVal.valueName }}</el-option
            >
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="销售属性">
        <div
          class="skulist-select-container"
          v-for="spuSale in spuSaleAttrList"
          :key="spuSale.id"
        >
          <span>{{ spuSale.saleAttrName }}</span>
          <el-select placeholder="请输入">
            <el-option
              v-for="value in spuSale.spuSaleAttrValueList"
              :key="value.id"
              :label="value.saleAttrValueName"
              :value="value.id"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="imageList"
          border
          style="width: 100%; margin: 20px 0"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="80"
            align="center"
            prop="isCheck"
          >
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" :alt="scope.row.imgName" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"> </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="primary" size="mini"
                >设置为默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取 消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "SkuList",
  props: {
    spuItem: Object,
  },
  data() {
    return {
      spu: this.spuItem, // spu 数据
      rules: {}, // 校验规则
      imageList: [], // 所有图片列表
      spuSaleAttrList: [], // spu销售数据列表
      attrList: [], // 平台属性列表
      sku: {}, // sku数据
    };
  },
  methods: {
    handleSelectionChange() {},
    // 获取所有图片数据列表
    async getSpuImageList() {
      // 解构获取id
      const { id } = this.spu;
      const result = await this.$API.spu.getSpuImageList(id);
      if (result.code === 200) {
        // console.log(result);
        this.$message.success("获取所有图片列表成功");
        this.imageList = result.data;
        // 获取图片数据列表
        // console.log(result.data);
        // this.imageList = result.data.map((img) => {
        //   return {
        //     id: img.id,
        //     name: img.imgName,
        //     url: img.imgUrl,
        //   };
        // });
      } else {
        this.$message.error(result.message);
      }
    },
    // 获取Spu销售属性列表
    async getSpuSaleAttrList() {
      // 解构获取id
      const { id } = this.spu;
      const result = await this.$API.spu.getSpuSaleAttrList(id);
      if (result.code === 200) {
        // console.log(result);
        this.$message.success("获取Spu销售属性列表成功");
        // 获取Spu销售属性
        this.spuSaleAttrList = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
    // 获取所有平台属性列表
    async getAttrList() {
      // 解构获取id
      const result = await this.$API.attrs.getAttrList({
        category1Id: this.spu.category1Id,
        category2Id: this.spu.category2Id,
        category3Id: this.spu.category3Id,
      });
      if (result.code === 200) {
        // console.log(result);
        this.$message.success("获取所有平台属性列表成功");
        // 获取所有销售属性
        this.attrList = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
  },
  mounted() {
    this.getSpuImageList();
    this.getSpuSaleAttrList();
    this.getAttrList();
  },
};
</script>

<style lang="sass" scoped>
>>>.el-input-number .el-input__inner
  text-align: left

.skulist-select-container
  display: inline-block
  margin-right: 20px
</style>
