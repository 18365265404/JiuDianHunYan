<template>
    <div class="userMessage  content">

    <!-- 搜索栏 -->
        <div class="top-search"  style="text-align: center; display:none">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    <!-- 批量删除 -->
        <div  class="button-add" style=" display:flex;  justify-content: space-between; overflow: hidden; margin-top:20px; margin-left:2%;">
         <el-button  style=" margin-right:5%;margin-bottom:20px" type="primary"  @click="deletMost()">批量删除</el-button>  
        <el-button  style=" margin-right:2%;margin-bottom:20px" type="primary"  @click="addMost()">新增</el-button>  
        </div>

        

        <el-table
            ref="multipleTable"
            :data="tableList"
            tooltip-effect="dark"
            style="width: 96%;margin:0 auto"
            border
            :header-cell-style="{background:'#EEF1F6'}"
            size="small"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
           >
            </el-table-column>
           <el-table-column
            type="index"
            >
            </el-table-column>

           


            <el-table-column
            prop="userName"
            label="用户账号"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="nickName"
            label="用户昵称"
            show-overflow-tooltip>
            </el-table-column>
           
            <el-table-column
            prop="roleName"
            label="角色"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="phone"
            label="手机号码"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
           >
            <template slot-scope="scope">

                <el-button
                @click.native.prevent="rootRow(scope.$index, tableList)"
                type="warning"
                size="small">
                授权
                </el-button>

                <el-button
                @click.native.prevent="deleteRow(scope.$index, tableList)"
                type="danger"
                size="small">
                删除
                </el-button>
                

                <el-button
                @click.native.prevent="changeRow(scope.$index, tableList)"
                type="success"
                size="small">
                修改
                </el-button>

                 <el-button
                @click.native.prevent="lockCheck(scope.$index, tableList)"
                type="primary"
                size="small">
                 {{scope.row.lockStatus==1? "锁定":"解锁"}}
                </el-button>
            </template>
            </el-table-column>
        </el-table>
<!-- 分页 -->
          <div class="block" style="overflow:hidden">

                <el-pagination
                style="float:right; margin-right:10%"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="navigatepageNums"
                :page-size="100"
                layout="total, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>

        <!-- 弹窗 -->
        <el-dialog
        :title="popTitle"
        :visible.sync="dialogVisible"
        width="40%"
        @close="closeDialog"
        :modal-append-to-body='false'
        :close-on-click-modal="false"
        center>
        <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">

            <el-form-item 
            v-show="submitType=='add'"     
            prop="userName"
            >
                <el-input type="text" placeholder="请输入用户账号" v-model.number="ruleForm.userName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>



            <el-form-item    
            v-show="submitType=='add'"         
            prop="passWord"
            >
                <el-input type="text"  placeholder="请输入密码(非必填，默认密码：123456)" v-model.number="ruleForm.passWord" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="nickName"
            >
                <el-input type="text"  placeholder="请输入用户昵称" v-model.number="ruleForm.nickName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item    
            prop="phone"
            >
                <el-input type="text" placeholder="请输入手机号码" v-model.number="ruleForm.phone" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item class="formCity"  prop="roleId" >
                <el-select v-model="ruleForm.roleId" placeholder="角色选择" style="width:100%">
                   <el-option
                    v-for="item in selectRoleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>



            <el-form-item style="width:100%; margin:0 auto">
                <el-button style="width:100%"  type="primary" @click="submitForm('ruleForm',popTitle)" class="btn-submmit">{{submitType=="add" ? '确认' : '确认'}}</el-button>
                    
            </el-form-item>

                 
            </el-form>


        
        </el-dialog>  

        <!-- 弹窗2/授权 -->
        <el-dialog
        title="授权"
        :visible.sync="dialogVisible2"
        width="40%"

        :modal-append-to-body='false'
        :close-on-click-modal="false"
        center>
        
        <div class="check-content" >
            
            <!-- <el-checkbox    indeterminate = false v-model="checkRootAllV">全选</el-checkbox> -->
            <ul>
                <li><el-checkbox  :indeterminate="isIndeterminate"  @change="checkRootAlF(checkRootAllV)" v-model="checkRootAllV">全选</el-checkbox></li>
            </ul>
            <ul  class="checkul">
                <li v-for="(item ,index) of rootList" :key="item.id"><el-checkbox  @change="checkRootAlF2(item,item.b1,item.id,index)" v-model="item.b1">{{item.powerDescribe}}</el-checkbox></li>

            </ul>
            <el-button style="width:100%;margin-top:30px"  type="primary" @click="submitRoot()" class="btn-submmit">提交</el-button>
        </div>
        

        
        </el-dialog> 


        
    </div>
</template>
<script>

import url from '../../utils/url';
import {getCookie} from '../../utils/utils';
import {postRequest} from '../../utils/api';
export default {
    data(){
// 表单验证
        var validateuserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('用户名不能为空'));
                }else{
                callback();
            }



        };


        var validatenickName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('昵称不能为空'));
        }else{
          callback();
        }

        };

        var validateroleId = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('角色名不能为空'));
        }else{
          callback();
        }

        };

        var validaterolePhone = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('手机号不能为空'));
            } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            console.log(reg.test(value));
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号'));
            }
            }

        };


    

        return{
            search:"",
            popTitle:"",
            submitType:"",
            popsubName:"",
            changeIndex:"",
            currentPage: 1,
            navigatepageNums:[],
            selectRoleList:[],
            changeId:"",
            total:1,
            checkRootAllV:false,
            isIndeterminate:false,
            ruleForm: {
                userName: '',
                passWord: '',
                nickName:'',
                phone:'',
                roleId:'',
            },
            rules: {
                    userName: [
                        { validator: validateuserName, trigger: 'blur' }
                    ],

                    nickName: [
                        { validator: validatenickName, trigger: 'blur' }
                    ],
                    roleId: [
                        { validator: validateroleId, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: validaterolePhone, trigger: 'blur' }
                    ],

            },
            dialogVisible:false,
            dialogVisible2:false,
            tableList: [],
            tagList:[],
            rootList:[
                // {id:"1",status:false,name:'增加'},
                // {id:"2",status:false,name:'删除'},
                // {id:"3",status:false,name:'修改'},
                // {id:"4",status:false,name:'查询'},
            ],
            multipleSelection: []
        }
    },
    methods:{


        handleSelectionChange(val) {
        this.multipleSelection = val;
        },
        
        // 点击弹窗的叉号
        closeDialog(){
        this.$refs['ruleForm'].resetFields();
        },
        

        // 添加城市出现

        addMost(){

            if (this.$refs["ruleForm"]!==undefined) {
                this.$refs['ruleForm'].resetFields();
            }
            this.dialogVisible=true;
            this.submitType="add"
            this.selectRoleId();
        },
        //  提交  修改 || 添加城市
        submitForm(formName) {



        this.$refs[formName].validate((valid) => {
           console.log("this.ruleForm",this.ruleForm)
          if (valid) {
            let currentUrl=""
            let pamas=""
            if(this.submitType=="add"){
                currentUrl=url.userAddUser
                pamas={
                    userName: this.ruleForm.userName,
                    passWord: this.ruleForm.passWord,
                    nickName: this.ruleForm.nickName,
                    phone: this.ruleForm.phone,
                    roleId: this.ruleForm.roleId,
                }
            }
            if(this.submitType=="change"){
                currentUrl=url.userUpdUser
                pamas={
                    id:this.changeId,
                    phone: this.ruleForm.phone,
                    nickName:this.ruleForm.nickName,
                    roleId:this.ruleForm.roleId,
                }
            }  

             postRequest(currentUrl,pamas ).then(data=> {
                        this.$refs['ruleForm'].resetFields();
                        this.dialogVisible=false
                        this.initSelectAll({pageNum:this.currentPage}) //查询所有
                     
                       
                                      

                })
          } else {

            return false;
          }
        });
       
      },   

// 修改锁定状态

        lockCheck(index, rows){

             this.$confirm('是否修改状态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

                    postRequest(url.userUpdUser, {
                        id:rows[index].id,
                        lockStatus: rows[index].lockStatus==1 ? "0" :"1"
                    } ).then(data=> {
                        this.dialogVisible=false
                        this.initSelectAll({pageNum:this.currentPage}) //查询所有    
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    
                        
                    })
                   
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });          
                });
            
        },
// 修改
        changeRow(index, rows){
            this.dialogVisible=true;
            this.submitType="change";
            this.changeId=rows[index].id;
            this.selectRoleId();
            this.$nextTick(() => {
                this.ruleForm={
                userName: rows[index].userName,
                passWord: rows[index].passWord,
                nickName:rows[index].nickName,
                phone:rows[index].phone,
                roleId:rows[index].roleId,

            }
            })
            
        },

    // 授权全选改变事件
        checkRootAlF(bl){
            
            console.log("sssssssssssssssssssssssssssss",this.rootList)
            
            if(bl){
                
                for(let i=0; i<this.rootList.length;i++){
                    this.rootList[i].b1=true
                    this.isIndeterminate=false
                }
                
            }else{
                
                for(let i=0; i<this.rootList.length;i++){
                    this.rootList[i].b1=false
                    this.isIndeterminate=false
                }
            }
            
        },

    // 授权子集check选择事件
    checkRootAlF2(obj,b1,id,index){
        // this.isIndeterminate=true
        if(this.checkIdData==this.rootList.length){
                this.checkRootAllV=true
        }else{
            this.checkRootAllV=false
        }

        if(this.checkIdData<this.rootList.length && this.checkIdData>0){
            this.isIndeterminate=true
        }else{
            this.isIndeterminate=false
        }

    },
    // 授权窗口打开
        rootRow(index, rows){
            let initchooseL=0
            this.dialogVisible2=true
            this.changeId=rows[index].id
            postRequest(url.powerGetPower, {
                   userId:rows[index].id,
                }).then(data=> {
                        
                    console.log("显示权限",data.data.data)
                    this.tagList=JSON.parse(JSON.stringify(data.data.data));
                    this.rootList=data.data.data
                    for(let i=0; i< this.tagList.length;i++){
                        if(this.tagList[i].b1){
                            initchooseL++
                        }
                    }
                    if(initchooseL==this.rootList.length){
                        this.checkRootAllV=true
                    }else{
                        this.checkRootAllV=false
                    }
                    
                    if(initchooseL<this.rootList.length && initchooseL>0){
                        this.isIndeterminate=true
                    }else{
                        this.isIndeterminate=false
                    }
                   
            });    
        },
        // 授权提交
        submitRoot(){

        var  chooseDletList=[]  
        var  chooseUptList=[]            
            for(let i=0;i<this.tagList.length;i++){
                if(this.tagList[i].b1!=this.rootList[i].b1){
                    if(this.tagList[i].b1){
                        chooseDletList.push(this.tagList[i].id)
                        
                    }
                    if(!this.tagList[i].b1){
                        chooseUptList.push(this.tagList[i].id)
                        
                    }
                    
                }
            }
        let chooseUpStr= this.transition(chooseUptList)  
        let chooseDletStr=this.transition(chooseDletList)
  
        

        console.log("===============================要删除的check",chooseDletStr)
        console.log("===============================要添加的check",chooseUpStr)
        if(chooseUpStr!=""){
            //添加的接口 
            postRequest(url.userPowerAddUserPower, {
                   userId:this.changeId,
                   powerIdStr:chooseUpStr,
                }).then(data=> {
                    this.dialogVisible2=false    
                    console.log("提交权限返回数据",data)
                    this.$message({
                        type: 'success',
                        message: '授权成功'
                    });
                   
            });
        }else{
            this.$message({
                type: 'success',
                message: '请修改后提交'
            });
        }
            
        if(chooseDletStr!=""){
            // return
            //删除的接口 
            postRequest(url.userPowerDelUserPower, {
                   userId:this.changeId,
                   powerIdStr:chooseDletStr,
                }).then(data=> {
                    this.dialogVisible2=false 
                    this.$message({
                        type: 'success',
                        message: '授权成功'
                    });
                    console.log("删除权限返回数据",data)

                   
            });    
        }else{
            this.$message({
                type: 'success',
                message: '请修改后提交'
            });
        }    
            





        },
        // 批量删除
        deletMost(){
            console.log("查看表单内的选中的条数",this.multipleSelection)
            let chooseStrId="";
            let chooseStrPictures="";
            for(let i=0;i<this.multipleSelection.length;i++){

                chooseStrId+=this.multipleSelection[i].id+","
            }
            chooseStrId = chooseStrId.substr(0, chooseStrId.length - 1);
            console.log("删除的chooseStrId",chooseStrId);
            if(chooseStrId==""){
                this.$message({
                    type: 'success',
                    message: '请选择后删除'
                });
                return
            }

                this.$confirm('是否删除?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {

                    postRequest(url.userDelUser, {
                        userIds:chooseStrId,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)
                         this.dialogVisible=false
                         this.initSelectAll({pageNum:this.currentPage}) //查询所有    
                         this.$message({
                            type: 'success',
                            message: '删除成功'
                        });        
                                
                    });    
                       
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                });
           

        }, 


       

      deleteRow(index, rows) {
        
        console.log("1111",rows[index].id)

        this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {

                    postRequest(url.userDelUser, {
                        userIds:rows[index].id,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)
                         this.dialogVisible=false
                         this.initSelectAll({pageNum:this.currentPage}) //查询所有    
                         this.$message({
                            type: 'success',
                            message: '删除成功'
                        });        
                                
                    });    
                       
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                });
   
        
        
      },


        // 数组转带逗号的string
        transition(arr){
            let getStr="";
            for(let i=0;i<arr.length;i++){
                getStr+=arr[i]+","
            }
            getStr = getStr.substr(0, getStr.length - 1);
            return getStr
        }  ,
// f分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.initSelectAll({pageNum:val})
      },


         goSearch(){//搜索
                this.initSelectAll({pageNum:this.currentPage}) 

            },

         selectRoleId(){
            postRequest(url.roleGetRoleList, {}).then(data=> {
                console.log("select的数据11111111",data.data.data)
                this.selectRoleList=data.data.data
                        
            });     
         },
         initSelectAll(pamas){
            postRequest(url.userGetUserList, pamas).then(data=> {


                        console.log("打印的数据11111111",data)
                        let datas=data.data.data;
                        this.tableList=datas.list
                        this.total= datas.total        
                        this.navigatepageNums=datas.navigatepageNums      
                        this.currentPage=datas.pageNum 
                        
            });     
         }   
    },
    computed:{
        checkIdData(){
            let chooseId=[]
            for(let i=0; i<this.rootList.length;i++){
                if(this.rootList[i].b1==true){
                    chooseId.push(this.rootList[i].id)
                }
            }
            return chooseId.length
        }
    },
    created(){
            this.initSelectAll({pageNum:this.currentPage})
        
    }

    
}
</script>

<style scoped>
.check-content{
    width: 90%;
    margin-left: 5%;

}
.checkul{
    margin-top: 20px;
    display: flex;
    justify-content: space-between
}
</style>
