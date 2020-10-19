<template>
    <div>

        <!-- 搜索栏 -->
        <div class="top-search" style="display:block; text-align: center">
            <el-input style="margin: 40px auto; margin-bottom:10px; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 查询城市 -->
        <div style="width:96%; margin:auto;overflow:hidden;">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" style="float:right;margin-right:-10px">

            <el-form-item class="formCity" label="审核类型：" prop="auditV" >
                <el-select
                v-model="formInline.auditV"
                @change="goSearch()"
                filterable
                allow-create
                
                placeholder="请选择审核类型">
                    <el-option
                    v-for="item in auditList"
                    :key="item.dictionaryValue"
                    :label="item.dictionaryConent"
                    :value="item.dictionaryValue">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="formCity" label="城市选择：" prop="cityV" >
                <el-select
                v-model="formInline.cityV"
                @change="goSearch()"
                filterable
                allow-create
                
                placeholder="请选择城市">
                    <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.cityName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>
        
        </div>
        

        <!-- 批量删除 -->
        <div  class="button-add" style="width:96%; margin:auto;overflow:hidden">
            <el-button  style=" margin-right:5%;margin-bottom:20px;display:none" type="primary"  @click="deletMost()">批量删除</el-button>  
            <el-button  style=" margin-right:0;margin-bottom:20px;float:right;display:none" type="primary"  @click="addMost()">新增</el-button>  
        </div>

            <el-table
            :data="tableList"
            tooltip-effect="dark"
            style="width: 96%;margin:0 auto"
            border
            :header-cell-style="{background:'#EEF1F6'}"
            size="small"
            @selection-change="handleSelectionChange">

           <el-table-column
            type="index"
            >
            </el-table-column>

           




            <el-table-column
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            style="position:relative"
            prop="hotelsUrl"
            label="显示图片"
            width="110px"
            show-overflow-tooltip>
                <template    slot-scope="scope">            
                    <div title="点击显示大图" >
                        <img :src="QINIU+scope.row.hotelsUrl"    style="width:60px; height:20px" />
                        <el-popover
                        placement="right"
                        trigger="click"
                        >
                            <img :src="QINIU+scope.row.hotelsUrl"    style="max-height:400px" />
                            <i slot="reference"  class="el-icon-view" style="font-size:16px"></i>
                        </el-popover>
                    </div>
                </template>  

            </el-table-column>

            <el-table-column
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            prop="hotelsName"
            label="酒店名称"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            prop="hotelsPrice"
            label="酒店价格"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            prop="hotelsType"
            label="酒店类型"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            prop="hotelsArea"
            label="酒店区域"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            prop="tableNumber"
            label="桌数"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            prop="hotelsAddress"
            label="酒店地址"
            show-overflow-tooltip>
            </el-table-column>


            
            <el-table-column
            prop="hallNum"
            label="厅数"
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            show-overflow-tooltip>
            </el-table-column>
            
            

           



            

            


            <el-table-column
            v-if="formInline.auditV=='0'"
            :key='Math.random()'
            prop="menuNum"
            label="菜品数"
            show-overflow-tooltip>
            </el-table-column>


            

            <el-table-column
            v-if="formInline.auditV=='1'"
            :key='Math.random()'
            style="position:relative"
            prop="caseUrl"
            label="显示图片"
            width="110px"
            show-overflow-tooltip>
                <template    slot-scope="scope">            
                    <div title="点击显示大图" >
                        <img :src="QINIU+scope.row.caseUrl"    style="width:60px; height:20px" />
                        <el-popover
                        placement="right"
                        trigger="click"
                        >
                            <img :src="QINIU+scope.row.caseUrl"    style="max-height:400px" />
                            <i slot="reference"  class="el-icon-view" style="font-size:16px"></i>
                        </el-popover>
                    </div>
                </template>  

            </el-table-column>

            <el-table-column
            v-if="formInline.auditV=='1'"
            :key='Math.random()'
            prop="nickName"
            label="用户昵称"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            v-if="formInline.auditV=='1'"
            :key='Math.random()'
            prop="caseName"
            label="案例名"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column

            prop="submitTime"
            label="审核时间"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="statusName"
            label="审核状态"
            show-overflow-tooltip>
            </el-table-column>


            <el-table-column
            fixed="right"
            label="操作"
           >
            <template slot-scope="scope">
                <el-button
                :disabled="scope.row.status"
                @click.native.prevent="audit(scope.$index, tableList)"
                type="primary"
                size="small">
                审核
                </el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
          <div class="block" style="overflow:hidden;display:none">

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
            title="审核"
            :visible.sync="dialogVisible"
            width="40%"
            @close="closeDialog"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
            <div style="display:flex;justify-content: space-between;margin:0 20%">
                <el-radio v-model="radio" label="1">已通过</el-radio>
                <el-radio v-model="radio" label="2">不通过</el-radio>
            </div>
            


            <div style="display:flex;margin-top:20px">
                <el-button style="margin-left:0;width:100%;" slot="trigger" size="small" type="primary" @click="subRadio">提交</el-button>
            </div>
        
        </el-dialog>  
    </div>
</template>

<script>

import url from '../../utils/url';
import {getCookie} from '../../utils/utils';
import {postRequest,uploadFileRequest} from '../../utils/api';
export default {
    data(){

        return {
            radio:"",
            submitTag:"add",
            upfileList:[],
            file:"",
            QINIU:url.qiniuH,
            tableList:[],

            formInline:{
                cityV:"",
                auditV:"",
            },



            dialogVisible:false,
            search:"",
            currentPage: 1,
            navigatepageNums:[],
            cityList:[],
            auditList:[],
            total:1,
            changeId:"",//中间变化的ID
            changeIndex:"",
        }
    },
    methods:{
        //审核窗口打开
        audit(index,rows){
            this.dialogVisible=true
            this.changeIndex=index;
            this.radio=rows[index].auditStatus
        },
        //提交
        subRadio(){
            console.log("radio",this.radio)
            postRequest(url.auditUpdAudit, {
                id:this.tableList[this.changeIndex].auditId,
                otherId:this.tableList[this.changeIndex].otherId,
                auditStatus:this.radio,
                type:this.formInline.auditV,
            }).then(data=> {
                this.dialogVisible=false;
                this.radio=""
                this.initData(this.tableData);
                this.initData(this.tableData) //查询所有  
                    this.$message({
                        type: 'success',
                        message: '修改状态成功'
                    });      
            });   
        },




        // 点击弹窗的叉号
        closeDialog(){

        },

        goSearch(){

            console.log("this.tableData",this.tableData)
            this.initData(this.tableData)
            
        },


        initData(pamas){
            postRequest(url.auditGetAuditList, pamas).then(data=> {


                console.log("初始化数据",data)
                let datas=data.data.data;
                this.tableList=datas.list
                this.total= datas.total        
                this.navigatepageNums=datas.navigatepageNums      
                this.currentPage=datas.pageNum 
                for(let i=0;i<this.tableList.length;i++){
                    switch (this.tableList[i].auditStatus) {
                        case undefined:
                            this.tableList[i].status=false
                            this.tableList[i].statusName='申请上热门'
                            break;
                        case '0':
                            this.tableList[i].status=false
                            this.tableList[i].statusName='待审核'
                            break;
                        case '1':
                            this.tableList[i].status=false
                            this.tableList[i].statusName='已通过'
                            break; 
                        case '2':
                            this.tableList[i].status=false
                            this.tableList[i].statusName='不通过'
                            break;        
                        default:
                            break;
                    }
                    console.log("查询所有的stasus",this.tableList[i].auditStatus)
                }

                switch (this.formInline.auditV) {
                    case '婚宴酒店':
                        
                        break;
                    
                    case '策划案例':
                        
                        break;

                    case '旅拍套餐':
                        
                        break;
                        
                    case '婚纱照':
                        
                        break;    
                
                    default:
                        break;
                }
                        
            });     
        },
        initCitySelct(){
            postRequest(url.cityGetCityListByOpen, {}).then(data=> {


                console.log("初始化城市select",data)
                this.cityList=data.data.data
                let allcityO={id:"",cityName:"全部城市"}
                this.cityList.unshift(allcityO) 
            });     
        },
        // 审核类型
        initAuditSelct(){
            postRequest(url.dictionaryGetAuditType, {}).then(data=> {

                this.formInline.auditV=data.data.data[0].dictionaryValue
                console.log("审核类型select",data)
                this.auditList=data.data.data
                this.initData(this.tableData)
                console.log("this.tableData",this.tableData)
            });     
        },

        // 多选操作改变事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // f分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.initSelectAll({pageNum:val})
        },
    },

    computed:{
        tableData(){
            return {
                "pageNum":this.currentPage,
                "likeName":this.search,
                "cityId":this.formInline.cityV,
                "type":this.formInline.auditV,
                
            }
        },
    },

    created(){

    // this.initData({

    //     cityId:"",
    //     likeName:"",
    //     pageNum:this.currentPage,
    //     auditV:this.formInline.auditV,
    // })
    this.initCitySelct()
    this.initAuditSelct()
    },
}
</script>

<style scoped>
.demo-ruleForm{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.demo-ruleForm .el-form-item{
    width: 93%;
    margin-left: 3%
}
.demo-ruleForm .el-form-item:nth-child(2n){
    
}
</style>

