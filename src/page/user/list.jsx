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

const UserList = React.createClass({
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
        this.loadUserList();
    },
    // 加载用户列表
    loadUserList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 按用户名搜索
        if (this.state.listType === 'search') {
            listParam.username = this.state.username;
        }
        // 查询
        _user.getUserList(listParam).then(res => {
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
                this.loadUserList();
            });
        } else {
            // setState是异步的
            this.setState({
                listType: 'list',
                pageNum: 1
            }, () => {
                this.loadUserList();
            });
        }

    },
    // 页数变化
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    },
    onCharge(id){
        let integral = window.prompt("请输入要充值的积分", integral); 
        if(!integral){
            return;
        }
        if(integral>0){
            // 更新
            _user.charge({
                integral   : integral,
                id         : id
            }).then(res => {
                _mm.successTips(res);
                this.loadUserList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips('请输入大于0的数');
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="用户管理"/>
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
                                    <th>邮箱</th>
                                    <th>手机号</th>
                                    <th>问题</th>
                                    <th>答案</th>
                                    <th>角色</th>
                                    <th>积分</th>
                                    <th>创建时间</th>
                                    <th>修改时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {user.id}
                                                </td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.question}</td>
                                                <td>{user.answer}
                                                </td>
                                                <td>{user.role}
                                                </td>
                                                <td>{user.integral}
                                                </td>
                                                <td>{user.createTime}
                                                </td>
                                                <td>{user.updateTime}
                                                </td>
                                                <td>
                                                    <a className="opera" onClick={this.onCharge.bind(this, user.id)}>积分充值</a>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="10" className="text-center">没有找到相应结果~</td>
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

export default UserList;