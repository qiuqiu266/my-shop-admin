<template>
  <div>
    <el-card style="margin-top: 20px">
      <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
      <el-table style="margin-top: 20px; width: 100%" :data="[]" border>
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="attrName" label="SPU名称"> </el-table-column>
        <el-table-column label="SPU描述">
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
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SpuShowList",
};
</script>

<style lang="less" scoped>
</style>
