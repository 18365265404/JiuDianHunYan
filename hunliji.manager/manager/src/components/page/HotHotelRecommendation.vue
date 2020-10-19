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
        <div  class="button-add" style="width:96%; margin:auto;overflow:hidden;display:none">
            <el-button  style=" margin-right:5%;margin-bottom:20px;display:none" type="primary"  @click="deletMost()">批量删除</el-button>  

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
            prop="hotelsName"
            label="酒店名称"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="hotelsPrice"
            label="酒店价格"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="hotelsType"
            label="酒店类型"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="hotelsArea"
            label="酒店区域"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="tableNumber"
            label="桌数"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="hotelsAddress"
            label="酒店地址"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="hallNum"
            label="厅数"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="menuNum"
            label="菜单数"
            show-overflow-tooltip>
            </el-table-column>


            <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="topPopularTime"
            label="上热门时间"
            show-overflow-tooltip>
            </el-table-column>
            

            <el-table-column
            prop="sort"
            label="排序"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
            width="100"
           >
            <template slot-scope="scope">
                <el-button
                :disabled="scope.row.status"
                @click.native.prevent="upSort(scope.$index, tableList)"
                type="primary"
                size="small">
                修改排序
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
            <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">

            <el-form-item             
            prop="sort"
            >
                <el-input type="text"  placeholder="请输入轮播图排序" v-model.number="ruleForm.sort" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            </el-form>
            <div style="display:flex;margin-top:20px">
                <el-button style="margin-left:0;width:100%;" slot="trigger" size="small" type="primary" @click="subSort">提交</el-button>
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

        // 表单验证
        var validateuserSort = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('输入不能为空'));
        }else{
          callback();
        }

        };
        return {
            radio:"",
            submitTag:"add",
            upfileList:[],
            file:"",
            QINIU:url.qiniuH,
            tableList:[],

            formInline:{
                cityV:""
            },
            ruleForm:{
                sort:"",
            },
            rules: {
                    sort: [
                        { validator: validateuserSort, trigger: 'blur' }
                    ],
            },


            dialogVisible:false,
            search:"",
            currentPage: 1,
            navigatepageNums:[],
            cityList:[],
            total:1,
            changeId:"",//中间变化的ID
            changeIndex:"",
        }
    },
    methods:{
        //审核窗口打开
        upSort(index,rows){
            this.dialogVisible=true
            this.changeIndex=index;
            this.ruleForm.sort=rows[index].sort
        },
        //提交
        subSort(){


            postRequest(url.hotHotelsUpdHotHotels, {
                id:this.tableList[this.changeIndex].id,
                sort:this.ruleForm.sort,

            }).then(data=> {
                this.dialogVisible=false;
                this.radio=""
                this.initData(this.tableData);
                this.initData(this.tableData) //查询所有  
                    this.$message({
                        type: 'success',
                        message: '提交成功'
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
            postRequest(url.hotHotelsGetHotHotelsList, pamas).then(data=> {


                console.log("初始化数据",data)
                let datas=data.data.data;
                this.tableList=datas.list
                this.total= datas.total        
                this.navigatepageNums=datas.navigatepageNums      
                this.currentPage=datas.pageNum 
               
            });     
        },
        initCitySelct(){
            postRequest(url.cityGetCityListByOpen, {}).then(data=> {


                console.log("初始化城市select",data)
                this.cityList=data.data.data
                let allcityO={id:"",cityName:"全部城市"}
                this.cityList.unshift(allcityO)
                console.log("初始化城市select2",this.cityList)        
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
                "cityId":this.formInline.cityV
            }
        },
    },

    created(){

    this.initData({

        cityId:"",
        likeName:"",
        pageNum:this.currentPage,
    })
    this.initCitySelct()
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

