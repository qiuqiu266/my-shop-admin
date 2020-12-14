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
    <SpuShowList v-show="isShowList" />
    <!-- 添加SPU属性值 -->
    <SpuUpdateList v-show="!isShowList" />
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
    };
  },
  // 注册组件
  components: {
    Category,
    SpuShowList,
    SpuUpdateList,
  },
  // mount() {
  //   // 绑定事件全局总线
  //   this.$bus.$on("change", change);
  // },
  // 解绑
  // beforeDestroy() {},
};
</script>
