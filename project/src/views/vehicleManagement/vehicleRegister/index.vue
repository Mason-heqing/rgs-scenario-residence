<template>
    <div class="content-wrapper">
                <section class="content-header">
                    <h1 class="nice">
                        车辆管理- 车辆登记
                        <!-- <small>Optional description</small> -->
                    </h1>
                    <ol class="breadcrumb">
                        <li>
                            <a href="/">
                                <i class="glyphicon glyphicon-home"></i> 首页
                            </a>
                        </li>
                        <li>
                            <i class="glyphicon glyphicon-cog"></i> 车辆管理
                        </li>
                        <li class="active">
                            <i class="glyphicon glyphicon-adjust">车辆登记</i>
                        </li>
                    </ol>
                </section>
                <el-card>
                    <!-- 顶部搜索区域 -->
                    <el-row class="row_box">
                        <el-col :span="4">
                            <el-input placeholder="搜索车牌、车主、联系方式" v-model="carInfo"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="userMsg" placeholder="车主类型">
                                <el-option v-for="item in userCar" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" style="margin-left:20px">
                            <div class="btn-group">
                                <button id="btn_device_reset" type="button" class="btn btn-primary"  @click="searchConsult">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
                                </button> 
                                <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8" @click="resetSearch">
                                    <span class="fa fa-reply" aria-hidden="true"></span>重置
                                </button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="row_cz">
                        <el-col :span="4">
                            <div class="btn-group">
                                <button id="btn_add" type="button" class="btn btn-default"  @click="openVehicleDialog">
                                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加
                                    </button> 
                                    <button id="btn_add" type="button" class="btn btn-default" @click="parameterCarNb">
                                    <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                                </button> 
                            </div>
                        </el-col>
                        
                    </el-row>

                    <!-- tab表格区域 -->
                    <div class="table_box">
                        <el-table
                            :data="tableData"
                            stripe
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="plateNo"
                            label="车牌号"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="personName"
                            label="车主"
                            width="120"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="personCarType"
                            label="车主类型"
                            :formatter='formatterMsg'
                            >
                            </el-table-column>
                            <el-table-column
                            prop="phone"
                            label="车主联系方式">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="操作"
                            width="150"
                            fixed="right"
                            >
                            <template slot-scope="scope">
                                <el-button type='primary' size="mini" @click="redactDlog(scope.row)">编辑</el-button>
                                <el-button type='danger' size="mini" @click="deleteCarMsg(scope.row)">删除</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 底部分页区域 -->
                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[5, 10, 25]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                        ></el-pagination>
                    </div>
                
                </el-card>
                <!-- 添加车辆信息弹窗 -->
                    
                        <el-dialog
                            :title="showTitle"
                            :visible.sync="vehicleDialogVisible"
                            width="35%"
                            >
                            <div class="dlog_box">
                                <div class="car-box_msg _top">
                                    <span><span style="color:red">*</span>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                                        <!-- @focus="getVehicleType" -->
                                    <el-select  placeholder="请选择" v-model="addCarVo.carModelInfoId" @focus="getVehicleType">
                                        <el-option v-for="item in vehicleModel" :key="item.id" :label="item.name" :value="item.vgsId"></el-option>
                                    </el-select>
                                </div>
                                <div class="car-box_msg _top">
                                    <span><span style="color:red">*</span>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类：</span>
                                    <el-select  placeholder="请选择" v-model="addCarVo.carTypeInfoId" @focus="selectCarType">
                                        <el-option v-for="item in carTypeList" :key="item.id" :label="item.name" :value="item.vgsId"></el-option>
                                    </el-select>
                                </div>
                                <div class="car-box_msg _top">
                                    <span style="margin-left:5px;">通道权限：</span>
                                    <el-select  placeholder="请选择" v-model="addCarVo.permissionGroupId" @focus="selectUserpermis">
                                        <el-option v-for="item in aisleJurisdiction" :key="item.id" :label="item.groupName" :value="item.vgsId"></el-option>
                                    </el-select>
                                </div>
                                <div class="car-box_msg _top" >
                                    <span><span style="color:red">*</span>车主类型：</span>
                                    <el-select  placeholder="请选择车主类型" @change="userCarType" v-model="addCarVo.personCarType">
                                        <el-option v-for="item in userCar" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </div>
                                <div class="car-box_msg _top">
                                    <span><span style="color:red">*</span>车主姓名：</span>
                                    <el-input placeholder="请输入姓名" v-model="addCarVo.personName" v-if="visitorType == 2"></el-input>
                                    <el-select  placeholder="请选择" @focus="getUserName" v-model="addCarVo.personId" v-else>
                                        <el-option v-for="item in userNameList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </div>
                                <div class="car-box_msg _top">
                                    <span><span style="color:red">*</span>车牌号码：</span>
                                    <el-input v-model="addCarVo.plateNo" placeholder="输入车牌"></el-input>
                                    <!-- <el-select  placeholder="选择车牌" v-model="addCarVo.plateNo">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select> -->
                                </div>
                                
                                <div class="car-box_msg _top" >
                                    <span style="margin-left:5px;">车辆颜色：</span>
                                    <el-input placeholder="请输入车辆颜色" v-model="addCarVo.vehicleColor"></el-input>
                                </div>
                                <div class="car-box_msg _top" v-if="visitorType == 2">
                                    <span><span style="color:red">*</span>联系方式：</span>
                                    <el-input placeholder="输入车主联系方式" v-model="addCarVo.phone"></el-input>
                                </div>
                            </div>
                            

                            <span slot="footer" class="dialog-footer">
                                <el-button @click="countermand">取 消</el-button>
                                <el-button type="primary" @click="addVehicleMsg">确 定</el-button>
                            </span>
                        </el-dialog>
    </div>
</template>
<script src="./vehicleRegister.js">

</script>
<style>
@import './vehicleRegister.css';
</style>