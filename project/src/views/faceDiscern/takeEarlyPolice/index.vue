<template>
	<div class="content-wrapper">
		<section class="content-header">
		<h1 class="nice">
			人脸布控 - 抓拍报警
			<!-- <small>Optional description</small> -->
		</h1>
		<ol class="breadcrumb">
			<li>
			<a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
			</li>
			<li><i class="glyphicon glyphicon-cog"></i> 人脸布控</li>
			<li class="active">
			<i class="glyphicon glyphicon-adjust"></i> 抓拍报警
			</li>
		</ol>
		</section>
		<!-- 顶部搜索区 -->
		<el-card >
			<div class="my_card">
				<el-row :gutter="30">
					<el-col :span="18">
						<div class="my_card-box">
							<el-input placeholder="搜索姓名" ></el-input>
							<el-date-picker
							type="datetime"
							placeholder="开始时间"
							format="yyyy-MM-dd HH:mm"
							value-format="yyyy-MM-dd HH:mm"
							
							style="margin-left:10px">
							</el-date-picker>
							<el-date-picker
							type="datetime"
							placeholder="结束时间"
							format="yyyy-MM-dd HH:mm"
							value-format="yyyy-MM-dd HH:mm"
							
							style="margin-left:10px">
							</el-date-picker>
							<el-select  placeholder="戴眼镜" style="margin-left:10px">
								<el-option v-for="item in options1" :key="item.value" :value="item.value" :label="item.label"></el-option>
							</el-select>
							<el-select  placeholder="戴口罩" style="margin-left:10px">
								<el-option v-for="item in options2" :key="item.value" :value="item.value" :label="item.label"></el-option>
							</el-select>
							<el-select  placeholder="肤色" style="margin-left:10px">
								<el-option v-for="item in options3" :key="item.value" :value="item.value" :label="item.label"></el-option>
							</el-select>
							<el-select  placeholder="胡子" style="margin-left:10px">
								<el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="4" >
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
			</div>
			<!-- BTN操作区域 -->
			<div class="btn-group" style="margin-top:20px">
				<button id="btn_add" type="button" class="btn btn-default">
					<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>全选
				</button> 
				<button id="btn_add" type="button" class="btn btn-default" >
					<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
				</button> 
			</div>
		
		<!-- table表格区域 -->
		<div class="box-table">
			<el-table
			:data="tableData"
			stripe
			border
			tooltip-effect="dark"
			sortable
			style="width: 100%"
			:header-cell-style="{ backg : '#FAF9F8' }"
			ref="multipleTable"
			
			>
			>
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="snapPic" label="抓拍照片" >
				<template slot-scope="scope">
				<!-- <el-image
					style="width: 70px; height: 70px"
					:src="OimgUrl + '/file/download?path=' + scope.row.snapPic"
					:preview-src-list="[
					OimgUrl + '/file/download?path=' + scope.row.snapPic,
					]"
				>
					<div slot="error" class="image-slot">
					<i class="el-icon-picture-outline"></i>
					</div>
				</el-image> -->
				</template>
			</el-table-column>
			<el-table-column prop="personName" label="姓名"></el-table-column>
			<el-table-column prop="personType" label="相似度">
			</el-table-column>
			<el-table-column prop="name" label="报警等级">
			</el-table-column>
			<el-table-column prop="age" label="布控原因">
			</el-table-column>
			<el-table-column prop="mask" label="抓拍设备">
			</el-table-column>
			<el-table-column prop="date" label="日期" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="address" label="时间"  fixed="right">
			</el-table-column>
			</el-table>、
					<!-- 底部分页区域 -->
			<div class="block">
			<el-pagination
				
				
				:page-sizes="[10, 20, 25]"
			
				layout="total, sizes, prev, pager, next, jumper"
				
			></el-pagination>
			</div>
					<!-- 添加名单弹出框 -->
					<div>
						<el-dialog
							title="添加布控名单"
							:visible.sync="userInfoList"
							width="30%"
							center>
							<span slot="footer" class="dialog-footer">
								<el-button @click="userInfoList = false">取 消</el-button>
								<el-button type="primary" @click="userInfoList = false">确 定</el-button>
							</span>
						</el-dialog>
					</div>
		</div>
			
		</el-card>
	</div>
</template>
<script src='./takeEarlyPolice.js'>
</script>
<style  scoped>
@import './takeEarlyPolice.css';
</style>