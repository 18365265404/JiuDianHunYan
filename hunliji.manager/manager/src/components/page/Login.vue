<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">聚宴家管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips"></p>
            </el-form>
        </div>
    </div>
</template>

<script>
import {postRequest,postRequestLogin} from '../../utils/api';
import sessionStorage from '../../utils/sessionStorage'
import url from '../../utils/url';
import bus from '../../utils/eventBus';
import {setCookie,getCookie,delCookie} from '../../utils/utils';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                sideBarMsg:[
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页666'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '基础表格'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'tabs',
                        title: 'tab选项卡'
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [
                                    {
                                        index: 'editor',
                                        title: '富文本编辑器'
                                    },
                                    {
                                        index: 'markdown',
                                        title: 'markdown编辑器'
                                    },
                                ]
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'icon',
                        title: '自定义图标'
                    },
                    {
                        icon: 'el-icon-lx-favor',
                        index: 'charts',
                        title: 'schart图表'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '6',
                        title: '拖拽组件',
                        subs: [
                            {
                                index: 'drag',
                                title: '拖拽列表',
                            },
                            {
                                index: 'dialog',
                                title: '拖拽弹框',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-global',
                        index: 'i18n',
                        title: '国际化功能'
                    },
                    {
                        icon: 'el-icon-lx-warn',
                        index: '7',
                        title: '错误处理',
                        subs: [
                            {
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // localStorage.setItem('ms_username',this.ruleForm.username);
                        // this.$router.push('/');
                        postRequestLogin(url.userLogin, {
                            userName: this.ruleForm.username,
                            passWord: this.ruleForm.password
                        }).then(data=> {
                                console.log("login成功数据",data.data)
                                let user=data.data.data.user
                                let resource=data.data.data.resource
                                let tokens=data.data.data.user.token
                                // alert(tokens)
                                if(data.status==200){
                                localStorage.setItem('ms_username',user.nickName);
                                localStorage.setItem('ms_username2',user.userName);
                                // localStorage.setItem('ms_userId',user.id);
                                sessionStorage.putSessionStorage('ms_userId',user.id)
                                sessionStorage.putSessionStorage('ms_siderBar',resource)
                                sessionStorage.putSessionStorage('ms_token',tokens)
                                // localStorage.setItem('ms_siderBar',resource);
                                this.$router.push('/');
                                console.log("login成功数据",resource)
                                this.$store.dispatch('siderBar',resource)
                                // 存储所有的路径
                                let allPath=[]
                                for(let i=0;i<resource.length;i++){
                                    for(let j=0;j<resource[i].subdirectoryList.length;j++){
                                        allPath.push(resource[i].subdirectoryList[j].resourceUrl)
                                    }
                                }
                                
                                sessionStorage.putSessionStorage('ms_path_all',allPath)
                                }
                                
                                
                                    
                                    
                                    // const h = this.$createElement;
                                    // this.$notify({
                                    // title: '登录状态',
                                    // message: h('i', { style: 'color: teal'},data.data.msg)
                                    // });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created(){
            // postRequest('api/market/query-market-quotation', {
            //                 "currentProvince": "460000"
            //             }).then(data=> {
                               
                                
            //                console.log("测试数据",data)     
                                    
                                    
                                
            //             })
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>