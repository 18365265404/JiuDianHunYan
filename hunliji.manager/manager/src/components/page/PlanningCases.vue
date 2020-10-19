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
            type="index"
            >
            </el-table-column>

           



            
            <el-table-column
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
            prop="caseName"
            label="案例名"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="nickName"
            label="商户名"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
            width="120"
           >

           
            <template slot-scope="scope">

                <el-button
                style="display:block;margin:2px 10px;height:25px;line-height:8px "
                @click.native.prevent="deleteRow(scope.$index, tableList,1)"
                type="danger"
                size="small">
                删除
                </el-button>
                        
                <el-button
                style="display:block;margin:2px 10px;height:25px;line-height:8px "
                @click.native.prevent="changeRow(scope.$index, tableList,1)"
                type="success"
                size="small">
                修改
                </el-button>

                <el-button
                style="display:block;margin:2px 10px;height:25px;line-height:8px "
                @click.native.prevent="lookDetail(scope.$index, tableList)"
                type="success"
                size="small">
                 查看详情
                </el-button>

                
                <el-button
                style="display:block;margin:2px 10px;height:25px;line-height:8px "
                :disabled="scope.row.status"
                        
                @click.native.prevent="AddHotRow(scope.$index, tableList)"
                type="primary"
                size="small">
                    {{scope.row.statusName}}
                </el-button>


            </template>
            </el-table-column>


        </el-table>

        <!-- 分页 -->
          <div class="block" style="overflow:hidden;display:block">

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
            prop="caseName"
            >
                <el-input type="text"  placeholder="请输入案例名称" v-model.number="ruleForm.caseName" autocomplete="off">
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
            style="padding-bottom:20px;margin-left:3%;margin-right:4%">
            <div style="display:flex">
                 <el-button slot="trigger" size="small" type="primary" style="">选取图片</el-button>
                 <p style="line-height:40px;margin-left:30px">建议图片大小：640*405</p>
            </div>
               
            </el-upload>
            
            <div style="display:flex;margin-top:20px">
                <el-button style="margin-left:0;width:100%;" slot="trigger" size="small" type="primary" @click="subPicForm">提交</el-button>
            </div>
        
        </el-dialog>  


        <!-- 弹窗2 -->
            <el-dialog
            title="选择详情"
            :visible.sync="dialogVisible2"
            width="60%"

            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
                <el-upload
                ref="upload2"
                name="file"
                :limit="3"
                multiple
                class="avatar-uploader"
                action=""
                :show-file-list="true"
                :file-list="upfileList2"
                :auto-upload="false"
                list-type="picture"
                :http-request="uploadFile"
                style="padding-bottom:20px;margin-left:3%;margin-right:4%">

                <div style="display:flex">
                 <el-button slot="trigger" size="small" type="primary" style="">选取图片</el-button>
                 <p style="line-height:40px;margin-left:30px">建议图片大小：640*405</p>
                 <span style="line-height:40px;margin-left:30px"> {{submitTag=="add" ? "当前为添加图片":"当前为修改图片"}}</span>
                </div>
               
               
                
            </el-upload>
            
            <div style="display:flex;margin-left:3%">
                <el-button   style="margin-left:0;width:100%;margin-right:3%" slot="trigger" size="small" type="primary" @click="subDetail">提交</el-button>
            </div>

            <div style="width:94%; margin:20px auto">
                <el-button   style="margin-left:0;margin-right:3%" slot="trigger" size="small" type="primary" @click="deletAll2()">
                    批量删除
                </el-button>

                
                <el-table

                    :data="tableList2"
                    tooltip-effect="dark"
                    style="margin-right:50px"
                    border
                    :header-cell-style="{background:'#EEF1F6'}"
                    size="small"
                    @selection-change="handleSelectionChange">

                    <el-table-column
                    type="selection"

                    :key='Math.random()'
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
                    style="position:relative"
                    prop="pictureUrl"
                    label="显示图片"

                    show-overflow-tooltip>
                        <template    slot-scope="scope">            
                            <div title="点击显示大图"  >
                                <img :src="QINIU+scope.row.pictureUrl"    style="width:60px; height:20px" />
                                <el-popover
                                placement="right"
                                trigger="click"
                                >
                                    <img :src="QINIU+scope.row.pictureUrl"    style="max-height:400px" />
                                    <i slot="reference"  class="el-icon-view" style="font-size:16px"></i>
                                </el-popover>
                            </div>
                        </template>  

                    </el-table-column>



                    






                    <el-table-column
                    fixed="right"
                    label="操作"

                    >
                    <template slot-scope="scope">



                        <el-button
                        @click.native.prevent="deleteRow2(scope.$index, tableList2)"
                        type="danger"
                        size="small">
                        删除
                        </el-button>
                        

                        <el-button
                        @click.native.prevent="changeRow2(scope.$index, tableList2,3)"
                        type="success"
                        size="small">
                        修改
                        </el-button>

                    </template>
                    </el-table-column>

                    </el-table>
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
        var validateuserCaseName = (rule, value, callback) => {
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
            upfileList2:[],
            file:"",
            QINIU:url.qiniuH,
            tableList:[],
            tableList2:[],

            formInline:{
                cityV:""
            },
            ruleForm:{
                caseName:"",
            },
            rules: {
                    sort: [
                        { validator: validateuserCaseName, trigger: 'blur' }
                    ],
            },


            dialogVisible:false,
            dialogVisible2:false,
            search:"",
            currentPage: 1,
            navigatepageNums:[],
            cityList:[],
            total:1,
            changeId:"",//中间变化的ID
            changeIndex:"",
            changeIndex2:"",
        }
    },
    methods:{


        // 申请上热门
        AddHotRow(index, rows){
            rows[index].auditStatus=false
            console.log("iioioioiio",rows[index].auditStatus)
            this.$confirm('是否修改状态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                postRequest(url.auditAddAudit, {
                    otherId:rows[index].id,
                    type: '1'
                } ).then(data=> {
                    console.log("修改状态返回的数据",data)

                    this.dialogVisible=false
                    this.initData(this.tableData) //查询所有    
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
        // 弹窗表格删除
        deleteRow2(index, rows) {
        
        console.log("1111",rows[index].id)

        this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {

                    postRequest(url.casePictureDelCasePicture, {
                        ids:rows[index].id,
                        keys:rows[index].pictureUrl,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)

                         this.initData2() //查询所有    
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

                // 批量删除表格3
        deletAll2(){
            console.log('this.multipleSelection',this.multipleSelection)
        
            if(this.multipleSelection==undefined || this.multipleSelection.length==""){
                this.$message({
                    type: 'success',
                    message: '请选择后删除'
                });
                return
            }
            let chooseStrId="";
            let chooseStrPictures=""
            for(let i=0;i<this.multipleSelection.length;i++){

                chooseStrId+=this.multipleSelection[i].id+","
                chooseStrPictures+=this.multipleSelection[i].pictureUrl+","

            }
            chooseStrId = chooseStrId.substr(0, chooseStrId.length - 1);
            chooseStrPictures = chooseStrPictures.substr(0, chooseStrPictures.length - 1);
           
            
            
            this.$confirm('是否删除?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    postRequest(url.casePictureDelCasePicture, {
                        ids:chooseStrId,
                        keys:chooseStrPictures,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)

                        this.initData2() //查询所有    
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


        // 弹窗的表格修改
        changeRow2(index,rows){
            this.submitTag="change"
            this.changeIndex2=index
            this.upfileList2=[{url:url.qiniuH+rows[index].pictureUrl}]   
            
        },
        // 详情提交
        subDetail(){
            this.formDate = new FormData()
            this.$refs.upload2.submit();
            let curentUrl=""
            if(this.submitTag=="add"){
                        
                curentUrl=url.casePictureAddCasePicture
                this.formDate.append('planCaseId', this.tableList[this.changeIndex].id)

            }
            if(this.submitTag=="change"){

                curentUrl=url.casePictureUpdCasePicture
                this.formDate.append('id', this.tableList2[this.changeIndex2].id);

            if(url.qiniuH+this.tableList2[this.changeIndex2].pictureUrl!=this.$refs.upload2.uploadFiles[0].url){
                this.formDate.append('key', this.tableList2[this.changeIndex2].pictureUrl);
                            
                }else{
                this.formDate.append('key', "");
                }
                        
            }

                    console.log("this.upfileList----------------------------",this.$refs.upload2.uploadFiles)
                    if(this.$refs.upload2.uploadFiles.length==0){
                        this.$message({
                            type: 'success',
                            message: '上传的图片不能为空'
                        }); 
                        return

                    }

                    uploadFileRequest(curentUrl,this.formDate).then(data=> {
                        this.upfileList2=[]
                        console.log("上传的成功返归",data)

                        this.submitTag="add"

                        this.initData2() //查询所有                    

                    })

        },
        // 查看详情
        lookDetail(index,rows){
            this.dialogVisible2=true
            this.changeIndex=index;
            this.initData2()
            this.submitTag="add"

        },

        // 添加案例

        addMost(){
            if (this.$refs["ruleForm"]!==undefined) {
                this.$refs['ruleForm'].resetFields();
            }
            this.dialogVisible=true;
            this.submitTag="add"


        },
        // 修改
        changeRow(index,rows){
            this.dialogVisible=true;
            this.submitTag="change"
            this.changeId=rows[index].id;
            this.changeIndex=index;

            this.$nextTick(() => {
            this.ruleForm={
                caseName : rows[index].caseName,

            }
            });
                
                
            this.upfileList=[{url:url.qiniuH+rows[index].caseUrl}]   
        },
        //提交
        subPicForm(){
           
            // alert(this.ruleForm.caseName)
            
            this.$refs["ruleForm"].validate((valid) => {
                
                if (valid) {
                     

                    this.formDate = new FormData()
                    this.$refs.upload.submit();

                    let curentUrl=""
                    if(this.submitTag=="add"){
                        if(this.formInline.cityV==""){
                            this.$message({
                                type: 'success',
                                message: '新增必须选择具体城市'
                            }); 
                            return
                        }
                        curentUrl=url.planCaseAddPlanCase
                        this.formDate.append('userId', JSON.parse(sessionStorage.getItem('ms_userId')));
                        this.formDate.append('cityId', this.formInline.cityV);
                    }
                    if(this.submitTag=="change"){
                        curentUrl=url.planCaseUpdPlanCase
                        this.formDate.append('id', this.tableList[this.changeIndex].id);

                        if(url.qiniuH+this.tableList[this.changeIndex].caseUrl!=this.$refs.upload.uploadFiles[0].url){
                            this.formDate.append('key', this.tableList[this.changeIndex].caseUrl);
                        }else{
                            this.formDate.append('key', "");
                        }
                        
                    }

                   
                    console.log("this.upfileList----------------------------",this.$refs.upload.uploadFiles)
                    if(this.$refs.upload.uploadFiles.length==0){
                        this.$message({
                            type: 'success',
                            message: '上传的图片不能为空'
                        }); 
                        return

                    }

                    this.formDate.append('caseName', this.ruleForm.caseName);

                    uploadFileRequest(curentUrl,this.formDate).then(data=> {
                        this.upfileList=[]
                        console.log("上传的成功返归",data)
                        this.$refs['ruleForm'].resetFields();
                        this.upfileList=[]
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

        deleteRow(index, rows) {
        
        console.log("1111",rows[index].id)

        this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {

                    postRequest(url.planCaseDelPlanCase, {
                        id:rows[index].id,
                        key:rows[index].caseUrl,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)
                         this.dialogVisible=false
                         this.initData(this.tableData) //查询所有    
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


        // 点击弹窗的叉号
        closeDialog(){
            this.$refs['ruleForm'].resetFields();
            this.upfileList=[]
        },

        goSearch(){

            console.log("this.tableData",this.tableData)
            this.initData(this.tableData)
            
        },


        initData(pamas){
            postRequest(url.planCaseGetPlanCaseList, pamas).then(data=> {


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
                            this.tableList[i].status=true
                            this.tableList[i].statusName='审核中'
                            break;
                        case '1':
                            this.tableList[i].status=true
                            this.tableList[i].statusName='已通过'
                            break; 
                        case '2':
                            this.tableList[i].status=true
                            this.tableList[i].statusName='不通过'
                            break;        
                        default:
                            break;
                    }
                    console.log("查询所有的stasus",this.tableList[i].auditStatus)
                }
               
            });     
        },


        initData2(){

            postRequest(url.casePictureGetCasePictureList, {
                casePictureId:this.tableList[this.changeIndex].id,
            }).then(data=> {
                console.log("表单2数据",data)
                this.tableList2=data.data.data

                
                     
                                    
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
            this.initData({
                "pageNum":val,
                "likeName":this.search,
                "cityId":this.formInline.cityV,
                'userId':JSON.parse(sessionStorage.getItem('ms_userId')),
            })
            
        },
    },

    computed:{
        tableData(){
            return {
                "pageNum":this.currentPage,
                "likeName":this.search,
                "cityId":this.formInline.cityV,
                'userId':JSON.parse(sessionStorage.getItem('ms_userId')),
            }
        },
    },

    created(){

        // alert(sessionStorage.getItem('ms_userId'))
    this.initData({

        cityId:"",
        likeName:"",
        userId:JSON.parse(sessionStorage.getItem('ms_userId')),
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

