import request from "@/utils/request";

const api_name = "/admin/product";

export default {
  /*
 
GET /admin/product/getSpuById/{spuId}
获取spu基本信息

  */
  //  获取销售属性列表
  getSaleAttrList() {
    return request({
      method: "GET",
      url: `${api_name}/baseSaleAttrList`
    });
  },

  // 获取分页列表
  getSpuList({category3Id, page, limit}) {
    return request({
      method: "GET",
      url: `${api_name}/${page}/${limit}`,
      // 查询字符串参数
      params: {
        category3Id
      }
    });
  },

  // 更改spu信息
  updateSpuInfo(spu) {
    return request({
      method: "POST",
      url: `${api_name}/updateSpuInfo`,
      data: spu
    });
  },

  // 保存
  saveSpuInfo(spu) {
    return request({
      method: "POST",
      url: `${api_name}/saveSpuInfo`,
      data: spu
    });
  },

  // 删除
  deleteSpu(spuId) {
    return request({
      method: "DELETE",
      url: `${api_name}/deleteSpu/${spuId}`
    });
  }
};
