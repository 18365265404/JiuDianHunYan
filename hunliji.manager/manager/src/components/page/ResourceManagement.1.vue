<template>
    <div class="userMessage  content">

    <!-- 搜索栏 -->
        <div class="top-search"  style="text-align: center; display:none">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div style="background:white;color:#666666;font-size:12px">
            <ul>
                <div style="display:flex; line-height:60px;color:#333333;font-size:14px;background:#EEF1F6">
                        
                        <span style="width:200px;margin-left:7%">资源名称</span>
                        <span style="margin-left:7%;width:200px">资源URL</span>
                        <span style="margin-left:7%;width:200px">资源排序</span>
                        <div style="margin-left:7%">操作</div>
                    </div>
                <li style="line-height:40px;" v-for="items in tableList" v-bind:key="items.id">
                    <div style="display:flex;">
                        
                        <span style="width:200px;margin-left:7%">{{items.resourceName}}</span>
                        <span style="margin-left:7%;width:200px">{{items.resourceUrl}}</span>
                        <span style="margin-left:7%;width:200px">{{items.resourceSort}}</span>
                        <el-button style="margin-left:7%;height:30px;margin-top:5px" @click.native.prevent="deleteRow(items.id)"  type="danger">删除</el-button>
                        <el-button style="margin-left:2%;margin-top:5px;height:30px" @click.native.prevent="changeRow(items.id,items.resourceSort)"  type="danger">修改</el-button>
                    </div>
                    <ul>
                        <li style=" display:flex"  v-for="item in items.subdirectoryList" v-bind:key="item.id">
                            <span style="display:flex; width:200px;margin-left:7%"><p style="width:30px;margin-top:20px;  border-top:1px solid #666666;margin-right:3px"></p>{{item.resourceName}}</span>
                            <span style="margin-left:7%;width:200px">{{item.resourceUrl}}</span>
                            <span style="margin-left:7%;width:200px">{{item.resourceSort}}</span>
                            <el-button style="margin-left:7%;margin-top:5px;height:30px" @click.native.prevent="deleteRow(item.id)"  type="danger">删除</el-button>
                            <el-button style="margin-left:2%;margin-top:5px;height:30px" @click.native.prevent="changeRow(item.id,item.resourceSort)"  type="danger">修改</el-button>
                        </li>
                    
                    </ul>
                </li>

            </ul>
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
            prop="resourceName"
            label="资源名"
            show-overflow-tooltip>
                <template slot-scope="scope">
                     <div style="display:flex"><p v-show="scope.row.resourceType=='1'" style="width:30px;margin-top:10px;  border-top:1px solid #333333;margin-right:3px"></p>{{ scope.row.resourceName}}</div>
                </template>
            </el-table-column>

            <el-table-column
            prop="resourceSort"
            label="资源排序"
            show-overflow-tooltip>
            </el-table-column>
           
            <el-table-column
            prop="resourceUrl"
            label="资源url"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
           >
            <template slot-scope="scope">
                <el-button
                @click.native.prevent="deleteRow(scope.$index, tableList)"
                type="danger"
                size="small">
                删除
                </el-button>

            </template>
            </el-table-column>
        </el-table>
<!-- 分页 -->
          <div class="block" style="overflow:hidden" v-show="false">

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
        <div>父目录：</div>
        <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">

            <el-form-item 
             
            prop="resourceName"
            >
                <el-input type="text" placeholder="请输入资源名称" v-model.number="ruleForm.resourceName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item    
                 
            prop="resourceUrl"
            >
                <el-input type="text"  placeholder="请输入资源URL" v-model.number="ruleForm.resourceUrl" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="resourceSort"
            >
                <el-input type="text"  placeholder="请输入资源排序" v-model.number="ruleForm.resourceSort" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>



            <el-form-item style="width:100%; margin:0 auto">
                <el-button style="width:100%"  type="primary" @click="submitForm('ruleForm',popTitle)" class="btn-submmit">{{submitType=="add" ? '确认' : '确认'}}</el-button>
                    
            </el-form-item>

              
            </el-form>

            <!-- 第二个表单 -->
            <div style="margin-top:30px">子目录：</div>  
            <el-form :model="ruleFormS" :rules="rules"   ref="ruleFormS"  size='medium'    class="demo-ruleForm">

            <el-form-item class="formCity"  prop="ResourceIdF" >
                <el-select v-model="ruleFormS.ResourceIdF" placeholder="继承父目录选择" style="width:100%">
                   <el-option
                    v-for="item in selectList"
                    :key="item.id"
                    :label="item.resourceName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
             
            prop="resourceNameS"
            >
                <el-input type="text" placeholder="请输入资源名称" v-model.number="ruleFormS.resourceNameS" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item    
                 
            prop="resourceUrlS"
            >
                <el-input type="text"  placeholder="请输入资源URL" v-model.number="ruleFormS.resourceUrlS" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="resourceSortS"
            >
                <el-input type="text"  placeholder="请输入资源排序" v-model.number="ruleFormS.resourceSortS" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>



            <el-form-item style="width:100%; margin:0 auto">
                <el-button style="width:100%"  type="success" @click="submitFormS('ruleFormS',popTitle)" class="btn-submmit">{{submitType=="add" ? '确认' : '确认'}}</el-button>
                    
            </el-form-item>

                 
            </el-form>


        
        </el-dialog>
        
        <!-- 弹窗 -->
        <el-dialog
        :visible.sync="dialogVisible2"
        width="40%"

        :modal-append-to-body='false'
        :close-on-click-modal="false"
        center>
       
        <el-form :model="ruleFormUp" :rules="rules"   ref="ruleFormUp"  size='medium'    class="demo-ruleForm">

            <el-form-item             
            prop="resourceSortUp"
            >
                <el-input type="text"  placeholder="请输入资源排序" v-model.number="ruleFormUp.resourceSortUp" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>



            <el-form-item style="width:100%; margin:0 auto">
                <el-button style="width:100%"  type="primary" @click="submitFormUp('ruleFormUp',popTitle)" class="btn-submmit">{{submitType=="add" ? '确认' : '确认'}}</el-button>
                    
            </el-form-item>

              
            </el-form>

        
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
      var validaterName = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('资源名不能为空'));
        }else{
          callback();
        }

        };

        var validateURL = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('资源URL不能为空'));
        }else{
          callback();
        }

        };

        var validateSort = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('资源排序不能为空'));
        }else{
          callback();
        }

        };

        var validateSortResourceIdF = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('父级资源名不能为空'));
        }else{
          callback();
        }

        };

        var validaterNameS = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('资源名不能为空'));
        }else{
          callback();
        }

        };


        var validateURLS = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('资源URL不能为空'));
        }else{
          callback();
        }

        };

        var validateSortS = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('资源排序不能为空'));
        }else{
          callback();
        }

        };

        var validateSortUp = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('资源排序不能为空'));
        }else{
          callback();
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
            selectList:[],
            changeId:"",
            total:1,
            

            ruleForm: {
                resourceName: '',
                resourceUrl: '',
                resourceSort:'',
                
            },
            ruleFormS: {
                ResourceIdF:"",
                resourceNameS: '',
                resourceUrlS: '',
                resourceSortS:'',
                
            },
            ruleFormUp:{
                resourceSortUp:""
            },
            rules: {
                    resourceName: [
                        { validator: validaterName, trigger: 'blur' }
                    ],
                    resourceUrl: [
                        { validator: validateURL, trigger: 'blur' }
                    ],
                    resourceSort: [
                        { validator: validateSort, trigger: 'blur' }
                    ],
                    resourceNameS: [
                        { validator: validaterNameS, trigger: 'blur' }
                    ],
                    resourceUrlS: [
                        { validator: validateURLS, trigger: 'blur' }
                    ],
                    resourceSortS: [
                        { validator: validateSortS, trigger: 'blur' }
                    ],
                    ResourceIdF: [
                        { validator: validateSortResourceIdF, trigger: 'blur' }
                    ],
                    resourceSortUp: [
                        { validator: validateSortUp, trigger: 'blur' }
                    ],
                    
                

            },

            dialogVisible:false,
            dialogVisible2:false,
            tableList: [],
            multipleSelection: []
        }
    },
    methods:{


        handleSelectionChange(val) {
        this.multipleSelection = val;
        },
        
        // 点击弹窗的叉号
        closeDialog(){
            this.$refs['ruleFormS'].resetFields();
            
        },
        

        // 添加城市出现

        addMost(){
            // this.$nextTick(() => {
            
            // });
            if (this.$refs["ruleForm"]!==undefined) {
                this.$refs['ruleForm'].resetFields();
            }
            
           
            this.dialogVisible=true;
            this.selectId()

        },
        //  提交  添加父级菜单
        submitForm(formName) {


        
        // return
        this.$refs[formName].validate((valid) => {
           console.log("this.ruleForm",this.ruleForm)
          if (valid) {
            postRequest(url.resourceAddResource,{
                resourceName:this.ruleForm.resourceName,
                resourceUrl:this.ruleForm.resourceUrl,
                resourceSort:this.ruleForm.resourceSort,
                resourceType:0
            }).then(data=> {
                this.$refs['ruleForm'].resetFields();
                this.initSelectAll({pageNum:this.currentPage}) //查询所有                    
                this.selectId()
            })
            
          } else {

            return false;
          }
        });
       
        },
        //  提交  添加子菜单
        submitFormS(formName) {

        console.log("wehrjiweuiru",this.ruleFormS)

        this.$refs[formName].validate((valid) => {
           console.log("this.ruleForm",this.ruleFormS)
          if (valid) {
            postRequest(url.resourceAddResource,{
                pid:this.ruleFormS.ResourceIdF,
                resourceName:this.ruleFormS.resourceNameS,
                resourceUrl:this.ruleFormS.resourceUrlS,
                resourceSort:this.ruleFormS.resourceSortS,
                resourceType:1
                
            }).then(data=> {
                this.$refs['ruleFormS'].resetFields();

                this.initSelectAll({pageNum:this.currentPage}) //查询所有                    

            })
            
          } else {

            return false;
          }
        });
       
        },   

        //修改
        submitFormUp(){
            console.log("修改",this.changeId)
            // return
            postRequest(url.resourceUpdResource, {
                   id:this.changeId,
                   resourceSort:this.ruleFormUp.resourceSortUp
                }).then(data=> {
                        console.log("修改后打印的数据",data)
                        this.$confirm('是否确定修改?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            this.dialogVisible2=false
                            this.initSelectAll({pageNum:this.currentPage}) //查询所有    
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改'
                            });          
                        });
                    
            });    
        },
    

        deletMost(){
            console.log("查看表单内的选中的条数",this.multipleSelection)
            let chooseStrId="";
            let chooseStrPictures="";
            for(let i=0;i<this.multipleSelection.length;i++){

                chooseStrId+=this.multipleSelection[i].id+","
            }
            chooseStrId = chooseStrId.substr(0, chooseStrId.length - 1);
            console.log("删除的chooseStrId",chooseStrId);
            postRequest(url.resourceDelResource, {
                   resourceId:chooseStrId,
                }).then(data=> {
                    console.log("删除后打印的数据",data)
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.dialogVisible=false
                        this.initSelectAll({pageNum:this.currentPage}) //查询所有    
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                    
            });    

        }, 

       changeRow(id,sort){
           this.changeId=id
           this.dialogVisible2=true
           this.ruleFormUp.resourceSortUp=sort
       },

      deleteRow(id) {
        
        console.log("1111",id)
        // return
        postRequest(url.resourceDelResource, {
                   resourceId:id,
                }).then(data=> {
                        console.log("删除后打印的数据",data)
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            this.dialogVisible=false
                            this.initSelectAll({pageNum:this.currentPage}) //查询所有    
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });
                    
        });    
        
        
      },
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

         selectId(){
            postRequest(url.resourceGetParentDirectory, {}).then(data=> {
                console.log("select的数据11111111",data.data.data)
                this.selectList=data.data.data
                        
            });     
         },
         initSelectAll(pamas){
            postRequest(url.resourceGetResourceList, pamas).then(data=> {


                        console.log("打印的数据11111111",data)
                        let datas=data.data.data;
                        this.tableList=datas
                        this.total= datas.total        
                        this.navigatepageNums=datas.navigatepageNums      
                        this.currentPage=datas.pageNum 
                        
            });     
         }   
    },
    computed:{
        formData(){
            return {

            }
        }
    },
    created(){
            this.initSelectAll({pageNum:this.currentPage})
        
    }

    
}
</script>

<style scoped>
ul li{
    list-style:none;
    border-top: 1px solid #999999;
}
</style>

