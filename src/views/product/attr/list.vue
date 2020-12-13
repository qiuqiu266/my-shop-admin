<template>
  <div>
    <Category @change="getAttrList" :disabled="!isShowList" />
    <!--  -->
    <el-card style="margin-top: 20px" v-show="isShowList">
      <el-button type="primary" icon="el-icon-plus" disabled
        >添加属性</el-button
      >
      <el-table :data="attrList" border style="width: 100%,margin-top:20px">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="attrName" label="属性名称"> </el-table-column>
        <el-table-column label="属性值列表">
          <template v-slot="{ row }">
            <el-tag
              v-for="attrVal in row.attrValueList"
              :key="attrVal.id"
              style="margin-right: 5px"
              >{{ attrVal.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" v-slot="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="update(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!--  -->
    <el-card style="margin-top: 20px" v-show="!isShowList">
      <el-form :model="attr" inline>
        <el-form-item label="属性名" prop="attrName">
          <el-input placeholder="请输入" v-model="attr.attrName"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
        >添加属性值名称</el-button
      >
      <el-button>取 消</el-button>
      <el-table
        :data="attr.attrValueList"
        border
        style="width: 100%; margin: 20px 0"
      >
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column label="属性值名称~~~">
          <template v-slot="{ row, $index }">
            <!-- 事件修饰符：
                    .native 专门给组件绑定事件使用的
                          会给组件中的第一个标签绑定相应的DOM事件
             -->
            <el-input
              v-if="row.edit"
              v-model="row.valueName"
              @blur="editCompleted(row, $index)"
              @keyup.enter.native="editCompleted(row, $index)"
              autofocus
              ref="input"
              size="mini"
            ></el-input>
            <!-- @click="$set(row,'edit',true)" 直接给对象添加新属性不是响应式数据
                    通过this.$set添加的属性才是响应式
             -->
            <span v-else @click="edit(row)" style="display:block,width:100%">{{
              row.valueName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row, $index }">
            <el-popconfirm
              :title="`确定删除${row.valueName}吗？`"
              @onConfirm="delAttrValue($index)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="isShowList = true">取 消</el-button>
    </el-card>
  </div>
</template>

<script>
import Category from "./category";
export default {
  name: "AttrList",
  data() {
    return {
      attrList: [],
      isShowList: true,
      attr: {
        attrName: "", // 属性名称
        attrValueList: [], // 属性值列表
      },
    };
  },
  // 方法
  methods: {
    // 编辑完成
    editCompleted(row, index) {
      // 判断点击修改时输入框是否有值
      if (!row.valueName) {
        // 如果没有值就不做修改 并且删除
        this.attr.attrValueList.splice(index, 1);
        return;
      }
      // 失去焦点
      row.edit = false;
    },
    // 保存
    async save() {
      // 发送请求
      const result = await this.$API.attrs.saveAttrInfo(this.attr);
      // 判断
      if (result.code === 200) {
        this.$message.success("保存成功");
        // 请求成功 切换显示属性列表
        this.isShowList = true;
        // 更新属性值列表
        this.getAttrList(this.category);
      } else {
        this.$message.error(result.$message);
      }
    },
    // 删除属性值
    delAttrValue(index) {
      this.attr.attrValueList.splice(index, 1);
    },
    // 点击添加属性名称
    addAttrValue() {
      this.attr.attrValueList.push({ edit: true });
      // 等待DOM元素渲染完成 获取焦点
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    // 编辑修改时 失去焦点操作
    edit(row) {
      this.$set(row, "edit", true);
      // 等待DOM元素渲染完毕后 获取焦点
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    update(attr) {
      // 展开  为了attr变化时直接修改原数据
      // this.attr = {
      //   ...attr,
      // };
      // 深度克隆
      this.attr = JSON.parse(JSON.stringify(attr));
      // 切换页码
      this.isShowList = false;
    },
    // 绑定自定义事件
    async getAttrList(category) {
      // this.attrList = attrList;
      this.category = category;
      const result = await this.$API.attrs.attrInfoList(category);
      // console.log(result.data);
      if (result.code === 200) {
        // // 请求成功 触发父级自定义事件 将属性列表传递给父级组件
        // this.$emit("change", result.data, category);
        this.attrList = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
  },
  components: {
    Category,
  },
};
</script>
