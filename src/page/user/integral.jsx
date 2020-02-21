'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';

import MMUtile from 'util/mm.jsx';
import User from 'service/user.jsx';

const _mm = new MMUtile();
const _user = new User();

import './index.scss';

const IntegralList = React.createClass({
    getInitialState() {
        return {
            list: [],
            listType: 'list',
            username: '',
            pageNum: 1,
            pages: 0
        };
    },
    componentDidMount() {
        this.loadIntegralList();
    },
    // 加载积分记录列表
    loadIntegralList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 按用户名搜索
        if (this.state.listType === 'search') {
            listParam.username = this.state.username;
        }
        // 查询
        _user.getIntegralList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    // 关键词变化
    onUsernameChange(e) {
        let username = e.target.value.trim();
        this.setState({
            username: username
        });
    },
    // 搜索
    onSearch() {
        if (this.state.username) {
            // setState是异步的
            this.setState({
                listType: 'search',
                pageNum: 1
            }, () => {
                this.loadIntegralList();
            });
        } else {
            // setState是异步的
            this.setState({
                listType: 'list',
                pageNum: 1
            }, () => {
                this.loadIntegralList();
            });
        }

    },
    // 页数变化
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadIntegralList();
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="积分记录"/>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control">
                                    <option value="username">按用户名查询查询</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="用户名" onChange={this.onUsernameChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>用户名</th>
                                    <th>类型</th>
                                    <th>数量</th>
                                    <th>剩余积分</th>
                                    <th>创建时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((integralDetail, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {integralDetail.id}
                                                </td>
                                                <td>{integralDetail.username}</td>
                                                <td>{integralDetail.type}</td>
                                                <td>{integralDetail.num}</td>
                                                <td>{integralDetail.remainIntegral}</td>
                                                <td>{integralDetail.createTime}</td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="6" className="text-center">没有找到相应结果~</td>
                                        </tr>
                                    )
                                }
                                            
                            </tbody>
                        </table>
                    </div>
                    {
                    this.state.pages > 1 ? <Pagination onChange={this.onPageNumChange} 
                        current={this.state.pageNum} 
                        total={this.state.total} 
                        showLessItems/>: null
                    }
                </div>
            </div>
        );
    }
});

export default IntegralList;