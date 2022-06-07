<template>
    <div class="content-wrapper">
                <section class="content-header">
                    <h1 class="nice">
                        视频布控 - 监控设备
                        <!-- <small>Optional description</small> -->
                    </h1>
                    <ol class="breadcrumb">
                        <li>
                            <a href="/">
                                <i class="glyphicon glyphicon-home"></i> 首页
                            </a>
                        </li>
                        <li>
                            <i class="glyphicon glyphicon-cog"></i> 视频布控
                        </li>
                        <li class="active">
                            <i class="glyphicon glyphicon-adjust">监控设备</i>
                        </li>
                    </ol>
                </section>
                <!-- 顶部搜索区域 -->
                <el-card class="wrapper-card">
                    <el-row :gutter="20">
                        <el-col :span="4"><el-input placeholder="搜索设备名称/SN号" v-model="SName"></el-input></el-col>
                        <el-col :span="4">
                            <el-select v-model="locationMsg" placeholder="位置">
                                <el-option v-for="item in directionPullDown" :key="item.value" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="statusMsg" placeholder="状态">
                                <el-option v-for="item in options8" :key="item.value" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <div class="btn-group">
                                <button id="btn_device_reset" type="button" class="btn btn-primary"  @click="inquireSMsg">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
                                </button> 
                                <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8" @click="resetInput">
                                    <span class="fa fa-reply" aria-hidden="true"></span>重置
                                </button>
                            </div>
                        </el-col>
                    </el-row>
                    <button id="btn_add" type="button" class="btn btn-default" style="margin:20px 0" @click="openVEDialog">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加设备
                    </button> 

                    <!-- 视频监控table区域 -->
                    <el-table
                        :data="tableData"
                        stripe
                        border=""
                        style="width: 100%">
                        <el-table-column
                        prop="serial"
                        label="设备国际编号"
                        :show-overflow-tooltip = true
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="名称"
                        :show-overflow-tooltip = true
                        >
                        </el-table-column>
                        <el-table-column
                        prop="mediaTransport"
                        label="流传输模式"
                        width="150"
                        >
                        <template slot-scope="scope">
                            <span style="color:#409EFF">{{scope.row.mediaTransport == 1 ? 'UDP' : 'TCP'}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="channelCount"
                        label="通道数"
                        width="150"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="deviceOnline"
                        label="状态"
                        width="150">

                        <template slot-scope="scope">
                            <span v-if="scope.row.deviceOnline == 1" style="color:#05C454">在线</span>
                            <span v-else style="color:#F56C6C">离线</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="manufacturer"
                        label="厂家"
                        
                        >
                        </el-table-column>
                        <el-table-column
                        prop="remoteIp"
                        label="出口IP"
                        :show-overflow-tooltip = true
                        >
                        </el-table-column>
                        <el-table-column
                        prop="deviceOnline"
                        label="操作"
                        width="360"
                        fixed="right"
                        >
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="checkAisle(scope.row)">查看通道</el-button>
                            <el-button type="info" size="mini" :loading="status_m"  @click="updateAisle(scope.row)">更新通道</el-button>
                            <el-button type="primary" size="mini" @click="amendTable(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="deleteTable(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页区 -->
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 25]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </el-card>

                <!-- 添加视频设备弹窗 -->
                <el-dialog
                    :title="videoEquipmentTitle"
                    :visible.sync="videoEquipmentDialog"
                    width="35%"
                    >
                    <div class="dlog_box">
                        <div class="input-box" >
                            <span>设备名称：</span>
                            <el-input placeholder="请输入设备名称" v-model="equipmentForm.name"></el-input>
                        </div>
                    <div class="input-box _top">
                        <span>设备类型：</span>
                        <el-select v-model="equipmentForm.type" placeholder="请选择设备类型" style="width:70%">
                            <el-option v-for="item in equipmentType" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </div>
                    <div class="input-box _top">
                        <span>设备 S N：</span>
                        <el-input placeholder="请输入设备SN" v-model="equipmentForm.SN"></el-input>
                    </div>
                    <div class="input-box _top" v-show="modeTyep">
                        <span>传输方式：</span>
                        <div>
                            <el-radio v-model="wayMode" label="1">UDP</el-radio>
                            <el-radio v-model="wayMode" label="2">TCP</el-radio>
                        </div>
                    </div>
                    <div class="input-box _top" v-show="modeTyep && wayMode == 2">
                        <span>传输模式：</span>
                        <div>
                            <el-radio v-model="pattern" label="1">ACTIVE-主动</el-radio>
                            <el-radio v-model="pattern" label="2">PASSIVE-被动</el-radio>
                        </div>
                    </div>
                    </div>
                    
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="closeEquipmentDlog">取 消</el-button>
                        <el-button type="primary" @click="submitEquipmentMsg" v-if="modeTyep == false">确 定</el-button>
                        <el-button type="primary" @click="amendTableSubmit" v-else>确 定</el-button>
                    </span>
                </el-dialog>

    </div>
</template>
<script src="./monitorEquipment.js">

</script>
<style  scoped>
@import './monitorEquipment.css';
</style>