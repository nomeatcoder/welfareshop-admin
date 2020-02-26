
'use strict';

import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import Product      from 'service/product.jsx';

import FileUploader from 'component/file-uploader/index.jsx';

import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

const _product = new Product();

const ProductCategorySave = React.createClass({
    getInitialState() {
        return {
            categoryId      : this.props.params.categoryId || 0,
            pageName        : '所属品类',
            parentId        : 0,  // 所属品类
            categoryName    : '', // 品类名称
            categoryList    : [],  // 品类集合
            subImage       : ''
        };
    },
    componentDidMount: function(){
        // 查询一级品类时，不传id
        _product.getCategory().then(res => {
            this.setState({
                categoryList: res
            });
        }, errMsg => {
            alert(errMsg);
        });
        this.loadCategoryDetail();
    },
    loadCategoryDetail(){
        if(this.state.categoryId!=0){
            _product.getCategoryDetail(this.state.categoryId).then(res => {
                this.setState({
                    parentId        : res.parentId,  
                    categoryName    : res.name, 
                    subImage        : res.image
                });
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }
    },
    onValueChange(e){
        let name   = e.target.name;
        this.setState({
            [name] : e.target.value
        });
    },
    onSubmit(e){
        e.preventDefault();
        if(!this.state.categoryName){
            alert('请输入品类名称');
            return;
        }
        if(this.state.parentId!=0 && !this.state.subImage){
            alert('二级分类请上传图片')
            return;
        }
        // 请求接口
        _product.saveCategory({
            id              : this.state.categoryId,
            parentId        : this.state.parentId,
            categoryName    : this.state.categoryName,
            subImage        : this.state.subImage
        }).then(res => {
            alert(res);
            window.location.href='#/product.category/index/' + this.state.parentId;
        }, errMsg => {
            alert(errMsg);
        });
    },
    // 图片上传成功
    onUploadSuccess(res){
        let subImage = res.data.uri;
        this.setState({
            subImage: subImage
        });
    },
    // 图片上传失败
    onUploadError(err){
        alert(err.message || '哪里不对了~');
    },
    // 删除图片
    onDeleteImage(){
        this.setState({
            subImage: ''
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle={'品类管理 -- ' + (this.state.categoryId ? '修改品类' : '添加品类')}/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <form className="form-horizontal" >
                            <div className="form-group">
                                <label className="col-md-2 control-label">{this.state.pageName}</label>
                                <div className="col-md-10">
                                    <select className="form-control cate-select" name="parentId" onChange={this.onValueChange} value={this.state.parentId}>
                                        <option value="0">/所有</option>
                                        {
                                            this.state.categoryList.map(function(category, index) {
                                                return (
                                                    <option value={category.id} key={index}>/所有/{category.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category-name" className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-3">
                                    <input type="text" 
                                        className="form-control" 
                                        id="category-name" 
                                        name="categoryName"
                                        autoComplete="off"
                                        placeholder="请输入品类名称"
                                        onChange={this.onValueChange}
                                        value={this.state.categoryName}/>
                                </div>
                            </div>
                            {this.state.parentId!=0?
                             <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品图片</label>
                                <div className="img-con col-md-10">
                                    {
                                        this.state.subImage ? 
 
                                                <div className="sub-img" >
                                                    <img className="img" src={_mm.getImageUrl(this.state.subImage)}/>
                                                    <i className="fa fa-close fa-fw" onClick={this.onDeleteImage.bind(this)}></i>
                                                </div>
                    

                                         : <div className="notice">请上传图片</div>
                                    }
                                </div>
                                <div className="col-md-offset-2 col-md-10">
                                    <FileUploader onSuccess={this.onUploadSuccess} onError={this.onUploadError}/>
                                </div>
                            </div>
                            :null
                            }
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="button" className="btn btn-xl btn-primary"
                                    onClick={this.onSubmit}>提交</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductCategorySave;