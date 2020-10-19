<template>
    <div class="userMessage  content">

    <!-- 搜索栏 -->
        <div class="top-search"  style="text-align: center; display:none">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>



        

        <el-table
            ref="multipleTable"
            :data="tableList"
            tooltip-effect="dark"
            style="width: 96%;margin:0 auto;margin-top:70px"
            border
            :header-cell-style="{background:'#EEF1F6'}"
            size="small"
            @selection-change="handleSelectionChange">

           <el-table-column
            type="index"
            >
            </el-table-column>


            <el-table-column
            prop="roleName"
            label="角色名"
            show-overflow-tooltip>
            </el-table-column>


            <el-table-column
            fixed="right"
            label="操作"
           >
            <template slot-scope="scope">
                <el-button
                @click.native.prevent="rootShow(scope.$index, tableList)"
                type="warning"
                size="small">
                授权
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
        title="授权"
        :visible.sync="dialogVisible"
        width="70%"
        center>
        <div style="overflow:hidden">
            <ul>
                <li style="margin-top:20px;border-top:none" v-for="(item1 ,index1) of permitList" :key="item1.id" >
                    <div style="background:#E5E5E5;width:100%;border-radius: 5px; border-bottom:1px solid white">
                        <table style="width:100%;">
                            
                        <thead style="">
                            <tr class="thead-tr" style="width:100%;height:40px;">
                                <th style=""> 
                                    <el-checkbox style="margin-left:15px"     @change="checkPermit1(index1,item1.b1)" v-model="item1.b1"><span style="font-size:16px;">{{item1.resourceName}}</span></el-checkbox>
                                </th>
                               
                            </tr>
                        </thead>
                            
                        <tbody style="">
                            <tr id="borderTable" style="" v-for="(item2 ,index2) of item1.subdirectoryList" :key="item2.id">
                                <td style=" margin-left:10px;margin-right:10px;">
                                    <div  style="background:white;">
                                        <div class="last-line" style="margin-top:-2px;height:45px; line-height:45px; margin-left:15px;margin-right:15px">
                                            <el-checkbox style="margin-left:0px" @change="checkPermit2(index1,index2,item2.b1)" v-model="item2.b1" ><span>{{item2.resourceName}}</span></el-checkbox>
                                        </div>
                                        
                                    </div>
                                    
                                </td>
                               


                            </tr>
                            </tbody> 
                            <div style="height:30px; background:white;margin-top:-2px">
                                
                            </div>
                        </table>
                        
                    </div>
                </li>
            </ul>
           
           <div style="overflow:hidden; float:right;margin-top:10px">
               <el-button @click="cancelPermit"  style="float:right">取消</el-button> <el-button type="primary" style="float:right;margin-right:20px" @click="submitForm()">提交</el-button>
           </div>
            

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
            tagList:[],
            permitList:[],//弹窗权限头部list
            dialogVisible:false,

            // isIndeterminate:false,
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
              
            
        },
/****************************************************弹窗内的所有操作start*******************************************************************************/        
        // 角色资源授权弹窗出现
        rootShow(index,rows){
            this.dialogVisible=true
            this.changeId=rows[index].id
            console.log("=-=-=--=-=-=-=-",rows[index].id)
            postRequest(url.roleResourceGetResourceByRoleId, {
                roleId:rows[index].id
            }).then(data=> {
            // console.log("查询角色资源权限",JSON.parse(JSON.stringify(data.data.data)))
            this.tagList=JSON.parse(JSON.stringify(data.data.data));   
            this.permitList=data.data.data
            
                     
            });   
        },

        // checkbox1的change事件
        checkPermit1(index,b1){
            // alert(index)
            if(b1){
                
                for(let i=0; i<this.permitList[index].subdirectoryList.length;i++){
                    
                    this.permitList[index].subdirectoryList[i].b1=true
                    // this.isIndeterminate=false
                    
                    
                }
                
            }else{
                
                for(let i=0; i<this.permitList[index].subdirectoryList.length;i++){
                    
                    this.permitList[index].subdirectoryList[i].b1=false
                    // this.isIndeterminate=false
                    
                    
                }
            }
        },
        checkPermit2(index1,index2,b1){

            let chooseIdS=[]
            for(let i=0; i<this.permitList[index1].subdirectoryList.length;i++){
                if(this.permitList[index1].subdirectoryList[i].b1==true){
                    chooseIdS.push(this.permitList[index1].subdirectoryList[i].id)
                }
            }
            console.log("chooseIdS",this.permitList[index1].subdirectoryList.length)
            if(chooseIdS.length==0){
                this.permitList[index1].b1=false
            }else{
                this.permitList[index1].b1=true
            }
            // return
            // if(chooseIdS.length==this.permitList[index1].subdirectoryList.length){
            //     this.permitList[index1].b1=true
            // }else{
            //     this.permitList[index1].b1=false
            // }

            // if(chooseIdS.length<this.permitList[index1].subdirectoryList.length && chooseIdS.length>0){
            //     this.isIndeterminate=true
            // }else{
            //     this.isIndeterminate=false
            // }
        },

        // 取消授权
        cancelPermit(){
            this.dialogVisible=false
        },

        //  提交  添加父级菜单
        submitForm(formName) {
            let deletListF=[];
            let uptListF=[];
            console.log("tagList",this.tagList)
            console.log("permitList",this.permitList)
            // return
            for(let i=0;i<this.tagList.length;i++){
                for(let j=0;j<this.tagList[i].subdirectoryList.length;j++){
                    if(this.tagList[i].subdirectoryList[j].b1!=this.permitList[i].subdirectoryList[j].b1){
                        if(this.tagList[i].subdirectoryList[j].b1){
                            deletListF.push(this.tagList[i].subdirectoryList[j].id)
                            
                        }
                        if(!this.tagList[i].subdirectoryList[j].b1){
                            uptListF.push(this.tagList[i].subdirectoryList[j].id)
                            
                        }
                    
                    }
                }

                if(this.tagList[i].b1!=this.permitList[i].b1){
                    if(this.tagList[i].b1){
                        deletListF.push(this.tagList[i].id)
                        
                    }
                    if(!this.tagList[i].b1){
                        uptListF.push(this.tagList[i].id)
                        
                    }
                    
                }
            }

            console.log("当前操作的添加动作的Id",uptListF)
            console.log("当前操作的删除动作的Id",deletListF)

            if(uptListF!=""){
            //添加的接口 
            postRequest(url.roleResourceAddRoleResource, {
                   roleId:this.changeId,
                   resourceIdStr:uptListF,
                }).then(data=> {
                    this.dialogVisible=false    
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
            
        if(deletListF!=""){
            // return
            //删除的接口 
            postRequest(url.roleResourceDelRoleResource, {
                   roleId:this.changeId,
                   resourceIdStr:deletListF,
                }).then(data=> {
                    this.dialogVisible=false 
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


/****************************************************弹窗内的所有操作over*******************************************************************************/  

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
            postRequest(url.roleGetRoleList, pamas).then(data=> {

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
        checkIdData(){
            let chooseId=[]
            for(let i=0; i<this.permitList.length;i++){
                if(this.rootList[i].b1==true){
                    chooseId.push(this.permitList[i].id)
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
ul li{
    list-style:none;
    border-top: 1px solid #999999;
}
.last-line{
    border-bottom: 1px solid #cccccc;
    
}
#borderTable>td>.last-line:last-child{
    padding-bottom: 20px
}
</style>

