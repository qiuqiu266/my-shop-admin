<template>
  <div>
    <el-card style="margin-top: 20px">
      <el-form label-width="80px">
        <el-form-item label="SPU名称" >
          <el-input placeholder="SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select placeholder="请选择品牌">
            <el-option label="无" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述" >
          <el-input
            placeholder="SPU描述"
            type="textarea"
            style="height: 60px"
          ></el-input>
        </el-form-item>
        <el-form-item label="SPU图片" prop="name">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog>
            <img width="100%" src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="销售属性">
          <el-select placeholder="还剩三个未选择">
            <el-option label="无"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="[]" border style="width: 100%; margin: 20px 0">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column  label="属性名称"> </el-table-column>
        <el-table-column label="属性值名称~~~">
          <template>
            <el-input size="mini"></el-input>
            <span style="display:block,width:100%">11</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-popconfirm>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary">保存</el-button>
      <el-button>取 消</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SpuUpdateList",
};
</script>

<style lang="less" scoped>
</style>
