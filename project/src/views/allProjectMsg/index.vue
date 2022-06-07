<template>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="title">仪表板</div>
            </section>
                <!-- 顶部展示区域 -->
                <div class="top_header">
                    <el-row>
                        <el-col :span="6">
                            <el-card class="bg_color" style="margin-left:15px">
                                <div class="wrapper_box1">
                                    <div class="box1-left">
                                        <div class="left-title">
                                            <span>{{housingNumberList.total}}</span>
                                            <span>小区总数</span>
                                        </div>
                                        <div class="right-img">
                                            <img src="../../assets/home.png" alt="">
                                        </div>
                                    </div>
                                    <div class="box1-bottom">
                                        <span>待审核：{{housingNumberList.audit}}</span>
                                        <span>报修：{{housingNumberList.repair}}</span>
                                        <span>投诉：{{housingNumberList.complain}}</span>
                                    </div>
                                </div>
                                
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card class="bg_color2" style="margin-left:15px">
                                <div class="wrapper_box1">
                                    <div class="box1-left">
                                        <div class="left-title">
                                            <span>{{crewNumberList.total}}</span>
                                            <span>人员总数</span>
                                        </div>
                                        <div class="right-img">
                                            <img src="../../assets/user-group.png" alt="">
                                        </div>
                                    </div>
                                    <div class="box1-bottom">
                                        <span>住户：{{crewNumberList.household}}</span>
                                        <span>租客：{{crewNumberList.tenant}}</span>
                                        <span>员工：{{crewNumberList.employee}}</span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card class="bg_color3" style="margin-left:15px">
                                <div class="wrapper_box1">
                                    <div class="box1-left">
                                        <div class="left-title">
                                            <span>{{facilityNumberList.total}}</span>
                                            <span>设备总数</span>
                                        </div>
                                        <div class="right-img">
                                            <img src="../../assets/shebeiguanli.png" alt="">
                                        </div>
                                    </div>
                                    <div class="box1-bottom">
                                        <span>在线状态：{{facilityNumberList.onLine}}</span>
                                        <span>离线状态：{{facilityNumberList.offLine}}</span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card class="bg_color4" style="margin:0 15px;">
                                <div class="wrapper_box1">
                                    <div class="box1-left">
                                        <div class="left-title">
                                            <span>{{chargeMsgList.total}}￥</span>
                                            <span>停车收费</span>
                                        </div>
                                        <div class="right-img">
                                            <img src="../../assets/shoufeizhan.png" alt="">
                                        </div>
                                    </div>
                                    <div class="box1-bottom">
                                        <span>停车收费:{{chargeMsgList.parkFee}}￥</span>
                                        <span>会员收费:{{chargeMsgList.vipFee}}￥</span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <!-- 图表展示区域 -->
                    <div class="card_box">
                        <div class="card-box_left">
                            <div id="china_map" style='width:100%;height:100%;'> </div>
                        </div>
                        <div class="card-box_rigth">
                            <div id="main" class="echarts_box"></div>
                            <div id="main_b" class="echarts_box-b"></div>
                        
                        </div>
                    </div>
                    <div class="bottom_box">
                        <div id="bottom_ech">
                            
                        </div>
                        <div id="bottom_ech2" >

                        </div>
                    </div>
                    <div class="time_my">
                        <div class="flex_wra">
                            <div style="display: flex;margin-left:10px">
                                <span class="item_a"><span class="bg"></span>缴费总额:{{(this.parkPayFee + this.vipPayFee).toFixed(2)}}￥</span>
                            </div>
                            <div style="display: flex;margin-left:10px">
                                <span class="item_a"><span class="bg_a"></span>停车缴费:{{this.parkPayFee}}￥</span>
                            </div>
                            <div style="display: flex;margin-left:10px">
                                <span class="item_a"><span class="bg_b"></span>会员缴费:{{this.vipPayFee}}￥</span>
                            </div>
                            
                        </div>
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            @blur='getTimeN'
                            >
                        </el-date-picker>
                        
                    </div>
                </div>
        </div>
</template>
<script src='./allProjectMsg.js'>

</script>

<style scoped>
@import './allProjectMsg.css';

</style>