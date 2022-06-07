<template>
    <div class="content-wrapper">
        <section class="content-header">
            <h1 class="nice">
                车辆管理- 车辆记录
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
                    <i class="glyphicon glyphicon-adjust">车辆记录</i>
                </li>
            </ol>
        </section>
        <el-card>
			<!-- 顶部搜索区域 -->
            <el-row class="search_wrapper">
                <el-col :span="4">
					<el-input placeholder="搜索车牌、车主、联系方式" style="width:85%"></el-input>
				</el-col>
				<el-col :span="4">
					<el-select  placeholder="车主类型" style="width:85%">
						<el-option v-for="item in userCar" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-select  placeholder="进出方向" style="width:85%">
						<el-option></el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-select  placeholder="进出车场" style="width:85%">
						<el-option></el-option>
					</el-select>
				</el-col>
				<el-col :span="6" class="box_timeW">
					<el-date-picker
						v-model="value1"
						type="datetime"
						placeholder="开始时间"
						
						>
					</el-date-picker>
					<el-date-picker
						v-model="value1"
						type="datetime"
						placeholder="结束时间"
						
						>
					</el-date-picker>
				</el-col>
				<el-col :span="4">
					<div class="btn-group">
                        <button id="btn_device_reset" type="button" class="btn btn-primary"  >
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
                        </button> 
                        <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8" >
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                        </button>
                    </div>
				</el-col>
            </el-row>
			<!-- tab表格区域 -->
			<div class="top_box">
				<el-table
				:data="tableData"
				stripe
				border
				style="width: 100%">
				<el-table-column
				prop="date"
				label="车牌照片"
				>
				</el-table-column>
				<el-table-column
				prop="name"
				label="车牌号"
				
				>
				</el-table-column>
				<el-table-column
				prop="name"
				label="车主">
				</el-table-column>
				<el-table-column
				prop="name"
				label="车主类型">
				</el-table-column>
				<el-table-column
				prop="date"
				label="联系方式">
				</el-table-column>
				<el-table-column
				prop="date"
				label="进出方向">
				</el-table-column>
				<el-table-column
				prop="date"
				label="进出区域"
				:show-overflow-tooltip = true
				>
				</el-table-column>
				<el-table-column
				prop="date"
				label="车型">
				</el-table-column>
				<el-table-column
				prop="date"
				label="车款">
				</el-table-column>
				<el-table-column
				prop="name"
				label="车颜色">
				</el-table-column>
				<el-table-column
				prop="date"
				label="时间"
				:show-overflow-tooltip = true
				fixed="right"
				>
				</el-table-column>
			</el-table>
			</div>

			<!-- 底部分页区域 -->
			<div class="block">
				<el-pagination
				
				:current-page="currentPage4"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400">
				</el-pagination>
			</div>
        </el-card>
    </div>
</template>
<script src='./vehicleRecord.js'>

</script>
<style scope>
  @import './vehicleRecord.css';
</style>