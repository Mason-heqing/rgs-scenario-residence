78/<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        首页
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 首页
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid tree-color">
      <div class="panel-body" style="padding: 0px">
        <div class="row">
            <div class="col-sm-2 pr-0">
                <div class="box">
                    <div class="box-body">
                        <div class="park-distribution">
                            <div class="parking-info">
                                <div class="info-icon">
                                    <img src="../../../assets/img/parking_num.png" alt="总车场数">
                                </div>
                                <div class="info-content">
                                    <p class="info-title">总车场数</p>
                                    <span class="num">{{totalParkNums}}</span>
                                </div>
                            </div>
                            <div class="parking-info">
                                <div class="info-icon">
                                    <img src="../../../assets/img/parking_lot.png" alt="总车位数">
                                </div>
                                <div class="info-content">
                                    <p class="info-title">总车位数</p>
                                    <span class="num">{{totalGroupNums}}</span>
                                </div>
                            </div>
                            <div class="parking-info">
                                <div class="info-icon">
                                    <img src="../../../assets/img/order_num.png" alt="今日线上订单数">
                                </div>
                                <div class="info-content">
                                    <p class="info-title">今日线上订单数</p>
                                    <span class="num">{{onlineOrder}}</span>
                                </div>
                            </div>
                            <div class="parking-info">
                                <div class="info-icon">
                                    <img src="../../../assets/img/order_money.png" alt="今日线上订单金额">
                                </div>
                                <div class="info-content">
                                    <p class="info-title">今日线上订单金额</p>
                                    <span class="num">{{onlineAmount}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="box">
                  <div class="box-body">
                       <div class="col-sm-12">
                            <div
                                class="chart parkDistribution"
                                ref="map"
                                id="parkDistribution"
                                style="height:710px; padding-right: 10px"
                            ></div>
                        </div>
                  </div>
                </div>
            </div>
            <div class="col-sm-2 pl-0">
                <div class="box">
                   <div class="box-body">
                      <div class="park-distribution">
                                <div class="parking-info">
                                    <div class="info-icon">
                                        <img src="../../../assets/img/order_money.png" alt="今日临时车缴费">
                                    </div>
                                    <div class="info-content">
                                        <p class="info-title">今日临时车缴费</p>
                                        <span class="num">{{tempAmount}}</span>
                                    </div>
                                </div>
                                <div class="parking-info">
                                    <div class="info-icon">
                                        <img src="../../../assets/img/order_money.png" alt="今日储值车扣费">
                                    </div>
                                    <div class="info-content">
                                        <p class="info-title">今日储值车扣费</p>
                                        <span class="num">{{storeAmount}}</span>
                                    </div>
                                </div>
                                <div class="parking-info">
                                    <div class="info-icon">
                                        <img src="../../../assets/img/order_money.png" alt="今日储值车充值">
                                    </div>
                                    <div class="info-content">
                                        <p class="info-title">今日储值车充值</p>
                                        <span class="num">{{storeRechage}}</span>
                                    </div>
                                </div>
                                <div class="parking-info">
                                    <div class="info-icon">
                                        <img src="../../../assets/img/order_money.png" alt="今日月租车缴费">
                                    </div>
                                    <div class="info-content">
                                        <p class="info-title">今日月租车缴费</p>
                                        <span class="num">{{monthAmount}}</span>
                                    </div>
                                </div>
                              </div>
                   </div>
                </div>
            </div>
        </div>
        <div class="row">
           <div class="col-sm-12">
               <div class="box">
                   <div class="box-body">
                       <div class="col-sm-6">
                        <h4>今日支付方式分析</h4>
                        <div
                          class="chart"
                          id="payType"
                          style="height: 350px; padding-right: 10px"
                        ></div>
                      </div>
                      <div class="col-sm-6">
                          <h4>今日支付类型分析</h4>
                        <div
                          class="chart"
                          id="chargeType"
                          style="height: 350px; padding-right: 10px"
                        ></div>
                      </div>
                   </div>
               </div>
           </div>
        </div>
        <div class="row">
           <div class="col-sm-12">
               <div class="box">
                   <div class="box-body">
                       <h4>近30日线上支付/车场收入统计</h4>
                       <div
                          ref="chart"
                          class="chart"
                          id="statistics"
                          style="height: 400px; padding-right: 10px"
                        ></div>
                   </div>
               </div>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script src="./smartParkingDashboard.js"></script>
<style scoped lang="scss">
@import "./smartParkingDashboard.scss";
.Summary{
    display: flex;
    justify-content: center;
    padding: 30px 0;
}
</style>
