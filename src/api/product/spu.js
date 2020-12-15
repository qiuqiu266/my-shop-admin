import request from "@/utils/request";

const api_name = "/admin/product";

export default {
  /*
 
GET /admin/product/getSpuById/{spuId}
获取spu基本信息

  */

  // 获取分页列表
  getSpuList({ category3Id, page, limit }) {
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
  },

  // 获取所有品牌数据列表
  // GET /admin/product/baseTrademark/getTrademarkList
  getTrademarkList() {
    return request({
      method: "GET",
      url: `${api_name}/baseTrademark/getTrademarkList`
    });
  },

  //  获取所有销售属性列表
  getSaleAttrList() {
    return request({
      method: "GET",
      url: `${api_name}/baseSaleAttrList`
    });
  },

  // GET /admin/product/spuSaleAttrList/{spuId}
  // getSpuSaleAttrList
  // 获取Spu 的销售属性列表
  getSpuSaleAttrList(spuId) {
    return request({
      method: "GET",
      url: `${api_name}/spuSaleAttrList/${spuId}`
    });
  },
  // GET /admin/product/spuImageList/{spuId}
  // getSpuImageList
  // 获取SPU图片列表
  getSpuImageList(spuId) {
    return request({
      method: "GET",
      url: `${api_name}/spuImageList/${spuId}`
    });
  }
};
