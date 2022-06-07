<template>
    <div class="content-wrapper">
        <section class="content-header">
            <h1 class="nice">
                设备通道 - 录像记录
                <!-- <small>Optional description</small> -->
            </h1>
                <ol class="breadcrumb">
                    <li>
                        <a href="/">
                            <i class="glyphicon glyphicon-home"></i> 首页
                        </a>
                    </li>
                    <li>
                        <i class="glyphicon glyphicon-cog"></i> 设备通道
                    </li>
                    <li class="active">
                        <i class="glyphicon glyphicon-adjust">录像列表</i>
                    </li>
                </ol>
        </section>
        <!-- 录像列表区 -->
        <el-card>
            <button id="btn_device_reset" type="button" class="btn btn-primary pl-8 pr-8" style="margin-bottom:20px" @click="$router.push('/videoPlayback')">
                <span class="fa fa-reply" aria-hidden="true" ></span>返回上级
            </button>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="deviceID"
                    label="通道国际编号"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="通道名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="结束时间">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作"
                    width="100"
                    fixed="right"
                    >
                    <template slot-scope="scope">
                        <el-button type='primary' icon="el-icon-video-play" size="mini" @click="openVrc(scope.row)" >播放</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 录像回放弹窗 -->
        <el-dialog
            :title="vrcTitle"
            :visible.sync="dialogVrcReplay"
            width="50%"
            >
            <div class="video_box">
                <LivePlayer   ref="player2" @snapOutside="snapOutside" :videoUrl=" videoUrl "  :fluent="false" :autoplay="false" :live="false" stretch  ></LivePlayer>
                <div class="video-close" v-show="videoUrl"  @click="closeVrcMsg">关闭</div>
            </div>
            <div class="btn_box">
                <el-button type='primary' size="mini" v-for="item in btnBox" :key="item.name" @click="multiplier(item.eventNum)">{{item.name}}</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="callOff" type='primary'>关 闭</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script src="./vcrList.js">

</script>
<style scoped>
@import './vcrList.css';
</style>