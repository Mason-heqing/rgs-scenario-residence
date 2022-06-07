<template>
    <div class="content-wrapper">
        <section class="content-header">
            <h1 class="nice">
                视频监控 - 设备通道
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
                        <i class="glyphicon glyphicon-adjust">设备通道</i>
                    </li>
                </ol>
        </section>
        <el-card>
            <!-- 顶部搜索区域 -->
            <div class="search_box">
                <el-input placeholder="关键字" v-model="searchKey"></el-input>
                <div class="status_box">
                    <el-select v-model="deviceOnline" placeholder="设备状态" >
                        <el-option v-for="item in options8" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="btn-group">
                    <button id="btn_device_reset" type="button" class="btn btn-primary" @click="inquire">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
                    </button> 
                    <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8"  @click="empty">
                        <span class="fa fa-reply" aria-hidden="true"></span>重置
                    </button>
                </div>
            </div>
            <!-- 录像通道表格 -->
            <div>
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        label="通道号"
                        width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="iD"
                        label="通道国际编号"
                        :show-overflow-tooltip = true
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="通道名称"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="snapURL"
                        label="快照"
                    >
                    <template slot-scope="scope">
                        <el-image
                            style="width: 50px; height: 40px"
                            :src="scope.row.snapURL"
                            :preview-src-list="[
                            scope.row.snapURL,
                            ]"
                        >
                            <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="deviceOnline"
                        label="在线状态"
                    >
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
                        prop="pTZType"
                        label="云台类型"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.pTZType == 0 ?'未知' :scope.row.pTZType == 1? '球机' :scope.row.pTZType == 2 ? '半球' :scope.row.pTZType == 3 ? '固定枪机' : '遥控枪机' }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="100"
                        flxe="rigth">
                        <template slot-scope="scope">
                            <el-button type='primary' size='mini' @click="openVideoReplay(scope.row)">查看录像</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[5, 10, 15]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </el-card>
        <!-- 录像回放弹窗 -->
        <el-dialog
            title="录像回放"
            :visible.sync="dialogVideoReplay"
            width="65%"
            >
                <div class="video_title">
                <span>选择录像回放时间段：</span>
                <el-date-picker
                    v-model="vcrTiemS"
                    type="datetime"
                    value-format="yyyy-MM-ddTHH:mm:ss"
                    @change='submitVcrTime'
                    placeholder="起始日期">
                </el-date-picker>
                <el-date-picker
                    v-model="vcrTiemE"
                    type="datetime"
                    value-format="yyyy-MM-ddTHH:mm:ss"
                    placeholder="结束日期"
                    
                    >
                </el-date-picker>
                <el-button @click="toVcrPage">录像列表</el-button>
                
            </div>
            <div class="video_box">
                <LivePlayer @snapOutside="snapOutside"  ref="player2"  :videoUrl=" videoUrl "  fluent :autoplay='false' :live='false'  stretch ></LivePlayer>
                <div class="video-close" v-show="videoUrl" @click="closeVcrLink">关闭</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="callOff" type='primary'>取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script src="./videoPlayback.js">

</script>
<style scoped>
@import './videoPlayback.css';
</style>