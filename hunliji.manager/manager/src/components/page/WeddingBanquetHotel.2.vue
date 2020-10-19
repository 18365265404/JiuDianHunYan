<template>
    <div>

        <!-- 搜索栏 -->
        <div class="top-search" style="display:block; text-align: center">
            <el-input style="margin: 40px auto; margin-bottom:10px; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 查询城市 -->
        <div style="overflow:hidden">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" style="float:right;margin-right:0.5%">

            <el-form-item class="formCity" label="城市选择：" prop="cityV" >
                <el-select
                v-model="formInline.cityV"
                @change="goSearch()"
                filterable
                allow-create
                
                placeholder="请选择文章标签">
                    <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.provinceName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>
        
        </div>
        

        <!-- 批量删除 -->
        <div  class="button-add" style=" display:flex;  justify-content: space-between; overflow: hidden; margin-top:20px; margin-left:2%;">
            <el-button  style=" margin-right:5%;margin-bottom:20px" type="primary"  @click="deletMost()">批量删除</el-button>  
            <el-button  style=" margin-right:2%;margin-bottom:20px" type="primary"  @click="addMost()">新增</el-button>  
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
            type="selection"
           >
            </el-table-column>
           <el-table-column
            type="index"
            >
            </el-table-column>

           


            <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip>
            </el-table-column>
            
            <el-table-column
            prop="hallNum"
            label="厅数量"
            show-overflow-tooltip>
            </el-table-column>
            
            <el-table-column
            prop="hotelsAddress"
            label="酒店地址"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="hotelsArea"
            label="酒店面积"
            show-overflow-tooltip>
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
            prop="hotelsUrl"
            label="酒店链接"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="menuNum"
            label="菜品数量"
            show-overflow-tooltip>
            </el-table-column>


            <el-table-column
            prop="tableNumber"
            label="桌数"
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
            title="传图片"
            :visible.sync="dialogVisible"
            width="60%"
            @close="closeDialog"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
            <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">

            

            <el-form-item             
            prop="hallNum"
            >
                <el-input type="text"  placeholder="请输入厅数量" v-model.number="ruleForm.hallNum" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            
            <el-form-item             
            prop="hotelsAddress"
            >
                <el-input type="text"  placeholder="请输入酒店地址" v-model.number="ruleForm.hotelsAddress" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="hotelsArea"
            >
                <el-input type="text"  placeholder="请输入酒店面积" v-model.number="ruleForm.hotelsArea" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="hotelsName"
            >
                <el-input type="text"  placeholder="请输入酒店名称" v-model.number="ruleForm.hotelsName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="hotelsPrice"
            >
                <el-input type="text"  placeholder="请输入酒店价格" v-model.number="ruleForm.hotelsPrice" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="hotelsType"
            >
                <el-input type="text"  placeholder="请输入酒店类型" v-model.number="ruleForm.hotelsType" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>



            <el-form-item             
            prop="menuNum"
            >
                <el-input type="text"  placeholder="请输入菜品数量" v-model.number="ruleForm.menuNum" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="tableNumber"
            >
                <el-input type="text"  placeholder="请输入桌数" v-model.number="ruleForm.tableNumber" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            </el-form>

            <el-upload
            ref="upload"
            name="file"
            :limit="1"
            multiple
            class="avatar-uploader"
            action=""
            :show-file-list="true"
            :file-list="upfileList"
            :auto-upload="false"
            list-type="picture"
            :http-request="uploadFile"
            style="padding-bottom:20px;margin-left:3%;">
            <div style="wi">
                 <el-button slot="trigger" size="small" type="primary" style="">选取图片</el-button>
                 
            </div>
               
                
            </el-upload>
            <div style="display:flex;margin-left:3%">
                <el-button style="margin-left:0;width:100%;margin-right:4%" slot="trigger" size="small" type="primary" @click="subPicForm">提交</el-button>
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

        var validatenickPublic = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('输入框不能为空'));
            }else{
                callback();
            }

        };
        return {
            upfileList:[],
            file:"",

            tableList:[],

            formInline:{
                cityV:""
            },

            ruleForm:{
                hallNum:"",
                hotelsAddress:"",
                hotelsArea:"",
                hotelsName:"",
                hotelsPrice:"",
                hotelsType:"",
                menuNum:"",
                tableNumber:"",
            },

            rules: {

                hallNum: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                hotelsAddress: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                hotelsArea: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                hotelsName: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                hotelsPrice: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                hotelsType: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                menuNum: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                tableNumber: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],


            },

            dialogVisible:false,
            search:"",
            currentPage: 1,
            navigatepageNums:[],
            cityList:[],
            total:1,
        }
    },
    methods:{
        // 新增酒店
        addMost(){
            this.dialogVisible=true
        },
        //提交
        subPicForm(){
            this.$refs["ruleForm"].validate((valid) => {
                console.log("this.ruleForm",this.ruleForm)
                if (valid) {

                    this.formDate = new FormData()
                    this.$refs.upload.submit();

                    // 上传图片携带的参数

                    this.formDate.append('userId', localStorage.getItem('ms_userId'));
                    this.formDate.append('cityId', this.formInline.cityV);
                    this.formDate.append('hotelsName', this.ruleForm.hotelsName);
                    this.formDate.append('hotelsType', this.ruleForm.hotelsType);
                    this.formDate.append('tableNumber', this.ruleForm.tableNumber);
                    this.formDate.append('hotelsPrice', this.ruleForm.hotelsPrice);
                    this.formDate.append('hotelsArea', this.ruleForm.hotelsArea);;
                    this.formDate.append('hallNum', this.ruleForm.hallNum);
                    this.formDate.append('menuNum', this.ruleForm.menuNum);
                    this.formDate.append('hotelsAddress', this.ruleForm.hotelsAddress);


                    uploadFileRequest(url.resourceAddResource,this.formDate).then(data=> {
                        console.log("上传的成功返归",data)
                        this.$refs['ruleForm'].resetFields();
                        this.dialogVisible=false
                        this.initData(this.tableData) //查询所有                    

                    })
                
                } else {

                    return false;
            }
            });


        },
        uploadFile(file){
            this.formDate.append('file', file.file);
        },

        // 点击弹窗的叉号
        closeDialog(){
        this.$refs['ruleForm'].resetFields();
        },

        goSearch(){

            console.log("this.tableData",this.tableData)
            this.initCitySelct(this.tableData)
            
        },

        initData(pamas){
            postRequest(url.hotelsGetHotelsList, pamas).then(data=> {


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
                let allcityO={id:"",provinceName:"全部城市"}
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
                "userId":localStorage.getItem('ms_userId'),
                "likeName":this.search,
                "cityId":this.formInline.cityV
            }
        },
    },

    created(){

    this.initData({
        userId:localStorage.getItem('ms_userId'),
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
    width: 45%;
    margin-left: 3%
}
.demo-ruleForm .el-form-item:nth-child(2n){
    
}
</style>

