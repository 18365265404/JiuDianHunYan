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
            width="40%"
            @close="closeDialog"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
            <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">

            

            <el-form-item             
            prop="nickName"
            >
                <el-input type="text"  placeholder="请输入用户昵称" v-model.number="ruleForm.nickName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            

                 
            </el-form>

            <form action="" enctype="multipart/form-data"  method="post" >
                       
                        <el-button
                        type="success"
                        size="small">
                         <input type="file" name="multipartFile[]" multiple="multiple"  @change="add_img($event)" class="imgUp-input" style="opacity" /><p style="position:absolute;left:0;top:0">请选择图片</p>
                        </el-button>
                        <button type="button" id="myForm" class="btn btn-success" @click="upimgSub()" >上传图片

                        </button>
                        <ul class="imgList">
                            <li v-for="urls in showImgList" >
                                <img :src="urls|getImgUrl" alt="">  
                                <button type="button" id="myForm" class="btn btn-success" @click="deletImg(urls)" >删除图片</button>
                            </li>
                        </ul>
                        
                    </form>
        
            <el-upload
                class="avatar-uploader"
                action="http://192.168.1.45:8080/hotels/addHotels"
                name="multipartFile"
                :show-file-list="false"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-dialog>  
    </div>
</template>

<script>

import url from '../../utils/url';
import {getCookie} from '../../utils/utils';
import {postRequest,uploadFileRequest} from '../../utils/api';
export default {
    data(){

        var validatenickName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('昵称不能为空'));
            }else{
                callback();
            }

        };
        return {

            showImgList:[],//要上传的图片集合
            imageUrl:"",
            tableList:[],

            formInline:{
                cityV:""
            },

            ruleForm:{
                nickName:"",
            },

            rules: {

                nickName: [
                    { validator: validatenickName, trigger: 'blur' }
                ],


            },

            dialogVisible:"",
            search:"",
            currentPage: 1,
            navigatepageNums:[],
            cityList:[],
            total:1,
        }
    },
    methods:{

        //添加图片 
        // changeImg(){
            
        // },
            deletImg(urls){
                let deletIndex=""
                for(let i=0;i<this.showImgList.length;i++){
                    if(this.showImgList[i]==urls){
                        deletIndex=i
                        
                    }
                       
                }

                this.showImgList.splice(deletIndex,1) 
                console.log("this.showImgList",this.showImgList)
            },

            upimgSub(){
            let formData = new FormData(); 
            formData.append('multipartFile',this.showImgList);
            formData.append('userId',localStorage.getItem('ms_userId'));
            formData.append('cityId',this.formInline.cityV);
            this.formUp=formData

            
            uploadFileRequest(url.hotelsAddHotels, formData).then(data=> {


                console.log("图片上传结果",data)
                        
            });     


            },
            add_img(event){  
            let filslist=event.target.files
            this.file = event.target.files[0];
            var objUrl = getObjectURL(event.target.files[0]) ;
            this.myImg=objUrl
            console.log("this.file",event.target.files)
            for(let i=0;i<filslist.length;i++){
                this.showImgList.push(filslist[i])        
            }
            console.log("this.showImgList",this.showImgList)

            function getObjectURL(file) {
                var url = null ;
                if (window.createObjectURL!=undefined) 
                { // basic
                url = window.createObjectURL(file) ;
                }
                else if (window.URL!=undefined) 
                {
                // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
                } 
                else if (window.webkitURL!=undefined) {
                // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            }
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

.imgUp-input input {
    background: #66b1FF
}
.imgList li{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between
}
.imgList li img{
    height: 50px;
    width: 100px;
}
</style>

