<template>
  <div>
    <!-- <Category
      @change="getAttrList"
      @clearList="clearList"
      :disabled="!isShowList"
    /> -->
    <Category />
    <!-- 属性列表 -->
    <SpuShowList v-show="isShowList" />
    <!-- 添加属性值 -->
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
      isShowList: false,
    };
  },
  components: {
    Category,
    SpuShowList,
    SpuUpdateList,
  },
};
</script>
