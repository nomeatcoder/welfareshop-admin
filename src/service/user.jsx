
'use strict';

import MMUtil from 'util/mm.jsx';

const mm = new MMUtil();

export default class User{
    // 检查用于登录的信息是否合法
    checkLoginInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: '用户名不能为空'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    // 登录
    login(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/login.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || ''
            }
        });
    }
    // 校验登录
    checkLogin(){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/checkLogin.do'),
            method  : 'POST',
            data    : {}
        });
    }
    // 退出登录
    logout(){
        return mm.request({
            url     : mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
        });
    }
    // 获取用户列表
    getUserList(listParam){
        if(listParam.listType == 'list'){
            return mm.request({
                url     : mm.getServerUrl('/manage/user/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return mm.request({
                url     : mm.getServerUrl('/manage/user/search.do'),
                data    : listParam
            });
        } 
    }
    // 积分充值
    charge(param){
        return mm.request({
            url    : mm.getServerUrl('/manage/user/charge.do'), 
            data   : {
                integral : param.integral,
                id       : param.id,
            }
        });
    }
    // 获取积分记录列表
    getIntegralList(listParam){
        if(listParam.listType == 'list'){
            return mm.request({
                url     : mm.getServerUrl('/manage/user/integral_list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return mm.request({
                url     : mm.getServerUrl('/manage/user/integral_search.do'),
                data    : listParam
            });
        } 
    }
}