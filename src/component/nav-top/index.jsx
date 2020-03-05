'use strict';
import React    from 'react';
import ReactDOM from 'react-dom';

import MMUtile  from 'util/mm.jsx';
import User     from 'service/user.jsx';

const _mm       = new MMUtile();
const _user     = new User();

const TopNav = React.createClass({
    getInitialState() {
        return {
            userName : ''
        };
    },
    componentDidMount(){
        //本地存在user信息
        let userInfo = _mm.getStorage('userInfo');
        if(userInfo){
            //调后端判断用户是否登录
            _user.checkLogin().then(res => {
                this.setState({
                    userName : userInfo.username || ''
                });
            },errMsf => {
                _mm.doLogin();
            });
        }else{
            _mm.doLogin();
        }
        
    },
    onLogout(){
        _user.logout().then(res => {
            _mm.removeStorage('userInfo')
            window.location.href = '#/login';
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    render() {
        return (
            <div>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#/">福利商城管理后台</a>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropDown">
                            <span>欢迎，{this.state.userName}</span>         
                    </li>
                    <li className="dropDown">
                        <a className="btn-logout" onClick={this.onLogout}>退出</a>
                    </li>
                </ul>
            </div>
        );
    }
});

export default TopNav;