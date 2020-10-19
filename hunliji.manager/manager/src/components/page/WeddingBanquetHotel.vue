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
        <div  class="button-add" style="width:96%; margin:auto;overflow:hidden">
            <el-button  style=" margin-right:5%;margin-bottom:20px;display:none" type="primary"  @click="deletMost()">批量删除</el-button>  
             
        </div>

        <div>

            <!-- 表格1———————————————————————————————————————————————————————————————————————————————————————————— -->
            <div v-show="showTable1">
                <div style="line-height:60px;text-align: center;">查询所有酒店列表</div>
                <el-button  style=" margin-right:2%;margin-top:-40px;float:right" type="primary"  @click="addMost(1)">新增</el-button> 
                <el-table
                    :data="tableList"
                    tooltip-effect="dark"
                    
                    style="width:96%; margin:0 auto"
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
                    width="90px"
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
                    prop="hotelsAddress"
                    label="酒店地址"
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="tableNumber"
                    label="桌数"
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
                    fixed="right"
                    label="操作"
                    width="150"
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
                        type="warning"
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
                <div class="block" style="overflow:hidden" >

                        <el-pagination
                        style="float:right; margin-right:10%"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes=[10]
                        :page-size="10"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>





            </div>
            <!-- 表格2———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————— -->
            <div v-show="showTable2" style="width:96%; margin:0 auto;">
                <el-button v-show="showDelctAll"  style="float:left;" type="primary"  @click="deletMost()">批量删除</el-button> 
                <div style="line-height:60px;text-align: center;">{{tableName2}}</div>
                <div style="display:flex;justify-content: space-between; width:150px;float:right;margin-right:8px;margin-top:-40px">
                    <el-button  style="" type="primary" v-show="tableName2=='酒店介绍列表'&&tableList2.length>=1 ? false : true"  @click="addMost(2)">新增</el-button> 
                    <el-button  style="" type="primary"  @click="returnFirst">返回上一级</el-button> 
                </div>
               

                <el-table

                    :data="tableList2"
                    tooltip-effect="dark"
                    style=""
                    border
                    :header-cell-style="{background:'#EEF1F6'}"
                    size="small"
                    @selection-change="handleSelectionChange">

                    <el-table-column
                    type="selection"
                    v-if="showDelctAll"
                    :key='Math.random()'
                    >
                    </el-table-column>
                    <el-table-column
                    type="index"
                    >
                    </el-table-column>

                


                    

                    
                    <el-table-column
                    style="position:relative"
                    prop="hallUrl"
                    label="显示图片"
                    v-if="tableName2=='宴会厅列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                        <template    slot-scope="scope">            
                            <div title="点击显示大图"  >
                                <img :src="QINIU+scope.row.hallUrl"    style="width:60px; height:20px" />
                                <el-popover
                                placement="right"
                                trigger="click"
                                >
                                    <img :src="QINIU+scope.row.hallUrl"    style="max-height:400px" />
                                    <i slot="reference"  class="el-icon-view" style="font-size:16px"></i>
                                </el-popover>
                            </div>
                        </template>  

                    </el-table-column>

                    <el-table-column
                    style="position:relative"
                    prop="pictureUrl"
                    label="显示图片"
                    v-if="tableName2=='酒店图片列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                        <template    slot-scope="scope">            
                            <div title="点击显示大图" >
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
                    prop="hallName"
                    label="厅名"
                    v-if="tableName2=='宴会厅列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="floorArea"
                    label="面积"
                    v-if="tableName2=='宴会厅列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="storeyHeight"
                    label="层高"
                    v-if="tableName2=='宴会厅列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="columnNum"
                    label="柱子数"
                    v-if="tableName2=='宴会厅列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="shape"
                    label="形状"
                    v-if="tableName2=='宴会厅列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="tableNum"
                    label="桌数"
                    v-if="tableName2=='宴会厅列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                    </el-table-column>


                    <el-table-column
                    prop="minimumConsumption"
                    label="最低消费"
                    v-if="tableName2=='宴会厅列表'"
                    :key='Math.random()'
                    show-overflow-tooltip>
                    </el-table-column>

                    

                    <el-table-column
                    prop="other"
                    label="其它"
                    v-if="tableName2=='宴会厅列表'"
                    :key='3'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="menuName"
                    label="菜单名"
                    v-if="tableName2=='婚宴菜单列表'"
                    :key='4'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="menuPrice"
                    label="价格"
                    v-if="tableName2=='婚宴菜单列表'"
                    :key='14'
                    show-overflow-tooltip>
                    </el-table-column>


                    <el-table-column
                    prop="menuType"
                    label="菜单类型"
                    v-if="tableName2=='婚宴菜单列表'"
                    :key='5'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="dishNameStr"
                    label="菜名集"
                    v-if="tableName2=='婚宴菜单列表'"
                    :key='6'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="remarks"
                    label="备注"
                    v-if="tableName2=='婚宴菜单列表'"
                    :key='7'
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="content"
                    label="内容"
                    v-if="tableName2=='酒店介绍列表'"
                    :key='8'
                    show-overflow-tooltip>
                    </el-table-column>


                    <el-table-column
                    prop="createTime"
                    label="创建时间"
                    :key='9'
                    show-overflow-tooltip>
                    </el-table-column>


                    <el-table-column
                    fixed="right"
                    label="操作"
                    :key='Math.random()'
                    width="120px"

                >
                    <template slot-scope="scope">



                        <el-button
                        style="display:block;margin:2px 10px;height:25px;line-height:8px "
                        @click.native.prevent="deleteRow(scope.$index, tableList2,2)"
                        type="danger"
                        size="small">
                        删除
                        </el-button>
                        

                        <el-button
                        style="display:block;margin:2px 10px;height:25px;line-height:8px "
                        @click.native.prevent="changeRow(scope.$index, tableList2,2)"
                        type="success"
                        size="small">
                        修改
                        </el-button>

                        <el-button
                        style="display:block;margin:2px 10px;height:25px;line-height:8px "
                        v-show="tableName2=='宴会厅列表'"
                        @click.native.prevent="lookHallDetail(scope.$index, tableList2,2)"
                        type="warning"
                        size="small">
                        宴会厅详情
                        </el-button>
                        





                    </template>
                    </el-table-column>

                    </el-table>
            </div>
            
        </div>
        


            <!-- 弹窗 -->
            <el-dialog
            title="上传"
            :visible.sync="dialogVisible"
            width="60%"
            @close="closeDialog(1)"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
            <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">

            <el-form-item             
            prop="hotelsName"
            >
                <el-input type="text"  placeholder="请输入酒店名称" v-model="ruleForm.hotelsName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="hotelsPrice"
            >
                <el-input type="text"  placeholder="请输入酒店价格（格式：999 或  1-999）" v-model="ruleForm.hotelsPrice" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>


            <el-form-item             
            prop="hotelsType"
            
            >

            <el-select
                v-model="ruleForm.hotelsType"
                style="width:100%"
                filterable
                allow-create
                
                placeholder="请选择酒店类型">
                    <el-option
                    v-for="item in hoteList"
                    :key="item.id"
                    :label="item.hotelName"
                    :value="item.hotelName">
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item             
            prop="hotelsArea"
            >
                <el-input type="text"  placeholder="请输入酒店区域" v-model="ruleForm.hotelsArea" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="hotelsAddress"
            >
                <el-input type="text"  placeholder="请输入酒店地址" v-model="ruleForm.hotelsAddress" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="tableNumber"
            >
                <el-input type="text"  placeholder="请输入桌数" v-model="ruleForm.tableNumber" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="hallNum"
            >
                <el-input type="text"  placeholder="请输入厅数" v-model="ruleForm.hallNum" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="menuNum"
            >
                <el-input type="text"  placeholder="请输入菜单数" v-model="ruleForm.menuNum" autocomplete="off">
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
                 <p style="line-height:40px;margin-left:30px">建议图片大小：380*240</p>
            </div>
               
                
            </el-upload>
            <div style="display:flex;margin-left:3%">
                <el-button   style="margin-left:0;width:100%;margin-right:4%" slot="trigger" size="small" type="primary" @click="subPicForm">提交</el-button>
            </div>
        
            </el-dialog>  

            <!-- 弹窗2 -->
            <el-dialog
            title="选择详情"
            :visible.sync="dialogVisible2"
            width="600px"

            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
            <ul class="detail-list">
                <li @click="showDetailTab2(1)">酒店图片</li>
                <li @click="showDetailTab2(2)">宴会厅</li>
                <li @click="showDetailTab2(3)">婚宴菜单</li>
                <li @click="showDetailTab2(4)">酒店介绍</li>
            </ul>

            </el-dialog>  

            <!-- 弹窗3 -->
            <el-dialog
            title="详情上传"
            :visible.sync="dialogVisible3"
            width="60%"
            @close="closeDialog(2)"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>


            <el-form   :model="ruleForm2" :rules="rules"   ref="ruleForm2"  size='medium'    class="demo-ruleForm">

        
            <el-form-item     
            v-if="tableName2=='宴会厅列表'"        
            prop="hallName"
            >
                <el-input type="text"  placeholder="请输入厅名" v-model="ruleForm2.hallName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="floorArea"
            v-if="tableName2=='宴会厅列表'"
            >
                <el-input type="text"  placeholder="请输入面积" v-model="ruleForm2.floorArea" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="storeyHeight"
            v-if="tableName2=='宴会厅列表'"
            >
                <el-input type="text"  placeholder="请输入层高" v-model="ruleForm2.storeyHeight" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="columnNum"
            v-if="tableName2=='宴会厅列表'"
            >
                <el-input type="text"  placeholder="请输入柱子数" v-model="ruleForm2.columnNum" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="shape"
            v-if="tableName2=='宴会厅列表'"
            >
                <el-input type="text"  placeholder="请输入形状" v-model="ruleForm2.shape" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item     
            v-if="tableName2=='宴会厅列表'"        
            prop="tableNum"
            >
                <el-input type="text"  placeholder="请输入桌数" v-model="ruleForm2.tableNum" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="minimumConsumption"
            v-if="tableName2=='宴会厅列表'"
            >
                <el-input type="text"  placeholder="请输入最低消费" v-model="ruleForm2.minimumConsumption" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            

            <el-form-item             
            prop="other"
            v-if="tableName2=='宴会厅列表'"
            >
                <el-input type="text"  placeholder="请输入厅其它" v-model="ruleForm2.other" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            


            </el-form>

            <el-upload
            ref="upload2"
            name="file"
            :limit="limit2"
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
                 <p style="line-height:40px;margin-left:30px">建议图片大小：{{imgSize}}</p>
            </div>
               
                
            </el-upload>
            <div style="display:flex;margin-left:3%">
                <el-button   style="margin-left:0;width:100%;margin-right:4%" slot="trigger" size="small" type="primary" @click="subDetail">提交</el-button>
            </div>
        
            </el-dialog>  

            <!-- 弹窗4 -->
            <el-dialog
            title="选择详情"
            :visible.sync="dialogVisible4"
            width="60%"

            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>
                <el-upload
                ref="upload3"
                name="file"
                :limit="limit3"
                multiple
                class="avatar-uploader"
                action=""
                :show-file-list="true"
                :file-list="upfileList3"
                :auto-upload="false"
                list-type="picture"
                :http-request="uploadFile"
                style="padding-bottom:20px;margin-left:3%;margin-right:4%">

                <div style="display:flex">
                    <el-button slot="trigger" size="small" type="primary" style="">选取图片</el-button>
                    <p style="line-height:40px;margin-left:30px">(建议图片大小：800*450)</p>
                    <span style="line-height:40px;margin-left:30px"> {{submitTag=="add" ? "当前为添加图片":"当前为修改图片"}}</span>
                </div>
                <!-- <div style="">
                    <el-button slot="trigger" size="small" type="primary" style="">选取图片</el-button>
                    
                </div> -->
               
                
            </el-upload>
            <div style="display:flex;margin-left:3%">
                <el-button   style="margin-left:0;width:100%;margin-right:3%" slot="trigger" size="small" type="primary" @click="subHallDetail">提交</el-button>
            </div>

            <div style="width:94%; margin:20px auto">
                <el-button   style="margin-left:0;margin-right:3%" slot="trigger" size="small" type="primary" @click="deletAll3()">
                    批量删除
                </el-button>

                
                <el-table

                    :data="tableList3"
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
                    prop="createTime"
                    label="创建时间"
                    show-overflow-tooltip>
                    </el-table-column>





                    <el-table-column
                    fixed="right"
                    label="操作"

                    >
                    <template slot-scope="scope">



                        <el-button
                        @click.native.prevent="deleteRow3(scope.$index, tableList3)"
                        type="danger"
                        size="small">
                        删除
                        </el-button>
                        

                        <el-button
                        @click.native.prevent="changeRow(scope.$index, tableList3,3)"
                        type="success"
                        size="small">
                        修改
                        </el-button>

                    </template>
                    </el-table-column>

                    </el-table>
            </div>
                    

            </el-dialog>  


            <!-- 弹窗5 -->
            <el-dialog
            title="详情上传"
            :visible.sync="dialogVisible5"
            width="60%"
            @close="closeDialog(5)"
            :modal-append-to-body='false'
            :close-on-click-modal="false"
            center>


            <el-form   :model="ruleForm5" :rules="rules"   ref="ruleForm5"  size='medium'    class="demo-ruleForm">

        
            <el-form-item     
            v-if="tableName2=='婚宴菜单列表'"        
            prop="menuName"
            >
                <el-input type="text"  placeholder="请输入菜单名" v-model="ruleForm5.menuName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item     
            v-if="tableName2=='婚宴菜单列表'"        
            prop="menuPrice"
            >
                <el-input type="text"  placeholder="请输入价格" v-model="ruleForm5.menuPrice" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item     
            v-if="tableName2=='婚宴菜单列表'"        
            prop="menuType"
            >
                <el-input type="text"  placeholder="请输入菜单类型" v-model="ruleForm5.menuType" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="dishNameStr"
            v-if="tableName2=='婚宴菜单列表'"
            >
                <el-input type="textarea" :rows="3"  placeholder="请输入菜名集(请用中文，分割)" v-model="ruleForm5.dishNameStr" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="remarks"
            v-if="tableName2=='婚宴菜单列表'"
            >
                <el-input type="text"  placeholder="请输入备注" v-model="ruleForm5.remarks" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item 
            style="width:100%;margin-right:4%"            
            prop="content"
            v-if="tableName2=='酒店介绍列表'"
            >
                <el-input type="textarea"  placeholder="请输入内容" :rows="4" v-model="ruleForm5.content" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            </el-form>

            <div style="display:flex;margin-left:3%">
                <el-button   style="margin-left:0;width:100%;margin-right:4%" slot="trigger" size="small" type="primary" @click="subDetailNoImg">提交</el-button>
            </div>
        
            </el-dialog>  
    </div>
</template>

<script>

import url from '../../utils/url';
import {getCookie} from '../../utils/utils';
import {postRequest,uploadFileRequest} from '../../utils/api';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
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
            limit2:1,
            limit3:3,
            showDelctAll:true,
            tableName2:"",
            submitTag:"add",
            upfileList:[],
            upfileList2:[],
            upfileList3:[],
            file:"",
            QINIU:url.qiniuH,
            tableList:[],
            tableList2:[],
            tableList3:[],
            imgSize:"",

            formInline:{
                cityV:"",

            },

            showTable1:true,
            showTable2:false,
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
            ruleForm2:{
                hallName:"",
                tableNum:"",
                floorArea:"",
                storeyHeight:"",
                columnNum:"",
                minimumConsumption:"",
                shape:"",
                other:"",

            },

            ruleForm5:{
                menuName:"",
                dishNameStr:"",
                remarks:"",
                remarks:"",
                content:""

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
            dialogVisible2:false,
            dialogVisible3:false,
            dialogVisible4:false,
            dialogVisible5:false,
            search:"",
            currentPage: 1,
            navigatepageNums:[],
            cityList:[],
            hoteList:[{hotelName:'婚礼会所'},{hotelName:'特色餐厅'},{hotelName:'奢华五星'},{hotelName:'豪华四星'},{hotelName:'婚礼堂'},{hotelName:'其它酒店'}],
            total:1,
            changeId:"",//中间变化的ID
            changeIndex:"",
        }
    },
    methods:{
        // 详情3添加修改 没有图片的
        subDetailNoImg(){
            

            // console.log("表单参数",this.tableList2[this.changeIndex].id,this.ruleForm5)
            let curentUrl=""

            let pamas=""
            switch (this.tableName2) {

            

            case '婚宴菜单列表':
                if(!this.ruleForm5.menuName ||!this.ruleForm5.menuPrice || !this.ruleForm5.menuType || !this.ruleForm5.dishNameStr || !this.ruleForm5.remarks){
                    this.$message({
                        type: 'success',
                        message: '表单不能为空'
                    });
                    return
                }
                if(this.submitTag=="add"){
                    
                    curentUrl =url.weddingMenuAddWeddingMenu 
                    pamas={
                        menuName:this.ruleForm5.menuName,
                        menuType:this.ruleForm5.menuType,
                        menuPrice:this.ruleForm5.menuPrice,
                        dishNameStr:this.ruleForm5.dishNameStr,
                        remarks:this.ruleForm5.remarks,
                        hotelsId:this.tableList[this.changeIndexTab1].id
                    }   
                }

                if(this.submitTag=="change"){
                    curentUrl =url.weddingMenuUpdWeddingMenu 
                    pamas={
                        menuName:this.ruleForm5.menuName,
                        menuType:this.ruleForm5.menuType,
                        menuPrice:this.ruleForm5.menuPrice,
                        dishNameStr:this.ruleForm5.dishNameStr,
                        remarks:this.ruleForm5.remarks,
                        id:this.tableList2[this.changeIndex].id
                    }   
                
                }
                break;
                    
            case '酒店介绍列表':
                if(!this.ruleForm5.content){
                    this.$message({
                        type: 'success',
                        message: '表单不能为空'
                    });
                    return
                }
                if(this.submitTag=="add"){

                    if(this.tableList2.length>=1){
                        this.$message({
                            type: 'success',
                            message: '最多只能添加一条'
                        });
                        return

                    }
                    // alert(this.tableList[this.changeIndexTab1].id)
                    curentUrl =url.hotelIntroductionAddHotelIntroduction 
                    pamas={
                        content:this.ruleForm5.content,
                        hotelsId:this.tableList[this.changeIndexTab1].id
                    }   
                }

                if(this.submitTag=="change"){
                    curentUrl =url.hotelIntroductionUpdHotelIntroduction 
                    pamas={
                        content:this.ruleForm5.content,
                        id:this.tableList2[this.changeIndex].id
                    }   
                
                }
                    
                break;    
            
            default:
                    break;


            }

            postRequest(curentUrl,pamas).then(data=> {
                console.log("上传婚宴菜单",data)
                this.dialogVisible5=false
                this.$refs['ruleForm5'].resetFields();
                this.initData2() //查询所有    
                this.$message({
                    type: 'success',
                    message: '提交成功'
                });
                    
                        
            })
            

            
        },
        // 提交厅详情上传的图
        subHallDetail(){
            this.formDate = new FormData()
            this.$refs.upload3.submit();
            let curentUrl =""
            if(this.submitTag=="add"){
                        
                curentUrl=url.hallPictureAddHallPicture
                this.formDate.append('banquetHallId', this.tableList2[this.changeIndex3].id)

            }
            if(this.submitTag=="change"){

                curentUrl=url.hallPictureUpdHallPicture
                this.formDate.append('id', this.tableList3[this.changeIndex4].id);

                if(url.qiniuH+this.tableList3[this.changeIndex4].pictureUrl!=this.$refs.upload3.uploadFiles[0].url){
                    this.formDate.append('key', this.tableList3[this.changeIndex4].pictureUrl);
                    
                }else{
                    this.formDate.append('key', "");
                }
                        
            }

            uploadFileRequest(curentUrl,this.formDate).then(data=> {
                this.upfileList3=[]
                console.log("上传的成功返归",data)
                this.submitTag="add"
                        
                this.dialogVisible3=false
                this.initData3() //查询所有                    

                })   
        },
        // 查看宴会厅详情  弹窗3弹出
        lookHallDetail(index,rows){
            this.dialogVisible4=true
            this.changeIndex3=index //表2的下标
            this.initData3()
            this.submitTag="add"
            this.limit3=1
        },
        // 第二个表格的弹窗 提交按钮
        subDetail(){
            
            this.formDate = new FormData()
            this.$refs.upload2.submit();
            let curentUrl=""
            switch (this.tableName2) {
                case '酒店图片列表':
                    if(this.submitTag=="add"){
                        
                        curentUrl=url.hotelsPictureAddHotelsPicture
                        this.formDate.append('hotelsId', this.tableList[this.changeIndexTab1].id)
                        this.imgSize='481*360'
                    }
                    if(this.submitTag=="change"){

                        curentUrl=url.hotelsPictureUpdHotelsPicture
                        this.formDate.append('id', this.tableList2[this.changeIndex].id);

                        if(url.qiniuH+this.tableList2[this.changeIndex].pictureUrl!=this.$refs.upload2.uploadFiles[0].url){
                            this.formDate.append('key', this.tableList2[this.changeIndex].pictureUrl);
                            
                        }else{
                            this.formDate.append('key', "");
                        }
                        
                    }
                    break;

                case '宴会厅列表':
                    this.imgSize='270*180'

                    if(this.ruleForm2.hallName=="" || 
                    this.ruleForm2.tableNum==""|| 
                    this.ruleForm2.floorArea==""|| 
                    this.ruleForm2.storeyHeight==""|| 
                    this.ruleForm2.columnNum==""|| 
                    this.ruleForm2.minimumConsumption==""|| 
                    this.ruleForm2.shape==""|| 
                    this.ruleForm2.other==""){
                        this.$message({
                            type: 'warning',
                            message: '输入框不能为空'
                        }); 
                        return
                    }

                    this.formDate.append('hallName', this.ruleForm2.hallName);
                    this.formDate.append('tableNum', this.ruleForm2.tableNum);
                    this.formDate.append('floorArea', this.ruleForm2.floorArea);
                    this.formDate.append('storeyHeight', this.ruleForm2.storeyHeight);
                    this.formDate.append('columnNum', this.ruleForm2.columnNum);
                    this.formDate.append('minimumConsumption', this.ruleForm2.minimumConsumption);
                    this.formDate.append('shape', this.ruleForm2.shape);
                    this.formDate.append('other', this.ruleForm2.other);

                    if(this.submitTag=="add"){
                        
                        curentUrl=url.banquetHallAddBanquetHall
                        this.formDate.append('hotelsId', this.tableList[this.changeIndexTab1].id)

                    }
                    if(this.submitTag=="change"){

                        curentUrl=url.banquetHallUpdBanquetHall
                        this.formDate.append('id', this.tableList2[this.changeIndex].id);

                        if(url.qiniuH+this.tableList2[this.changeIndex].hallUrl!=this.$refs.upload2.uploadFiles[0].url){
                            this.formDate.append('key', this.tableList2[this.changeIndex].hallUrl);
                            
                        }else{
                            this.formDate.append('key', "");
                        }
                        
                    }

                    
                    break;
                    
                case '婚宴菜单列表':
                    
                    break;
                    
                case '酒店介绍列表':
                    
                    break;    
            
                default:
                    break;



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
                        this.$nextTick(() => {
                            this.$refs['ruleForm2'].resetFields();
                        });
                        
                        this.dialogVisible3=false
                        this.initData2() //查询所有                    

                    })   
        },
        // 弹窗2中点击某个按钮    显示表格数据
        showDetailTab2(num){
            let detailUrl=''
            let hotelsId=''
            switch (num) {
                case 1:
                    this.tableName2="酒店图片列表"
                    this.detailUrl=url.hotelsPictureGetHotelsPictureList
                    this.deletUrl= url.hotelsPictureDelHotelsPicture
                    this.showDelctAll=true
                    
                    break;
                case 2:
                    this.tableName2="宴会厅列表"
                    this.detailUrl=url.banquetHallGetBanquetHallList
                    this.deletUrl= url.banquetHallDelBanquetHall
                    this.showDelctAll=false
                    
                    break;
                case 3:
                    this.tableName2="婚宴菜单列表"
                    this.detailUrl=url.weddingMenuGetWeddingMenuList
                    this.deletUrl= url.weddingMenuDelWeddingMenu
                    this.showDelctAll=false
                    break;
                case 4:
                    this.tableName2="酒店介绍列表"
                    this.detailUrl=url.hotelIntroductionGetHotelIntroduction
                    this.deletUrl= url.hotelIntroductionDelHotelIntroduction
                    this.showDelctAll=false
                    break;            
            
                default:
                    break;
            }
            this.showTable1=false
            this.showTable2=true
            this.dialogVisible2=false
            this.initData2()
            
        },
        // 返回所有酒店 返回第一个列表
        returnFirst(){
            this.showTable1=true
            this.showTable2=false
        },
        // 查看详情表单出现
        lookDetail(index, rows){
            this.changeIndexTab1=index;
            this.dialogVisible2=true

            
        },
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
                    type: '0'
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
        // 新增酒店
        
        addMost(num){
            if(num==1){
                this.dialogVisible=true;
                this.upfileList=[]
                this.submitTag="add"
                
            }else{
                this.submitTag="add"
                if(this.tableName2=="婚宴菜单列表"){
                    this.dialogVisible5=true
                    return
                }
                if(this.tableName2=="酒店介绍列表"){
                    this.dialogVisible5=true
                    return
                }
                this.dialogVisible3=true;
                
                this.upfileList2=[]
                if(this.tableName2=="宴会厅列表"){
                    this.limit2=1
                }else{
                    this.limit2=3
                }
                
                
            }
            
        },
        //提交 第一个表格提交
        subPicForm(){

            

            
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
                        curentUrl=url.hotelsAddHotels
                        this.formDate.append('userId',JSON.parse(sessionStorage.getItem('ms_userId')))
                        this.formDate.append('cityId', this.formInline.cityV);
                    }
                    if(this.submitTag=="change"){
                        curentUrl=url.hotelsUpdHotels
                        this.formDate.append('id', this.tableList[this.changeIndexTab1].id);

                        if(url.qiniuH+this.tableList[this.changeIndexTab1].hotelsUrl!=this.$refs.upload.uploadFiles[0].url){
                            this.formDate.append('key', this.tableList[this.changeIndexTab1].hotelsUrl);
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

                    
                    this.formDate.append('hotelsName', this.ruleForm.hotelsName);
                    this.formDate.append('hotelsType', this.ruleForm.hotelsType);
                    this.formDate.append('tableNumber', this.ruleForm.tableNumber);
                    this.formDate.append('hotelsPrice', this.ruleForm.hotelsPrice);
                    this.formDate.append('hotelsArea', this.ruleForm.hotelsArea);;
                    this.formDate.append('hallNum', this.ruleForm.hallNum);
                    this.formDate.append('menuNum', this.ruleForm.menuNum);
                    this.formDate.append('hotelsAddress', this.ruleForm.hotelsAddress);


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
        changeRow(index, rows,num){
            if(num==1){
                this.dialogVisible=true;
                this.submitTag="change"
                this.changeId=rows[index].id;
                this.changeIndexTab1=index;

                this.$nextTick(() => {
                this.ruleForm={
                    hallNum : rows[index].hallNum,
                    hotelsAddress : rows[index].hotelsAddress,
                    hotelsArea : rows[index].hotelsArea,
                    hotelsName : rows[index].hotelsName,
                    hotelsPrice : rows[index].hotelsPrice,
                    hotelsType : rows[index].hotelsType,
                    menuNum : rows[index].menuNum,
                    tableNumber : rows[index].tableNumber,

                }
                });
                
                
                this.upfileList=[{url:url.qiniuH+rows[index].hotelsUrl}]

            }
            if(num==2){
                this.submitTag="change"
                
                this.limit2=1
                switch (this.tableName2) {
                    case "酒店图片列表":
                        this.upfileList2=[{url:url.qiniuH+rows[index].pictureUrl}]  
                        this.dialogVisible3=true;  
                        break;
                    case "宴会厅列表":
                        this.upfileList2=[{url:url.qiniuH+rows[index].hallUrl}]   
                        this.dialogVisible3=true;
                        
                        this.$nextTick(() => {
                            this.ruleForm2={
                            hallName:rows[index].hallName,
                            tableNum:rows[index].tableNum,
                            floorArea:rows[index].floorArea,
                            storeyHeight:rows[index].storeyHeight,
                            columnNum:rows[index].columnNum,
                            minimumConsumption:rows[index].minimumConsumption,
                            shape:rows[index].shape,
                            other:rows[index].other,

                        }
                        })
                        
                        break;
                    
                    case "婚宴菜单列表":
                        this.dialogVisible5=true;
                        this.$nextTick(() => {
                            this.ruleForm5={
                            menuName:rows[index].menuName,
                            menuType:rows[index].menuType,
                            menuPrice:rows[index].menuPrice,
                            dishNameStr:rows[index].dishNameStr,
                            remarks:rows[index].remarks,

                        }
                        })
                        break;

                    case "酒店介绍列表":
                        this.dialogVisible5=true;
                        this.$nextTick(() => {
                            this.ruleForm5={
                            content:rows[index].content,

                        }
                        })   
                        break;    
                
                    default:
                        break;
                }
                
                this.changeIndex=index; //表格二的下标
            }

            if(num==3){
                this.submitTag="change"
                this.changeIndex4=index; //第三个表格的下表
                this.upfileList3=[{url:url.qiniuH+rows[index].pictureUrl}] 
                this.limit3=1
            }
            

        },
        // 单删除
        deleteRow(index, rows,num) {


        this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let currentUrl=''
                let pamas=''
                if(num==1){
                    currentUrl=url.hotelsDelHotels
                    pamas={
                        id:rows[index].id,
                        key:rows[index].hotelsUrl,
                    }
                }else{
                    currentUrl=this.deletUrl
                    switch (this.tableName2) {
                        case "酒店图片列表":
                            
                            pamas={
                                ids:rows[index].id,
                                keys:rows[index].pictureUrl,
                            }  
                            
                            break;
                        case "宴会厅列表":
                            
                            pamas={
                                id:rows[index].id,
                                key:rows[index].hallUrl,
                            }

                            
                            break;
                        
                        case "婚宴菜单列表":

                            pamas={
                                id:rows[index].id,

                            }
  
                            break;

                        case "酒店介绍列表":

                            pamas={
                                id:rows[index].id,

                            }
   
                            break;    
                    
                        default:
                            break;
                    }
                    
                this.deletAllPamas=pamas    
                }
                postRequest(currentUrl,pamas ).then(data=> {
                    console.log("删除后打印的数据",data)
                    this.dialogVisible=false
                    if(num==1){
                        this.initData(this.tableData) //查询所有
                    }else{
                        this.initData2() //查询所有  
                    }
                    
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
        // 删除第三个表格操作
        deleteRow3(index,rows){
            postRequest(url.hallPictureDelHallPicture, {
                ids:rows[index].id,
                keys:rows[index].pictureUrl
            }).then(data=> {
                    console.log("删除后打印的数据",data)
                    this.initData3() //查询所有  
                    
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });        
                                    
                });    
        },

        // 批量删除
        deletMost(){

            console.log("查看表单内的选中的条数",this.multipleSelection)
            if(this.multipleSelection==undefined || this.multipleSelection.length==""){
                this.$message({
                    type: 'success',
                    message: '请选择后删除'
                });
                return
            }
            let chooseStrId="";
            let chooseStrPictures="";
            let chooseStrPictures1="";
            let chooseStrPictures2="";
            let chooseStrPictures3="";
            let chooseStrPictures4="";
            for(let i=0;i<this.multipleSelection.length;i++){

                chooseStrId+=this.multipleSelection[i].id+","
                chooseStrPictures1+=this.multipleSelection[i].pictureUrl+","
                chooseStrPictures2+=this.multipleSelection[i].hallUrl+","
                chooseStrPictures3+=this.multipleSelection[i].pictureUrl+","
                chooseStrPictures4+=this.multipleSelection[i].pictureUrl+","
            }
            chooseStrId = chooseStrId.substr(0, chooseStrId.length - 1);
            chooseStrPictures1 = chooseStrPictures1.substr(0, chooseStrPictures1.length - 1);
            chooseStrPictures2 = chooseStrPictures2.substr(0, chooseStrPictures2.length - 1);
            chooseStrPictures3 = chooseStrPictures3.substr(0, chooseStrPictures3.length - 1);
            chooseStrPictures4 = chooseStrPictures4.substr(0, chooseStrPictures4.length - 1);

            switch (this.tableName2) {
                        case "酒店图片列表":
                            
                            chooseStrPictures=chooseStrPictures1
                            
                            break;
                        case "宴会厅列表":
                            
                            chooseStrPictures=chooseStrPictures2
                            break;
                        
                        case "婚宴菜单列表":

                            chooseStrPictures=chooseStrPictures3
                            break;

                        case "酒店介绍列表":

                            chooseStrPictures=chooseStrPictures4
   
                            break;    
                    
                        default:
                            break;
                    }


            console.log("删除的chooseStrId",chooseStrId,chooseStrPictures1,chooseStrPictures2,chooseStrPictures3,chooseStrPictures4,);
            if(chooseStrId==""){
                
            }

                this.$confirm('是否删除?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    postRequest(this.deletUrl, {
                        ids:chooseStrId,
                        keys:chooseStrPictures,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)
                        this.dialogVisible=false
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
        deletAll3(){
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
                    postRequest(url.hallPictureDelHallPicture, {
                        ids:chooseStrId,
                        keys:chooseStrPictures,
                        }).then(data=> {
                        console.log("删除后打印的数据",data)
                        this.dialogVisible=false
                        this.initData3() //查询所有    
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
        closeDialog(num){
            if(num==1){
                 this.$refs['ruleForm'].resetFields();
            }
            if(num==2){
                 this.$refs['ruleForm2'].resetFields();
            }
            if(num==5){
                 this.$refs['ruleForm5'].resetFields();
            }

       
        },

        goSearch(){

            console.log("this.tableData",this.tableData)
            this.initData(this.tableData)
            
        },



        initData(pamas){
            postRequest(url.hotelsGetHotelsList, pamas).then(data=> {


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
            postRequest(this.detailUrl, {
                hotelsId:this.tableList[this.changeIndexTab1].id,
            }).then(data=> {
                console.log("酒店查询",data.data.data)
                if(data.data.data==undefined){
                    this.tableList2=[]
                    return
                }
                if(!Array.isArray(data.data.data)){
                    this.tableList2=[]
                    this.tableList2.push(data.data.data)
                    this.dialogVisible=false

                    return
                }
                this.tableList2=data.data.data
                this.dialogVisible=false
                
                     
                                    
            });
        },

        initData3(){
            // alert(this.tableList2[this.changeIndex3].id)
            postRequest(url.hallPictureGetHallPictureList, {
                banquetHallId:this.tableList2[this.changeIndex3].id,
            }).then(data=> {
                console.log("表单3数据",data)
                this.tableList3=data.data.data
                // this.dialogVisible3=false
                
                     
                                    
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
                "userId":JSON.parse(sessionStorage.getItem('ms_userId')),
                "likeName":this.search,
                "cityId":this.formInline.cityV
            })
        },
    },

    computed:{
        tableData(){
            return {
                "pageNum":this.currentPage,
                "userId":JSON.parse(sessionStorage.getItem('ms_userId')),
                "likeName":this.search,
                "cityId":this.formInline.cityV
            }
        },
    },

    created(){
        


    this.initData({
        userId:JSON.parse(sessionStorage.getItem('ms_userId')),
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
.detail-list{
    display: flex;
    justify-content: space-between;
    width: 100%;

}
.detail-list li{
    width: 100px;
    height: 100px;
    margin: 20px;
    color: white;
    border-radius: 50%;
    line-height: 100px;
    text-align: center;
    background: #66B1FF
}
.detail-list li:hover{
    cursor: pointer;
}
.detail-list li:nth-child(1){
    background: #85CE61
}

.detail-list li:nth-child(2){
    background: #EBB563
}

.detail-list li:nth-child(3){
    background: #F78989
}
</style>

