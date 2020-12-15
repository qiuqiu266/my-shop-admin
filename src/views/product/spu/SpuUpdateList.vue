<template>
  <el-card style="margin-top: 20px">
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input placeholder="请输入SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="tmId">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            v-for="tm in trademarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          placeholder="SPU描述"
          type="textarea"
          style="height: 60px"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片" prop="imageList">
        <el-upload
          class="avatar-uploader"
          :action="`${$BASE_API}/admin/product/fileUpload`"
          list-type="picture-card"
          :file-list="imageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <!-- <img class="avatar" /> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span style="font-size: 12px">只能上传jpg/png文件，且不超过50kb</span>
      </el-form-item>
      <!-- prop="saleAttrId" 将来作为表单校验的 -->
      <el-form-item label="销售属性" prop="saleAttrId">
        <el-select placeholder="还剩三个未选择" v-model="spu.saleAttrId">
          <el-option
            v-for="sale in saleAttrList"
            :key="sale.id"
            :label="sale.name"
            :value="sale.id"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table
          :data="spuSaleAttrList"
          border
          style="width: 100%; margin: 20px 0"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column label="属性名称" width="100" prop="saleAttrName"> </el-table-column>
          <el-table-column label="属性值列表">
            <template v-slot="{ row }">
              <el-tag
                style="margin-right: 5px"
                v-for="attrVal in row.spuSaleAttrValueList"
                :key="attrVal.id"
                >{{ attrVal.saleAttrValueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <!-- <el-popconfirm> -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取 消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="visible">
      <img width="100%" :src="previewImgUrl" alt="img" />
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "SpuUpdateList",
  // 接受
  props: {
    item: Object,
  },
  data() {
    return {
      // 当前行的数据？
      spu: this.item,
      trademarkList: [], // 所有品牌数据
      imageList: [], // 所有图片列表数据
      previewImgUrl: "", // 图片地址
      visible: false, // 图片对话框显示或隐藏
      saleAttrList: [], // 所有销售属性列表数组
      spuSaleAttrList: [], // 当前行SPu销售属性列表
    };
  },
  methods: {
    // 处理图片删除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // file.id 代表的是 点击了删除的那个图片id
      this.imageList = this.imageList.filter((img) => img.id !== file.id);
    },
    // 处理图片预览
    handlePictureCardPreview(file) {
      this.previewImgUrl = file.url;
      this.visible = true;
    },
    // 获取品牌数据列表
    async getTrademarkList() {
      const result = await this.$API.spu.getTrademarkList();
      if (result.code === 200) {
        // console.log(result);
        this.$message.success("获取品牌数据列表成功");
        this.trademarkList = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
    // 获取所有图片数据列表
    async getSpuImageList() {
      // 解构获取id
      const { id } = this.spu;
      const result = await this.$API.spu.getSpuImageList(id);
      if (result.code === 200) {
        console.log(result);
        this.$message.success("获取所有图片列表成功");
        // this.imageList = result.data;
        // 获取图片数据列表
        console.log(result.data);
        this.imageList = result.data.map((img) => {
          return {
            id: img.id,
            name: img.imgName,
            url: img.imgUrl,
          };
        });
      } else {
        this.$message.error(result.message);
      }
    },
    // 获取所有销售属性列表
    async getSaleAttrList() {
      // 解构获取id
      const result = await this.$API.spu.getSaleAttrList();
      if (result.code === 200) {
        // console.log(result);
        this.$message.success("获取所有销售属性列表成功");
        // this.imageList = result.data;
        // 获取所有销售属性
        this.saleAttrList = result.data;
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
        console.log(result);
        this.$message.success("获取Spu销售属性列表成功");

        // 获取Spu销售属性
        this.spuSaleAttrList = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
  },
  async mounted() {
    this.getTrademarkList();
    this.getSpuImageList();
    this.getSaleAttrList();
    this.getSpuSaleAttrList();
  },
};
</script>

<style lang="less" scoped>
</style>
