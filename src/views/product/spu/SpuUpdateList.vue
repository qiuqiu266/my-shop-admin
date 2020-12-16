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
      <el-form-item label="SPU描述" prop="description">
        <el-input
          placeholder="SPU描述"
          type="textarea"
          style="height: 60px"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片" prop="imageList">
        <el-upload
          class="avatar-uploader"
          :action="`${$BASE_API}/admin/product/fileUpload`"
          list-type="picture-card"
          :file-list="formatImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- <img class="avatar" /> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span style="font-size: 12px">只能上传jpg/png文件，且不超过50kb</span>
      </el-form-item>
      <!-- prop="saleAttrId" 将来作为表单校验的   v-model="spu.saleAttrId"-->
      <el-form-item label="销售属性" prop="sale">
        <el-select
          :placeholder="`还剩${filterSaleAttrList.length}个未选择`"
          v-model="spu.sale"
        >
          <el-option
            v-for="sale in filterSaleAttrList"
            :key="sale.id"
            :label="sale.name"
            :value="`${sale.id}-${sale.name}`"
          ></el-option>
          <!-- <el-option
            v-for="sale in filterSaleAttrList"
            :key="sale.id"
            :label="sale.name"
            :value="sale.id"
          ></el-option> -->
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!spu.sale"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table
          :data="spuSaleAttrList"
          border
          style="width: 100%; margin: 20px 0"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column label="属性名称" width="100" prop="saleAttrName">
          </el-table-column>
          <el-table-column label="属性值列表">
            <template v-slot="{ row }">
              <el-tag
                style="margin-right: 5px"
                v-for="attrVal in row.spuSaleAttrValueList"
                :key="attrVal.id"
                >{{ attrVal.saleAttrValueName }}</el-tag
              >
              <el-input
                v-if="row.edit"
                size="mini"
                style="width: 100px"
                @blur="editCompleted(row, $index)"
                @keyup.enter.native="editCompleted(row, $index)"
                autofocus
                ref="input"
                v-model="saleAttrValueText"
              ></el-input>
              <el-button
                v-else
                icon="el-icon-plus"
                size="mini"
                @click="edit(row)"
                >添加</el-button
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
      saleAttrValueText: "", // 销售属性值文本
    };
  },
  // 计算属性
  computed: {
    // 上传图片格式化
    formatImageList() {
      return this.imageList.map((img) => {
        return {
          // 格式化出来uid
          uid: img.uid || img.id,
          name: img.imgName,
          url: img.imgUrl,
        };
      });
    },
    // 销售属性选中后显示几个可选
    filterSaleAttrList() {
      return this.saleAttrList.filter((sale) => {
        // .indexOf() 只适用于数组中是基本类型
        // 找到了返回对象，没有则返回undefined
        // find() 适用于数组中是引用类型
        return !this.spuSaleAttrList.find(
          (spuSale) => spuSale.baseSaleAttrId === sale.id
        );
      });
    },
  },
  methods: {
    // 显示编辑输入框
    edit(row) {
      this.$set(row, "edit", true);
      // 等待数据渲染后执行
      this.$nextTick(() => {
        // 聚焦
        this.$refs.input.focus();
      });
    },
    // 编辑完成 添加销售属性值
    editCompleted(row, index) {
      // 判断点击修改时输入框是否有值
      if (this.saleAttrValueText) {
        // 有值 就添加到销售属性值列表spuSaleAttrValueList
        this.spuSaleAttrValueList.push({
          baseSaleAttrId: row.baseSaleAttrId, // 所有销售属性id
          saleAttrName: row.saleAttrName, // 销售属性名称
          spuId: row.spuId, // spu id
          saleAttrValueName: this.saleAttrValueText, // 销售属性值名称
        });
      }
      // 如果没有值就不做编辑
      row.edit = false;
    },
    // 添加销售属性
    // addSaleAttr() {
    //   // 获取选中的销售属性id
    //   const { saleAttrId, id } = this.spu;
    //   // 去所有的销售属性中找到相对应id的某个选中的销售属性
    //   const sale = this.saleAttrList.find((sale) => sale.id === saleAttrId);
    //   // 将选中的销售属性添加到SPU属性列表中
    //   this.spuSaleAttrList.push({
    //     abseSaleAttrId: sale.id, // 所有销售属性id
    //     saleAttrName: sale.name, // 所有销售属性名称
    //     spuId: id, // spu id
    //     spuSaleAttrList: [], // spu销售属性值列表
    //   });
    //   // 清空选中的销售属性id
    //   this.spu.saleAttrId = "";
    // },

    // 添加销售属性
    addSaleAttr() {
      // 获取选中的销售属性id
      const { sale, id } = this.spu;
      // 将sale的id name 切割出来
      const [abseSaleAttrId, saleAttrName] = sale.split("-");
      // 将选中的销售属性添加到SPU属性列表中
      this.spuSaleAttrList.push({
        // 前面加个+ 转换为num 类型
        abseSaleAttrId: +abseSaleAttrId, // 所有销售属性id
        saleAttrName, // 所有销售属性名称
        spuId: id, // spu id
        spuSaleAttrList: [], // spu销售属性值列表
      });
      // 清空选中的销售属性id
      this.spu.sale = "";
    },
    // 上传图片之前触发的回调 校验品牌LOGO
    beforeAvatarUpload(file) {
      // 图片类型
      const imgTypes = ["image/jpg", "image/png", "image/jpeg"];
      // 限制图片格式类型
      const isValidType = imgTypes.indexOf(file.type) > -1;
      // 限制图片大小
      const isLt2M = file.size / 1024 < 50;

      if (!isValidType) {
        this.$message.error("上传SPU图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传SPU图片大小不能超过 50kb!");
      }
      return isValidType && isLt2M;
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      // this.trademarkForm.logoUrl = res.data;
      // 将上传的图片放入到imageList
      this.imageList.push({
        uid: file.uid,
        imgNmae: file.name, // 文件名称
        imgUrl: res.data, // 图片地址
        spuId: this.spu.id, // spuId
      });
    },
    // 处理图片删除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // file.id 代表的是 点击了删除的那个图片id
      // 修改：不能根据id来删除图片id是整个图片列表的id 回把当前所有图片删除掉
      //       需要根据图片的每个地址，才是删除某张图片
      this.imageList = this.imageList.filter((img) => img.imgUrl !== file.url);
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
    // 获取所有销售属性列表
    async getSaleAttrList() {
      // 解构获取id
      const result = await this.$API.spu.getSaleAttrList();
      if (result.code === 200) {
        // console.log(result);
        this.$message.success("获取所有销售属性列表成功");
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
        // console.log(result);
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
