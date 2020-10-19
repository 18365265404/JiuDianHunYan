<template>
    <div>

        <!-- 搜索栏 -->
        <div class="top-search" style="display:none; text-align: center">
            <el-input style="margin: 40px auto; margin-bottom:10px; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 查询城市 -->
        <div style="overflow:hidden;display:none;">
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
            <el-button  style=" opacity:0; margin-right:5%;margin-bottom:20px" type="primary" >批量删除</el-button>  
            <el-button v-show="tableList.length>=2 ? false:true"  style=" margin-right:2%;margin-bottom:20px" type="primary"  @click="addMost()">新增</el-button>  
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
            prop="url"
            label="显示图片"
            width="110px"
            show-overflow-tooltip>
                <template    slot-scope="scope">            
                    <div title="点击显示大图" >
                        <img :src="QINIU+scope.row.url"    style="width:60px; height:20px" />
                        <el-popover
                        placement="right"
                        trigger="click"
                        >
                            <img :src="QINIU+scope.row.url"    style="max-height:400px" />
                            <i slot="reference"  class="el-icon-view" style="font-size:16px"></i>
                        </el-popover>
                    </div>
                </template>  

            </el-table-column>

            <el-table-column
            prop="link"
            label="轮播图链接"
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
            width="300px"
           >
            <template slot-scope="scope">



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
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>


            <!-- 弹窗 -->
            <el-dialog
            title="上传"
            :visible.sync="dialogVisible"
            width="60%"
            @close="closeDialog"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
            <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">

            

            <el-form-item             
            prop="link"
            >
                <el-input type="text"  placeholder="请输入轮播图链接" v-model.number="ruleForm.link" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            
            <el-form-item    
            prop="sort"
            >
                <el-input type="text"  placeholder="请输入广告排序" v-model.number="ruleForm.sort" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>


            </el-form>

            <el-upload
            ref="upload"
            name="file"
            :limit="submitTag=='add'? 3 : 1"
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
                 <p style="line-height:40px;margin-left:30px">建议图片大小， 第一张：240*300 ，第二张：330*300</p>
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
        var validatenickSort = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('输入框不能为空'));
            }else{
                callback();
            }

        };
        
        return {
            submitTag:"add",
            upfileList:[],
            file:"",
            QINIU:url.qiniuH,
            tableList:[],

            formInline:{
                cityV:""
            },

            ruleForm:{
                link:"",
                sort:"",

            },

            rules: {

                link: [
                    { validator: validatenickPublic, trigger: 'blur' }
                ],
                sort: [
                    { validator: validatenickSort, trigger: 'blur' }
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
        // 新增酒店
        
        addMost(){
            this.dialogVisible=true;
            this.upfileList=[]
            this.submitTag="add"
        },
        //提交
        subPicForm(){
            

            this.$refs["ruleForm"].validate((valid) => {
                
                if (valid) {

                    this.formDate = new FormData()
                    this.$refs.upload.submit();


                    



                    let curentUrl=""
                    if(this.submitTag=="add"){
                        curentUrl=url.homepageAdsAddHomepageAds

                    }
                    if(this.submitTag=="change"){
                        console.log("change", this.tableList[this.changeIndex].id,this.tableList[this.changeIndex].url)
                        curentUrl=url.bannerUpdBanner
                        this.formDate.append('id', this.tableList[this.changeIndex].id);

                        if(url.qiniuH+this.tableList[this.changeIndex].url!=this.$refs.upload.uploadFiles[0].url){
                            this.formDate.append('key', this.tableList[this.changeIndex].url);
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
                    // console.log("修改的Id和key",this.tableList[this.changeIndex].id,this.tableList[this.changeIndex].hotelsUrl)
                    // return
                    // 上传图片携带的参数

                    
                    this.formDate.append('link', this.ruleForm.link);
                    this.formDate.append('sort', this.ruleForm.sort);
                    


                    uploadFileRequest(curentUrl,this.formDate).then(data=> {
                        this.upfileList=[]
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


        //弹窗出现 修改
        changeRow(index, rows){

            this.dialogVisible=true;
            this.submitTag="change"
            this.changeId=rows[index].id;
            this.changeIndex=index;

            this.$nextTick(() => {
            this.ruleForm={
                link : rows[index].link,
                sort : rows[index].sort,
              

            }
            });
            
            
            this.upfileList=[{url:url.qiniuH+rows[index].url}]

        },
        // 单删除
        deleteRow(index, rows) {

           
        console.log("deleteRow",rows[index].id,rows[index].url)
        this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                postRequest(url.homepageAdsDelHomepageAds, {
                    id:rows[index].id,
                    key:rows[index].url,
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

        // 批量删除
        deletMost(){
            console.log("查看表单内的选中的条数",this.multipleSelection)
            let arrId=[];
            let arrPictures=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                arrId.push(this.multipleSelection[i].id)
                arrPictures.push(this.multipleSelection[i].url)

            }




            if(arrId.length==0){
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
                    postRequest(url.bannerDelBanner, {
                        ids:arrId,
                        keys:arrPictures,
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
            postRequest(url.homepageAdsSelHomepageAds, pamas).then(data=> {


                console.log("初始化数据",data)
                let datas=data.data.data;
                this.tableList=datas
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
           this.initData({
               "pageNum":val,
                "userId":localStorage.getItem('ms_userId'),
                "likeName":this.search,
                "cityId":this.formInline.cityV
           }) //查询所有   
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
    width: 93%;
    margin-left: 3%
}
.demo-ruleForm .el-form-item:nth-child(2n){
    
}
</style>

