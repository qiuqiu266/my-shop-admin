import request from "@/utils/request";

const api_name = "/admin/product/baseTrademark";

export default {
  /*
  获取品牌分页列表
  */
  getPageList(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: "GET"
    });
  },

  // 修改更新
  upDateTrademark(banner) {
    return request({
      method: "PUT",
      url: `${api_name}/update`,
      data: {
        banner
      }
    });
  },

  // 新增品牌数据
  addTrademark(banner) {
    return request({
      method: "POST",
      url: `${api_name}/save`,
      data: {
        banner
      }
    });
  },

  // 删除品牌
  deleteTrademark(id) {
    return request({
      method: "DELETE",
      url: `${api_name}/remove/${id}`
    });
  }
};
