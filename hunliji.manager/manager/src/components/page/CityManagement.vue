<template>
    <div class="userMessage  content">

    <!-- 搜索栏 -->
        <div class="top-search"  style="text-align: center; overflow:hidden;margin-top:20px;margin-right:2%">


            <el-select v-model="cityV" placeholder="请选择省/直辖市" style="float:right;" @change="changeSelct"
            filterable
            allow-create>
                
                <el-option
                style="border:none;margin-right:2%"
                v-for="item in selectList"
                :key="item.id"
                :label="item.provinceName"
                :value="item.id">
                </el-option>
            </el-select>
            
        </div>



        

        <el-table
            ref="multipleTable"
            :data="tableList"
            tooltip-effect="dark"
            style="width: 96%;margin:0 auto;margin-top:10px"
            border
            :header-cell-style="{background:'#EEF1F6'}"
            size="small"
            @selection-change="handleSelectionChange">

           <el-table-column
            type="index"
            >
            </el-table-column>


            <el-table-column
            prop="cityName"
            label="城市名"
            show-overflow-tooltip>
            </el-table-column>


            <el-table-column
            fixed="right"
            label="操作"
           >
            <template slot-scope="scope">
                <el-button
                @click.native.prevent="lockStatus(scope.$index, tableList)"
                type="primary"
                size="small">
                 {{scope.row.cityStatus==1? "关闭":"开启"}}
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
            cityV:"",
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

        lockStatus(index, rows){
            postRequest(url.cityUpdCity, {
                id:rows[index].id,
                cityStatus: rows[index].cityStatus==1 ? "0" :"1"
            } ).then(data=> {
                
                this.$confirm('是否修改状态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.dialogVisible=false
                    this.initSelectAll({provinceId:this.cityV})   
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
                
            })
        },

        changeSelct(){
            this.initSelectAll({provinceId:this.cityV})
        },
// f分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.initSelectAll({pageNum:val})
      },

    
         goSearch(){//搜索
                 

            },

         selectId(){
            postRequest(url.provinceGetProvinceList, {}).then(data=> {
                console.log("select的数据11111111",data.data.data)
                this.selectList=data.data.data
                        
            });     
         },
         initSelectAll(pamas){
            postRequest(url.cityGetCityList,pamas ).then(data=> {

                        console.log("查询所有城市",data)
                        let datas=data.data.data;
                        this.tableList=datas
                        this.total= datas.total        
                        this.navigatepageNums=datas.navigatepageNums      
                        this.currentPage=datas.pageNum 
                        
            });     
         }   
    },
    computed:{

    },
    created(){
            this.initSelectAll({provinceId:this.cityV})
            this.selectId()
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

