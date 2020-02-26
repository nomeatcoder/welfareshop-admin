
'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Product{
    
    // 获取商品信息
    getProduct(productId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/detail.do'),
            data    : {
                productId : productId || 0
            }
        });
    }
    // 获取商品信息
    getProductList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/product/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/product/search.do'),
                data    : listParam
            });
        }
            
    }
    // 更新商品信息
    saveProduct(product){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/save.do'),
            data    : product
        });
    }
    // 改变商品状态
    setProductStatus(productId, status){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/set_sale_status.do'),
            data    : {
                productId   : productId,
                status      : status
            }
        });
    }
    // 获取品类
    getCategory(parentCategoryId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/get_category.do'),
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    // 获取品类详情
    getCategoryDetail(categoryId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/get_category_detail.do'),
            data    : {
                categoryId : categoryId || 0
            }
        });
    }
    // 更新品类
    saveCategory(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/save_category.do'),
            data    : {
                categoryId              : category.id || 0,
                parentId        : category.parentId    || 0,
                categoryName    : category.categoryName  || '',
                subImage        : category.subImage    || ''
            }
        });
    }
    // 删除品类
    delCategory(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/del_category.do'),
            data    : {
                categoryId      : category.categoryId    || 0
            }
        });
    }
    // 删除商品
    delProduct(product){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/del_product.do'),
            data    : {
                productId      : product.productId    || 0
            }
        });
    }
    // 更新品类名称
    updateCategoryName(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/set_category_name.do'),
            data    : category
        });
    }
}
