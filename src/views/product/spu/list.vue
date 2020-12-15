<template>
  <div>
    <!-- <Category
      @change="getAttrList"
      @clearList="clearList"
      :disabled="!isShowList"
    /> -->
    <!-- 三级分类 -->
    <Category />
    <!-- SPU列表 -->
    <SpuShowList v-if="isShowList" @showUpdateList="showUpdateList" />
    <!-- 添加SPU属性值 -->
    <SpuUpdateList v-else :item="item" />
  </div>
</template>

<script>
import Category from "@/components/Category";
import SpuShowList from "./SpuShowList";
import SpuUpdateList from "./SpuUpdateList";
export default {
  name: "SpuList",
  data() {
    return {
      isShowList: true,
      // 当前行的数据（SPU名称，SPU描述）
      item: {},
    };
  },
  // 注册组件
  components: {
    Category,
    SpuShowList,
    SpuUpdateList,
  },
  methods: {
    // 修改按钮的回调
    showUpdateList(row) {
      // 隐藏当前页面 切换到编辑页面
      this.isShowList = false;
      this.item = { ...row };
    },
  },
};
</script>
