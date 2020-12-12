<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
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
        <template v-slot="{ row }">
          <el-button type="warning" icon="el-icon-edit" @click="update(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
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
    <!-- 上传图片from表单 -->
    <el-dialog
      :title="`${trademarkForm.id ? '修改' : '添加'}品牌`"
      :visible.sync="visible"
    >
      <el-form
        :model="trademarkForm"
        :rules="rules"
        ref="trademarkForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="trademarkForm.tmName"
            style="width: 450px"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="`${$BASE_API}/admin/product/fileUpload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkForm.logoUrl"
              :src="trademarkForm.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span style="font-size: 12px">只能上传jpg/png文件，且不超过50kb</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('trademarkForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      visible: false, // 默认隐藏上传的表单弹框
      // 上传图片表单数据
      trademarkForm: {
        tmName: "",
        logoUrl: "",
      },
      // 表单的校验规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请上传品牌LOGO图片" }],
      },
      imageUrl: "",
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
      const result = await this.$API.trademark.getPageList(page, limit);
      // console.log("result", result);
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
    },
    // 校验品牌名称
    handleAvatarSuccess(res) {
      this.trademarkForm.logoUrl = res.data;
    },
    // 校验品牌LOGO
    beforeAvatarUpload(file) {
      // 图片类型
      const imgTypes = ["image/jpg", "image/png", "image/jpeg"];
      // 限制图片格式类型
      const isValidType = imgTypes.indexOf(file.type) > -1;
      // 限制图片大小
      const isLt2M = file.size / 1024 < 50;

      if (!isValidType) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 50kb!");
      }
      return isValidType && isLt2M;
    },
    // 添加
    add() {
      this.$refs.trademarkForm && this.$refs.trademarkForm.clearValidate();
      this.visible = true;
      this.trademarkForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    // 修改品牌
    update(row) {
      // 显示对话框
      this.visible = true;
      // 获取表单品牌信息
      // row 代表当前行的表单数据 有id
      this.trademarkForm = { ...row };
    },
    // 提交表单校验
    submitForm(form) {
      // console.log(form);
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          const { trademarkForm } = this;
          // 代表是否更新
          const isUpdate = !!this.trademarkForm.id;
          // 判断如果是修改需要验证
          if (isUpdate) {
            // 遍历from 表单的每一项数据 拿到id
            const tm = this.trademarkList.find(
              (tm) => tm.id === trademarkForm.id
            );
            // 再判断是否有修改，如果值一样 没有修改给出提示信息
            if (
              tm.tmName === trademarkForm.tmName &&
              tm.loogoUrl === trademarkForm.logoUrl
            ) {
              this.$message.warning("不能提交以之前一样的数据");
              return;
            }
          }
          // 表单校验通过
          // console.log(valid);
          // console.log(this.trademarkForm);
          // 发送请求
          let result;
          if (isUpdate) {
            // 如果的更新修改 就发送修改更新的请求
            result = await this.$API.trademark.upDateTrademark(
              this.trademarkForm
            );
          } else {
            // 如果不是 就是添加操作 发送添加请求
            result = await this.$API.trademark.addTrademark(this.trademarkForm);
          }

          if (result.code === 200) {
            this.$message.success(
              `${isUpdate ? "修改" : "添加"}添加品牌数据成功`
            );
            // 隐藏对话框
            this.visible = false;
            // 请求加载新数据
            this.getPageList(this.page, this.limit);
          }
        } else {
          // console.log("表单校验失败");
          this.$message.error(result.message);
        }
      });
    },
  },
  mounted() {
    //  console.log(this);
    this.getPageList(this.page, this.limit);
  },
};
</script>
<style lang="sass" scoped>
.trademark-img
  width: 150px

.trademark-pagination
  text-align: right

>>>.el-pagination__sizes
  margin-left: 250px

>>>.avatar-uploader .el-upload
  border: 1px dashed #d9d9d9
  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden
  &:hover
    border-color: #409EFF
>>>.avatar-uploader-icon
  font-size: 28px
  color: #8c939d
  width: 178px
  height: 178px
  line-height: 178px
  text-align: center
>>>.avatar
  width: 178px
  height: 178px
  display: block
</style>
