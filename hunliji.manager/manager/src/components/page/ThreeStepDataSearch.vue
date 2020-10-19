<template>
    <div class="userMessage  content">

    <!-- 搜索栏 -->
        <div class="top-search"  style="text-align: center; display:none">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    <!-- 批量删除 -->
        <div  class="button-add" style=" display:flex; opacity:0;  justify-content: space-between; overflow: hidden; margin-top:20px; margin-left:2%;">
         <el-button  style=" margin-right:5%;margin-bottom:20px" type="primary"  @click="deletMost()">批量删除</el-button>  
        <el-button  style=" margin-right:2%;margin-bottom:20px; opacity:0" type="primary"  >新增</el-button>  
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
            prop="phone"
            label="手机号码"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="cityName"
            label="城市名"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="regionName"
            label="具体地址"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="priceRange"
            label="价格区间"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="status"
            label="状态"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="submitTime"
            label="提交时间"
            show-overflow-tooltip>
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

            currentPage: 1,
            navigatepageNums:[],
            selectRoleList:[],
            changeId:"",
            total:1,


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
        this.$refs['ruleForm'].resetFields();
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

    initSelectAll(pamas){
    postRequest(url.consultationDataGetConsultationDataList, pamas).then(data=> {


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
