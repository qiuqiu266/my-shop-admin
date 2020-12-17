<template>
  <div>
    <!-- <Category
      @change="getAttrList"
      @clearList="clearList"
      :disabled="!isShowList"
    /> -->
    <SkuList v-if="isShowSkuList" :spuItem="spuItem" />
    <div v-else>
      <!-- 三级分类 -->
      <Category />
      <!-- SPU列表 -->
      <SpuShowList
        v-if="isShowList"
        @showUpdateList="showUpdateList"
        @showSkuList="showSkuList"
      />
      <!-- 添加SPU属性值 -->
      <SpuUpdateList v-else :item="item" @showList="showList" />
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category";
import SpuShowList from "./SpuShowList";
import SpuUpdateList from "./SpuUpdateList";
import SkuList from "./SkuList";
export default {
  name: "SpuList",
  data() {
    return {
      isShowList: true,
      // 当前行的数据（SPU名称，SPU描述）
      item: {},
      isShowSkuList: false,
      spuItem: {},
    }
  },
  // 注册组件
  components: {
    Category,
    SpuShowList,
    SpuUpdateList,
    SkuList,
  },
  methods: {
    // 第一个按钮+
    showSkuList(row) {
      this.isShowSkuList = true;
      this.spuItem = { ...row };
    },
    // 添加，修改按钮的回调
    showUpdateList(row) {
      // 隐藏当前页面 切换到编辑页面
      this.isShowList = false;
      this.item = { ...row };
    },
    showList(category3Id) {
      this.isShowList = true;
      // 等待showList 组件加载完成，再触发事件
      this.$nextTick(() => {
        this.$bus.$emit("change", { category3Id });
      });
    },
  },
};
</script>
